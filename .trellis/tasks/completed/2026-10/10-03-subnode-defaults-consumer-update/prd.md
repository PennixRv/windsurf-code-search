# Adopt published Trellis subnode defaults

## Goal and authorization

The user authorized commit, release and full adoption on 2026-10-03. This owner task applies published Trellis 0.7.0-beta.24 assets to `/home/penn/devel/windsurf-code-search`; root coordination remains in subnode-provider-config-diagnosis.

## Requirements

- Use installed native Trellis dry-run and create-new update paths; review each candidate before accepting or retaining a customization.
- Preserve the existing project-specific native workflow and its main-session execution constraints.
- Adopt the eight shipped Sol/Luna profiles without default code_path; keep support for arbitrary project profile IDs.
- Preserve project specs, task/workspace state, private config and unrelated work. Do not change production component code or upgrade other components.

## Acceptance Criteria

- [x] Native project version is beta.24; template/hashes and generated profile bytes are verified against the published package.
- [x] Intended workflow selection and existing execution constraints are verified; each update candidate has a recorded disposition.
- [x] Scoped changes and publication state are recorded without swallowing pre-existing edits.

## Validation and recovery

Run native dry-run before/after, check the profile payload and git diff, and record retained project customizations. Git-tracked prior bytes and native candidates provide rollback; avoid directory-wide force or hand-edited hashes/provenance. Keep this lightweight task PRD-only until a material contract decision requires a replan.
