# 物化闭合方案工作流项目资产

## 目标（Goal）

执行根任务 `10-21-closed-plan-workflow-rollout` 已批准 revision 3 中 windsurf-code-search 的项目资产步骤，目标为 `main`，不新增产品范围或用户取舍。

## 需求（Requirements）

- 使用 Lifecycle 正式安装并核验的 Trellis beta.53，先审阅六项目原生预览，再更新本项目。
- 仅由原生 `trellis update --create-new --migrate` 物化批准的受管资产与安全删除迁移；审阅每个差异与候选，保留自定义内容。
- 保持现有工作流身份与来源约束，通过原生 workflow 入口恢复可核验性，不手改 provenance 或模板 hash。
- 保留既有源任务、其他活动任务、spec、workspace 和运行态；源任务消费者验收由根 rollout 协调。
- 用户已批准根完整方案，并明确确定性合并和补齐直接执行；本任务只提供 owner 本地记录。

## 验收标准（Acceptance Criteria）

- [ ] 预览的 hash 清单字节未变，范围与批准方案一致。
- [ ] 本项目版本为 beta.53，新规划 Skill、任务工具和 Hook 由原生更新产生，旧资产迁移符合已知摘要合同。
- [ ] 自定义内容与既有任务完整；所有候选有明确处置，工作流原生 verify 通过。
- [ ] 差异检查与有针对性的合同检查通过，项目资产提交及原生归档提交推送到 origin/main，工作树干净。
- [ ] 根记录最终 owner SHA 与项目证据，继续跨层和真实宿主验收。

## 回退

失败保留原生备份与现场，记录完整错误；仅按当前更新器的恢复合同处理。不 force 覆盖、不改 hash、不冒认静态更新为整体部署完成。
