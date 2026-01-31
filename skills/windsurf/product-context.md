---
title: product-context
activation: Always On
---

# Product Context

This project uses `.product/` directory for product/business decisions.

## File Structure

- `.product/VISION.md` - Why: Mission, vision, value proposition
- `.product/USERS.md` - Who: User personas, pain points
- `.product/SCOPE.md` - What: Features, non-goals
- `.product/ROADMAP.md` - When: Phases, milestones, decision log
- `.product/BRAND.md` - Voice & tone (extension)
- `.product/MARKETING.md` - User acquisition (extension)
- `.product/BUSINESS.md` - Pricing & monetization (extension)
- `.product/OPS.md` - Infrastructure decisions (extension)

## Guidelines

1. Before implementing features, read `.product/VISION.md` + `SCOPE.md`
2. When writing user-facing text, follow `.product/BRAND.md` (if exists)
3. Check `.product/ROADMAP.md` for current priorities
4. Features in SCOPE.md "Non-Goals" should be flagged before implementing
