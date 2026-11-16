# Lifecycle 原生 owner 协议

## Goal

实施根任务 `lifecycle-audit-findings-convergence` 已获用户“批准并完整推进到全部完成”的 WP-W。根合同为 `../.trellis/tasks/in_progress/11-09-lifecycle-audit-findings-convergence/implementation-contract.md`，授权为同目录 `implementation-approval.md`。本组件作用域已包含在展示并批准的整体方案中。

## Requirements

- 扩展现有 lifecycle validate、protocol_version、operation_id 和可信 effect，不修改搜索协议。
- validate 复用凭据格式、owner 模式和归属检查，无写入/网络，不回显秘密。
- 取消选择仅撤回自有未漂移凭据及 receipt，保留中央秘密、Devin 登录与外部文件。
- 完成离线测试、provenance/包检查及原生正式发布，供 pennix-skills 从精确运行包更新投影。

## Acceptance Criteria

- 两种凭据模式、缺失、漂移、外部文件、无写入预检、结构化拒绝及未知结果均有隔离回归。
- 原生 test、verify:provenance、pack:check 通过；不可变 tag 绑定载荷/证据，公开精确包与预期一致。
- 根侧 Lifecycle 安装来源及实际运行身份核验完成，Git 和任务记录收尾。

<!-- trellis-decisions:v1 -->
```json
{"schema_version":1,"decisions":[]}
```
