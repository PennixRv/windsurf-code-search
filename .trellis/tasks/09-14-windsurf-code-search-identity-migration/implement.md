# Implementation

1. Inventory active and historical identifiers plus npm registry usage.
2. Rename the GitHub fork and update the local remote.
3. Rename the active package, CLI source and references; add one launcher that
   delegates to the renamed CLI, then update tests that exercise both entry
   points without changing query behavior.
4. Run component checks and commit/push the component.
5. Update the parent submodule URL/gitlink, reinstall the collection, verify
   the installed Skill, then record the component and deployment evidence in
   the root integration task.

## Release Note

`v0.1.8` through `v0.1.11` were tagged but rejected before publication by the
tag-validation job. The first had generic output; the second identified that
checkout had materialized the annotated tag as a commit, and `v0.1.10` fixed
that before reaching evidence validation. `v0.1.11` exposed the remaining
tarball mismatch: artifacts had been generated with local npm `12.0.2` while
CI uses `12.0.1`. All immutable failed tags remain as evidence. `v0.1.12`
requires the CI npm version before creating or preflighting release artifacts;
it is the only candidate for publication.
