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

1. **Before implementing features**: Read `.product/VISION.md` + `SCOPE.md`
2. **When writing user-facing text**: Follow `.product/BRAND.md` (if exists)
3. **Check priorities**: Read `.product/ROADMAP.md` for current phase
4. **Check non-goals**: Features in SCOPE.md "Non-Goals" should be flagged

## Decision vs Operation

| .product/ | This file (AGENTS.md) |
|-----------|----------------------|
| Decisions (what, why) | Operations (how) |
| Product vision | Build commands |
| Business logic | Technical specs |
