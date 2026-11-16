# W05 实施合同

沿根已批准prd及approval.md，保留inline主控、只读teammates和完整离线矩阵。Trellis当前CLI已受测到0.7.2-beta.20；先preview，再create-new安全部分、原生layout迁移与精确候选审阅。AGENTS手工正文仅替换退役协作名，生成块不手改。保留原生拒删的修改过旧角色，通用入口受当前共同只读合同约束。

原生候选.codex/hooks.json增加clear／compact spec和Teamwork等待保护，均引用现存脚本；.codex/config.toml保持项目inline含义并写现行agents.enabled=false。config.yaml先取得原生.new比较，仅接受可证明的模板／退役项整理，未知自定义保留；不手改模板hash。消费者包使用正式build-package，不旁路source manifest，比较runtime allowlist、脚本／开发依赖缺席和现有发行。必要原生测试通过后提交推送；必要失败停止依赖发布，不补造真实模型证据。

## 验收覆盖

| 接受条件 | 工作包 | Owner | 验证入口 | 交付证据 | 停止条件 |
| --- | --- | --- | --- | --- | --- |
| 项目现行资产与只读角色 | W05 | Trellis／本项目 | 原生preview／update／layout、引用核验 | 自定义／历史保留、现行Teamwork | 未知覆盖、旧写角色可达 |
| 正式消费者投影 | W05 | Windsurf／集合 | build-package、pack:check | runtime allowlist及无维护者字段 | 原始npm pack旁路 |
| 运行语义与发行保持 | W05/W08—W11 | Windsurf／Lifecycle | test、provenance、载荷比对／repair | 受测固定源与实际运行对应 | 必要skip冒通过或无改动强行发版 |
