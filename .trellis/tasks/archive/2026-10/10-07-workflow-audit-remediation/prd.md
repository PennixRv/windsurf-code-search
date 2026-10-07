# 工作流审查统一修复：组件验收与落点收尾

## Goal

关联根10-07-workflow-audit-remediation；记录已提交源基线和项目模板更新并独立验收当前组件；本owner任务在最终对账时补建，不声称之前提交已有该任务或重新授予源码实施权。

## Requirements

- 仅核验当前已提交Windsurf源码、public/owner provenance和pack合同，不修改生产代码或凭据。
- 记录root批准的项目模板更新；不将静态供应链合同冒充真实provider运行验证。

## Acceptance Criteria

- [ ] npm tests、provenance和pack检查通过。
- [ ] 项目Trellis更新及workflow verify通过，保留用户定制，任务证据提交并归档。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
