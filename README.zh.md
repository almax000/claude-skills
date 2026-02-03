# Product Context

[English](README.md) | [中文](README.zh.md)

> 让你的 AI 真正理解产品背景。

**Product Context** 是一套极简的产品文档规范，专为 AI 辅助开发设计。通过几个 Markdown 文件，让 AI 不仅理解你的代码，更理解你的商业目标。

## 为什么需要它？

AI 编程助手（Claude、Cursor、Copilot）很强大，但它们只理解**代码**：

- 它们知道怎么写代码，但不知道**为什么**写
- 它们遵循编码规范，但不知道**为谁**而写
- 它们能生成功能，但不知道是否符合**产品愿景**

`AGENTS.md` 和 `CLAUDE.md` 解决了代码上下文的问题。Product Context 填补了**产品层面的空白**。

## 快速开始

### 方式一：手动创建

在项目中创建 `.claude/product/` 目录：

```
.claude/product/
├── VISION.md       # Why: 使命、愿景、价值主张
├── USERS.md        # Who: 用户画像、痛点、使用场景
├── SCOPE.md        # What: 功能范围、非目标
└── ROADMAP.md      # When: 阶段规划、里程碑、决策记录
```

### 方式二：使用模板

```bash
# 克隆仓库
git clone https://github.com/almax000/product-context.git

# 复制模板到你的项目
cp -r product-context/templates/minimal/.claude/product your-project/.claude/
```

### 方式三：AI 编程助手

```bash
# Claude Code / Gemini CLI
ln -s /path/to/product-context/skills/claude-code ~/.claude/skills/product

# 然后在你的项目中执行
/product init
```

查看 [`skills/`](skills/) 了解所有支持的 AI 工具。

## 文件结构

```
┌─────────────────────────────────────────────────────────────┐
│  ROADMAP.md  ← 一切的中心                                    │
│  ────────────────────────────────────────────────────────   │
│  VISION.md    我们为什么要做这个？                            │
│  USERS.md     我们为谁而做？                                  │
│  SCOPE.md     我们要做什么（以及不做什么）？                    │
├─────────────────────────────────────────────────────────────┤
│  + 自由扩展: BRAND.md, MARKETING.md, BUSINESS.md...          │
└─────────────────────────────────────────────────────────────┘
```

### 核心 4 文件

| 文件 | 问题 | 内容 |
|------|------|------|
| `ROADMAP.md` | **何时 & 为何？** | **阶段、里程碑、决策记录 — 活的中心** |
| `VISION.md` | 为什么？ | 使命、愿景、价值主张 |
| `USERS.md` | 为谁？ | 用户画像、痛点、使用场景 |
| `SCOPE.md` | 做什么？ | 功能范围、非目标、约束条件 |

**ROADMAP.md 是心跳** — 它记录当前进展、下一步计划，以及决策的原因。其他文件提供稳定的背景信息。

### 扩展文件（按需添加）

根据产品需要添加任何有意义的文件：

| 文件 | 问题 | 何时添加 |
|------|------|----------|
| `BRAND.md` | 如何表达？ | 需要统一的品牌声音和语调时 |
| `MARKETING.md` | 从哪获客？ | 规划用户获取策略时 |
| `BUSINESS.md` | 如何盈利？ | 定义定价和变现模式时 |
| `OPS.md` | 如何运维？ | 做基础设施决策时 |
| `METRICS.md` | 如何衡量？ | 定义成功指标时 |
| `COMPETITORS.md` | 谁是对手？ | 分析市场格局时 |

> **提示**：从核心 4 文件开始。当对话自然涉及到其他方面时再添加扩展文件。

## 支持的 AI 工具

| 工具 | 格式 | 位置 |
|------|------|------|
| **Claude Code** | SKILL.md | [`skills/claude-code/`](skills/claude-code/) |
| **Gemini CLI** | SKILL.md | [`skills/gemini-cli/`](skills/gemini-cli/) |
| **GitHub Copilot** | SKILL.md（实验性） | [`skills/github-copilot/`](skills/github-copilot/) |
| **Cursor** | .mdc rules | [`skills/cursor/`](skills/cursor/) |
| **Windsurf** | rules | [`skills/windsurf/`](skills/windsurf/) |
| **Continue.dev** | rules | [`skills/continue/`](skills/continue/) |
| **Cline** | Memory Bank | [`skills/cline/`](skills/cline/) |
| **Aider** | CONVENTIONS.md | [`skills/aider/`](skills/aider/) |
| **OpenAI Codex** | AGENTS.md | [`skills/codex/`](skills/codex/) |

## 与 AGENTS.md 的关系

Product Context 和 `AGENTS.md` 是**互补的**：

```
.claude/product/  = 决策层 (WHY, WHAT)  → 产品/商业决策
AGENTS.md         = 执行层 (HOW)        → 技术实现
```

| .claude/product/ | AGENTS.md |
|------------------|-----------|
| 为什么写这段代码 | 怎么写代码 |
| 商业逻辑 | 技术规范 |
| 品牌声音 | 编码风格 |
| 产品愿景 | 构建命令 |
| "使用 Vercel"（决策） | "如何部署到 Vercel"（操作） |

在你的 `AGENTS.md` 中添加引用：

```markdown
## 产品上下文
参见 `.claude/product/` 了解产品决策。
在实现重要功能前，务必先阅读 `ROADMAP.md`。
```

## 设计原则

1. **极简** - 4 个核心文件，5 分钟上手
2. **渐进** - 从小处开始，按需添加
3. **路线图中心** - ROADMAP 是活文档；其他文件提供上下文
4. **聚焦决策** - `.claude/product/` = 决策（WHY/WHAT），`AGENTS.md` = 操作（HOW）
5. **Markdown 优先** - 人类可读，AI 可解析
6. **版本控制友好** - 代码和决策在同一个提交中
7. **工具无关** - 适用于任何 AI 编程助手

## 适合谁用？

**如果你是独自构建、发布、销售产品的人 — 这就是为你准备的。**

也适用于：
- AI 承担大量工作的小团队
- 希望贡献者理解愿景的开源维护者

### 不适合

- 库/框架（使用 `AGENTS.md` 编写技术文档）
- 一次性脚本
- 纯营销网站（只需要 `BRAND.md`）

## 项目结构

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

## 贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献指南。

**AI 贡献者须知：**
- 这是一个规范项目，不是产品
- 修改应保持向后兼容
- Skills 应能在目标 AI 工具中正常工作

## 许可证

MIT
