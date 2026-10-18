# Context Mode 载体与候选边界

## Goal

落实已批准整包中的本仓库 Skill 与必要合同测试；保留未核验候选禁止持久化。根任务 10-18-context-mode-fastctx-replacement。

## Requirements

- 仅更新 Skill 的活动组件名称及执行载体边界，保留外部候选禁止持久化。
- 搜索与凭据操作走宿主直接入口，不进入 Context Mode 自动索引或 Hook 正文采集。
- 不修改 CLI、README 或前序任务中的既有差异。

## Acceptance Criteria

- [x] Skill 路由测试通过，生产代码与既有未提交差异保持原样。

## 验收结果

- 根仓库 full-local 集成门禁在目录清洁、提交固定为 catalog pin `377d8489cbad7bcc2c14930edb875d87bb5e3ebd` 的独立 worktree 中通过：15 项通过、0 项失败或阻塞；其中包含本仓库 `npm test`。
- 主工作树上的其他未提交文件未被本任务修改。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
