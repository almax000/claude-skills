# Claude Skills - Project Instructions

## Git Commit Rules

**MANDATORY:**
1. All commit messages MUST be in English
2. Before committing, show the proposed commit message to the user for approval
3. Only commit after receiving explicit user approval
4. Do NOT add "Co-Authored-By: Claude" lines to commit messages

## Project Info

- This is a Claude Code skills collection
- Primary language: English (with Chinese README translation)
- License: MIT

## Product Context

This project uses `.claude/product/` for product documentation.

| Document | Content |
|----------|---------|
| VISION.md | Skills as entry point to Claude Code customization |
| USERS.md | Claude Code newbies, individual devs, small teams |
| SCOPE.md | Skills only; agents/hooks/rules are generated |
| ROADMAP.md | Current phase and decision log |

## Directory Structure

```
skills/
├── init-modular/        # Initialize .claude/ structure
├── product-context/     # Manage product documentation
│   ├── SKILL.md
│   ├── product.md       # /product command
│   └── product-init.md  # /product-init command
└── ui-spec/             # UI spec management with annotations
    ├── SKILL.md         # Reference docs (HTML conventions, templates)
    ├── ui-spec.md       # /ui-spec command (7 modes)
    └── CONTEXT.md       # Development context & optimization roadmap
```
