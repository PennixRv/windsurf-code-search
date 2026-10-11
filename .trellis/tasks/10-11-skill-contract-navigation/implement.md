# Implementation Plan

## Preconditions

原生 seal 当前计划并在完整修订包中列明；后续明确批准才 native plan approve/start，编辑前读取适用 cli spec。主会话 inline，不派发实现/check worker。

## Steps

1. 重读 SKILL、script-contract、直接 caller/示例与 package files。
2. 最小修改执行前导航、完整性说明、PATH 示例及 Skill 身份 pennix-windsurf-code-search；同步直接 Skill 调用/UI，不对 CLI/package/config 名做全局替换，保留风险、条件和原生 owner。
3. 运行 npm test、npm run verify:provenance、npm run pack:check；由原生 npm-pack 的固定白名单验证实际产物，确认 SKILL/reference/bin 与源码相同。
4. 审阅差异并提交推送 origin/main；记录固定 SHA，根协调 Pennix catalog/物化。无需真实服务查询或 npm 发布。
5. 消费者验收完成后原生归档、记录 session 并提交收敛记录；区分代码消费 SHA 与纯任务收敛提交。

## Acceptance And Recovery

必要离线矩阵无法运行或非零即 blocked/failed；不转写成通过。源码回退采用正常反向提交，已消费来源/包版本可核对；不覆盖既有 npm artifact/tag，不修改 installed copy。
