# Getting Started with Product Context

## Quick Start (5 minutes)

### Step 1: Create the Directory

```bash
mkdir .product
```

### Step 2: Create the Files

Create these 4 files in `.product/`:

**VISION.md**
```markdown
# My Product

## One-line Description
[What is this?]

## Target Users
[Who uses this?]

## Core Value Proposition
[Why choose this?]

## Core Features
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## Non-Goals
- [What we don't do]
```

**ROADMAP.md**
```markdown
# Roadmap

## Current Phase
MVP

## Milestones

### Phase 1: MVP
- [ ] Task 1
- [ ] Task 2
```

**BRAND.md**
```markdown
# Brand Guidelines

## Tone of Voice
[Friendly / Professional / Casual]

## User Address
[You / Dear user / etc.]

## Keywords
- [preferred word 1]
- [preferred word 2]

## Forbidden Words
- [avoid this]
```

**MEMO.md**
```markdown
# Current Status

**Updated**: [date]

## Last Session
[What was done last time]

## Current Task
[What we're working on]

## Next Steps
[What to do next]
```

### Step 3: Integrate with Your AI Tool

Choose your tool and follow the integration guide in `agents/`:

- **Claude Code**: See `agents/claude-code/README.md`
- **Cursor**: See `agents/cursor/README.md`
- **GitHub Copilot**: See `agents/copilot/README.md`
- **Others**: See `agents/universal/README.md`

## Using Templates

Copy a pre-built template:

```bash
# Minimal template
cp -r product-context/templates/minimal/.product your-project/

# SaaS template
cp -r product-context/templates/saas/.product your-project/

# Indie game template
cp -r product-context/templates/indie-game/.product your-project/

# Open source template
cp -r product-context/templates/open-source/.product your-project/
```

## Tips

1. **Start minimal** - You can always add more later
2. **Keep VISION.md stable** - Only update when direction changes
3. **Update MEMO.md frequently** - It's the session memory
4. **Commit with code** - Product docs evolve with the codebase
