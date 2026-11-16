# Design

## Ownership

The Windsurf package owns credential parsing and its owner configuration file.
Pennix lifecycle only invokes `configure` or `config-doctor`; it does not parse,
copy, or print Windsurf secrets.

## File contract

The file is JSON with exactly one supported secret field:

```json
{"apiKey":"<credential>"}
```

The path is `$XDG_CONFIG_HOME/windsurf-code-search/config.json`, or
`$HOME/.config/windsurf-code-search/config.json` when XDG is unset. Reads use
`lstat` plus `O_NOFOLLOW`, require a regular file no larger than 16 KiB with no
group/other permission bits, and reject malformed JSON or a missing/non-string
`apiKey`.

## Command contract

`configure` is interactive only. It reads the endpoint-free API key from the
controlling terminal, hides input, requires `REPLACE` before rotating an
existing file, and writes through a private temporary file followed by rename.
It emits only `ok configured` on success.

`config-doctor` is local and non-interactive. It emits
`status=<configured|missing|invalid|blocked|unavailable>` and never emits the
path, JSON, or credential. A non-configured state exits 1.

## Resolution

Search keeps the current explicit environment behavior, then reads a valid
owner file, then invokes the existing Linux-only Devin helper. An invalid or
unsafe owner file does not make search fail closed when a lower-priority Devin
credential is available; `config-doctor` remains the diagnostic for repair.

`--no-external` exits before resolver invocation, so no environment, owner
file, Devin helper, or remote core is touched.
