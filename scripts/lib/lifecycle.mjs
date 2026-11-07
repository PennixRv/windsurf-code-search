import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, rename, rm, open } from "node:fs/promises";
import { dirname } from "node:path";
import { ownerConfigPath, inspectOwnerCredential, writeOwnerCredential, readDevinCredential } from "./credentials.mjs";

function receiptPath(environment) { return `${ownerConfigPath(environment)}.pennix-lifecycle.json`; }

async function digest(path) {
  try { return createHash("sha256").update(await readFile(path)).digest("hex"); }
  catch (error) { if (error?.code === "ENOENT") return null; throw error; }
}

async function readReceipt(path) {
  try {
    const metadata = await lstat(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || metadata.uid !== process.getuid()
      || (metadata.mode & 0o077) !== 0) throw new Error();
    const value = JSON.parse(await readFile(path, "utf8"));
    if (value?.schema !== 2 || value.owner !== "windsurf-code-search"
      || typeof value.digest !== "string" || typeof value.desiredDigest !== "string"
      || (value.credentialMode !== undefined && !["owner", "central"].includes(value.credentialMode))) throw new Error();
    return value;
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw new Error("invalid Windsurf lifecycle receipt");
  }
}

async function writeRaw(path, content) {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const temporary = `${path}.${process.pid}.${Date.now()}.restore`;
  const handle = await open(temporary, "wx", 0o600);
  try {
    await handle.writeFile(content);
    await handle.chmod(0o600);
    await handle.close();
    await rename(temporary, path);
  } catch (error) {
    await handle.close().catch(() => undefined);
    await rm(temporary, { force: true }).catch(() => undefined);
    throw error;
  }
}

