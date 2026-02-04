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

---

## Quick Start

### Installation

```bash
# Clone and copy skills to your Claude Code config
git clone https://github.com/almax000/claude-skills.git
cp -r claude-skills/skills/* ~/.claude/skills/
```

### Usage

```bash
# In any project, run:
/init-modular    # Set up .claude/ structure
/product-init    # Set up product documentation
```

---

## What Gets Generated

When you run `/init-modular`, it creates:

```
.claude/
├── agents/           # Specialized AI agents
│   ├── code-reviewer.md
│   ├── debugger.md
│   └── *-researcher.md (3 tiers)
├── hooks/            # Automated triggers
│   └── error-lesson-*.sh
├── rules/            # Coding standards
│   ├── code-quality.md
│   └── git-workflow.md
└── settings.json     # Hook configurations
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

## Contributing

Have a skill that works well for you? Contributions welcome!

1. Fork the repository
2. Add your skill to `skills/`
3. Include a `SKILL.md` with clear instructions
4. Submit a pull request

---

<div align="center">

**MIT License** · For independent developers

</div>
