import assert from "node:assert/strict";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync, symlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { runLifecycle } from "../scripts/lib/lifecycle.mjs";
import { ownerConfigPath, resolveCredential, writeOwnerCredential } from "../scripts/lib/credentials.mjs";

function fixture(t) {
  const home = mkdtempSync(join(tmpdir(), "windsurf-lifecycle-"));
  t.after(() => rmSync(home, { recursive: true, force: true }));
  const environment = { HOME: home, XDG_CONFIG_HOME: join(home, ".config") };
  const source = join(home, ".local/share/devin/credentials.toml");
  mkdirSync(dirname(source), { recursive: true });
  writeFileSync(source, 'api_key = "devin-synthetic-token-12345"\n');
  return { environment, source, path: ownerConfigPath(environment) };
}
const owner = { target: "windsurf", credential_mode: "owner", desired_digest: "policy-owner" };
const central = { target: "windsurf", desired_digest: "policy-central", secrets: { api_key: "synthetic-central-key" } };

test("native CLI accepts owner mode without central input and redacts replies", t => {
  const { environment } = fixture(t);
  for (const action of ["inspect", "configure", "inspect", "unconfigure"]) {
    const result = spawnSync(process.execPath, ["scripts/windsurf-code-search.mjs", "lifecycle", action, "--json"],
      { input: JSON.stringify(owner), env: { ...process.env, ...environment, WINDSURF_API_KEY: "" }, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.ok(JSON.parse(result.stdout).state);
    assert.doesNotMatch(result.stdout + result.stderr, /synthetic-token/);
  }
});

test("owner mode imports Devin privately and keeps source untouched", async t => {
  const { environment, source, path } = fixture(t);
  const original = readFileSync(source);
  const inspect = await runLifecycle("inspect", owner, environment);
  assert.equal(inspect.state, "missing");
  assert.equal(inspect.credential_source, "devin");
  assert.equal((await runLifecycle("configure", owner, environment)).state, "current");
  assert.equal((await resolveCredential({ environment })).source, "owner-config");
  assert.equal(statSync(path).mode & 0o777, 0o600);
  assert.equal(statSync(dirname(path)).mode & 0o777, 0o700);
  assert.deepEqual(readFileSync(source), original);
  assert.equal((await runLifecycle("configure", owner, environment)).state, "current");
  assert.doesNotMatch(JSON.stringify(await runLifecycle("inspect", owner, environment)), /synthetic-token/);
  assert.equal((await runLifecycle("unconfigure", { target: "windsurf" }, environment)).state, "absent");
});

test("central compatibility and explicit mode rebinding preserve owned key", async t => {
  const { environment, path } = fixture(t);
  assert.equal((await runLifecycle("configure", central, environment)).state, "current");
  const bytes = readFileSync(path);
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "configuration-required");
  assert.equal((await runLifecycle("configure", owner, environment)).state, "current");
  assert.deepEqual(readFileSync(path), bytes);
  assert.equal((await runLifecycle("inspect", { target: "windsurf" }, environment)).state, "current");
});

test("missing source and environment override never import", async t => {
  const { environment, source } = fixture(t);
  rmSync(source);
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "blocked");
  await assert.rejects(runLifecycle("configure", owner, environment));
  const overridden = { ...environment, WINDSURF_API_KEY: "sentinel-override" };
  assert.equal((await runLifecycle("inspect", owner, overridden)).state, "environment-override");
  await assert.rejects(runLifecycle("configure", owner, overridden));
});

test("external, drifted, unsafe and orphaned files retain their protection", async t => {
  const { environment, path } = fixture(t);
  writeOwnerCredential("external-sentinel", { environment });
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "external");
  await assert.rejects(runLifecycle("configure", owner, environment));
  rmSync(path);
  await runLifecycle("configure", owner, environment);
  writeOwnerCredential("drifted-sentinel", { environment });
  for (const action of ["configure", "unconfigure"]) await assert.rejects(runLifecycle(action, owner, environment));
  chmodSync(path, 0o644);
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "invalid");
  rmSync(path);
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "orphaned");
  await assert.rejects(runLifecycle("configure", owner, environment));
  symlinkSync("/nonexistent", path);
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "invalid");
});

