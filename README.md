<div align="center">

# 📦 Product Context

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Markdown](https://img.shields.io/badge/Format-Markdown-orange.svg)](#the-4-files)

**Repository is all you need.**

*4 Markdown files = Complete product context for AI.*

[English](README.md) | [中文](README.zh.md)

</div>

---

## Why?

AI can write code, but doesn't understand your **product** — why it exists, who it's for, what to build next.

`AGENTS.md` handles code context. **Product Context** fills the product gap.

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

**Extensions** (add as needed): `BRAND.md`, `MARKETING.md`, `BUSINESS.md`, `METRICS.md`

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

**MIT License** · For solo builders & small teams

</div>
