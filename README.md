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
[![9 AI Tools](https://img.shields.io/badge/AI%20Tools-9%20Supported-blue.svg)](#-supported-ai-tools)
[![Markdown](https://img.shields.io/badge/Format-Markdown-orange.svg)](#-the-4-file-system)

### **Repository is all you need.**

*Your repo IS your company. 4 Markdown files = Complete product context.*

[English](README.md) | [中文](README.zh.md)

</div>

---

## 🎯 The Problem

AI writes code, but doesn't understand your **product**:

| AI Knows | AI Doesn't Know |
|----------|-----------------|
| How to write code | **Why** this code exists |
| Coding standards | **Who** uses this product |
| Technical patterns | **What** the product vision is |

`AGENTS.md` solved code context. **Product Context** fills the product gap.

---

## 💡 The Solution

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   📦  4 Markdown files = Complete product context          │
│                                                             │
│   VISION.md   →  Why are we building this?                 │
│   USERS.md    →  Who are we building for?                  │
│   SCOPE.md    →  What are we building (and not building)?  │
│   ROADMAP.md  →  When? What's next? Decision log.          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

<details>
<summary><strong>Option 1: Manual Setup</strong> (recommended)</summary>

Create `.claude/product/` in your project:

```
.claude/product/
├── VISION.md       # Why: Mission, vision, value proposition
├── USERS.md        # Who: User personas, pain points, scenarios
├── SCOPE.md        # What: Features, non-goals
└── ROADMAP.md      # When: Phases, milestones, decision log
```

</details>

<details>
<summary><strong>Option 2: Use Templates</strong></summary>

```bash
git clone https://github.com/almax000/product-context.git
cp -r product-context/templates/minimal/.claude/product your-project/.claude/
```

Available templates: `minimal`, `saas`, `indie-game`, `open-source`

</details>

<details>
<summary><strong>Option 3: AI Coding Assistant</strong></summary>

```bash
# Claude Code / Gemini CLI
ln -s /path/to/product-context/skills/claude-code ~/.claude/skills/product

# Then in your project
/product init
```

See [`skills/`](skills/) for all supported AI tools.

</details>

---

## 📁 The 4-File System

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 ROADMAP.md  ← The heartbeat                             │
│  ────────────────────────────────────────────────────────   │
│  💭 VISION.md    Why are we building this?                  │
│  👥 USERS.md     Who are we building for?                   │
│  📋 SCOPE.md     What are we building (and not building)?   │
├─────────────────────────────────────────────────────────────┤
│  ➕ Extend freely: BRAND.md, MARKETING.md, BUSINESS.md...   │
└─────────────────────────────────────────────────────────────┘
```

### Core Files

| File | Question | Content |
|------|----------|---------|
| `ROADMAP.md` | **When & Why?** | Phases, milestones, decision log — the living center |
| `VISION.md` | Why? | Mission, vision, value proposition |
| `USERS.md` | For whom? | User personas, pain points, scenarios |
| `SCOPE.md` | What? | Features, non-goals, constraints |

### Extensions (Add as needed)

| File | Purpose | Add When |
|------|---------|----------|
| `BRAND.md` | Voice & tone | Need consistent communication |
| `MARKETING.md` | User acquisition | Planning growth strategy |
| `BUSINESS.md` | Pricing & monetization | Defining revenue model |
| `OPS.md` | Infrastructure decisions | DevOps planning |
| `METRICS.md` | Success metrics | Measuring outcomes |

---

## 🤖 Supported AI Tools

| Tool | Format | Ready |
|:-----|:-------|:-----:|
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

## 💭 Philosophy: Repository is all you need

> *"Attention is all you need"* transformed AI.
> *"Repository is all you need"* transforms how solo builders work.

As a **super individual**, your repository IS your company:

| Traditional Company | Your Repository |
|---------------------|-----------------|
| Pitch deck | `VISION.md` |
| Customer research | `USERS.md` |
| Product spec | `SCOPE.md` |
| Board meeting notes | `ROADMAP.md` |
| Knowledge base | Git history |
| Team communication | Commit messages |

**No Notion. No Confluence. No Jira. Just Git.**

Your repository contains:
- ✅ Code (what you ship)
- ✅ Product decisions (why you ship)
- ✅ History (how you got here)
- ✅ AI context (how AI helps you ship faster)

---

## 🔗 Relationship to AGENTS.md

Product Context and `AGENTS.md` are **complementary layers**:

```
.claude/product/  = Decision layer (WHY, WHAT)  → Product decisions
AGENTS.md         = Operation layer (HOW)       → Technical implementation
```

| Product Context | AGENTS.md |
|-----------------|-----------|
| Why write this code | How to write code |
| Business logic | Technical specs |
| Product vision | Build commands |
| "Use Vercel" (decision) | "How to deploy" (operation) |

---

## 📐 Design Principles

1. **Minimal** — 4 core files, 5 minutes to learn
2. **Progressive** — Start small, add files as needed
3. **ROADMAP-centric** — The roadmap is the living document
4. **Decision-focused** — WHY/WHAT here, HOW in AGENTS.md
5. **Markdown-first** — Human readable, AI parseable
6. **VCS-friendly** — Code and decisions in the same commit
7. **Tool-agnostic** — Works with any AI coding assistant

---

## 👤 Who Is This For?

**If you're the only person building, shipping, and selling your product — this is for you.**

Also great for:
- Small teams where AI does the heavy lifting
- Open source maintainers who want contributors to understand the vision

### Not For

- Libraries/frameworks (use `AGENTS.md`)
- One-off scripts
- Pure marketing sites

---

## 📂 Project Structure

```
product-context/
├── skills/             # AI tool configurations
│   ├── claude-code/    # SKILL.md
│   ├── gemini-cli/     # SKILL.md
│   ├── github-copilot/ # SKILL.md (experimental)
│   ├── cursor/         # .mdc rules
│   ├── windsurf/       # rules
│   ├── continue/       # rules
│   ├── cline/          # Memory Bank
│   ├── aider/          # CONVENTIONS.md
│   └── codex/          # AGENTS.md
├── templates/          # Project templates
│   ├── minimal/
│   ├── saas/
│   ├── indie-game/
│   └── open-source/
└── README.md
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**For AI contributors:**
- This is a specification project, not a product
- Changes should maintain backwards compatibility
- Skills should work with their target AI tools

---

<div align="center">

**MIT License** · Made for super individuals

*Repository is all you need.*

</div>
