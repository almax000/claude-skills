# Product Context

[English](README.md) | [中文](README.zh.md)

> Give your AI the product context it deserves.

**Product Context** is a minimalist specification for managing product documentation in AI-assisted development. A set of Markdown files let AI understand not just your code, but your business goals.

## Why?

AI coding assistants (Claude, Cursor, Copilot) are powerful, but they only understand **code**:

- They know how to write code, but not **why**
- They follow coding standards, but don't know **for whom**
- They generate features, but don't know if they fit the **product vision**

`AGENTS.md` and `CLAUDE.md` solved code context. Product Context fills the **product gap**.

## Quick Start

### Option 1: Manual Setup

Create `.claude/product/` in your project:

```
.claude/product/
├── VISION.md       # Why: Mission, vision, value proposition
├── USERS.md        # Who: User personas, pain points, scenarios
├── SCOPE.md        # What: Features, non-goals
└── ROADMAP.md      # When: Phases, milestones, decision log
```

### Option 2: Use Templates

```bash
# Clone the repo
git clone https://github.com/almax000/product-context.git

# Copy a template to your project
cp -r product-context/templates/minimal/.claude/product your-project/.claude/
```

### Option 3: AI Coding Assistant

```bash
# Claude Code / Gemini CLI
ln -s /path/to/product-context/skills/claude-code ~/.claude/skills/product

# Then in your project
/product init
```

See [`skills/`](skills/) for all supported AI tools.

## File Structure

```
┌─────────────────────────────────────────────────────────────┐
│  ROADMAP.md  ← The center of everything                    │
│  ────────────────────────────────────────────────────────   │
│  VISION.md    Why are we building this?                    │
│  USERS.md     Who are we building for?                     │
│  SCOPE.md     What are we building (and not building)?     │
├─────────────────────────────────────────────────────────────┤
│  + Extend freely: BRAND.md, MARKETING.md, BUSINESS.md...   │
└─────────────────────────────────────────────────────────────┘
```

### Core 4 Files

| File | Question | Content |
|------|----------|---------|
| `ROADMAP.md` | **When & Why?** | **Phases, milestones, decision log — the living center** |
| `VISION.md` | Why? | Mission, vision, value proposition |
| `USERS.md` | For whom? | User personas, pain points, scenarios |
| `SCOPE.md` | What? | Features, non-goals, constraints |

**ROADMAP.md is the heartbeat** — it tracks what's happening now, what's next, and why decisions were made. The other files provide stable context.

### Extensions (Add as needed)

Add any files that make sense for your product:

| File | Question | When to Add |
|------|----------|-------------|
| `BRAND.md` | How to speak? | When you need consistent voice & tone |
| `MARKETING.md` | Where from? | When planning user acquisition |
| `BUSINESS.md` | How to earn? | When defining pricing & monetization |
| `OPS.md` | How to run? | When making infrastructure decisions |
| `METRICS.md` | How to measure? | When defining success metrics |
| `COMPETITORS.md` | Who else? | When analyzing market landscape |

> **Tip**: Start with the Core 4. Add extensions when the conversation naturally goes there.

## Supported AI Tools

| Tool | Format | Location |
|------|--------|----------|
| **Claude Code** | SKILL.md | [`skills/claude-code/`](skills/claude-code/) |
| **Gemini CLI** | SKILL.md | [`skills/gemini-cli/`](skills/gemini-cli/) |
| **GitHub Copilot** | SKILL.md (experimental) | [`skills/github-copilot/`](skills/github-copilot/) |
| **Cursor** | .mdc rules | [`skills/cursor/`](skills/cursor/) |
| **Windsurf** | rules | [`skills/windsurf/`](skills/windsurf/) |
| **Continue.dev** | rules | [`skills/continue/`](skills/continue/) |
| **Cline** | Memory Bank | [`skills/cline/`](skills/cline/) |
| **Aider** | CONVENTIONS.md | [`skills/aider/`](skills/aider/) |
| **OpenAI Codex** | AGENTS.md | [`skills/codex/`](skills/codex/) |

## Relationship to AGENTS.md

Product Context and `AGENTS.md` are **complementary**:

```
.claude/product/  = Decision layer (WHY, WHAT)  → Product/business decisions
AGENTS.md         = Operation layer (HOW)       → Technical implementation
```

| .claude/product/ | AGENTS.md |
|------------------|-----------|
| Why write this code | How to write code |
| Business logic | Technical specs |
| Brand voice | Coding style |
| Product vision | Build commands |
| "Use Vercel" (decision) | "How to deploy to Vercel" (operation) |

Add a reference in your `AGENTS.md`:

```markdown
## Product Context
See `.claude/product/` for product decisions.
Always read `ROADMAP.md` before implementing major features.
```

## Design Principles

1. **Minimal** - 4 core files, 5 minutes to learn
2. **Progressive** - Start small, add files as needed
3. **ROADMAP-centric** - The roadmap is the living document; others provide context
4. **Decision-focused** - `.claude/product/` = decisions (WHY/WHAT), `AGENTS.md` = operations (HOW)
5. **Markdown-first** - Human readable, AI parseable
6. **VCS-friendly** - Code and decisions in the same commit
7. **Tool-agnostic** - Works with any AI coding assistant

## Who Is This For?

**If you're the only person building, shipping, and selling your product — this is for you.**

Also works for:
- Small teams where AI does the heavy lifting
- Open source maintainers who want contributors to understand the vision

### Not For

- Libraries/frameworks (use `AGENTS.md` for technical docs)
- One-off scripts
- Pure marketing sites (only `BRAND.md` applies)

## Project Structure

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**For AI contributors:**
- This is a specification project, not a product
- Changes should maintain backwards compatibility
- Skills should work with their target AI tools

## License

MIT
