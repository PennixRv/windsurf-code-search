# Adopt Trellis beta.26 worker-terminal guidance

## Goal

Update only native Trellis generated assets to beta.26; preserve the selected workflow and project customizations, verify new bundled worker wait guidance and archive the consumer task.

## Requirements

- Root coordinator 10-02-trellis-subnode-terminal-wait authorizes a bounded native asset update on this consumer main.
- Preserve the existing workflow/provenance, customized hook/config/agent files, intentional deletions and unrelated worktree changes. No component product code or runtime edits.
- Closed lightweight PRD seal: native dry-run, create-new preview, then skip-all for modified files; accept only the updated bundled Channel references and native version/receipt. Verify worker selector, version and scoped byte receipts; commit/archive/journal/push this owner's records.

## Acceptance Criteria

- [x] Native beta.26 assets and updated worker wait guidance are verified with existing customizations preserved.
- [x] Generated assets and task records are committed, task archived and owner main pushed.

## Notes

- User authorization covers full update; root remains main. No product release is needed for this consumer-only adoption.
