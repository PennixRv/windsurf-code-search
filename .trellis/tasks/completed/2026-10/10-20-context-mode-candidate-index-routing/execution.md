# 执行记录

## 2026-10-21 源码与包验收

- 用户批准 owner plan revision 3；原生 `task.py plan approve --revision 3` 成功，随后以 `task.py start --allow-empty-context` 启动。`implement.jsonl` 与 `check.jsonl` 缺失并被原生验证跳过，因此启动时明确使用允许空上下文清单的选项。
- 当前 `main` 与刷新后的 `origin/main` 均为 `c6f9ef0c04768ae9d980fe999d6ab2da13d8d072`，提交差异计数为 `0 0`。现有 `SKILL.md` 已允许 Context Mode 对 Windsurf 候选进行本地处理或索引，要求保留来源和“未核验”标记，并在将其作为事实使用前回到当前源码核验；`test/skill-routing.test.mjs` 对这些要求有逐项断言。没有发现需要改动源码或重复提交的缺口。
- 使用 CI 固定 Node.js `26.5.1` 与 npm `12.0.1` 验收：`npm test` 为 115 通过、0 失败；`npm run verify:provenance` 报告 `provenance ok: 19 files`；`npm run pack:check` 为 1 通过、0 失败。临时运行时安装已清理。
- 当前仅完成源仓测试与打包验收。仍须等待根任务完成 Skills collection 物化和真实新会话消费者验收，再把消费者证据补入本记录并使用本仓原生 finish/archive 流程；当前不得归档。

## 2026-10-21 revision 4 来源路由补齐

- [主要] Skills 正常物化揭示源包与既有快照不同：`c6f9ef0` 已满足候选索引要求，但真实源和界面元数据仍要求本地/CodeGraph 无法定位后才用 Windsurf；既有快照已采用前序根任务 `10-21-code-search-routing-convergence` 的无有效锚点直接语义定位策略。此前验收只证明索引合同，没有证明该策略已进入唯一来源，故不能作为整套路由完成证据。
- 用户明确指示“补齐之后直接推进，这是确定的合并行为，不需要审批”。以该授权原生 replan 后重建 revision 4，更新 PRD/design/implement，并成功 seal、approve、start；未手写任务状态，未重复询问既定策略。根 rollout 同时以 revision 3 恢复执行。
- 已将既定策略合入真实 `SKILL.md` 与 `agents/openai.yaml`；候选来源/未核验标记、本地语义核验、外部允许范围、PathGuard、凭据协议和运行时代码保留。既有冻结中文句子断言改为身份、界面元数据和包内引用完整性检查；这些静态检查不声称证明模型路由行为。仅更新改变的打包文件与公开 projection 的 provenance 哈希，不扩大包清单。
- Skill 静态验证、中文检查、差异检查通过。默认 Node `26.11.1` / npm `12.2.0` 的完整测试 116 通过、0 失败；provenance 为 19 文件通过，pack 检查 1 通过。CI 固定 Node `26.5.1` / npm `12.0.1` 仍在验证，不能用默认版本结果替代。提交、来源 pin 与真实消费者验收继续由根任务串联。

## 2026-10-21 revision 4 固定运行时验收

- 同步 README 的入口路由说明；公开 provenance 中 README 与 CLI 的既存摘要已过期，已改为当前交付文件摘要，并更新私有清单中的公开 projection 摘要。新增回归检查公开清单完整覆盖所有非自身 runtime 文件且摘要与实际字节一致，不改变运行时代码、包清单或外部权限。
- 官方 Node 二进制下载在 90 秒超时后清理临时目录。改用 npm 官方 registry 的 `node-linux-x64@26.5.1` 与 `npm@12.0.1` 临时安装，忽略安装脚本，先断言实际 `node --version=v26.5.1`、`npm --version=12.0.1`，再运行原生门禁：`npm test` 117/117 通过、无跳过；provenance 19 文件通过；pack 检查 1/1 通过。临时运行时随后清理，不改变全局安装。
- 审查确认源 Skill、界面、README、静态测试和两层 provenance 对齐；现有安全规范的包清单与来源一致性合同已覆盖此次修复，不新增重复规范。模型真实路由、最终集合与新会话仍待根 rollout 消费者验收，当前不归档。

## 2026-10-22 归档前消费者验收

- 根 rollout 的真实新 Codex 宿主线程 `01a15f5a-9805-7062-a288-780a49c22863` 已完成只读消费者验收：项目规则、规划 Skill、全局路由 Skill 均实际加载，`SessionStart`/`UserPromptSubmit` Hook 均实际注入；四个代表场景分别验证 planned 规划链、major replan、minor 原阶段留存和非法 archive/跨阶段拒绝，结论为 `PASS`。该证据满足本源任务归档前消费者门；最终 Skills 集合更新后仍需独立的新宿主验收。
- 当前源任务仍为 `in_progress`，`branch=main`、`base_branch=main`、`pr_url=null`，本仓无独立 PR 分支事实。源测试、provenance、pack 及消费者验收均通过，按根批准计划进入原生归档；归档提交改变的最终 SHA 将回写根任务并作为 Skills collection pin 的唯一来源。
