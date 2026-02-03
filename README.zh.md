<div align="center">

# 📦 Product Context

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Markdown](https://img.shields.io/badge/格式-Markdown-orange.svg)](#4-个核心文件)

**Repository is all you need.**

*4 个 Markdown 文件，让 AI 理解你的产品。*

[English](README.md) | [中文](README.zh.md)

</div>

---

## 为什么需要这个？

AI 会写代码，但不懂你的**产品**——为什么做、给谁用、下一步做什么。

`AGENTS.md` 解决代码层面的问题，**Product Context** 解决产品层面的问题。

---

## 4 个核心文件

```
.claude/product/
├── VISION.md    # 为什么做：使命、价值主张
├── USERS.md     # 给谁用：用户画像、痛点
├── SCOPE.md     # 做什么：功能边界、不做的事
└── ROADMAP.md   # 怎么推进：阶段、里程碑、决策记录
```

| 文件 | 回答什么问题 | 包含什么 |
|------|-------------|---------|
| `VISION.md` | 为什么做这个？ | 使命、愿景、价值主张 |
| `USERS.md` | 给谁用？ | 用户画像、痛点、使用场景 |
| `SCOPE.md` | 做什么？ | 功能范围、明确不做的事 |
| `ROADMAP.md` | 下一步是什么？ | 当前阶段、里程碑、决策日志 |

**可选扩展**：`BRAND.md`、`MARKETING.md`、`BUSINESS.md`、`METRICS.md`

---

## 快速开始

### 方式一：复制模板

```bash
git clone https://github.com/almax000/product-context.git
cp -r product-context/templates/minimal/.claude your-project/
```

### 方式二：Claude Code 技能

```bash
ln -s /path/to/product-context/skills/claude-code ~/.claude/skills/product
# 然后执行：/product init
```

---

## 模板

| 模板 | 适合 |
|------|------|
| [`minimal/`](templates/minimal/) | 快速开始，通用项目 |
| [`saas/`](templates/saas/) | SaaS、订阅制产品 |
| [`indie-game/`](templates/indie-game/) | 独立游戏 |
| [`open-source/`](templates/open-source/) | 开源项目 |

---

## AI 工具支持

| 工具 | 状态 |
|:-----|:----:|
| [Claude Code](skills/claude-code/) | ✅ 已验证 |
| [Cursor](skills/cursor/) | 📋 待验证 |
| [Windsurf](skills/windsurf/) | 📋 待验证 |
| [Continue](skills/continue/) | 📋 待验证 |
| [Cline](skills/cline/) | 📋 待验证 |
| [Aider](skills/aider/) | 📋 待验证 |
| [Codex](skills/codex/) | 📋 待验证 |

---

## 参与贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

<div align="center">

**MIT License** · 为独立开发者和小团队而生

</div>
