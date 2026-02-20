---
name: product-init
description: Initialize .claude/product/ product documentation directory
user-invocable: true
---

# /product-init

Initialize the `.claude/product/` directory through guided conversation to create product documents.

## Core Philosophy

**Repository Is All You Need**

- Target users: **Solo indie developers**
- Pain point: Product thinking scattered across Notion, Obsidian, Slack, Google Docs
- Solution: Centralize **non-technical** product decisions into the code repository

```
Product decisions (.claude/product/)     Technical decisions (CLAUDE.md)
"No enterprise edition"                  "No JavaScript"
"Skip Japan market for now"              "Use PostgreSQL"
"Launch on ProductHunt first"            "Use React"
```

## Execution Flow

### 1. Check Directory

```
.claude/product/ already exists?
├─ Yes -> Ask: fill missing files / reset / cancel
└─ No  -> Continue
```

### 2. Guided Conversation

**Core principles**:
- **One question at a time** - Don't overwhelm the user with multiple questions
- **Prefer multiple choice** - Easier to answer than open-ended questions
- **Confirm each phase** - Summarize understanding, confirm before moving to next phase
- **YAGNI** - Ruthlessly cut features that "might be needed" but "aren't needed now"

---

**Phase 1: Core (VISION.md)**

First ask product type (multiple choice):
> "What is the core of this product?"
> A. Solve a specific pain point
> B. Provide entertainment/gaming experience
> C. Create new possibilities/tools
> D. Other

Then follow up:
> "Describe in one sentence: What is this? Why build it?"

**Confirm before moving to next phase.**

---

**Phase 2: Users (USERS.md)**

Ask:
> "Who is the core user? Describe a specific person."

If the answer is vague (e.g., "everyone"), follow up:
> "If you could only choose one type of person, who is the most important?"

**Confirm before moving to next phase.**

---

**Phase 3: Features (SCOPE.md)**

**Step 1**: Ask about core features
> "What are the 1-3 most core features of the product?"

**Step 2**: After confirming core features, offer approach choices
> "For product scope, there are several common approaches:
> A. **Minimal version**: Core features only, validate quickly (recommended)
> B. **Full version**: Feature-complete, longer development cycle
> C. **Incremental**: Start with A, then gradually add features
>
> Which do you prefer?"

**Step 3**: If user picks B or wants to add features, apply YAGNI
> "Is this feature needed right now? Or can it wait until after validation?"

**Confirm before moving to next phase.**

---

**Phase 4: Roadmap (ROADMAP.md)**

Ask (multiple choice):
> "What stage are you at?"
> A. Idea validation (haven't written code yet)
> B. In development (actively building)
> C. Beta testing (small-scale testing)
> D. Live (in production)

Then follow up:
> "What is the next milestone?"

**Confirm before generating documents.**

---

### 3. Extension Documents (As Needed)

When the user mentions the following keywords, **proactively propose** creating the corresponding file:

| Trigger Words | File | Example |
|--------------|------|---------|
| Price, pricing, subscription, $, free tier | PRICING.md | "Core plan at $9/mo" |
| Launch, acquisition, channel, marketing, ProductHunt | MARKETING.md | "Launch on Product Hunt first" |
| Brand, tone, style, logo, colors | BRAND.md | "Want a professional feel" |
| Ops, support, customer service, tickets | OPS.md | "How do users report issues" |
| Business model, revenue, monetization | BUSINESS.md | "Revenue from premium features" |

**Behavior**:
```
User: "Core plan at $9/month, free trial for health reports"
AI: "You mentioned pricing strategy. Want to create PRICING.md to record this?"
```

**Principle**: User-provided details -> append to corresponding file, don't impose frameworks

### 4. Update CLAUDE.md

- Doesn't exist -> Create
- Already exists -> Check for `## Product Context`
  - Missing -> Append
  - Present -> Skip

**Recommended format** (adjust based on project):

```markdown

## Product Context

This project uses `.claude/product/` for product decisions.

| Document | Content |
|----------|---------|
| VISION.md | [One-sentence core differentiator] |
| USERS.md | [Target users] |
| SCOPE.md | [Core features] |
| ROADMAP.md | Phases and decision log |

**ROADMAP real-time updates**: When completing features, making decisions, or changing direction, proactively propose updates.
```

**Note**: Fill table content based on actual conversation, don't use placeholders.

## Parameter Support

You can add context after the command:

```
/product-init
/product-init refer to README.md
/product-init this is a SaaS product that mainly does...
```

## File Structure

```
.claude/product/
├── ROADMAP.md      # Core: phases, milestones, Decision Log
├── VISION.md       # Why build this
├── USERS.md        # Who is it for
├── SCOPE.md        # What to build (final form)
└── [extensions]    # MARKETING.md, PRICING.md, BRAND.md, OPS.md...
```

## Guiding Principles

| Principle | Description |
|-----------|-------------|
| One question at a time | Don't overwhelm with multiple questions |
| Prefer multiple choice | Easier to answer than open-ended questions |
| Confirm each phase | Summarize understanding, confirm before next phase |
| YAGNI | Ruthlessly cut "might need" features |
| User input first | Record what the user says, don't impose frameworks |

## Common Pitfall Handling

| User Says | Likely Meaning | How to Handle |
|-----------|---------------|---------------|
| "Target users are everyone" | Hasn't thought it through | Follow up: Who is the single most important user type? |
| "Features should be simple" | Might fear complexity | Follow up: Simple as in fewer features, or easy to use? |
| "Won't build X" | Might mean not now | Follow up: Never, or just not for now? |
| "Might need Y later" | Over-engineering tendency | Apply YAGNI: Is it needed right now? |
| "Competitors all have this feature" | Bandwagon tendency | Follow up: Do your users actually need it? |
