---
name: product
description: |
  管理产品上下文。
  - /product init - 初始化产品文档
  - /product - 分析对话，更新产品文档
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

## Guidelines

1. **Before implementing features**: Read `.product/VISION.md` + `SCOPE.md`
2. **When writing user-facing text**: Follow `.product/BRAND.md` (if exists)
3. **Check priorities**: Read `.product/ROADMAP.md` for current phase
4. **Check non-goals**: Features in SCOPE.md "Non-Goals" should be flagged

## File Responsibilities

| File | Question |
|------|----------|
| VISION.md | Why? Mission, vision, value proposition |
| USERS.md | For whom? User personas, pain points |
| SCOPE.md | What? Features, non-goals |
| ROADMAP.md | When? Phases, milestones, decisions |
