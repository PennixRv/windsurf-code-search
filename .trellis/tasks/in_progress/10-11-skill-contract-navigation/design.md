# Design

## Scope

修改真实源 SKILL 的 script-contract 执行前导航、结果范围解释、PATH 示例与 D10 Skill 身份，必要 README/UI/直接消费说明同步。新 Skill name 为 pennix-windsurf-code-search；CLI windsurf-code-search、package 与原生 component/config 标识保持原名。不复制协议，不新增凭据/重试/索引能力。package files 已含 SKILL/reference/bin。

## Contract

普通调用使用 `windsurf-code-search --project <明确绝对目录> --query <有界查询>`。调用前读取 references/script-contract.md；只有本地/CodeGraph 无法定位的模糊位置请求才外发。输出 status/coverage 描述限定范围完整性，complete 不证明全仓覆盖或语义正确，候选必须在本地核验。

PATH 安装归 Pennix 现有命令映射和 collection receipt；本仓库不创建链接或切换配置 owner。config-doctor/configure 保留原生安全合同。

## Delivery

原生离线测试和 pack gate 验证后提交推送固定 Git SHA；Pennix 按 npm-pack 规则消费。本轮文档变化不要求 npm registry 更新，也不创建 release/tag；若实现发现必须改变 CLI 或发行行为，停止并返回整体方案决策。
