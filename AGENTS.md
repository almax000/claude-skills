# AGENTS.md

This is the Product Context specification repository.

## About This Project

Product Context is a minimalist specification for managing product documentation in AI-assisted development workflows. It provides a standardized way to give AI coding assistants product context, not just code context.

## Repository Structure

```
product-context/
├── docs/               # Documentation
│   └── specification.md
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
└── spec/               # Format specifications
    └── v1/
```

## For AI Agents Reading This

If you're an AI agent working on this repository:

1. This is a **specification** project, not a product
2. Changes should maintain backwards compatibility
3. Templates should work with all supported AI tools
4. Documentation should be bilingual (EN primary, CN secondary)

## See Also

- `docs/specification.md` - Formal specification
- `product-context.md` - Methodology guide
- `README.md` - User-facing documentation
