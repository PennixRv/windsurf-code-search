# Context Mode 载体与候选边界

## Goal

落实已批准整包中的本仓库 Skill 与必要合同测试；保留未核验候选禁止持久化。根任务 10-18-context-mode-fastctx-replacement。

## Requirements

- 仅更新 Skill 的活动组件名称及执行载体边界，保留外部候选禁止持久化。
- 搜索与凭据操作走宿主直接入口，不进入 Context Mode 自动索引或 Hook 正文采集。
- 不修改 CLI、README 或前序任务中的既有差异。

## Acceptance Criteria

- [ ] Skill 路由测试通过，生产代码与既有未提交差异保持原样。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
