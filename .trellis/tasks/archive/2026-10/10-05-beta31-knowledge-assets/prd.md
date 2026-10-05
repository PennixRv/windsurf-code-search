# 刷新beta31知识来源职责资产

## Goal

承接根10-05-siyuan-knowledge-workflow-design明确实施授权；只通过原生Trellis刷新共同session-insight资产和匹配provenance，保留项目定制；不改产品运行代码。

## Requirements

- 使用已发布配对 CLI/core 0.7.0-beta.31 的原生 update；只更新共同 session-insight Skill/触发参考和受管版本/hash。
- native workflow 正文候选与现场一致时通过原生 workflow 刷新 provenance；custom workflow 保留已选来源。
- 项目配置、Hook、agents 的已审阅定制采用 skip-all 保留；不覆盖未归属本任务的既有变更。
- 由主会话直接检查、提交并推送 main；不派发实现或检查子节点。根任务已授权本阶段实施。

## Acceptance Criteria

- [x] 原生 provenance 验证通过，dry-run 无待更新共同 Skill。
- [x] 两份共同文档与 beta31 source 模板逐字节一致；本任务差异仅包含生成资产、受管元数据和任务记录。
- [x] diff --check 通过；按精确路径提交推送，不改变产品代码和私有配置。

## 验证与边界

2026-10-05：原生 CLI/core beta31 已发布安装。本项目的 session-insight 两份文档与源码模板逐字节比较通过，原生 workflow --verify 通过。update --dry-run 中没有待更新的共同 Skill；CCH/Windsurf 的 agents、Hook 和 config 定制候选已经审阅并通过 skip-all 保留，因此四项定制候选持续出现是预期结果，不等于更新失败。FastCtx 保留 custom workflow，dry-run 已为最新。

生成资产更新由根侧已批准的多落点实施推进，本地轻量任务补充独立 owner/验收记录。Git 只提交本任务精确路径；产品代码、既有未归属变更不混入本任务。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
