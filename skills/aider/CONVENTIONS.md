# Product Context Conventions

This project uses `.product/` directory for product/business decisions.

## File Structure

- `.product/VISION.md` - Why: Mission, vision, value proposition
- `.product/USERS.md` - Who: User personas, pain points
- `.product/SCOPE.md` - What: Features, non-goals
- `.product/ROADMAP.md` - When: Phases, milestones, decision log

## Extensions (add as needed)

- `.product/BRAND.md` - Voice & tone guidelines
- `.product/MARKETING.md` - User acquisition strategies
- `.product/BUSINESS.md` - Pricing & monetization
- `.product/OPS.md` - Infrastructure decisions

## Guidelines

1. Before implementing features, read `.product/VISION.md` + `SCOPE.md`
2. When writing user-facing text, follow `.product/BRAND.md` (if exists)
3. Check `.product/ROADMAP.md` for current priorities
4. Features in SCOPE.md "Non-Goals" should be flagged before implementing

## Decision vs Operation

- `.product/` = Decisions (what to build, why)
- `AGENTS.md` = Operations (how to build)
