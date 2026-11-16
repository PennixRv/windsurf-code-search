# Secure Windsurf lifecycle credential ingress

## Goal

Add owner-managed interactive credential configuration and redacted readiness diagnostics for Pennix lifecycle.

## Requirements

- Add an owner-managed configuration file at `$XDG_CONFIG_HOME/windsurf-code-search/config.json`, falling back to `$HOME/.config/windsurf-code-search/config.json`.
- Add `windsurf-code-search configure` with controlling-TTY enforcement, hidden API-key input, explicit `REPLACE` confirmation for an existing file, atomic replacement, and private `0700`/`0600` permissions.
- Add `windsurf-code-search config-doctor`, which performs no network access and emits only stable redacted readiness states.
- Resolve credentials in the fixed order `WINDSURF_API_KEY`, owner config, then the existing bounded Devin helper.
- Reject owner config symlinks, non-regular files, oversized files, non-private modes, invalid JSON, and invalid credential shapes without exposing path contents or credentials.
- Keep `--no-external` before every credential read and preserve existing search behavior and package provenance.

## Acceptance Criteria

- [ ] Owner config is written atomically with `0700` parent and `0600` file permissions.
- [ ] Unsafe, invalid, or oversized owner config is ignored by search and reported by `config-doctor` without secret output.
- [ ] Environment, owner config, and Devin precedence are covered by tests.
- [ ] `configure` is rejected without a controlling TTY and never echoes the entered key.
- [ ] `--no-external` remains credential-free and network-free.
- [ ] `npm test`, `npm run pack:check`, and `npm run verify:provenance` pass.

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
