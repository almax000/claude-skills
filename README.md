# Product Context

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

Create `.product/` in your project:

```
.product/
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
cp -r product-context/templates/minimal/.product your-project/
```

### Option 3: Claude Code Skill

```
/product init
```

## File Structure: 4 + 4

```
┌─────────────────────────────────────────────────────────────┐
│  VISION → USERS → SCOPE → ROADMAP                           │
│  (Core 4: Define at project start)                          │
├─────────────────────────────────────────────────────────────┤
│  BRAND → MARKETING → BUSINESS → OPS                         │
│  (Extension 4: Add as needed during execution)              │
└─────────────────────────────────────────────────────────────┘
```

### Core 4 (Required)

| File | Question | Content |
|------|----------|---------|
| `VISION.md` | Why? | Mission, vision, value proposition |
| `USERS.md` | For whom? | User personas, pain points, scenarios |
| `SCOPE.md` | What? | Features, non-goals, constraints |
| `ROADMAP.md` | When? | Phases, milestones, decision log |

### Extension 4 (Add as needed)

| File | Question | When to Add |
|------|----------|-------------|
| `BRAND.md` | How to speak? | When you need consistent voice & tone |
| `MARKETING.md` | Where from? | When planning user acquisition |
| `BUSINESS.md` | How to earn? | When defining pricing & monetization |
| `OPS.md` | How to run? | When making infrastructure decisions |

> **Tip**: Start with the Core 4. Add extensions when the conversation naturally goes there.

## Supported AI Tools

| Tool | Integration |
|------|-------------|
| **Claude Code** | Skill + CLAUDE.md template |
| **Cursor** | .cursorrules template |
| **GitHub Copilot** | copilot-instructions.md template |
| **OpenAI Codex CLI** | AGENTS.md template |
| **Windsurf** | .windsurf/rules template |
| **Universal** | AGENTS.md (OpenSkills compatible) |

See `agents/` for integration guides.

## Relationship to AGENTS.md

Product Context and `AGENTS.md` are **complementary**:

```
.product/  = Decision layer (WHY, WHAT)  → Product/business decisions
AGENTS.md  = Operation layer (HOW)       → Technical implementation
```

| .product/ | AGENTS.md |
|-----------|-----------|
| Why write this code | How to write code |
| Business logic | Technical specs |
| Brand voice | Coding style |
| Product vision | Build commands |
| "Use Vercel" (decision) | "How to deploy to Vercel" (operation) |

Add a reference in your `AGENTS.md`:

```markdown
## Product Context
See `.product/` for product decisions.
Always read `.product/VISION.md` + `SCOPE.md` before implementing major features.
```

## Design Principles

1. **Minimal** - 4 core files, 5 minutes to learn
2. **Progressive** - Start small, add files as needed
3. **Decision-focused** - `.product/` = decisions (WHY/WHAT), `AGENTS.md` = operations (HOW)
4. **Markdown-first** - Human readable, AI parseable
5. **VCS-friendly** - Code and decisions in the same commit
6. **Tool-agnostic** - Works with any AI coding assistant

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
├── .github/            # GitHub workflows
├── media/              # Logo, images
├── docs/               # Documentation
│   ├── specification.md
│   ├── methodology.md
│   └── guides/
├── templates/          # Project templates
│   ├── minimal/
│   ├── saas/
│   ├── indie-game/
│   └── open-source/
├── agents/             # AI tool integrations
│   ├── claude-code/
│   ├── cursor/
│   ├── codex/
│   ├── windsurf/
│   ├── copilot/
│   └── universal/
├── spec/               # Format specifications
│   └── v1/
├── AGENTS.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
