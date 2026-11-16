<!-- TRELLIS:START -->
# Trellis Instructions

These instructions are for AI assistants working in this project.

For a new session use `trellis-start`; for existing work use `trellis-continue`
and resume the known unfinished action. Read `.trellis/workflow.md` for the
native route and ownership rules. Task CLI owns task and phase state; specs
describe engineering conventions, not implementation authorization.

Without hook context, run `python3 ./.trellis/scripts/get_context.py --mode phase`
and `python3 ./.trellis/scripts/task.py phase show <task>`, then explicitly read
the applicable spec indexes and their referenced guidelines.

This project is managed by Trellis. The working knowledge you need lives under `.trellis/`:

- `.trellis/workflow.md` — development phases, when to create tasks, skill routing
- `.trellis/spec/` — package- and layer-scoped coding guidelines (read before writing code in a given layer)
- `.trellis/workspace/` — per-developer journals and session traces
- `.trellis/tasks/` — task records and their planning, implementation, and review artifacts

If a Trellis command is available on your platform (e.g. `/trellis:finish-work`, `/trellis:continue`), prefer it over manual steps. Not every platform exposes every command.

Project-scoped helpers use these native owners:
- `.agents/skills/` — reusable Trellis methods
- `.trellis/agents/` — Teamwork role cards and Paseo node methods

The main session owns task decisions and integration. Collaboration uses
`trellis teamwork` or `paseo-based-parallelism` under the authorized contract.

Managed by Trellis. Edits outside this block are preserved; edits inside may be overwritten by a future `trellis update`.

<!-- TRELLIS:END -->

## Project Execution Policy

- Keep Codex inline delivery: the main session implements the reviewed scope,
  verifies the full affected scope against the task and applicable specs, and
  performs Git operations.
- Trellis Teamwork teammates provide explicitly briefed read-only evidence;
  the coordinator verifies and integrates their findings. Do not dispatch
  automatic implementation or check workers in this project.
- Preserve the required offline test matrix. A required check that cannot run,
  is skipped, or exits non-zero is blocked or failed, never passed.
