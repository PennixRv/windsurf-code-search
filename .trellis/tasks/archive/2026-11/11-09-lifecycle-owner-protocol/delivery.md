# 交付核验

v0.1.18 原生隔离测试 127 项及固定 Node 26.5.1/npm 12.0.1 发布 preflight 通过。source C=`4f8db1799f7b60f91fbd307d29c03fff6d5823cc`，evidence E=`f44c1adbaac9a857f634ebd00d66e1880a2216ec`；annotated tag 完整证据验证通过，E 只改变对应 attestation。

原生 publish 作业 42564519382 成功执行 npm publish，随后的下载因 registry 传播返回 404，作业结论 failure。未重复 publish、未移动 tag。传播完成后独立从正式版本安装，原始公开包 SHA-256 与 tag 固定值一致：`30e15719cc69406bdb33fa595fcb4fc96ebf164ce74029f3796a49b01e6a3f54`；npm audit signatures 验证 1 registry signature 与 1 attestation。Validate Release Tag 作业 42564485018 和源码 CI 42564484830 成功。

集合由该精确公开载荷生成，19 个文件完全一致，并以 Skills `886ebf1a1b6f413f366ec9cfa92cc4e0391772d8` 发布。本机经 Lifecycle 原生集合升级部署；实际命令指向受管集合、实装 0.1.18，check 中 Windsurf current/keep/owned，事务 idle。没有另行全局 npm 安装，也未运行真实 Windsurf 检索或删除 Devin/中央凭据。

本组件合同内实现、发布、本机验收完成；根任务继续组合收尾。后续归档提交不改变 source C/E/tag/公开载荷身份。
