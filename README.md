# Product Context

> Give your AI the product context it deserves.

**Product Context** is a minimalist specification for managing product documentation in AI-assisted development. Four Markdown files let AI understand not just your code, but your business goals.

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
├── VISION.md       # Product vision (what, who, why)
├── ROADMAP.md      # Development phases
├── BRAND.md        # Tone and style
└── MEMO.md         # Session memory
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

## Core Files

| File | Purpose | AI Uses It For |
|------|---------|----------------|
| `VISION.md` | Product soul | Feature decisions, saying "no" to out-of-scope |
| `ROADMAP.md` | Development path | Prioritization, current phase focus |
| `BRAND.md` | Voice & tone | UI text, error messages, documentation |
| `MEMO.md` | Session memory | "We finished auth yesterday, continue with payment today" |

> **Tip**: Start with just `VISION.md`. Add others as your project grows.

### Optional Extensions

For projects that need more context, you can add:

| File | When to Add |
|------|-------------|
| `OPS.md` | Deployment, costs, monetization |
| `COMPETITORS.md` | Market positioning |
| `METRICS.md` | Success criteria, KPIs |

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

| AGENTS.md | .product/ |
|-----------|-----------|
| How to write code | Why write this code |
| Technical specs | Business logic |
| Coding style | Brand voice |
| Build commands | Product vision |

Add a reference in your `AGENTS.md`:

```markdown
## Product Context
See `.product/` for product vision, user personas, and brand guidelines.
Always read `.product/VISION.md` before implementing major features.
```

## Design Principles

1. **Minimal** - 4 files, 5 minutes to learn
2. **Markdown-first** - Human readable, AI parseable
3. **VCS-friendly** - Code and decisions in the same commit
4. **Tool-agnostic** - Works with any AI coding assistant

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
