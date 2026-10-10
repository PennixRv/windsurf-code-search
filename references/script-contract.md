# 脚本合同

CLI 只接受一个 `--project <directory>` 和一个 `--query <text>`。它还接受有界的 `--max-results <1..50>`、可重复的相对 `--deny <glob>`、独立的 `--no-external` 和独立的 `--help`。短别名、位置参数、已退役的凭据参数、重复选项和未知选项都必须封闭失败。

所有本地操作都限制在规范项目根目录内。默认 deny 集合覆盖仓库元数据、Trellis 或 Codex 状态、凭据、生成输出、日志和依赖树。`--deny` 只能进一步收窄此集合。

完成参数和项目根目录核验后，CLI 按固定顺序选择凭据：非空的明确 `WINDSURF_API_KEY`、`$XDG_CONFIG_HOME/windsurf-code-search/config.json`（若未设置则使用 `$HOME/.config`）中的私有所有者配置，最后是 Linux 或 WSL 的 Devin CLI 登录。所有者文件必须是精确 JSON，以原子方式写入，权限为 `0600`，大小受限，并拒绝符号链接、非普通文件和不安全权限。后备路径是包所有者提供的无 Shell Node 辅助程序，只打开当前用户固定的 `~/.local/share/devin/credentials.toml`，拒绝符号链接和超大文件，只接受已知字段以及支持的 `devin-session-token$`、`devin-` 或 `sk-` 形式，并通过有界私有管道返回已接受值。它不会扫描桌面状态数据库或其他路径。CLI 不打印、存储、记录、放入参数或返回凭据。无法发现或凭据无效时失败为 `FC_KEY_MISSING`。

所有者交互命令为 `configure`；`config-doctor` 只读本地并输出固定的脱敏状态。`--no-external` 是调用方明确的退出选项：它不检查环境变量、所有者配置或凭据辅助程序，不导入搜索核心，不创建网络请求，只向 stderr 写入 `FC_EXTERNAL_DISABLED`。HTTP `401` 和 `403` 产生 `FC_AUTH_REJECTED`；共享截止时间产生 `FC_REMOTE_TIMEOUT`；传输或调用方取消，以及合法 Connect `resource_exhausted` 或 `unavailable` EndStream，产生 `FC_REMOTE_UNAVAILABLE`；`5xx` 和合法 Connect `internal` 或 `unknown` EndStream，产生 `FC_REMOTE_SERVER_ERROR`；格式错误的 JWT 或 Connect 帧产生 `FC_PROTOCOL_INVALID`。这些诊断不得包含响应正文、请求头、请求标识符、路径、令牌衍生数据或捕获的异常文本。

取得 JWT 后，实时请求路径先针对固定的 `MODEL_SWE_1_6_FAST` 模型执行一次 gzip protobuf `CheckUserMessageRateLimit` 预检，再构建仓库映射或打开答案或工具流。它使用与流路径相同的剩余单调截止时间和安全元数据。预检被拒绝、不可用、超时或服务端报错时，使用已有固定诊断终止搜索；不读取项目文件，不发送流请求，并丢弃预检响应。

如果流响应提供固定的容量或可用性证据，最多可以在短暂固定退避后对相同请求重试两次。每次尝试都使用共享的剩余截止时间；重试不增加本地工具轮次、命令、格式修正、请求 ID 或候选来源。格式错误的 Connect 数据、认证失败、超时、`5xx`、输出上限、解析失败和最终协议违规不走这条重试路径。只有全部尝试明确结束于合法 Connect `resource_exhausted` 时，客户端最多可以刷新会话两次。每次刷新都在同一截止时间内等待，在内存中取得新的 JWT，重新执行固定速率限制预检，并重试未改变的当前请求。它不重置截止时间、模型计数器或工具计数器；第二次刷新后仍耗尽时保持 `FC_REMOTE_UNAVAILABLE`。

在有界工具包络中，解析器先接受严格 JSON，然后只修复已知的未加引号键和尾随逗号缺陷。被截断的 `restricted_exec` 包络最多只能贡献完整的顶层 `command1` 至 `command4` 对象，而且对象类型必须已识别。解析器不得从响应散文中扫描路径、命令、候选或范围。如果这种有界恢复不能产生有效调用，每个逻辑远程请求在相同截止时间下只有一次固定替换。该请求的第二个畸形包络仍然是 `FC_PROTOCOL_INVALID`；替换不增加工具轮次，也不执行命令。同一辅助程序覆盖普通工具轮次、最终答案请求和一次有界答案内容修正请求。

为协议提供可核验依据时，受保护的成功 `readfile` 结果只包含内部 `read_range` 对象，其中给出实际返回的带编号行的精确闭区间。最终答案和答案修正提示要求候选复制该正范围，不得估算。该字段不属于公开 CLI JSON；空读取时为 `null`，也不替代最终的同版本 `validateCandidateRange()` 检查。

成功 stdout 是一个 JSON 对象：

```json
{"status":"truncated","search_terms":["import"],"candidates":[{"path":"src/import.mjs","start_line":12,"end_line":20,"reason":"local_range_validated"}],"truncated":true,"projection":{"remote_candidates":2,"accepted_candidates":1,"recovered_candidates":0,"rejected_candidates":1,"unprocessed_candidates":0,"rejection_reasons":["remote_candidate_range_rejected"]},"coverage":{"visited":{"entries":4096,"directories":128,"files":2048,"matches":37,"outputBytes":18320},"continuation":{"pending_directories":3,"next_path":"/codebase/src/remaining"},"reasons":["file_limit","remote_candidate_projection_rejected"]}}
```