test("invalid receipt blocks import before writing a credential", async t => {
  const { environment, path } = fixture(t);
  const receipt = `${path}.pennix-lifecycle.json`;
  mkdirSync(receipt, { recursive: true, mode: 0o700 });
  await assert.rejects(runLifecycle("configure", owner, environment));
  assert.throws(() => statSync(path), { code: "ENOENT" });
});

test("orphan withdrawal removes only this receipt and preserves Devin", async t => {
  const { environment, path, source } = fixture(t);
  const original = readFileSync(source);
  await runLifecycle("configure", owner, environment);
  rmSync(path);
  assert.equal((await runLifecycle("inspect", owner, environment)).state, "orphaned");
  const result = await runLifecycle("unconfigure", { target: "windsurf", operation_id: "orphan-remove" }, environment);
  assert.equal(result.effect, "changed");
  assert.throws(() => statSync(`${path}.pennix-lifecycle.json`), { code: "ENOENT" });
  assert.deepEqual(readFileSync(source), original);
});

test("validate rejects a symlink ancestor without creating descendants", async t => {
  const { environment } = fixture(t);
  const external = join(environment.HOME, "external");
  mkdirSync(external);
  symlinkSync(external, join(environment.HOME, "linked"));
  const changed = { ...environment, XDG_CONFIG_HOME: join(environment.HOME, "linked", "missing") };
  await assert.rejects(runLifecycle("validate", { ...central, operation: "configure", operation_id: "unsafe" }, changed), error => {
    assert.equal(error.lifecycleResult.effect, "none");
    return true;
  });
  assert.throws(() => statSync(join(external, "missing")), { code: "ENOENT" });
});

test("receipt write failure restores only this operation's credential bytes", async t => {
  const { environment, path } = fixture(t);
  const fail = { persistReceipt: async () => { throw new Error("synthetic failure"); } };
  await assert.rejects(runLifecycle("configure", owner, environment, fail), /was rolled back/);
  assert.throws(() => statSync(path), { code: "ENOENT" });
  await runLifecycle("configure", central, environment);
  const original = readFileSync(path);
  const receipt = readFileSync(`${path}.pennix-lifecycle.json`);
  await assert.rejects(runLifecycle("configure", owner, environment, fail), /was rolled back/);
  assert.deepEqual(readFileSync(path), original);
  assert.deepEqual(readFileSync(`${path}.pennix-lifecycle.json`), receipt);
  await assert.rejects(runLifecycle("configure", owner, environment, {
    persistReceipt: async () => {
      writeOwnerCredential("concurrent-sentinel", { environment });
      throw new Error("synthetic failure");
    },
  }), /rollback failed/);
  assert.equal(JSON.parse(readFileSync(path)).apiKey, "concurrent-sentinel");
});

test("validation is read-only and execution replies bind effect to operation identity", async t => {
  const { environment, path, source } = fixture(t);
  const original = readFileSync(source);
  const input = { ...owner, operation: "configure", operation_id: "probe-1" };
  const validated = await runLifecycle("validate", input, environment);
  assert.equal(validated.protocol_version, 1);
  assert.equal(validated.operation_id, "probe-1");
  assert.equal(validated.effect, "none");
  assert.throws(() => statSync(dirname(path)), { code: "ENOENT" });
  const configured = await runLifecycle("configure", input, environment);
  assert.equal(configured.effect, "changed");
  assert.equal((await runLifecycle("configure", input, environment)).effect, "none");
  assert.equal((await runLifecycle("unconfigure", { target: "windsurf", operation_id: "remove-1" }, environment)).effect, "changed");
  assert.deepEqual(readFileSync(source), original);
  await assert.rejects(runLifecycle("configure", { ...central, secrets: { api_key: "bad\nsecret" } }, environment), error => {
    assert.equal(error.lifecycleResult.effect, "none");
    assert.doesNotMatch(JSON.stringify(error.lifecycleResult), /bad|secret/);
    return true;
  });
  await assert.rejects(runLifecycle("configure", input, environment, {
    persistReceipt: async () => { throw new Error("private failure sentinel"); },
  }), error => {
    assert.equal(error.lifecycleResult.effect, "restored");
    assert.equal(error.lifecycleResult.operation_id, "probe-1");
    assert.doesNotMatch(JSON.stringify(error.lifecycleResult), /private failure sentinel/);
    return true;
  });
});
