---
name: product
description: Analyze conversation and intelligently update .claude/product/ documents
user-invocable: true
---

# /product

Analyze the current conversation and intelligently update `.claude/product/` files.

## Execution Flow

### 1. Check Initialization

```
.claude/product/ exists?
├─ No  -> Prompt: "Run /product-init to initialize product docs first", end
└─ Yes -> Continue
```

### 2. Read All Product Documents

Read all files in the `.claude/product/` directory.

### 3. Analyze Conversation History

Identify product-level changes:

| Conversation Content | File to Update |
|---------------------|----------------|
| Phase completion, milestones reached, key decisions | ROADMAP.md |
| Product direction/positioning changes | VISION.md |
| User understanding changes | USERS.md |
| Feature boundary changes (new features / what not to build) | SCOPE.md |
| Other topics | Corresponding extension file |

### 4. Present Changes

- List files that need updating
- Show specific diffs (old -> new)
- If a topic was discussed but the corresponding file doesn't exist, propose creating it

### 5. Execute After User Confirmation

- Confirm -> Execute updates
- Reject -> Cancel
- Partial confirm -> Only update selected files

### 6. Closing Prompt

```
Updated .claude/product/ROADMAP.md, .claude/product/SCOPE.md

Next time you complete a milestone or make an important decision, run /product again.
```

## Decision Principles

- Only identify **product/business-level** changes
- Technical implementation details do not trigger updates
- When there are no changes, inform the user: "No product decisions to update from this conversation"

## File Responsibilities

| File | Core Question |
|------|---------------|
| **ROADMAP.md** | Current phase? Next step? Why this decision? |
| VISION.md | Why build this? Mission, vision, value proposition |
| USERS.md | Who is it for? User personas, pain points, scenarios |
| SCOPE.md | What to build? Feature boundaries, what explicitly NOT to build |

**Extension files** (add as needed): BRAND.md, MARKETING.md, BUSINESS.md, METRICS.md...

## Important Notes

1. **Show diffs** - Always show changes before modifying, execute only after user confirmation
2. **Decisions vs. operations** - Only record product decisions; technical details go in CLAUDE.md
3. **Version control** - These files should be committed alongside the code

## ROADMAP Real-time Updates

Beyond user-invoked `/product`, AI can also **proactively propose** ROADMAP.md updates.

**Trigger conditions** (AI-initiated):
- Completed a feature/phase
- Made an important decision
- Changed the plan direction
- Encountered a blocker/adjustment

**Behavior**:
```
AI: "I noticed you just decided X. Want to update the ROADMAP?"
User: Yes / No
```

**No need for user to invoke /product** - AI proactively proposes during conversation. But still requires user confirmation before executing updates.
