# Design

## Ownership

This repository owns its public package, executable and documentation.
`pennix-skills` only pins and installs the repository as a submodule. The
workflow router decides when to call the Skill; no routing policy moves here.

## Rename Boundary

Rename the active package name, executable command and CLI source file together
so `npm pack` projects one consistent identity. Keep `FC_*` error codes and
`FastContextError` as internal protocol identifiers because changing them would
alter the public diagnostic contract. Preserve past release attestations and
upstream source/license names as historical facts.

`bin/windsurf-code-search` invokes the renamed Node CLI source without copying
its parser or search lifecycle. `package.json#bin` points to that launcher, so
npm and the directly installed Skill share the same command and implementation.

## Verification

Run the existing component test suite, package-content tests and help command.
Confirm the parent submodule uses the renamed remote, then use the parent
installer to verify the installed Skill. Do not publish a new npm version unless
the registry check shows the package is an active installation dependency.
