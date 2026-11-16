# Adopt Trellis beta.25 recovery assets

## Goal

Consume published Trellis beta.25 generated assets, preserve custom inline/Channel workflow and provider settings, and verify unbound recovery guidance.

## Requirements

- Consume published Trellis beta.25 only through the installed native CLI.
- Preserve every project-modified managed file, intentional platform deletion,
  custom workflow, and unrelated existing change.
- Review recovery workflow changes separately: FastCtx retains the
  codex-subnode-channel template from Marketplace commit
  1e0af97b9148ba8104f28577349af41c0b41868c; CCH/Windsurf retain their local
  workflow and receive only missing recovery breadcrumbs.
- Validate final script bytes, continue guidance, native receipt/version, and
  selected workflow provenance where the project has one.

## Acceptance Criteria

- [x] Native update consumes beta.25 and the two recovery scripts match the
  released template.
- [x] Recovery guidance distinguishes usable identity from missing task binding.
- [x] Project customizations and pre-existing unrelated changes are preserved.
- [x] The reviewed asset diff and acceptance record are committed and pushed.

## Notes

- User authorized this consumer update as part of Issue 181. Bounded adoption
  is PRD-only, inline, on the existing main branch; archive uses the explicit
  non-PR branch-validation exception. Native skip-all preserves all modified
  files. No source fix or new dependency is included.

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
