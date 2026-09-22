import {
  chmodSync,
  closeSync,
  constants,
  fchmodSync,
  fsyncSync,
  fstatSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir, platform } from "node:os";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { runBoundedProcess } from "./executor.mjs";

const DEVIN_CREDENTIAL_PATTERN = /^(?:devin-session-token\$|devin-|sk-)[A-Za-z0-9._~-]{10,}$/;
const OWNER_CONFIG_LIMIT = 16 * 1024;
const OWNER_KEY_LIMIT = 4096;

export const CREDENTIAL_LIMITS = Object.freeze({
  HELPER_TIMEOUT_MS: 1_000,
  MAX_HELPER_OUTPUT_BYTES: 16 * 1024,
  MAX_OWNER_CONFIG_BYTES: OWNER_CONFIG_LIMIT,
});

export function ownerConfigPath(environment = process.env) {
  const configHome = typeof environment?.XDG_CONFIG_HOME === "string" && environment.XDG_CONFIG_HOME.trim()
    ? environment.XDG_CONFIG_HOME.trim()
    : join(
      typeof environment?.HOME === "string" && environment.HOME.trim() ? environment.HOME : homedir(),
      ".config",
    );
  return join(configHome, "windsurf-code-search", "config.json");
}

function ownerConfigResult(status, apiKey = null) {
  return { status, apiKey, source: "owner-config" };
}

function closeDescriptor(descriptor) {
  if (descriptor === undefined) return;
  try {
    closeSync(descriptor);
  } catch {
    // Credential helpers never expose filesystem details.
  }
}

export function inspectOwnerCredential({ environment = process.env } = {}) {
  const path = ownerConfigPath(environment);
  let descriptor;
  try {
    const initial = lstatSync(path);
    if (!initial.isFile() || initial.isSymbolicLink() || (initial.mode & 0o077) !== 0) {
      return ownerConfigResult("blocked");
    }
    if (initial.size > OWNER_CONFIG_LIMIT) return ownerConfigResult("blocked");
    descriptor = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
    const metadata = fstatSync(descriptor);
    if (!metadata.isFile() || metadata.size > OWNER_CONFIG_LIMIT || (metadata.mode & 0o077) !== 0) {
      return ownerConfigResult("blocked");
    }
    let parsed;
    try {
      parsed = JSON.parse(readFileSync(descriptor, "utf8"));
    } catch {
      return ownerConfigResult("invalid");
    }
    const keys = parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? Object.keys(parsed)
      : [];
    const apiKey = parsed?.apiKey;
    if (keys.length !== 1 || keys[0] !== "apiKey" || typeof apiKey !== "string") {
      return ownerConfigResult("invalid");
    }
    const normalized = apiKey.trim();
    if (!normalized || normalized.length > OWNER_KEY_LIMIT || /[\r\n]/.test(normalized)) {
      return ownerConfigResult("invalid");
    }
    return ownerConfigResult("configured", normalized);
  } catch (error) {
    if (error?.code === "ENOENT") return ownerConfigResult("missing");
    return ownerConfigResult("unavailable");
  } finally {
    closeDescriptor(descriptor);
  }
}

function assertOwnerTarget(path) {
  try {
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || (metadata.mode & 0o077) !== 0) {
      throw new Error("unsafe owner configuration target");
    }
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }
}

export function writeOwnerCredential(apiKey, { environment = process.env } = {}) {
  const normalized = typeof apiKey === "string" ? apiKey.trim() : "";
  if (!normalized || normalized.length > OWNER_KEY_LIMIT || /[\r\n]/.test(normalized)) {
    throw new Error("invalid owner credential");
  }
  const path = ownerConfigPath(environment);
  const directory = dirname(path);
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const directoryMetadata = lstatSync(directory);
  if (!directoryMetadata.isDirectory() || directoryMetadata.isSymbolicLink()) {
    throw new Error("unsafe owner configuration directory");
  }
  chmodSync(directory, 0o700);
  assertOwnerTarget(path);

  const temporaryPath = `${path}.${randomUUID()}.tmp`;
  let descriptor;
  try {
    descriptor = openSync(temporaryPath, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL, 0o600);
    const content = `${JSON.stringify({ apiKey: normalized })}\n`;
    writeFileSync(descriptor, content, "utf8");
    fchmodSync(descriptor, 0o600);
    fsyncSync(descriptor);
    closeDescriptor(descriptor);
    descriptor = undefined;
    renameSync(temporaryPath, path);
  } catch (error) {
    closeDescriptor(descriptor);
    try {
      unlinkSync(temporaryPath);
    } catch {
      // Best-effort cleanup of a private temporary file.
    }
    throw error;
  }
}

function explicitCredential(environment) {
  const value = environment?.WINDSURF_API_KEY;
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function isSupportedDevinCredential(value) {
  return typeof value === "string" && DEVIN_CREDENTIAL_PATTERN.test(value);
}

function helperEnvironment(environment) {
  const home = environment?.HOME;
  return typeof home === "string" && home.length > 0 ? { HOME: home } : {};
}

export async function readDevinCredential({
  environment = process.env,
  platformName = platform(),
  nodePath = process.execPath,
  helperPath = fileURLToPath(new URL("./devin-credential-helper.mjs", import.meta.url)),
  runProcess = runBoundedProcess,
} = {}) {
  if (platformName !== "linux") return null;

  const signal = AbortSignal.timeout(CREDENTIAL_LIMITS.HELPER_TIMEOUT_MS);
  try {
    const result = await runProcess(nodePath, [helperPath], {
      env: helperEnvironment(environment),
      signal,
      maxOutputBytes: CREDENTIAL_LIMITS.MAX_HELPER_OUTPUT_BYTES,
    });
    if (result.status !== 0 || !isSupportedDevinCredential(result.stdout)) return null;
    return result.stdout;
  } catch {
    return null;
  }
}

export async function resolveCredential(options = {}) {
  const explicit = explicitCredential(options.environment);
  if (explicit) return { apiKey: explicit, source: "environment" };

  const owner = inspectOwnerCredential(options);
  if (owner.status === "configured") return { apiKey: owner.apiKey, source: owner.source };

  const discovered = await readDevinCredential(options);
  if (discovered) return { apiKey: discovered, source: "devin" };
  return null;
}
