# Retire obsolete Skill guidance reference

User authorized by root task `10-04-cognee-memory-base-removal` on 2026-10-04.
Remove only the retired product name from source `SKILL.md`; deliver a source
commit and package snapshot to Pennix's materialized collection. Fixed branch
main. No CLI behavior or provider/credential changes; no new service. Preserve
the existing unrelated AGENTS.md modification and all historical records.

Acceptance: source Skill matches the pinned package snapshot; applicable
offline tests, provenance and package checks pass; source commit is pushed;
native project update preserves project policy. No CLI npm release is needed
for this guidance-only source snapshot. Root acceptance records final consumers.

## Goal

Remove retired product reference from the source Skill and deliver a pinned package snapshot to the approved root retirement task.

## Requirements

- Remove obsolete product reference from Skill guidance; preserve candidate validation.
- Update the changed Skill's existing word assertion and source digest record.
- Deliver a source-pinned npm-pack snapshot without publishing a CLI behavior change.

## Acceptance Criteria

- [x] Source instruction and package provenance agree; offline 114/114 tests pass.
- [x] Provenance covers 18 files; exact package-content check passes.
- [x] Source commit `9409047e167873ab7de49cb45884cc5dd4907321` is pushed and the Pennix snapshot is pinned.
- [x] Native project refresh preserves unrelated policy; the existing `AGENTS.md` change remains untouched.

## Validation

The existing word assertion and provenance initially failed on the modified
Skill; both were updated in the source owner. `npm test`,
`npm run verify:provenance`, `npm run pack:check` then passed. No live network
search or credential access was required. All tests ran without skips.

The official 18-file consumer snapshot is pinned to the source commit above with
SHA-256 `ca41841e856d5880f154df8623be37b75bebefd67f7b1220dff3048d40b333bd`;
the 114 offline tests and exact package check pass. The Trellis beta.29 native
project update is verified. This repository's pre-existing `AGENTS.md` worktree
change is preserved and excluded from the retirement commit.
