# Product Context Templates

Choose the template that best fits your project type.

## Available Templates

### minimal/
**For**: Quick start for any project

The most minimal template with only essential fields, suitable for:
- Quickly validating ideas
- Not sure about project type
- Want full customization

```bash
cp -r templates/minimal/.product your-project/
```

### saas/
**For**: SaaS products, subscription services

Includes SaaS-specific fields like business model, pricing strategy:
- Business model design
- Conversion funnel
- Key metrics definition

```bash
cp -r templates/saas/.product your-project/
```

### indie-game/
**For**: Indie game development

Game development specific fields:
- Core gameplay design
- Art/audio style
- Playtest feedback collection

```bash
cp -r templates/indie-game/.product your-project/
```

### open-source/
**For**: Open source projects

Open source specific fields:
- Version planning
- Community interaction guidelines
- Issue/PR management

```bash
cp -r templates/open-source/.product your-project/
```

## Custom Templates

You can also create your own version based on any template:

1. Copy a base template
2. Add/remove fields as needed
3. Save as your own template

## Core Fields

Regardless of which template you use, the following fields are universal:

| File | Core Fields | Purpose |
|------|-------------|---------|
| VISION.md | One-liner, target users, core features, non-goals | Define what the product is |
| ROADMAP.md | Current phase, milestones | Define what the product does |
| BRAND.md | Tone, keywords, forbidden words | Define how the product speaks |
| MEMO.md | Last session, current task, next steps | Resume work progress |
