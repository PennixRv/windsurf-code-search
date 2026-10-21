# Design

## Scope

Verify the two Context Mode persistence rules and merge the previously approved anchor-based routing strategy into source `SKILL.md`, `agents/openai.yaml`, the existing routing checks, and package provenance. Commit `c6f9ef0` already permits local candidate indexing, but normal collection materialization proved that the source still requires unsuccessful local and CodeGraph searches while the consumer snapshot contains the approved direct no-anchor route. Fix that source gap before regenerating the collection. Keep Skill identity, CLI behavior, candidate validation, package interface, external permission boundaries and collection materialization contract.

## Contract

Windsurf output remains an unverified candidate. The Skill may pass it to Context Mode for local analysis or indexing while retaining its source and unverified marker. Before using it as a repository fact, verify the current source locally. Indexing does not promote trust or replace source verification.

Route by useful code anchors: exact paths/literals/configuration use local text; symbols and structural relationships use available CodeGraph; a clear semantic location request without a useful anchor may directly use Windsurf within existing external permissions. Clarify an unclear meaning, owner or scope before searching. Context Mode executes the real noninteractive CLI and supports current-source verification; it does not choose providers or own credentials. An unavailable graph does not authorize external structural analysis. Preserve PathGuard, bounded coverage diagnostics and the private credential protocol; add no persistent service, database, trust layer, automatic Hook capture or runtime behavior.

Replace frozen Chinese sentence assertions with source/projection integrity checks for stable tool names, implicit invocation policy and resolvable referenced resources. These checks verify static consistency only; source review and root host acceptance cover routing meaning. Update only hashes for changed packaged files in the existing provenance inventory, without widening its allowlist.

## Delivery

Run the existing offline Skill-routing, provenance, and package checks under the repository's CI-pinned Node.js `26.5.1`. Commit and fast-forward push only any remaining task-scoped source diff on the existing `main`; if the verified candidate commit is already equal to `origin/main`, record that evidence without creating a duplicate commit. Update the `pennix-skills` collection only through its declared source pin and native materialization flow. Do not publish an npm version for this documentation-only source change unless the existing owner contract proves it is required.

The provenance check is limited to confirming the existing `scripts/lib/lifecycle.mjs` package member and hashes for the changed Skill and projection. Repair only a verified mismatch; do not change the runtime allowlist or runtime code.
