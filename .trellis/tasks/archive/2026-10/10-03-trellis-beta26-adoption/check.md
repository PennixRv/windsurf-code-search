# beta.26 consumer check

2026-10-03. Consumer update is running under the sealed task, with workflow preservation as the protected boundary.

- `trellis --version`: beta.26.
- `trellis update --dry-run` identifies exactly three safe bundled Channel reference updates. It classifies `.trellis/agents/implement.md`, `.trellis/agents/check.md`, `.trellis/workflow.md`, `.codex/hooks.json`, and `.codex/config.toml` as user-modified; five Codex agent/hook files are intentionally deleted and preserved.
- No workflow provenance exists. `trellis workflow --verify` reports missing provenance, so workflow origin/ref remains unverifiable; task does not infer or select a replacement. The existing workflow is included among modified files and will be retained by the sealed `--skip-all`.
- `trellis update --create-new` refreshed only the three safe Channel references and generated five non-identical bundled candidates: `.trellis/agents/implement.md.new`, `.trellis/agents/check.md.new`, `.trellis/workflow.md.new`, `.codex/hooks.json.new`, `.codex/config.toml.new`. Each is explicitly rejected because replacing the active user customization is outside the task; after recording this disposition, remove only these five newly generated sidecars. Preserve originals and intentional deletions.
- The exact generated sidecars were removed after rejection was recorded. Native `trellis update --skip-all` reported all five conflicts skipped and preserved the active project files/deletions. The three updated Channel references and native receipts were committed and pushed to owner main as `1a5b3ed`.

Final version/hash receipt and task archive/journal push are recorded by the archived task.
