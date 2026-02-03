<div align="center">

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗    ║
║   ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝    ║
║   ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║       ║
║   ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║       ║
║   ██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║       ║
║   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝       ║
║                                                                   ║
║    ██████╗ ██████╗ ███╗   ██╗████████╗███████╗██╗  ██╗████████╗  ║
║   ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝  ║
║   ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗   ╚███╔╝    ██║     ║
║   ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗    ██║     ║
║   ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██╔╝ ██╗   ██║     ║
║    ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![9 AI Tools](https://img.shields.io/badge/AI%20工具-9%20个支持-blue.svg)](#-支持的-ai-工具)
[![Markdown](https://img.shields.io/badge/格式-Markdown-orange.svg)](#-4-文件系统)

### **Repository is all you need.**

*你的仓库就是你的公司。4 个 Markdown 文件 = 完整的产品上下文。*

[English](README.md) | [中文](README.zh.md)

</div>

---

## 🎯 问题

AI 能写代码，但不理解你的**产品**：

| AI 知道的 | AI 不知道的 |
|----------|------------|
| 怎么写代码 | **为什么**写这段代码 |
| 编码规范 | **为谁**写 |
| 技术模式 | **产品愿景**是什么 |

`AGENTS.md` 解决了代码上下文。**Product Context** 填补了产品层面的空白。

---

## 💡 解决方案

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   📦  4 个 Markdown 文件 = 完整的产品上下文                   │
│                                                             │
│   VISION.md   →  我们为什么要做这个？                        │
│   USERS.md    →  我们为谁而做？                              │
│   SCOPE.md    →  我们要做什么（以及不做什么）？                │
│   ROADMAP.md  →  什么时候？下一步？决策记录。                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

<details>
<summary><strong>方式一：手动创建</strong>（推荐）</summary>

在项目中创建 `.claude/product/` 目录：

```
.claude/product/
├── VISION.md       # Why: 使命、愿景、价值主张
├── USERS.md        # Who: 用户画像、痛点、使用场景
├── SCOPE.md        # What: 功能范围、非目标
└── ROADMAP.md      # When: 阶段规划、里程碑、决策记录
```

</details>

<details>
<summary><strong>方式二：使用模板</strong></summary>

```bash
git clone https://github.com/almax000/product-context.git
cp -r product-context/templates/minimal/.claude/product your-project/.claude/
```

可用模板：`minimal`、`saas`、`indie-game`、`open-source`

</details>

<details>
<summary><strong>方式三：AI 编程助手</strong></summary>

```bash
# Claude Code / Gemini CLI
ln -s /path/to/product-context/skills/claude-code ~/.claude/skills/product

# 然后在你的项目中执行
/product init
```

查看 [`skills/`](skills/) 了解所有支持的 AI 工具。

</details>

---

## 📁 4 文件系统

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 ROADMAP.md  ← 心跳                                       │
│  ────────────────────────────────────────────────────────   │
│  💭 VISION.md    我们为什么要做这个？                         │
│  👥 USERS.md     我们为谁而做？                               │
│  📋 SCOPE.md     我们要做什么（以及不做什么）？                │
├─────────────────────────────────────────────────────────────┤
│  ➕ 自由扩展: BRAND.md, MARKETING.md, BUSINESS.md...         │
└─────────────────────────────────────────────────────────────┘
```

### 核心文件

| 文件 | 问题 | 内容 |
|------|------|------|
| `ROADMAP.md` | **何时 & 为何？** | 阶段、里程碑、决策记录 — 活的中心 |
| `VISION.md` | 为什么？ | 使命、愿景、价值主张 |
| `USERS.md` | 为谁？ | 用户画像、痛点、使用场景 |
| `SCOPE.md` | 做什么？ | 功能范围、非目标、约束条件 |

### 扩展文件（按需添加）

| 文件 | 用途 | 何时添加 |
|------|------|----------|
| `BRAND.md` | 品牌声音 | 需要统一的沟通风格时 |
| `MARKETING.md` | 用户获取 | 规划增长策略时 |
| `BUSINESS.md` | 定价与变现 | 定义商业模式时 |
| `OPS.md` | 基础设施决策 | DevOps 规划时 |
| `METRICS.md` | 成功指标 | 衡量结果时 |

---

## 🤖 支持的 AI 工具

| 工具 | 格式 | 状态 |
|:-----|:-----|:----:|
| ![Claude](https://img.shields.io/badge/Claude_Code-SKILL.md-orange) | [`skills/claude-code/`](skills/claude-code/) | ✅ |
| ![Gemini](https://img.shields.io/badge/Gemini_CLI-SKILL.md-blue) | [`skills/gemini-cli/`](skills/gemini-cli/) | ✅ |
| ![Copilot](https://img.shields.io/badge/GitHub_Copilot-SKILL.md-purple) | [`skills/github-copilot/`](skills/github-copilot/) | 🧪 |
| ![Cursor](https://img.shields.io/badge/Cursor-.mdc-green) | [`skills/cursor/`](skills/cursor/) | ✅ |
| ![Windsurf](https://img.shields.io/badge/Windsurf-rules-teal) | [`skills/windsurf/`](skills/windsurf/) | ✅ |
| ![Continue](https://img.shields.io/badge/Continue.dev-rules-yellow) | [`skills/continue/`](skills/continue/) | ✅ |
| ![Cline](https://img.shields.io/badge/Cline-Memory_Bank-red) | [`skills/cline/`](skills/cline/) | ✅ |
| ![Aider](https://img.shields.io/badge/Aider-CONVENTIONS.md-pink) | [`skills/aider/`](skills/aider/) | ✅ |
| ![Codex](https://img.shields.io/badge/OpenAI_Codex-AGENTS.md-gray) | [`skills/codex/`](skills/codex/) | ✅ |

---

## 💭 理念：Repository is all you need

> *"Attention is all you need"* 改变了 AI。
> *"Repository is all you need"* 改变了超级个体的工作方式。

作为一个**超级个体**，你的仓库就是你的公司：

| 传统公司 | 你的仓库 |
|---------|---------|
| 融资 PPT | `VISION.md` |
| 用户调研 | `USERS.md` |
| 产品规格说明书 | `SCOPE.md` |
| 董事会会议纪要 | `ROADMAP.md` |
| 知识库 | Git history |
| 团队沟通 | Commit messages |

**不需要 Notion。不需要 Confluence。不需要 Jira。只需要 Git。**

你的仓库包含：
- ✅ 代码（你交付什么）
- ✅ 产品决策（为什么交付）
- ✅ 历史记录（如何走到这里）
- ✅ AI 上下文（AI 如何帮你更快交付）

---

## 🔗 与 AGENTS.md 的关系

Product Context 和 `AGENTS.md` 是**互补的层次**：

```
.claude/product/  = 决策层 (WHY, WHAT)  → 产品决策
AGENTS.md         = 执行层 (HOW)        → 技术实现
```

| Product Context | AGENTS.md |
|-----------------|-----------|
| 为什么写这段代码 | 怎么写代码 |
| 商业逻辑 | 技术规范 |
| 产品愿景 | 构建命令 |
| "使用 Vercel"（决策） | "如何部署"（操作） |

---

## 📐 设计原则

1. **极简** — 4 个核心文件，5 分钟上手
2. **渐进** — 从小处开始，按需添加
3. **路线图中心** — ROADMAP 是活文档
4. **聚焦决策** — WHY/WHAT 在这里，HOW 在 AGENTS.md
5. **Markdown 优先** — 人类可读，AI 可解析
6. **版本控制友好** — 代码和决策在同一个提交中
7. **工具无关** — 适用于任何 AI 编程助手

---

## 👤 适合谁用？

**如果你是独自构建、发布、销售产品的人 — 这就是为你准备的。**

也适用于：
- AI 承担大量工作的小团队
- 希望贡献者理解愿景的开源维护者

### 不适合

- 库/框架（使用 `AGENTS.md`）
- 一次性脚本
- 纯营销网站

---

## 📂 项目结构

```
product-context/
├── skills/             # AI 工具配置
│   ├── claude-code/    # SKILL.md
│   ├── gemini-cli/     # SKILL.md
│   ├── github-copilot/ # SKILL.md（实验性）
│   ├── cursor/         # .mdc rules
│   ├── windsurf/       # rules
│   ├── continue/       # rules
│   ├── cline/          # Memory Bank
│   ├── aider/          # CONVENTIONS.md
│   └── codex/          # AGENTS.md
├── templates/          # 项目模板
│   ├── minimal/
│   ├── saas/
│   ├── indie-game/
│   └── open-source/
└── README.md
```

---

## 🤝 贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献指南。

**AI 贡献者须知：**
- 这是一个规范项目，不是产品
- 修改应保持向后兼容
- Skills 应能在目标 AI 工具中正常工作

---

<div align="center">

**MIT License** · 为超级个体而生

*Repository is all you need.*

</div>
