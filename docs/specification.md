# Product Context Specification

**Version**: 1.0
**Status**: Stable

## Overview

Product Context is a minimalist specification for managing product documentation in AI-assisted development workflows. It bridges the gap between code context (AGENTS.md, CLAUDE.md) and product context.

## Core Philosophy

Traditional PRD (Product Requirements Document) is a monolithic document designed for human consumption. Product Context modernizes this by splitting it into focused files optimized for AI consumption:

| Traditional PRD | Product Context |
|-----------------|-----------------|
| Single large document | 4 focused files |
| Human-oriented | AI-optimized |
| Static | Living documents |
| Separate from code | Version-controlled with code |

## File Structure

```
.product/
├── VISION.md       # Product vision (core)
├── ROADMAP.md      # Development phases
├── BRAND.md        # Tone and style
└── MEMO.md         # Short-term memory
```

## File Specifications

### VISION.md

**Purpose**: Define what the product is, who it's for, and what problem it solves.

**Required Fields**:
- `# Product Name` - The product name as H1
- `## One-line Description` - What is this? (under 100 characters)
- `## Target Users` - Who uses this? What are their pain points?
- `## Core Value Proposition` - Why choose this over alternatives?
- `## Core Features` - Main features (3-5 recommended)

**Recommended Fields**:
- `## Non-Goals` - What we explicitly don't do
- `## Success Metrics` - How we measure success
- `## Technical Constraints` - Limitations affecting product decisions

### ROADMAP.md

**Purpose**: Track development phases and milestones.

**Required Fields**:
- `## Current Phase` - MVP / Beta / Growth / Scale
- `## Milestones` - Phase-based task lists with checkboxes

**Example**:
```markdown
## Current Phase
MVP

## Milestones

### Phase 1: MVP
- [x] Core feature A
- [ ] Core feature B

### Phase 2: Beta
- [ ] Feature C
- [ ] Feature D
```

### BRAND.md

**Purpose**: Define how the product communicates.

**Required Fields**:
- `## Tone of Voice` - How we sound
- `## User Address` - How we refer to users (you, 您, etc.)
- `## Keywords` - Preferred vocabulary
- `## Forbidden Words` - Words to avoid

### MEMO.md

**Purpose**: Short-term memory for AI agents across sessions.

**Required Fields**:
- `**Updated**:` - Timestamp
- `## Last Session` - What was done
- `## Current Task` - What's being worked on
- `## Next Steps` - What to do next

**Recommended Fields**:
- `## Important Decisions` - Key decisions made
- `## Notes` - Warnings, gotchas, temporary info

## AI Behavior Guidelines

When an AI agent reads `.product/`:

1. **Before implementing features**: Check VISION.md
   - Is it in "Core Features"? Proceed.
   - Is it in "Non-Goals"? Warn the user.
   - Neither? Ask for clarification.

2. **When writing user-facing content**: Follow BRAND.md
   - Use the defined tone
   - Use preferred keywords
   - Avoid forbidden words

3. **When prioritizing**: Check ROADMAP.md
   - Focus on current phase
   - Don't over-engineer for future phases

4. **At session start/end**: Manage MEMO.md
   - Read to restore context
   - Suggest updates after significant progress

## Relationship to AGENTS.md / CLAUDE.md

Product Context is **complementary** to code context files:

| AGENTS.md / CLAUDE.md | .product/ |
|-----------------------|-----------|
| How to write code | Why we write this code |
| Technical specs | Business logic |
| Coding style | Brand voice |
| Build commands | Product vision |

## Design Principles

1. **Minimal** - 4 files, learn in 5 minutes
2. **Markdown-first** - Human readable, AI parseable
3. **VCS-friendly** - Code and decisions in same commit
4. **Tool-agnostic** - Works with any AI coding assistant