`status: "complete"` 表示限定范围的本地枚举中所有经过 PathGuard 批准的路径都已消费。它不包含被 deny 的路径，也不声称覆盖不受限制的整个仓库或已经达到语义正确。`status: "truncated"` 表示一个或多个固定资源限制、本地工具失败、候选结果限制或本地投影拒绝了远程候选，导致结果不完整。旧的 `truncated` 布尔值与 `status` 保持一致。`coverage.visited` 是整个调用共享的计数；`coverage.reasons` 只包含固定客户端标识符；`coverage.continuation` 在可用时标识最后一个有界前沿。

`projection` 只包含计数。`remote_candidates` 是远程候选范围的数量（一个 `<file>` 可能包含多个 `<range>`）；`accepted_candidates` 是通过本地 PathGuard 和范围核验的数量；`recovered_candidates` 对于从本次调用中成功执行的本地证据恢复、再经本地核验的首个非测试实现范围只能是 0 或 1。先使用第一个 implementation `readfile`；只有没有读取或接受实现文件时，才最多检查 4 个已接受的本地测试和 12 个 `./` 或 `../` import 说明符，以解析一个受保护实现。标准 `.js`、`.jsx`、`.mjs` 和 `.cjs` 说明符可以映射到 TypeScript 源扩展名；包导入、绝对路径、越出根目录的路径、缺失路径和响应散文永远不是候选。之后才可以考虑最强的有界 `rg` 路径。

`rejected_candidates` 是因格式、路径、范围、重复或版本原因在本地拒绝的数量；`unprocessed_candidates` 是超出 `--max-results` 的数量。任何字段都不得包含被拒绝的路径、范围、XML 或远程散文。`rejection_reasons` 是被拒绝条目的去重固定本地类别列表。只有精确的 `<no_results/>` 或已确定的空 `<ANSWER></ANSWER>` 形式才允许带零候选的 `complete`。

任何恢复的实现候选都会将 `status` 设为 `truncated`，并添加固定原因 `implementation_candidate_recovered`。恢复不能把 `rg` 命中变成猜测范围：客户端先执行有界受保护读取，再执行相同的最终范围核验。任何候选拒绝都会将 `status` 设为 `truncated`，并添加固定原因 `remote_candidate_projection_rejected`。没有候选标记的任意答案散文只能在相同截止时间内接收一次固定的仅答案形状修正。第二次形状无效是 `FC_PROTOCOL_INVALID`，不是语义上的无结果；空修正不能把先前非空的畸形答案洗成完整的零候选成功。包络解析器可以在只有外层对象被截断时恢复完整的第一个顶层 `answer` JSON 字符串，但绝不从散文提取候选；恢复字符串仍须经过严格 XML、PathGuard 和范围核验。

发送给远程模型的每个仓库映射和受限本地工具结果都使用相同的 `complete`、`truncated` 或 `failure` 状态词。工具失败只包含固定的本地 `FC_*` 代码。被截断的无匹配工具结果渲染为 `(no matches in visited files|paths)`，绝不渲染成结论性的 `(no matches)`。

候选投影有三条独立保证：

1. 路径核验：PathGuard 重新核对规范根目录包含关系、默认和附加 deny 规则、普通文件类型以及符号链接越出根目录的行为。
2. 范围核验：组件打开已批准文件，只接受正数、顺序正确、从 1 开始且最多 200 行的范围。起止行必须在同一份非空文件版本中存在。不做范围钳制；EOF 溢出、空文件、跨度过大和核验期间发生变化的文件都被丢弃。本地变化会以固定原因 `candidate_changed` 将 coverage 标为 `truncated`。
3. 语义核验：调用方必须读取返回的源代码并决定它是否回答查询。`reason: "local_range_validated"` 不代表语义正确，也不转发远程原因或散文。

远程散文、原始协议帧、文件内容、仓库映射、进度事件、子进程 stderr 和捕获的异常消息永远不出现在公开输出中。公开失败使用固定 `FC_*` 代码和 stderr 上的本地诊断文本。

## 有界远程完成

远程协议最多执行三次 `restricted_exec` 轮次。每次仍使用同一 PathGuard、资源预算、命令数和输出限制。已有本地证据的 `answer` 可以提前结束；不能为了耗尽上限而消耗剩余工具轮次。只有三次有效工具轮次全部完成后，最终请求才收到固定的强制回答用户消息，并且只公开 `answer` 工具。该消息禁止 `restricted_exec`，要求严格的 `<file>` 或 `<range>` 条目或明确的精确无结果形式，限制结果数，并禁止猜测路径或范围。畸形工具标签 JSON 每个逻辑请求最多接收一条固定修正用户消息，并在相同剩余截止时间内重试一次；它不会转发远程文本，也不会创建新的工具轮次。投影拒绝在属于格式或范围问题时也可以接收一次仅答案修正。客户端将终结阶段的非答案响应拒绝为 `FC_PROTOCOL_INVALID`；内部固定协议原因不通过 CLI 输出。工具包络可以有有界的远程 reasoning 前缀，但客户端丢弃该前缀，不在后续请求中重放；非空白 JSON 后缀仍视为畸形。合法的远程 EndStream 错误仍然封闭失败，但映射到固定服务类别，不误报为畸形 Connect 数据。终结请求和修正请求使用同一单调截止时间，绝不创建后备候选来源。
