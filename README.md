<div align="center">

# 📦 Product Context

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Markdown](https://img.shields.io/badge/Format-Markdown-orange.svg)](#the-4-files)

**Repository is all you need.**

[English](README.md) | [中文](README.zh.md)

</div>

---

## Why?

The industry loves complex workflows — connect this app to that service via MCP, automate everything, integrate all the tools.

But do you really need all that?

As a programmer, you already have the world's best "office software": **Git**. Version control, branching, collaboration, history, diff, blame — yet you only use it for code?

**Your repository can be your entire company.** Product vision, user research, roadmap, marketing copy — all in Markdown, all version-controlled, all accessible to your AI coding assistant.

No extra tools. No complex workflows. Just your repo.

---

## The 4 Files

```
.claude/product/
├── VISION.md    # Why: Mission, value proposition
├── USERS.md     # Who: User personas, pain points
├── SCOPE.md     # What: Features, non-goals
└── ROADMAP.md   # When: Phases, milestones, decisions
```

| File | Question | Content |
|------|----------|---------|
| `VISION.md` | Why build this? | Mission, vision, value proposition |
| `USERS.md` | For whom? | User personas, pain points, scenarios |
| `SCOPE.md` | What to build? | Features, non-goals, constraints |
| `ROADMAP.md` | What's next? | Current phase, milestones, decision log |

These 4 files are **recommendations**, not requirements. Add, remove, or rename as needed. Common extensions: `BRAND.md`, `MARKETING.md`, `BUSINESS.md`, `METRICS.md` — or create your own.

---

## Quick Start

### Option 1: Copy a Template

```bash
git clone https://github.com/almax000/product-context.git
cp -r product-context/templates/minimal/.claude your-project/
```

### Option 2: Claude Code Skill

**Via Plugin Marketplace:**
```
/plugin marketplace add almax000/product-context
/plugin install product
```

**Or manually:**
```bash
git clone https://github.com/almax000/product-context.git
cp -r product-context/skills/claude-code ~/.claude/skills/product
# Then run: /product init
```

---

## Templates

| Template | Best For |
|----------|----------|
| [`minimal/`](templates/minimal/) | Quick start, any project |
| [`saas/`](templates/saas/) | SaaS, subscription services |
| [`indie-game/`](templates/indie-game/) | Indie game development |
| [`open-source/`](templates/open-source/) | Open source projects |

---

## AI Tools

| Tool | Status |
|:-----|:------:|
| [Claude Code](skills/claude-code/) | ✅ Tested |
| [Cursor](skills/cursor/) | 📋 Untested |
| [Windsurf](skills/windsurf/) | 📋 Untested |
| [Continue](skills/continue/) | 📋 Untested |
| [Cline](skills/cline/) | 📋 Untested |
| [Aider](skills/aider/) | 📋 Untested |
| [Codex](skills/codex/) | 📋 Untested |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

<div align="center">

**MIT License** · For indie developers

</div>
