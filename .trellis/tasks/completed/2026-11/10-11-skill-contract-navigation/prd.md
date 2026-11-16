# Windsurf Skill 脚本合同导航修订

## Goal

接续根侧 Pennix Skills 审查 F03，在真实上游修正脚本合同的执行前导航与候选覆盖语义，验证包产物并交付固定来源。

## Requirements

- R1：上游 SKILL 在调用前直接导航现有 references/script-contract.md，说明 complete/truncated/coverage 与本地语义核验边界；不复制 CLI 内部协议，不扩大触发或 provider 行为。
- R2：落实根 D7 用户补充，常规调用使用受管 PATH 命令 windsurf-code-search；部署由 Pennix collection finite map/receipt 负责，Windsurf 不新增 installer/wrapper 或修改 Shell。
- R3：保持凭据 owner 和 configure/config-doctor 原生入口；不读取真实凭据或发远程查询来验证文档。
- R4：源侧提交推送至 origin/main，由 Pennix catalog 固定 SHA 后 npm-pack 物化；只读文档交付不机械创建 npm release 或改动既有 tag。
- R5：保持 planning，当前封口源任务必须列入整体包展示并得到后续明确批准后才开始实施。
- R6：落实根 D10，真实源 Skill name 改为 pennix-windsurf-code-search，正文/UI/示例的 Skill 引用同步；CLI、package、组件/凭据标识不随 Skill 名改变，Pennix 通过固定来源物化而非快照别名。

## Acceptance Criteria

- [ ] AC1：入口导航可解析且执行前条件明确；结果完整性/候选可信度准确，不把 complete 解释为全仓覆盖。
- [ ] AC2：示例使用 PATH 命令，与 Pennix 原生映射/冲突处理一致；owner 配置入口不信任任意同名命令。
- [ ] AC3：npm test、verify:provenance、pack:check、npm-pack 白名单与消费字节核对通过；不新增真实 provider 调用或凭据状态。
- [ ] AC4：源提交已推送，Pennix 快照固定实际 SHA；原生 task 和 Git 按 source owner 收敛。
- [ ] AC5：新 Skill 身份与前缀准确，源/产物/UI/消费引用一致；CLI windsurf-code-search 和 PATH 合同不变，命令目标使用新 Skill 目录且经 Pennix 整体核验。

## Notes

- 根任务：/home/penn/devel/codex-workflow-optimization/.trellis/tasks/10-11-pennix-skills-audit-gap-remediation/。
- 基线 main，ff4c2e2a4432e13cc0a19155a8178c792af57375，package version 0.1.16；实际 CLI 行为不变。
