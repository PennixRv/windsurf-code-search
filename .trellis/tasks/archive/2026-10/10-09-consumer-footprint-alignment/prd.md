# Align project workflow assets to beta.41

## Goal

Native non-destructive project update to beta.41 preserving inline custom assets, validate provenance and remove accepted retired backups.

## Requirements

- Native beta.41 project update preserving inline custom hooks/config and intentionally removed auto-agents; no Windsurf runtime change.
- Authorized by the user's explicit full reconciliation request; root plan: /home/penn/devel/codex-workflow-optimization/.trellis/tasks/10-09-workflow-footprint-reconciliation.

## Acceptance Criteria

- [x] Dry-run/provenance pass, project-only changes committed/pushed, accepted candidates and retired backups removed; materialized Skill unchanged.

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
