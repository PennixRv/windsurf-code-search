# Owner 单文件输入设计

沿根已批准合同 WP2 执行；修改目标为本仓 main，基线 `7bae3be428573bcca7f05d3aeb14ee81d1552e5c`。复用 credentials.mjs 的私有文件检查、原子 writer 和 readDevinCredential，不引入依赖或第二个凭据文件。

`lifecycle inspect/configure --json` 可传 `credential_mode=owner`。inspect 在缺文件时仅投影 Devin 是否可导入；configure 才写 owner 文件与 receipt。环境覆盖先阻断；有文件只接受相同模式的完整 receipt，模式切换须在既有归属完好时重新绑定，不覆盖文件。默认中央模式保留旧 schema 2 行为。receipt 模式字段不能授予外部文件归属；任何漂移不自动覆盖。秘密不写 argv、日志或任务资产。

变更抵达 lifecycle、credentials 安全检查、CLI 文档、测试和包版本；Pennix 调用方由关联 lifecycle 任务实施。安全与失败恢复先做离线合成测试，再完整矩阵、源提交 C、证据子提交 E、tag 和 Actions 发布。基线变化、发布失败或副作用未知时停止关联后续步骤；不移动已推送 tag。

规划审查：目标、同源输入、调用兼容、验证、版本、恢复与停止点均由根合同覆盖，无新增用户取舍。源代码回滚采用新提交；凭据配置由 owner 原子恢复，不修改 Devin。真实主机配置由根任务在发布安装后执行。
