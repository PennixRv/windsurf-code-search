import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

test("Skill metadata preserves its callable identity and implicit invocation policy", () => {
  const skill = readFileSync("SKILL.md", "utf8");
  const metadata = readFileSync("agents/openai.yaml", "utf8");
  const name = skill.match(/^name: ([a-z0-9-]+)$/m)?.[1];
  assert.equal(name, "pennix-windsurf-code-search");
  assert.match(metadata, /allow_implicit_invocation: true/);
  const prompt = metadata.match(/^  default_prompt: "(.+)"$/m)?.[1];
  assert.ok(prompt?.includes(`$${name}`));
  const description = metadata.match(/^  short_description: "(.+)"$/m)?.[1];
  assert.ok(description && description.length >= 25 && description.length <= 64);
});

test("Skill references resolve to packaged resources from its actual directory", () => {
  const skill = readFileSync("SKILL.md", "utf8");
  const paths = [...skill.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)].map((match) => match[1]);
  assert.ok(paths.includes("references/script-contract.md"));
  const manifest = JSON.parse(readFileSync("package.json", "utf8"));
  for (const path of paths.filter((path) => !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(path))) {
    assert.ok(statSync(resolve(path)).isFile(), path);
    assert.ok(manifest.files.includes(path), path);
  }
});
