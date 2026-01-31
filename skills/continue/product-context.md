---
name: Product Context
globs: ["**/*"]
alwaysApply: false
description: Product context for business decisions. Use when working on features or product-related discussions.
---

# Product Context

This project uses `.product/` directory for product/business decisions.

## File Structure

```
.product/
├── VISION.md       # Why: Mission, vision, value proposition
├── USERS.md        # Who: User personas, pain points
├── SCOPE.md        # What: Features, non-goals
├── ROADMAP.md      # When: Phases, milestones, decision log
├── BRAND.md        # Voice & tone (extension)
├── MARKETING.md    # User acquisition (extension)
├── BUSINESS.md     # Pricing & monetization (extension)
└── OPS.md          # Infrastructure decisions (extension)
```

## Guidelines

1. Before implementing features, read `.product/VISION.md` + `SCOPE.md`
2. When writing user-facing text, follow `.product/BRAND.md` (if exists)
3. Check `.product/ROADMAP.md` for current priorities
4. Features in SCOPE.md "Non-Goals" should be flagged before implementing
