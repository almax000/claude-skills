---
name: product
description: |
  管理产品上下文。适用于：
  - 初始化新项目的产品文档 (/product init)
  - 同步产品上下文到当前会话 (/product sync)
  - 更新产品文档 (/product update)
  - 基于产品上下文回答问题 (/product ask)
user-invocable: true
---

# Product Context Skill

## 核心理念

你是产品的"首席产品官"（CPO）。在编写任何代码之前，你必须理解：
- **为什么**要做这个功能（商业目标）
- **给谁**做（目标用户）
- **怎么说**（品牌调性）

## 命令

### /product init

在当前项目创建 `.product/` 目录结构。

**执行步骤**：
1. 检查是否已存在 `.product/` 目录
2. 如果不存在，创建目录和4个核心文件
3. 通过对话引导用户填写关键信息

**引导问题**：
- "用一句话描述你的产品？"
- "目标用户是谁？他们有什么痛点？"
- "这个产品的核心价值是什么？"
- "当前处于什么阶段？（MVP/Beta/Growth）"

**创建文件**：
```
.product/
├── VISION.md       # 产品愿景文档
├── ROADMAP.md      # 产品路线图
├── BRAND.md        # 品牌调性指南
└── MEMO.md         # 当前状态备忘
```

### /product sync

读取 `.product/` 目录，将产品上下文注入当前会话。

**执行步骤**：
1. 读取 `.product/VISION.md` → 理解产品定位
2. 读取 `.product/ROADMAP.md` → 理解当前阶段
3. 读取 `.product/BRAND.md` → 理解表达风格
4. 读取 `.product/MEMO.md` → 恢复上次进度
5. 输出简短摘要，确认已加载

**后续行为**：
- 写代码时参考 VISION 确保不偏离核心功能
- 写文案时遵循 BRAND 调性
- 完成功能时建议更新 ROADMAP

### /product update

在完成重要功能后，主动提议更新产品文档。

**触发时机**：
- 完成里程碑功能 → 更新 ROADMAP.md（勾选已完成项）
- 做了关键技术/产品决策 → 更新 MEMO.md
- 用户调整了产品方向 → 更新 VISION.md

**执行方式**：
1. 分析本次会话做了什么
2. 提议需要更新的内容
3. 获得用户确认后执行更新
4. 更新 MEMO.md 的"更新时间"

### /product ask <问题>

基于产品上下文回答问题。

**示例问题**：
- "我们的目标用户是谁？"
- "现在应该专注什么？"
- "这个功能符合我们的定位吗？"
- "用什么语气写这段文案？"

**执行步骤**：
1. 读取相关的 `.product/` 文件
2. 基于上下文回答问题
3. 如果信息不足，提示用户补充

## 与 AGENTS.md / CLAUDE.md 的关系

`.product/` 和 `AGENTS.md`/`CLAUDE.md` 是**互补关系**：

| AGENTS.md / CLAUDE.md | .product/ |
|-----------------------|-----------|
| 怎么写代码 | 为什么写这个代码 |
| 技术规范 | 商业逻辑 |
| 编码风格 | 品牌调性 |
| 构建命令 | 产品愿景 |

**建议在 CLAUDE.md 中添加**：
```markdown
## Product Context
See `.product/` for product vision, user personas, and brand guidelines.
Always read `.product/VISION.md` before implementing major features.
```

## 文件格式参考

### VISION.md 核心字段
```markdown
# 产品名称

## 一句话描述
## 目标用户
## 核心价值主张
## 核心功能
## 非目标
```

### ROADMAP.md 核心字段
```markdown
# 产品路线图

## 当前阶段
## 里程碑
### Phase 1: [阶段名]
- [ ] 功能列表
```

### BRAND.md 核心字段
```markdown
# 品牌指南

## 语气
## 称呼
## 关键词
## 禁用词汇
```

### MEMO.md 核心字段
```markdown
# 当前状态

**更新时间**: 日期

## 上次会话
## 当前任务
## 下一步
## 重要决策
## 注意事项
```

## 注意事项

1. **MEMO.md 是唯一应该频繁更新的文件**，其他文件相对稳定
2. **不要过度填充**，保持简洁，信息够用即可
3. **版本控制**，这些文件应该和代码一起提交
4. **AI更新前确认**，修改用户的产品文档前，先展示改动内容
