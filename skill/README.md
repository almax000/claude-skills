# Product Context Skill

Claude Code skill for managing product context.

## Installation

### Option 1: Symlink (Recommended for development)

```bash
ln -s /path/to/product-context/skill ~/.claude/skills/product
```

### Option 2: Copy

```bash
cp -r /path/to/product-context/skill ~/.claude/skills/product
```

## Commands

| Command | Description |
|---------|-------------|
| `/product init` | Initialize `.product/` directory |
| `/product` | Analyze conversation and update product docs |

## Usage

1. Run `/product init` in your project
2. Fill in product information (VISION → USERS → SCOPE → ROADMAP)
3. After important discussions, run `/product` to capture decisions

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Skill definition with commands and guidelines |
