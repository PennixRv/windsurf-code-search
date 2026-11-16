# 执行与验收

根修订方案获明确批准后，本 `direct` 来源任务原生 start。入口、完整脚本合同和已有界面提示改为中文；保留 PathGuard、解析与范围核验、资源预算、协议恢复上限、凭据、只读边界和所有错误码。没有修改 CLI 运行实现。

界面 `short_description` 调整为 36 个字符，既有 `default_prompt` 包含 `$windsurf-code-search`；YAML 键和 policy 保持不变。现有文档合同测试更新为中文断言，不删除覆盖项。

`npm test` 114 项全部通过，包含离线安装和精确打包允许列表；`git diff --check` 通过。frontmatter、YAML 和 JSON 示例键名保留，命令示例未改。来源三份文档与集合快照字节一致。

本轮不发起远程语义检索，不修改凭据、CLI 接口或 npm 版本。文档来源提交推送后由 `pennix-skills` 的精确来源固定和集合更新交付，部署验收由根关联任务记录。
