import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Skill metadata enables implicit routing with explicit local and CodeGraph gates", () => {
  const skill = readFileSync("SKILL.md", "utf8");
  const metadata = readFileSync("agents/openai.yaml", "utf8");
  assert.match(metadata, /allow_implicit_invocation: true/);
  assert.match(skill, /已知文件、字面量、配置、日志和实时内容/);
  assert.match(skill, /已知符号、调用者或被调用者、结构、关系和影响分析，使用 CodeGraph/);
  assert.match(skill, /不要仅因请求使用自然语言就触发本 Skill/);
  assert.match(skill, /不要自动并行运行 CodeGraph 和 Windsurf Code Search/);
  assert.match(skill, /一次 CodeGraph 未命中也不构成机械外部后备/);
  assert.match(skill, /外部文档、普通对话以及只需本地影响分析的请求都跳过本 Skill/);
  assert.match(skill, /可以交由 Context Mode 在本地处理或索引/);
  assert.match(skill, /须保留来源并标记“未核验”/);
  assert.match(skill, /作为事实使用前回到当前源码核验/);
  assert.match(skill, /不得将未核验候选直接写入 Trellis 或 CodeGraph/);
});
