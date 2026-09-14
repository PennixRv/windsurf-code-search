import { execFileSync } from "node:child_process";

export const RELEASE_NPM_VERSION = "12.0.1";

export function requireReleaseNpmVersion(run = (command, args) => execFileSync(command, args, { encoding: "utf8" })) {
  const actual = run("npm", ["--version"]).trim();
  if (actual !== RELEASE_NPM_VERSION) throw new Error(`release requires npm ${RELEASE_NPM_VERSION}`);
}
