# 方案

修改 `scripts/lib/lifecycle.mjs`、CLI 生命周期分派及原生 owner 测试；复用 credentials.mjs 的本地格式和路径检查，必要时导出窄只读校验。validate 和 configure 使用同一预检；旧运行调用保留。执行前拒绝可报 none，写入阶段异常默认 unknown；已恢复必须重新核验。外部搜索、远端请求和协议预算不变。

范围内还更新对应运行包 provenance 及必要 spec/README；不手改 pennix-skills 投影，不改用户真实凭据，不发 Windsurf 请求。原生不可变 tag/attestation 发布流程保持。复核重点为零副作用预检、秘密脱敏、并发保护及回执绑定，无额外用户取舍。
