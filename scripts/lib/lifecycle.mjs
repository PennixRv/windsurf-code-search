import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, rename, rm, open } from "node:fs/promises";
import { dirname } from "node:path";
import { ownerConfigPath, inspectOwnerCredential, writeOwnerCredential } from "./credentials.mjs";

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
      || typeof value.digest !== "string" || typeof value.desiredDigest !== "string") throw new Error();
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

export async function inspectLifecycle(environment = process.env, desiredDigest = null) {
  const path = ownerConfigPath(environment);
  const status = inspectOwnerCredential({ environment });
  if (status.status === "missing") return { state: "missing", owned: false, detail: "Windsurf owner credential is absent" };
  if (status.status !== "configured") return { state: "invalid", owned: false, detail: "Windsurf owner credential is not usable" };
  if (environment.WINDSURF_API_KEY?.trim()) return { state: "environment-override", owned: false, detail: "environment overrides the Windsurf owner file" };
  const receipt = await readReceipt(`${path}.pennix-lifecycle.json`);
  if (!receipt) return { state: "external", owned: false, detail: "Windsurf credential exists without lifecycle ownership" };
  const current = receipt.schema === 2 && receipt.digest === await digest(path)
    && (!desiredDigest || receipt.desiredDigest === desiredDigest);
  return { state: current ? "current" : "drifted", owned: true, detail: current ? "Windsurf owner file matches lifecycle receipt" : "Windsurf owner file drifted" };
}

export async function runLifecycle(action, input, environment = process.env) {
  if (input.target !== "windsurf") throw new Error("Windsurf lifecycle target is invalid");
  const path = ownerConfigPath(environment);
  const receipt = `${path}.pennix-lifecycle.json`;
  const before = await inspectLifecycle(environment, input.desired_digest ?? null);
  if (action === "inspect") return before;
  if (action === "configure") {
    if (!input.secrets || typeof input.secrets.api_key !== "string" || !input.secrets.api_key.trim()
      || typeof input.desired_digest !== "string") throw new Error("Windsurf lifecycle input is invalid");
    if (before.state === "current") return before;
    if (["external", "invalid", "environment-override"].includes(before.state)) throw new Error(`Windsurf owner state ${before.state} cannot be taken over`);
    let beforeCredential = null;
    let beforeReceipt = null;
    try { beforeCredential = await readFile(path); } catch (error) { if (error?.code !== "ENOENT") throw error; }
    try { beforeReceipt = await readFile(receipt); } catch (error) { if (error?.code !== "ENOENT") throw error; }
    try {
      writeOwnerCredential(input.secrets.api_key, { environment });
      await writeReceipt(receipt, { schema: 2, owner: "windsurf-code-search", digest: await digest(path), desiredDigest: input.desired_digest });
    } catch (error) {
      try {
        if (beforeCredential === null) await rm(path, { force: true }); else await writeRaw(path, beforeCredential);
        if (beforeReceipt === null) await rm(receipt, { force: true }); else await writeRaw(receipt, beforeReceipt);
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
        await writeRaw(path, beforeCredential);
        await writeRaw(receipt, beforeReceipt);
      } catch (rollback) {
        throw new Error("Windsurf lifecycle removal failed and rollback failed", { cause: rollback });
      }
      throw new Error("Windsurf lifecycle removal failed and was rolled back", { cause: error });
    }
    return { state: "absent", owned: false, detail: "Windsurf owner credential removed" };
  }
  throw new Error("unknown lifecycle action");
}
