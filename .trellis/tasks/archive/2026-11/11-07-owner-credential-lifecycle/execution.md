# 实施与验证

## 最终发行与消费结果

维护者再次更新 secret（仅核验更新时间 2026-11-07T09:05:45Z）后，重验原 tag/evidence、精确 registry E404，沿同一直接发布 workflow 恢复 attempt 3。npm publish 于 09:06:44Z 明确成功，版本 0.1.17，provenance logIndex 3734260690。CI 紧接的公开 tarball 下载收到传播期 404，整个 run 为 failure；没有重跑 publish 或移动 tag。公开可见后独立下载 SHA-256 与绑定证明一致，npm install --prefer-online 精确版本成功，npm audit signatures 确认 registry signature 和 attestation 各 1 个有效。该独立验证补齐发布后条件，不能把原 run 写成通过。

集合 c607488ec6ef7f0855bd79d15c303beda159f43e 已物化本发行 E 并由本机原生 Lifecycle 固定安装。config-doctor、lifecycle inspect/check 通过，运行时来源 owner-config、目录 0700/文件 0600；原 Devin 文件摘要前后一致，未新增中央 Windsurf 字段。一次真实远端搜索只使用公开合成 arithmetic.py，exit 0、complete、无截断，正确返回加法函数第 1–3 行。首次误带 --no-external 的本地调用为 FC_EXTERNAL_DISABLED，未联网，不计作真实搜索或通过。根侧全集 22 组件/6 连接 check exit 0，其他连接未统一开启远端探针。

本任务源码、离线验证、原生发行、公开证明及实际消费均已完成；以下保留按时间积累的实施和认证恢复证据。CI 的即时 404 等待不足属于仍可改进的发行验证机制，不阻止本次经独立证据确认的已发布身份。

## 实施与认证恢复记录

已沿根批准合同实施 owner 模式、Devin 导入、中央兼容、模式重绑定及归属/漂移/环境覆盖保护。新增生命周期与真实 CLI 回归，安全写失败测试通过可信 JavaScript-only persistReceipt 故障入口，不可由 CLI JSON 设置。

采用未占用的 0.1.17；registry 明确 E404、远端无同名 tag。按既有发布合同在隔离临时工具目录固定 Node 26.5.1/npm 12.0.1；npm exec 的 node 包因安装脚本未运行没有生成 binary，未编辑 npm 缓存，改用 npm 原生安装固定 node-linux-x64 二进制包。最终完整通过 124 项测试、19 文件 provenance 和 pack:check；原生 release:prepare-artifact 已生成 v0.1.17.tgz。

Spec 已在 cli/windsurf-code-search-security.md 补充可执行生命周期合同。计划工作提交包含本次源码、文档、测试、版本、provenance、原生任务资产与准备后的发行 tgz；随后单独证据子提交、annotated tag、推送与 Actions 发布。沿根明确提交发布授权执行，不重复征求批准。

实际 source C 为 cd6b7fab706bc995a78903543e78912495dba561，直接 evidence 子提交 E 为 50147de6a46bad1c02f2868915fbd77da8d3b061；annotated v0.1.17 已推送。preflight、tag verifier、release evidence verifier 全部通过。绑定 tarball SHA-256 为 471c397712aa90f94a42c31ba047850f1c06b8e08cfc76b9776d9f23c08ccb0a。

Actions https://github.com/PennixRv/windsurf-code-search/actions/runs/42355980168 的 validate job 成功，publish job 在 Verify npm publication identity 的非回显 npm whoami 收到 E401，尚未进入 npm publish。随后 registry 明确 E404；NPM_TOKEN secret 仅核验名称及更新时间 2026-08-06T13:02:52Z，没有取得或记录值。失败属于认证前置条件，不能宣称已发布；保留 tag 和原始候选。等待受信渠道修复仓库 Actions secret，再重验精确候选与 registry 状态，沿当前发布合同恢复；不自动重试认证错误，不消费未发布源。

用户更新 secret 后，重验固定 tag/evidence 和精确 registry E404，再沿 gh run rerun --failed 执行 attempt 2。npm whoami 通过，原 tarball 的 npm publish --provenance 被 registry 返回 E403 / E_STAGE_REQUIRED（token 只能暂存，公开发布须先 stage 再 approve）；后续 registry 精确版本仍 E404。没有创建 stage 或公开版本成功的证据，不能把 provenance 签名生成等同于发行完成。官方 npm-stage 文档及固定 npm 12.0.1 help 确认 stage approve 需要维护者 2FA。根任务正在核对是否维持直接发布权限，或经方案修订采用暂存/人工批准；未改变发布 workflow、tarball 或 tag。

用户澄清已勾选 bypass 2FA。进一步核验官方 about-access-tokens、creating-and-viewing-access-tokens：bypass 与 Packages and scopes Permissions 独立，stage only 的直接发布正是 E_STAGE_REQUIRED；publish and stage 才允许直接发布。2027-01 的撤除尚未生效，不据此要求迁移机制。保留原直接发布方案，等待用户核对该 token 的精确包权限和 Actions secret 对应关系；未要求扩大包范围、修改包级策略或传递 token 值。
