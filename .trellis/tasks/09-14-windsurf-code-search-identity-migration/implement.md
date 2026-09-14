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

`v0.1.8` and `v0.1.9` were tagged but rejected before publication by the
tag-validation job. The former had generic output; the latter identified that
checkout had materialized the annotated tag as a commit. Both immutable failed
tags remain as evidence. `v0.1.10` explicitly passes `github.ref_name` and
force-fetches the exact tag object before validation; it is the only candidate
for publication.
