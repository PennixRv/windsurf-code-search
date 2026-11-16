# Migration Task: Upgrade to v0.7.2-beta.20

**Created**: 2026-11-16
**From Version**: 0.7.0-beta.54
**To Version**: 0.7.2-beta.20
**Assignee**: penn

## Status

- [x] Review migration guide
- [x] Update custom files
- [x] Run `trellis update --migrate`
- [x] Test workflows

---

## v0.7.1-beta.6 Migration Guide

## 任务目录迁移

先运行 trellis update --migrate 更新脚本与工作流，并审查自定义文件冲突。更新模板不会自动移动任务。随后运行 python3 .trellis/scripts/task.py migrate-layout 预览，确认后运行 python3 .trellis/scripts/task.py migrate-layout --apply。planning、in_progress、cancelled 任务进入同名子目录；completed 任务进入 completed/YYYY-MM，旧 archive 的月份保持不变。task.json.status 是唯一状态事实，迁移不授予历史任务实施权限，也不重写历史正文或交接包。

无效 JSON、重名、未关闭的委派资源、待交接所有权或不安全路径会阻止整个迁移。先处理明确的输入问题，再重新预览。发生中断时运行 python3 .trellis/scripts/task.py migrate-layout --recover，核验后重新预览；不要手工移动目录或删除事务记录。迁移会同步改写机器引用和当前会话指针；若连续性摘要变化，按原生 phase 接纳和 capture 重新核对当前事实。handoff ownership 在 consume 后完成转移，后续普通任务修改不更新交接代次；需要查看现场时使用只读 transfer status --include-current，保留历史交接摘要。

### AI Assistant Instructions

When helping with this migration:

完整检查迁移预览、四种状态及月份分布、任务数量、父子关系和当前会话路径。只修复有证据的历史输入错误，不把 archive 中未完成任务伪造为 completed。使用原生生命周期入口完成或取消任务，不手写运行状态。保护项目配置、历史正文、二进制附件和不可变交接包。迁移后再次预览应为空，并运行 task.py list、current、phase show 和项目检查验证现场。

---

## v0.7.1-beta.14 Migration Guide

Run the native project update to refresh unmodified managed assets. Customized teammate-profiles.json files must be explicitly converted from schema 1 to schema 2: default_profile, profiles.<id>.role, default_configuration, and configurations.<name>.{provider,model,reasoning_effort,options}. Reconstruct schema-1 frozen plans from the current task inputs through teamwork plan; do not hand-edit frozen hashes or reuse uncertain attempts. Existing tasks and handoff history remain intact.

### AI Assistant Instructions

When helping with this migration:

Use the bundled trellis-teamwork Skill and teamwork config to inspect effective defaults. Review customized profile conflicts before replacement. Keep professional role cards as ordinary Trellis Markdown, preserve native provider permissions, and do not substitute interactive run/spawn or Paseo worktree delegation for managed batch execution.

---

## v0.7.2-beta.0 Migration Guide

使用 beta 渠道精确升级到 0.7.2-beta.0，并运行 trellis update。保持用户自定义 spec 和 config；schema-2 项目忽略退休 YAML 容量键，需按实际冲突合并。默认初始化仅提供规范索引、指南和基于源码的 bootstrap；预制规范必须明确指定 --registry。原计划和旧 schema 报告兼容读取；需要本轮冻结配置和重试合同的新批次请通过 plan 构造器生成。保留全部 attempt 报告和 worklog，清理须使用 cleanup-artifacts 的预览摘要。

### AI Assistant Instructions

When helping with this migration:

不要覆盖自定义规范或重开旧终态批次。使用原生 reconcile/retry/cleanup-artifacts/delegate-bind/delegate-reconcile/transfer recover；未知进程保持围栏。CLI 控制 FIFO，主代理静默续接同一等待句柄；Hook 不保证阻止普通模型消息或宿主唤醒。

---

## v0.7.2-beta.1 Migration Guide

Upgrade through the beta channel to 0.7.2-beta.1, then run the native trellis update command. Existing customized project files remain subject to the normal preview and conflict review. Teamwork batches completed under this version now remain pending coordinator review until each report receives an explicit accepted or final_failed disposition; do not treat an AWAITING_REVIEW receipt as final acceptance. Attempt evidence remains until explicit cleanup-artifacts preview and confirmation.

### AI Assistant Instructions

When helping with this migration:

The CLI owns FIFO dispatch, retries, background monitoring, and batch recovery. Teammates submit conclusions and evidence only. After the full batch returns, the main agent reviews each report and records a disposition bound to its digest and frozen acceptance contract. Preserve attempt evidence and use native reconcile, review, retry, and cleanup-artifacts commands. Unknown process identity remains fail closed unless explicitly confirmed through the auditable native reconciliation entry point.

---

## v0.7.2-beta.2 Migration Guide

Upgrade through the beta channel to 0.7.2-beta.2, then run the native trellis update command. Existing customized project files remain subject to the normal preview and conflict review. Teamwork batches remain pending coordinator review until each report receives an explicit accepted or final_failed disposition; attempt evidence remains until explicit cleanup.

### AI Assistant Instructions

When helping with this migration:

The CLI owns FIFO dispatch, retries, background monitoring, and batch recovery. Teammates submit conclusions and evidence only. After the full batch returns, the main agent reviews each report and records a disposition bound to its digest and frozen acceptance contract. Preserve attempt evidence and use native reconcile, review, retry, and cleanup-artifacts commands. Unknown process identity remains fail closed unless explicitly confirmed through the auditable native reconciliation entry point.

---

## v0.7.2-beta.19 Migration Guide

Use native trellis update to refresh generated assets. Task runtime cleanup is preview-first and requires an exact current digest. Teamwork rm now previews by default; pass --confirm with its fresh digest to delete. prune --yes also requires --confirm. create --force no longer wipes nonempty sessions. No private task or handoff history is deleted or migrated automatically. Incomplete process proof and unknown references retain their assets.

### AI Assistant Instructions

When helping with this migration:

Preserve current task and handoff authority. Inspect native previews, accepted evidence, live processes and recovery obligations before proposing exact cleanup objects. Do not infer expiry from age, delete fixed lock anchors, hand-edit runtime state, or use create --force as a cleanup bypass. Obtain explicit approval for actual historical data deletion.
