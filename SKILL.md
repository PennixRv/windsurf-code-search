---
name: windsurf-code-search
description: 只有在本地工具和 CodeGraph 无法定位时，才将真正含义不明确的业务、历史或旧代码位置问题路由到有范围的外部语义搜索；不会仅因自然语言表述触发。
metadata:
  short-description: 按需获取语义代码候选
---
# Windsurf Code Search

Windsurf Code Search 是按需使用的外部搜索辅助工具。它返回不受信任的文件候选；使用前必须在本地检查每个候选。CLI 是安全边界：提示词不会创建注册、批准或白名单状态。不要添加 MCP 服务器、Hook、插件、项目注册、批准或持久化索引集成。

## 路由

1. 对已知文件、字面量、配置、日志和实时内容，先在明确项目根目录使用本地工具。
2. 对已知符号、调用者或被调用者、结构、关系和影响分析，使用 CodeGraph。
3. 只有位置真正未知，且本地检索和 CodeGraph 都找不到对含义不明确的业务语义、历史名称或旧行为有用的候选时，才使用本 Skill。

不要仅因请求使用自然语言就触发本 Skill。不要自动并行运行 CodeGraph 和 Windsurf Code Search；一次 CodeGraph 未命中也不构成机械外部后备。已知文件、已知符号、字面量或配置或日志搜索、外部文档、普通对话以及只需本地影响分析的请求都跳过本 Skill。

## 调用

提供一个已存在的项目目录和一个自然语言查询：

```bash
/path/to/windsurf-code-search/bin/windsurf-code-search \
  --project "/absolute/path/to/project" \
  --query "Where is the legacy import flow implemented?"
```

唯一可选控制项是有范围的 `--max-results`、可重复且只能相加的相对 `--deny` 模式和 `--no-external`。命令先接受明确的 `WINDSURF_API_KEY`。仅 Linux 或 WSL 下，缺少明确密钥时才可以通过包所有者提供的、有范围的无 Shell 辅助程序使用当前用户的 Devin CLI 登录。辅助程序固定凭据路径，拒绝符号链接、超大文件、未知字段和不支持值，不扫描桌面状态。

所有者配置路径可通过 `configure` 和 `config-doctor` 使用；它是私有、原子和脱敏的。运行时优先级是明确环境变量、所有者配置、Devin 登录。命令不输出密钥、不持久化提示词或响应，也不输出远程原始错误。不要把凭据复制到所有者配置命令之外的文件、命令历史、日志或提交。调用方必须阻止所有凭据访问和远程搜索时使用 `--no-external`。

使用结果前，将相对路径解析到同一项目根目录内，再在本地读取相关行。需要关系分析时，用 CodeGraph 扩展已核验候选。Windsurf Code Search 输出永远只是候选，不是仓库事实；不得将其写入 Trellis、CodeGraph、FastCtx 或其他持久化索引。网络失败或格式错误响应是封闭的 `FC_*` 诊断，应作为不可用提示处理，不是仓库事实。
