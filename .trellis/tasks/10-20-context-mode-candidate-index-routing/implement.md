# Implementation Plan

1. Re-read `SKILL.md`, `test/skill-routing.test.mjs`, `package.json`, the CLI security spec, and the provenance inputs; confirm the exact package/provenance checks and the current `main`/`origin/main` candidate SHA.
2. Merge the approved anchor-based trigger and Context Mode transport/verification boundaries into source `SKILL.md` and its existing `agents/openai.yaml` projection. Preserve candidate source/unverified markers, external permissions, PathGuard, coverage and credential ownership; do not modify runtime code.
3. Replace the existing frozen-prose routing assertion with meaningful static source/projection integrity checks; review routing semantics against the PRD and the existing cross-component routing Skill. Do not claim static tests prove model routing behavior or add a duplicate suite.
4. Verify the provenance inventory includes the already-allowlisted `scripts/lib/lifecycle.mjs` and current hashes for the changed Skill and projection. Repair only a proven mismatch; do not change package contents or runtime code.
5. Run the repository checks under its CI-pinned Node.js `26.5.1`: `npm test`, `npm run verify:provenance`, and `npm run pack:check`; inspect the resulting package whitelist/source bytes. If the local default Node.js differs, record that result separately and use the pinned-runtime result for this task's acceptance.
6. If a task-scoped source diff remains after verification, commit it on `main` and fast-forward push; otherwise record that current local `main` and `origin/main` already point to the verified candidate SHA. Hand the exact SHA and verification evidence to the `pennix-skills` collection task.
7. After root lifecycle materialization and fresh-session integration acceptance, record the consumer evidence and use this repository's native Trellis archive/finish flow.

No real remote search or credentials are needed for the source and offline verification. Do not alter installed assets or consumer snapshots from this repository.
