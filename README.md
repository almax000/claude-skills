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

**Philosophy**: Claude Code is powerful but has workflow gaps. These skills fill them — scaffolding project setup, giving AI persistent product memory, enabling visual design collaboration, and preventing runtime port conflicts. Each is extracted from real daily usage and works independently.

---

## Skills

| Skill | Description |
|-------|-------------|
| [`init-modular`](skills/init-modular/) | Initialize modular .claude/ with agents, hooks, and rules |
| [`product-context`](skills/product-context/) | Manage product documentation (`/product-init`, `/product`) |
| [`ui-spec`](skills/ui-spec/) | Manage UI spec documents with annotation workflow |
| [`port-manager`](skills/port-manager/) | Cross-project localhost port allocation with conflict prevention |

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

#### port-manager

Manage cross-project localhost port allocation with automatic conflict detection:

```bash
/port-manager           # Show global port status overview
/port-manager setup     # One-click install (hook, shell functions, registry)
/port-manager check 3000  # Check a specific port
/port-manager find 5    # Find 5 available ports
/port-manager reserve 9001 my-app "API server"  # Reserve a port
/port-manager release 9001  # Release a port
/port-manager scan      # Scan CLAUDE.md files to discover ports
```

Installs a PreToolUse hook that automatically blocks port conflicts:
- **Layer 1**: Detects explicit ports (`--port`, `PORT=`, `localhost:`)
- **Layer 2**: Detects indirect startup (`pnpm dev`) by reading vite.config, package.json, .env
- **Monorepo-aware**: Resolves project name from `.git`/`CLAUDE.md` up the directory tree

---

## Design Principles

1. **Fill real gaps** - Each skill addresses a specific workflow pain point in Claude Code
2. **Battle-tested** - Extracted from real project usage, not hypothetical scenarios
3. **Self-contained** - Each skill works independently; install only what you need
4. **AI-native** - Designed around how Claude Code works: hooks, file-based protocols, slash commands

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
