# Rename the user-facing semantic code search Skill

## Goal

Prevent confusion between the Windsurf semantic code-search Skill and the
`fastctx` local operation runtime by giving the discoverable Skill a distinct
name.

## Requirements

- Rename the Skill frontmatter name and display name to `windsurf-code-search`.
- Preserve the existing search behavior, CLI, npm package identity, source
  provenance, and release contract.
- Keep `fast-context` only where it is an implementation, package, upstream, or
  historical identifier that would otherwise be changed outside this task.

## Acceptance Criteria

- [ ] `SKILL.md` and `agents/openai.yaml` expose `windsurf-code-search`.
- [ ] The routing test checks the renamed user-facing wording.
- [ ] The complete component test suite passes.
- [ ] The component repository remains clean after commit and push.

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
