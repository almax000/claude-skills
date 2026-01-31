# Product Context Methodology

## The Problem

AI coding assistants are powerful, but they only understand **code**, not **product**:

- They know how to write code, but not **why** to write it
- They follow coding standards, but don't know **who** the users are
- They can generate features, but don't know if they align with **product goals**

`AGENTS.md` and `CLAUDE.md` solved the code context problem. Product Context fills the product gap.

## The Solution

Four focused Markdown files in a `.product/` directory:

```
.product/
├── VISION.md       # The soul of the product
├── ROADMAP.md      # The path forward
├── BRAND.md        # The voice
└── MEMO.md         # The memory
```

## Why Split Traditional PRD?

Traditional PRD is designed for human stakeholders. Product Context is designed for AI consumption:

| Aspect | Traditional PRD | Product Context |
|--------|-----------------|-----------------|
| Size | Large monolithic doc | 4 small focused files |
| Updates | Infrequent, formal | Continuous, informal |
| Audience | Humans | AI + Humans |
| Location | Google Docs, Confluence | In the repo |
| Versioning | Manual | Git |

## The Four Files

### VISION.md - "What are we building?"

This is the soul of your product. It answers:
- What is this product?
- Who is it for?
- What problem does it solve?
- What do we NOT do?

AI uses this to make feature decisions and say "no" to out-of-scope requests.

### ROADMAP.md - "Where are we going?"

This tracks the journey:
- Current development phase
- Milestones and tasks
- What's done, what's next

AI uses this to prioritize and avoid over-engineering for future phases.

### BRAND.md - "How do we sound?"

This defines the voice:
- Tone (friendly, professional, casual)
- How we address users
- Preferred vocabulary
- Words to avoid

AI uses this when writing UI text, error messages, documentation.

### MEMO.md - "What happened recently?"

This is the short-term memory:
- Last session summary
- Current task
- Recent decisions
- Important notes

AI uses this to restore context between sessions.

## Who Should Use This?

- **Solo developers** - You're the developer, PM, and marketer
- **Small teams** - Need AI to understand product context
- **Open source projects** - Help contributors understand the vision

## Getting Started

1. Create `.product/` in your project
2. Fill out the four files (start minimal)
3. Add Product Context to your AI tool
4. Use `/product sync` at session start (Claude Code)

## Best Practices

1. **MEMO.md is the only frequently updated file** - Others change rarely
2. **Keep it concise** - Enough info, not too much
3. **Version control** - Commit with code
4. **Confirm before AI updates** - Review changes to your product docs