async function writeReceipt(path, value) {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  const handle = await open(temporary, "wx", 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(value)}\n`, "utf8");
    await handle.chmod(0o600);
    await handle.close();
    await rename(temporary, path);
  } catch (error) {
    await handle.close().catch(() => undefined);
    await rm(temporary, { force: true }).catch(() => undefined);
    throw error;
  }
}

export async function inspectLifecycle(environment = process.env, desiredDigest = null, credentialMode = null) {
  const path = ownerConfigPath(environment);
  if (environment.WINDSURF_API_KEY?.trim()) return { state: "environment-override", owned: false, detail: "environment overrides the Windsurf owner file" };
  const status = inspectOwnerCredential({ environment });
  const receipt = await readReceipt(`${path}.pennix-lifecycle.json`);
  if (status.status === "missing") {
    if (receipt) return { state: "drifted", owned: true, detail: "Windsurf owner credential is missing from its receipt" };
    if (credentialMode === "owner") {
      const available = Boolean(await readDevinCredential({ environment }));
      return { state: available ? "missing" : "blocked", owned: false, credential_source: available ? "devin" : "none", detail: available ? "Devin credential can be imported into the Windsurf owner file" : "Windsurf owner import has no accepted Devin credential" };
    }
    return { state: "missing", owned: false, detail: "Windsurf owner credential is absent" };
  }
  if (status.status !== "configured") return { state: "invalid", owned: false, detail: "Windsurf owner credential is not usable" };
  if (!receipt) return { state: "external", owned: false, detail: "Windsurf credential exists without lifecycle ownership" };
  if (receipt.digest !== await digest(path)) return { state: "drifted", owned: true, detail: "Windsurf owner file drifted" };
  if (credentialMode && credentialMode !== (receipt.credentialMode ?? "central")) {
    return { state: "configuration-required", owned: true, detail: "Windsurf credential mode must be explicitly rebound" };
  }
  const current = !desiredDigest || receipt.desiredDigest === desiredDigest;
  return { state: current ? "current" : "configuration-required", owned: true, detail: current ? "Windsurf owner file matches lifecycle receipt" : "Windsurf desired input changed" };
}

export async function runLifecycle(action, input, environment = process.env, { persistReceipt = writeReceipt } = {}) {
  if (input.target !== "windsurf") throw new Error("Windsurf lifecycle target is invalid");
  const mode = input.credential_mode ?? null;
  if (mode !== null && !["owner", "central"].includes(mode)) throw new Error("Windsurf credential mode is invalid");
  const path = ownerConfigPath(environment);
  const receipt = `${path}.pennix-lifecycle.json`;
  const before = await inspectLifecycle(environment, input.desired_digest ?? null, mode);
  if (action === "inspect") return before;
  if (action === "configure") {
    if (typeof input.desired_digest !== "string" || !input.desired_digest) throw new Error("Windsurf lifecycle input is invalid");
    if (mode !== "owner" && (!input.secrets || typeof input.secrets.api_key !== "string" || !input.secrets.api_key.trim())) throw new Error("Windsurf lifecycle input is invalid");
    if (before.state === "current") return before;
    if (["external", "invalid", "environment-override", "blocked", "drifted"].includes(before.state)) throw new Error(`Windsurf owner state ${before.state} cannot be taken over`);
    const apiKey = mode === "owner"
      ? (before.owned ? inspectOwnerCredential({ environment }).apiKey : await readDevinCredential({ environment }))
      : input.secrets.api_key;
    if (!apiKey) throw new Error("Windsurf owner import is unavailable");
    let beforeCredential = null;
    let beforeReceipt = null;
    try { beforeCredential = await readFile(path); } catch (error) { if (error?.code !== "ENOENT") throw error; }
    try { beforeReceipt = await readFile(receipt); } catch (error) { if (error?.code !== "ENOENT") throw error; }
    const refreshed = await inspectLifecycle(environment, input.desired_digest, mode);
    if (refreshed.state !== before.state
      || await digest(path) !== (beforeCredential === null ? null : createHash("sha256").update(beforeCredential).digest("hex"))
      || await digest(receipt) !== (beforeReceipt === null ? null : createHash("sha256").update(beforeReceipt).digest("hex"))) {
      throw new Error("Windsurf owner state changed before configuration");
    }
    let writtenDigest = null;
    try {
      writeOwnerCredential(apiKey, { environment });
      writtenDigest = await digest(path);
      await persistReceipt(receipt, { schema: 2, owner: "windsurf-code-search", digest: writtenDigest, desiredDigest: input.desired_digest, credentialMode: mode ?? "central" });
    } catch (error) {
      try {
        if (writtenDigest !== null) {
          if (await digest(path) !== writtenDigest) throw new Error("concurrent credential change blocks rollback");
          if (beforeCredential === null) await rm(path, { force: true }); else await writeRaw(path, beforeCredential);
        }
        // Receipt rename is atomic: failed writes leave the previous receipt intact.
      } catch (rollback) {
        throw new Error("Windsurf lifecycle write failed and rollback failed", { cause: rollback });
      }
      throw new Error("Windsurf lifecycle write failed and was rolled back", { cause: error });
    }
    return { state: "current", owned: true, detail: "Windsurf owner configured" };
  }
  if (action === "unconfigure") {
    if (before.state === "missing") return { state: "absent", owned: false, detail: "Windsurf owner credential is absent" };
    if (!before.owned || before.state !== "current") throw new Error("Windsurf lifecycle ownership is missing or drifted");
    const beforeCredential = await readFile(path);
    const beforeReceipt = await readFile(receipt);
    try {
      await rm(path, { force: true });
      await rm(receipt, { force: true });
    } catch (error) {
      try {
        for (const [target, original] of [[path, beforeCredential], [receipt, beforeReceipt]]) {
          const current = await digest(target);
          if (current !== null && current !== createHash("sha256").update(original).digest("hex")) {
            throw new Error("concurrent owner change blocks rollback");
          }
          if (current === null) await writeRaw(target, original);
        }
      } catch (rollback) {
        throw new Error("Windsurf lifecycle removal failed and rollback failed", { cause: rollback });
      }
      throw new Error("Windsurf lifecycle removal failed and was rolled back", { cause: error });
    }
    return { state: "absent", owned: false, detail: "Windsurf owner credential removed" };
  }
  throw new Error("unknown lifecycle action");
}
