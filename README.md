<div align="center">

# Claude Skills

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skills-blue.svg)](#skills)

**Battle-tested skills for Claude Code**

[English](README.md) | [中文](README.zh.md)

</div>

---

## What is this?

A personal collection of Claude Code skills - proven workflows and automation patterns extracted from real projects.

**Philosophy**: Skills are the entry point. Through skills, you can generate agents, hooks, and rules. Instead of sharing complex configurations, share skills that create them.

---

## Skills

| Skill | Description |
|-------|-------------|
| [`init-modular`](skills/init-modular/) | Initialize modular .claude/ with agents, hooks, and rules |
| [`product-context`](skills/product-context/) | Manage product documentation (`/product-init`, `/product`) |
| [`ui-spec`](skills/ui-spec/) | Manage UI spec documents with annotation workflow |

---

## Quick Start

### Installation

```bash
# Clone and copy skills to your Claude Code config
git clone https://github.com/almax000/claude-skills.git
cp -r claude-skills/skills/* ~/.claude/skills/
```

### Usage

#### init-modular

Set up a modular `.claude/` directory with agents, hooks, and rules:

```bash
/init-modular
```

Generates:

```
.claude/
├── agents/           # code-reviewer, debugger, 3-tier researchers
├── hooks/            # Error lesson reminders
├── rules/            # Code quality, git workflow
└── settings.json     # Hook configurations
```

#### product-context

Set up and manage product documentation:

```bash
/product-init    # Create product docs (VISION, USERS, SCOPE, ROADMAP)
/product         # View and update product context
```

#### ui-spec

Create and manage UI spec documents with interactive annotation workflow:

```bash
/ui-spec init       # Create UI spec with viewport toggle and annotation system
/ui-spec capture    # Generate screens from existing project source code
/ui-spec            # View current UI spec (opens in browser)
/ui-spec annotate   # Add annotation from conversation context
/ui-spec update     # Update screen content
/ui-spec add-screen # Add a new screen to a flow
```

---

## Design Principles

1. **Skills as entry point** - One thing to install, everything else is generated
2. **Battle-tested only** - Every skill comes from real project usage
3. **Self-contained** - Each skill works independently
4. **Generative over static** - Skills create configurations, not just copy files

---

## For Whom

| User | Benefit |
|------|---------|
| **Claude Code newbies** | Ready-to-use skills that just work |
| **Individual developers** | Save time with proven workflows |
| **Small teams** | Consistent practices across projects |

---

<div align="center">

**MIT License** · For independent developers

</div>
