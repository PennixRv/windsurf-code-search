# 实施与交付

1. 核对 lifecycle、credentials 和 CLI 调用方及测试隔离。
2. 完成只读 validate 和协议结果，增加两模式拒绝/成功/未知回归，保留现有 CAS 与恢复。
3. 执行原生离线 test/provenance/pack 门禁，按允许列表与固定工具链准备发布产物。
4. 原生 source/evidence/tag/CI 发布并核验精确公开 tarball 和 provenance；不移动 tag、不重发同版本。
5. 由集合 owner 刷新该精确包投影，根侧安装验收后 Git/任务归档。

停止点为正式发布、根侧本机部署验收及 Git 收尾完成；门禁、归属、未知副作用或发布身份失败停止依赖动作，保留恢复入口。搜索功能与真实远端服务不扩展。

<!-- trellis-implementation-plan:v1 -->
```json
{"schema_version":1,"steps":[{"id":"owner","target":{"repository":"windsurf-code-search","branch":"main","component_or_path":"scripts/lib/lifecycle.mjs"},"depends_on":[],"action":"实现已批准协议，离线核验后按不可变tag流程发布","deliverables":"源码、测试、精确公开运行包与provenance","verification":"npm test、verify:provenance、pack:check与发布载荷核验","risks":"凭据外泄、归属或并发未知均停止","rollback":"保留原生CAS和前值恢复，不移动tag或重发同版本"}],"stop_point":{"condition":"正式发布、根本机验收及Git收尾完成","observable_evidence":"精确公开包、集合投影、本机身份对应，Git干净","remaining_work":"真实双平台新机和未实测外部服务按根D08保留"}}
```
