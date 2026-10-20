# Implementation Plan

1. Re-read `SKILL.md`, `test/skill-routing.test.mjs`, `package.json`, and the CLI security spec; confirm the exact package/provenance checks. The existing provenance gate currently rejects the manifest because its path inventory omits an already-allowlisted `scripts/lib/lifecycle.mjs`.
2. Replace the blanket persistent-index restrictions with source-tagged, unverified local candidate processing/indexing and source-before-fact verification.
3. Update the existing routing assertion to cover the new contract without adding a duplicate test suite or freezing unrelated prose.
4. Synchronize the source provenance inventory with the existing package allowlist and refresh its changed-file hashes; do not change package contents or runtime code.
5. Run `npm test`, `npm run verify:provenance`, and `npm run pack:check`; inspect the resulting package whitelist/source bytes.
6. Commit and push `main`, record the exact source SHA, and hand the pin to the `pennix-skills` collection task.
7. After root lifecycle materialization and fresh-session integration acceptance, record the consumer evidence and use this repository's native Trellis archive/finish flow.

No real remote search or credentials are needed for the source and offline verification. Do not alter installed assets or consumer snapshots from this repository.
