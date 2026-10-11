# 入口修订与验证

## 修改

已在真实源修改 Skill name 为 pennix-windsurf-code-search，同步 UI default_prompt；调用前直达 references/script-contract.md，普通示例使用受管 PATH 命令；限定 complete/truncated/coverage 的范围，并保留候选必须本地核验的边界。CLI、package/version、凭据 owner 与搜索协议未修改。

## 来源元数据的必要同步

首次 npm run verify:provenance 退出 1，未作为通过。核对 verifier 与真实字节发现，除本次 SKILL/UI 变更，未修改的 script-contract 摘要在 source owner 清单和公开投影中也滞后。属于已批准包内容/来源检查的同 owner 派生元数据，精确更新三项实际摘要及公开投影自身摘要，保留上游提交、归属、许可证和隐私字段，不新增来源算法或改发行合同。

## 已运行检查

- npm test：114/114，通过，0 skipped；测试均使用既有离线 fixture，无真实 provider 请求。
- npm run verify:provenance：必要摘要同步后通过，18 个 allowlisted 文件。
- npm run pack:check：通过，精确独立文件白名单；npm test 还覆盖离线安装与源码运行字节。
- 系统 skill-creator quick_validate：通过。

接下来审阅 Git 差异并推送源码验收提交，由 Pennix 固定 SHA 后物化；没有 npm release 或 tag。消费者、PATH 与模型验收尚未完成，不先归档 AC。
