# Complete Windsurf Code Search identity migration

## Goal

Complete the active identity migration from `fast-context-skill` to
`windsurf-code-search` without changing the query protocol or external search
semantics.

## Requirements

- Rename the GitHub fork, source remote, npm package metadata, published CLI,
  active script path, current README and current Skill instructions.
- Provide one executable `bin/windsurf-code-search` launcher for direct Skill
  installations as well as npm installations. It is a Node launcher, not a
  compiled native binary or a compatibility alias.
- Preserve query arguments, output and `FC_*` diagnostics. `FastContextError`,
  upstream license file names and historical release attestations remain where
  they describe implementation or past published artifacts.
- Update the parent `pennix-skills` submodule URL and the user-level static
  assets after the component commit is pushed.
- Do not add aliases, a compatibility wrapper, a new search provider, a
  permissions model or a publication step not required by an existing consumer.

## Acceptance Criteria

- [ ] Active repository and remote use `PennixRv/windsurf-code-search`.
- [ ] Package metadata, CLI and current documentation use
  `windsurf-code-search`; source and packaged CLI tests pass with unchanged
  search behavior.
- [ ] The installed Skill and npm package both expose executable
  `windsurf-code-search` commands that delegate to the same CLI implementation.
- [ ] Old terms occur only in implementation identifiers, upstream provenance,
  or immutable historical release records.
- [ ] The parent submodule and installed `/home/penn/.codex` collection point
  to the pushed component commit and expose the renamed Skill.

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
