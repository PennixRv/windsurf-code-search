# 更新已发布 Trellis 交互资产

## Goal

消费根任务10-06-codex-interaction-continuation-routing的Trellis beta.32及已选工作流，保留源码、配置、任务和历史并完成原生更新验收

## Requirements

- Lightweight consumer operation under the sealed root coordination task 10-06-codex-interaction-continuation-routing; existing user continuous implementation/publication authorization applies.
- Existing main branch only. Native Trellis beta.32 safe generated-asset update, then refresh the same selected workflow from its published source. Preserve source/config/spec/tasks/history and native ownership checks.
- No application source, dependency, runtime, model or service changes. Native update/provenance verification is the immediate acceptance path.

## Acceptance Criteria

- [x] Native update dry-run/apply and selected workflow verify pass, with no unreviewed conflict or sidecar.
- [x] New start/continue guidance and grill callers present; retired active caller absent outside historical records.
- [x] Scoped generated assets/task evidence committed and pushed; task archived natively.

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
