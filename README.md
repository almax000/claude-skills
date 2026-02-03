<div align="center">

# 📦 Product Context

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Markdown](https://img.shields.io/badge/Format-Markdown-orange.svg)](#the-4-files)

**Repository is all you need.**

[English](README.md) | [中文](README.zh.md)

</div>

---

## The Problem

As an indie developer, your product knowledge is scattered everywhere:

- Product vision → Notion
- User research → Google Docs
- Roadmap → Spreadsheet
- Marketing copy → Random notes
- Business model → Your head

Your AI coding assistant can't access any of it.

## The Solution

**Put everything in your repo.** 4 Markdown files, version-controlled, always available to AI.

```
.claude/product/
├── VISION.md    # Why: Mission, value proposition
├── USERS.md     # Who: User personas, pain points
├── SCOPE.md     # What: Features, non-goals
└── ROADMAP.md   # When: Phases, milestones, decisions
```

Now when you ask AI to "add a feature", it knows:
- **Why** the product exists
- **Who** it's for
- **What** to build (and what not to)
- **Where** you are in the roadmap

---

## Quick Start

### Option 1: Copy a Template

```bash
git clone https://github.com/almax000/product-context.git
cp -r product-context/templates/minimal/.claude your-project/
```

### Option 2: Claude Code Skill

```bash
ln -s /path/to/product-context/skills/claude-code ~/.claude/skills/product
# Then run: /product init
```

---

## The 4 Files

| File | Question | Content |
|------|----------|---------|
| `VISION.md` | Why build this? | Mission, vision, value proposition |
| `USERS.md` | For whom? | User personas, pain points, scenarios |
| `SCOPE.md` | What to build? | Features, non-goals, constraints |
| `ROADMAP.md` | What's next? | Current phase, milestones, decision log |

**Extensions** (add as needed): `BRAND.md`, `MARKETING.md`, `BUSINESS.md`, `METRICS.md`

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
