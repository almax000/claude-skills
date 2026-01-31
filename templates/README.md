# Product Context 模板

选择最适合你项目类型的模板。

## 可用模板

### minimal/
**适用于**: 任何项目的快速开始

最简化的模板，只有必要字段，适合：
- 快速验证想法
- 不确定项目类型
- 想要完全自定义

```bash
cp -r templates/minimal/.product your-project/
```

### saas/
**适用于**: SaaS产品、订阅制服务

包含商业模式、定价策略等SaaS特有字段：
- 商业模式设计
- 转化漏斗
- 关键指标定义

```bash
cp -r templates/saas/.product your-project/
```

### indie-game/
**适用于**: 独立游戏开发

游戏开发特有字段：
- 核心玩法设计
- 美术/音效风格
- 测试反馈收集

```bash
cp -r templates/indie-game/.product your-project/
```

### open-source/
**适用于**: 开源项目

开源项目特有字段：
- 版本规划
- 社区互动指南
- Issue/PR管理

```bash
cp -r templates/open-source/.product your-project/
```

## 自定义模板

你也可以基于任意模板创建自己的版本：

1. 复制一个基础模板
2. 根据需要添加/删除字段
3. 保存为你自己的模板

## 核心字段说明

无论使用哪个模板，以下字段是通用的：

| 文件 | 核心字段 | 用途 |
|------|----------|------|
| PRD.md | 一句话描述、目标用户、核心功能、非目标 | 定义产品是什么 |
| ROADMAP.md | 当前阶段、里程碑 | 定义产品做什么 |
| BRAND.md | 语气、关键词、禁用词 | 定义产品怎么说 |
| MEMO.md | 上次会话、当前任务、下一步 | 恢复工作进度 |
