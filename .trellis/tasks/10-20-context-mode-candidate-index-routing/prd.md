# 收敛真实来源的代码检索路由与候选索引

## Goal

根据根任务 10-20-context-mode-routing-alignment 的已批准完整方案，修正 Windsurf Skill 对 Context Mode 本地处理和索引的过宽限制及其回归断言。

同时承接已归档根任务 `10-21-code-search-routing-convergence` 的既定 D1：含义、目标和范围明确但无有效代码锚点时可直接发现语义候选。正常 collection 物化证实这一策略先前只落在消费者快照，真实来源仍保留旧触发门；本任务将已定策略合入真实源，避免重新物化恢复旧规则。用户已明确授权补齐后直接推进，无需再次询问。

## Requirements

- 修改真实源 `SKILL.md` 中禁止持久化集成和禁止 Context Mode 索引候选的两处过宽规则，允许 Context Mode 对 Windsurf 候选进行本地处理和持久索引。
- 候选必须保留来源及“未核验”状态；将内容作为事实使用前，回到当前项目源码核对。索引、搜索命中和摘要不代表候选已验证。
- 按有效代码锚点区分来源：已有路径、字面量或配置先精确文本；符号、调用、依赖和影响优先可用 CodeGraph；明确但无有效锚点的语义定位可直接 Windsurf，不强制无效的文本或图探测。含义、owner 或范围不清楚时先澄清，不因普通自然语言自动触发。同步 description、正文与 `agents/openai.yaml`。
- 保留既有外部允许范围、PathGuard、本地覆盖/诊断、凭据 owner 和候选不受信任合同；真实非交互 CLI 由 Context Mode 承载，候选使用前核验当前源码。不得将结构影响分析外送作为图缺失的机械后备。
- 更新现有 `test/skill-routing.test.mjs` 中与旧禁令冲突的断言；不新增搜索服务、候选数据库、信任层、自动 Hook 采集、凭据路径或运行时行为。
- 在本仓库现有 `main` 完成源和测试；由 `pennix-skills` 按 `collection.json` 固定此来源并物化，不直接编辑消费者快照。

## Acceptance Criteria

- [ ] Skill 允许候选进入 Context Mode 本地处理/索引，并明确来源、未核验状态和使用前源码核验。
- [ ] 不再要求通过原生工具排除普通候选内容的本地索引；各已有安全、触发和来源合同保持有效。
- [ ] 更新后的路由回归测试、仓库离线测试和来源/打包检查通过。
- [ ] 源 Skill、界面元数据及固定提交生成包遵守相同的锚点路由策略，与跨组件路由一致；正常物化不再恢复旧触发门。
- [ ] 源提交位于 `main` 并与可用 `origin/main` 一致；记录 SHA 和验证证据，交由 `pennix-skills` 固定来源。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
