<div align="center">

# Claude Skills

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skills-blue.svg)](#skills)

**Battle-tested skills for Claude Code**

</div>

---

## What Are Claude Skills?

Skills are markdown files that teach Claude Code new workflows. Drop a skill into `~/.claude/skills/` and it becomes a slash command — no plugins, no config, no code.

Each skill in this collection solves a specific workflow gap in Claude Code, extracted from real daily usage.

---

## Skills

### Project Setup

- **[init-modular](./init-modular/)** — One command sets up agents, hooks, and rules in `.claude/`. Includes a 3-tier research team (Opus/Sonnet/Haiku), error-tracking hooks, and code quality rules.

### Product Management

- **[product-context](./product-context/)** — Guided conversation creates 4 product docs (Vision, Users, Scope, Roadmap) in your repo. AI auto-proposes updates when decisions are made.

### Design

- **[ui-spec](./ui-spec/)** — Interactive HTML design spec with built-in annotation system. Click elements to leave feedback, Claude reads annotations in spatial context and updates the design.

### Developer Tools

- **[port-manager](./port-manager/)** — Prevents localhost port conflicts across projects. A PreToolUse hook intercepts every Bash command and checks against a global registry. Zero-config after setup.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/almax000/claude-skills.git

# Copy a single skill
cp -r claude-skills/init-modular/ ~/.claude/skills/init-modular/

# Or copy all skills
for skill in claude-skills/*/; do
  [ -f "$skill/SKILL.md" ] && cp -r "$skill" ~/.claude/skills/
done
```

Each skill is self-contained — install only what you need.

---

## How It Works

1. Copy a skill folder to `~/.claude/skills/`
2. Restart Claude Code (or start a new session)
3. Use the slash command (e.g., `/init-modular`, `/product`, `/ui-spec`)

Skills contain:
- `SKILL.md` — Reference documentation Claude reads for context
- `{command}.md` — Slash command definition (has `user-invocable: true` frontmatter)
- Optional: scripts, templates, examples

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for submission guidelines.

---

<div align="center">

**MIT License** · Built for independent developers

</div>
