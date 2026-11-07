# Windsurf owner 凭据单文件生命周期

## 目标（Goal）

关联根 converge-pennix-lifecycle 已批准合同；由 owner 原生 Devin resolver 导入专属文件，保留中央输入兼容和安全归属保护，发布新版。

## 需求（Requirements）

- 新增显式 `credential_mode=owner` 生命周期输入；文件缺失时只允许原生 Devin resolver 导入，秘密仅在 owner 内存与专属文件流转。
- 不改变中央 secrets 既有模式；拒绝环境覆盖、外部文件、漂移、不安全文件及缺失输入。删除继续要求完整归属。
- 关联根任务 `.trellis/tasks/in_progress/11-07-converge-pennix-lifecycle/design.md`，其合同 revision `24db3ff9e7d997bf2ffcdefb7006894006d980df3382e76b5339d42f16d2e00a` 已获用户“批准，现在开始吧”授权，覆盖本 owner 源码、提交、推送和发布。

## 验收标准（Acceptance Criteria）

- [ ] owner 导入及中央模式兼容通过合成凭据离线测试；文件 0600、目录 0700，Devin 原样保留，输出无秘密。
- [ ] 不安全状态阻断、模式切换重验、写入失败恢复及删除保护通过。
- [ ] 完整 npm test、provenance、pack 和发布前检查通过；发布身份可由根任务固定和消费。

## 备注（Notes）

- 让 `prd.md` 聚焦需求、约束和验收标准。
- 轻量任务可以只保留 PRD。
- 复杂任务在 `task.py start` 前增加 `design.md` 记录技术设计，增加 `implement.md` 记录执行计划。

<!-- trellis-decisions:v1 -->
```json
{"schema_version":1,"decisions":[{"id":"owner-file","status":"decided","question":"新增凭据归属与导入来源","evidence":["根合同 WP2；user-approved-implementation-2026-11-07"],"answer_or_reason":"只新增 Windsurf owner 文件，原生 Devin 导入，保留中央兼容。","impact":"lifecycle 输入、receipt、文档、离线回归和发行。","reopen_when":"现有原生 writer/resolver 无法满足安全边界。"}]}
```
