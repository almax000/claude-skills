---
name: product
description: |
  管理产品上下文。
  - /product init - 初始化产品文档
  - /product - 分析对话，更新产品文档
user-invocable: true
---

# Product Context Skill

## 核心理念

**Product Context 是产品/商业决策文档，不是技术文档。**

```
.product/  = 决策层（WHY、WHAT）  → 产品/商业决策
AGENTS.md  = 操作层（HOW）        → 技术实现细节
```

## 文件结构

```
.product/
├── VISION.md       # 为什么做（核心）
├── USERS.md        # 给谁做（核心）
├── SCOPE.md        # 做什么/不做什么（核心）
├── ROADMAP.md      # 时间轴 + Decision Log（核心）
├── BRAND.md        # 怎么说（扩展）
├── MARKETING.md    # 用户从哪来（扩展）
├── BUSINESS.md     # 钱从哪来（扩展）
└── OPS.md          # 怎么运行（扩展）
```

**4 + 4 结构**：
- **核心 4**：VISION → USERS → SCOPE → ROADMAP（按顺序定义）
- **扩展 4**：BRAND | MARKETING | BUSINESS | OPS（并列，按需添加）

## 命令

### /product init

初始化 `.product/` 目录。

**执行流程**：

1. **检查 .product/ 目录**
   - 已存在 → 询问：补充缺失文件 / 重置 / 取消
   - 不存在 → 继续

2. **创建核心 4 文件**（按顺序引导）
   - "产品解决什么问题？" → VISION.md
   - "目标用户是谁？痛点？" → USERS.md
   - "核心功能？明确不做什么？" → SCOPE.md
   - "当前阶段？下一步？" → ROADMAP.md

3. **更新 CLAUDE.md**
   - 不存在 → 创建，包含 Product Context section
   - 已存在 → 检查是否有 `## Product Context`
     - 没有 → 追加到文件末尾
     - 有 → 跳过

**追加到 CLAUDE.md 的内容**：

```markdown

## Product Context

本项目使用 `.product/` 管理产品决策（愿景、用户、范围、路线图）。
用户可能会调用 `/product` 更新产品文档。
```

### /product

分析当前对话，智能更新 `.product/` 文件。

**执行流程**：

1. **读取 .product/ 所有文件**

2. **分析对话历史**，识别产品层面的变化：
   - 产品方向/定位变化 → VISION.md
   - 用户理解变化 → USERS.md
   - 功能边界变化（新增功能/不做什么） → SCOPE.md
   - 里程碑完成/重要决策 → ROADMAP.md
   - 品牌调性讨论 → BRAND.md（如存在）
   - 获客策略讨论 → MARKETING.md（如存在）
   - 商业模式讨论 → BUSINESS.md（如存在）
   - 基础设施决策 → OPS.md（如存在）

3. **展示变更**
   - 列出需要更新的文件
   - 展示具体的 diff（旧 → 新）
   - 如果讨论了某话题但对应扩展文件不存在，提议创建

4. **用户确认**
   - 确认 → 执行更新
   - 拒绝 → 取消
   - 部分确认 → 只更新选中的

5. **结束提示**
   ```
   已更新 .product/ROADMAP.md, .product/SCOPE.md

   下次完成里程碑或做出重要决策后，可以再次运行 /product
   ```

**智能判断原则**：
- 只识别**产品/商业层面**的变化
- 技术实现细节不触发更新
- 没有变化时，告知用户"本次对话没有需要更新的产品决策"

## 文件职责

| 文件 | 回答的问题 |
|------|-----------|
| VISION.md | 为什么做？使命、愿景、价值主张 |
| USERS.md | 给谁做？用户画像、痛点、场景 |
| SCOPE.md | 做什么？功能边界、非目标 |
| ROADMAP.md | 什么时候？阶段、里程碑、Decision Log |
| BRAND.md | 怎么说？调性、风格、用词 |
| MARKETING.md | 用户从哪来？获客渠道、策略 |
| BUSINESS.md | 钱从哪来？定价、商业模式 |
| OPS.md | 怎么运行？基础设施、成本 |

## 与 AGENTS.md / CLAUDE.md 的关系

| .product/ | AGENTS.md / CLAUDE.md |
|-----------|----------------------|
| 决策（选什么、为什么） | 操作（怎么做） |
| 产品愿景 | 构建命令 |
| 商业逻辑 | 技术规范 |
| "用 Vercel"（决策） | "如何部署到 Vercel"（操作） |

## 注意事项

1. **用户主导** — 不主动提议更新，等用户调用 `/product`
2. **展示 diff** — 修改前必须展示变更内容，用户确认后执行
3. **决策 vs 操作** — 只记录产品/商业决策，技术细节放 AGENTS.md
4. **版本控制** — 这些文件应该和代码一起提交
