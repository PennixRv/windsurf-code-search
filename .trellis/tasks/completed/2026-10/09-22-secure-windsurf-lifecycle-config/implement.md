# Implementation Plan

1. Extend `credentials.mjs` with the owner path, safe reader, redacted status,
   and atomic private writer.
2. Extend the CLI command boundary with `configure` and `config-doctor`, keeping
   search argument compatibility and the existing no-external short circuit.
3. Add focused tests for precedence, file safety, redacted doctor output, TTY
   rejection, and no-external behavior.
4. Update README, SKILL, security spec, package version, and release evidence.
5. Run tests, package/provenance checks, commit and push `main`, then point the
   Pennix catalog at the verified commit.

## Verification

```bash
npm test
npm run pack:check
npm run verify:provenance
```
