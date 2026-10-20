# 允许来源标记候选进入 Context Mode 本地索引

## Goal

根据根任务 10-20-context-mode-routing-alignment 的已批准完整方案，修正 Windsurf Skill 对 Context Mode 本地处理和索引的过宽限制及其回归断言。

## Requirements

- 修改真实源 `SKILL.md` 中禁止持久化集成和禁止 Context Mode 索引候选的两处过宽规则，允许 Context Mode 对 Windsurf 候选进行本地处理和持久索引。
- 候选必须保留来源及“未核验”状态；将内容作为事实使用前，回到当前项目源码核对。索引、搜索命中和摘要不代表候选已验证。
- 保留 Windsurf Code Search 的触发门槛、本地检索与 CodeGraph 顺序、PathGuard、本地覆盖/诊断及凭据 owner 合同。
- 更新现有 `test/skill-routing.test.mjs` 中与旧禁令冲突的断言；不新增搜索服务、候选数据库、信任层、自动 Hook 采集、凭据路径或运行时行为。
- 在本仓库现有 `main` 完成源和测试；由 `pennix-skills` 按 `collection.json` 固定此来源并物化，不直接编辑消费者快照。

## Acceptance Criteria

- [ ] Skill 允许候选进入 Context Mode 本地处理/索引，并明确来源、未核验状态和使用前源码核验。
- [ ] 不再要求通过原生工具排除普通候选内容的本地索引；各已有安全、触发和来源合同保持有效。
- [ ] 更新后的路由回归测试、仓库离线测试和来源/打包检查通过。
- [ ] 源提交位于 `main` 并与可用 `origin/main` 一致；记录 SHA 和验证证据，交由 `pennix-skills` 固定来源。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
