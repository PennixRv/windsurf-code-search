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

`v0.1.8` through `v0.1.13` were tagged but rejected before publication by the
tag-validation job. The first had generic output; the second identified that
checkout had materialized the annotated tag as a commit, and `v0.1.10` fixed
that before reaching evidence validation. `v0.1.11` exposed a cross-runner
compressed-tarball byte mismatch; `v0.1.12` confirmed it persists with the CI
npm version, so it is not a legitimate source-integrity condition. All failed
tags remain as evidence. `v0.1.13` removes only that redundant cross-runner
diagnostic gate while retaining tag/evidence, tracked-artifact hash, offline
install, and registry verification. Its CI test exposed an empty-`PATH` fixture
that cannot execute a portable `/usr/bin/env node` launcher. `v0.1.14` retains
the portable launcher and gives that fixture the runtime `PATH`; it is the only
candidate for publication.
