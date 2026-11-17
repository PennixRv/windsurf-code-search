<!-- TRELLIS:START -->
# Trellis Instructions

Use `trellis-start` for a new session and `trellis-continue` to resume;
reuse already loaded context. Follow `.trellis/workflow.md`.
The Task CLI owns task and phase state.

Before editing, read the applicable `.trellis/spec/` guidelines.
Without hook context, run `python3 ./.trellis/scripts/get_context.py --mode phase`
and, when a task exists, `python3 ./.trellis/scripts/task.py phase show <task>`.

Use the host's available Trellis skills or commands. If unavailable, read
`.trellis/workflow.md` for the native CLI route.

Managed by Trellis. Updates preserve content outside this block.
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
