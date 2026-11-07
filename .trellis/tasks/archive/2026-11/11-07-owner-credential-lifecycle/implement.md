# 有序实施与停止点

<!-- trellis-implementation-plan:v1 -->
```json
{"schema_version":1,"steps":[{"id":"owner","target":{"repository":"windsurf-code-search","branch":"main","component_or_path":"scripts/lib/lifecycle.mjs"},"depends_on":[],"action":"实现显式 owner 模式、原生 Devin 导入及安全拒绝，保持中央兼容。","deliverables":"源码、文档、合成测试。","verification":"完整 npm test、verify:provenance、pack:check。","risks":"凭据归属错误或输出泄密。","rollback":"仅原子恢复本次写入；源码以新提交回退，不动 Devin。"},{"id":"release","target":{"repository":"windsurf-code-search","branch":"main","component_or_path":"package.json; docs/releases"},"depends_on":["owner"],"action":"分配未占用 patch，按 C/E/tag 合同发布并核对精确 tarball。","deliverables":"源提交、证据、不可变 tag、公开发行包。","verification":"release:preflight、tag/evidence 校验、公开 tarball 摘要。","risks":"不可变 tag 或 registry 发布失败。","rollback":"保留失败证据，停止消费，不移动 tag、不重复发布。"}],"stop_point":{"condition":"源码与发行包身份验证通过并交给根任务消费，原生任务收尾。","observable_evidence":"测试、源提交、证据提交、tag 和 tarball digest。","remaining_work":"根任务负责集合物化、本机安装与真实搜索验收。"}}
```
