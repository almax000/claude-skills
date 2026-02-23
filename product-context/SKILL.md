# Product Context

Manage product documentation in `.claude/product/` directory.

## Philosophy

**Repository Is All You Need**

Put product decisions where they belong - in your code repository. Version-controlled, AI-accessible, always in sync.

## Commands

| Command | Description |
|---------|-------------|
| `/product-init` | Initialize product documentation through guided conversation |
| `/product` | Update product docs based on current conversation |

## Directory Structure

```
.claude/product/
├── VISION.md    # Why: Mission, value proposition
├── USERS.md     # Who: User personas, pain points
├── SCOPE.md     # What: Features, non-goals
├── ROADMAP.md   # When: Phases, milestones, decisions
└── [extensions] # BRAND.md, MARKETING.md, etc.
```

## When to Use

- **Starting a project**: `/product-init` to create initial docs
- **After decisions**: `/product` to capture changes in conversation
- **Milestone reached**: `/product` to update ROADMAP.md
