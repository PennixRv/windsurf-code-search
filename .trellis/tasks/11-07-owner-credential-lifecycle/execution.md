# 实施与验证

已沿根批准合同实施 owner 模式、Devin 导入、中央兼容、模式重绑定及归属/漂移/环境覆盖保护。新增生命周期与真实 CLI 回归，安全写失败测试通过可信 JavaScript-only persistReceipt 故障入口，不可由 CLI JSON 设置。

采用未占用的 0.1.17；registry 明确 E404、远端无同名 tag。按既有发布合同在隔离临时工具目录固定 Node 26.5.1/npm 12.0.1；npm exec 的 node 包因安装脚本未运行没有生成 binary，未编辑 npm 缓存，改用 npm 原生安装固定 node-linux-x64 二进制包。最终完整通过 124 项测试、19 文件 provenance 和 pack:check；原生 release:prepare-artifact 已生成 v0.1.17.tgz。

Spec 已在 cli/windsurf-code-search-security.md 补充可执行生命周期合同。计划工作提交包含本次源码、文档、测试、版本、provenance、原生任务资产与准备后的发行 tgz；随后单独证据子提交、annotated tag、推送与 Actions 发布。沿根明确提交发布授权执行，不重复征求批准。
