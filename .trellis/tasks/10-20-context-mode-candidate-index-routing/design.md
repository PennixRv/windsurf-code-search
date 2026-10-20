# Design

## Scope

Change the two Context Mode persistence restrictions in the source `SKILL.md` and the existing routing assertion that enforces the old blanket ban. Correct the package provenance inventories required for the already-declared runtime allowlist and the changed Skill hash to pass the existing release check. Keep the current Skill identity, CLI behavior, external search trigger, candidate validation, package interface, and collection materialization contract.

## Contract

Windsurf output remains an unverified candidate. The Skill may pass it to Context Mode for local analysis or indexing while retaining its source and unverified marker. Before using it as a repository fact, verify the current source locally. Indexing does not promote trust or replace source verification.

This does not add a Windsurf-owned persistent search service, database, candidate trust layer, automatic Hook capture, or credential handling. Preserve the current local-search/CodeGraph trigger gate, PathGuard, bounded coverage diagnostics, and private credential protocol.

## Delivery

Run the existing offline Skill-routing, provenance, and package checks. Commit and push the owner source on the existing `main`; update the `pennix-skills` collection only through its declared source pin and native materialization flow. Do not publish an npm version for this documentation-only source change unless the existing owner contract proves it is required.

The provenance correction is limited to recording the existing `scripts/lib/lifecycle.mjs` package member and refreshing hashes for the changed Skill and projection. It does not change the runtime allowlist or runtime code.
