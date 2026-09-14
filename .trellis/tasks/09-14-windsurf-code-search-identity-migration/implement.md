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
