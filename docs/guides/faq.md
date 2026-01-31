# Frequently Asked Questions

## General

### What's the difference between Product Context and AGENTS.md?

They're complementary:

| AGENTS.md | Product Context |
|-----------|-----------------|
| How to write code | Why write this code |
| Technical specs | Business logic |
| Coding style | Brand voice |
| Build commands | Product vision |

Use both together for complete context.

### Why VISION.md instead of PRD.md?

"PRD" (Product Requirements Document) is a traditional term that implies a formal, static document. "VISION" better reflects what this file is: a living document that captures the product's soul and direction.

The rename also signals that this is a modern, AI-optimized approach, not a traditional document format.

### How is this different from regular documentation?

1. **Location**: In the repo, not separate tools
2. **Audience**: Optimized for AI, readable by humans
3. **Versioning**: Git, not Google Docs history
4. **Scope**: Product context only, not technical docs

## Usage

### How often should I update each file?

| File | Update Frequency |
|------|------------------|
| VISION.md | Rarely (major pivots only) |
| ROADMAP.md | Occasionally (phase changes) |
| BRAND.md | Rarely (voice changes) |
| MEMO.md | Every session |

### Should I commit .product/ to git?

Yes! That's the whole point. Product decisions should be version-controlled alongside code.

### What if I'm working alone?

Product Context is perfect for solo developers. You're likely the PM, developer, and marketer. These files help you (and your AI) stay focused.

### What if my team uses Notion/Confluence?

You can maintain both. Keep the lightweight `.product/` for AI context, and your full documentation in your preferred tool.

## AI Tools

### Which AI tools are supported?

Built-in support for:
- Claude Code (Skill + CLAUDE.md)
- Cursor (.cursorrules)
- GitHub Copilot (copilot-instructions.md)
- OpenAI Codex CLI (AGENTS.md)
- Windsurf (.windsurf/rules/)

Universal template for any AGENTS.md-compatible tool.

### How does the AI use these files?

1. **VISION.md**: Feature decisions, saying no to out-of-scope
2. **ROADMAP.md**: Prioritization, avoiding over-engineering
3. **BRAND.md**: UI text, error messages, documentation style
4. **MEMO.md**: Session context restoration

### Will AI automatically update my files?

Only with your permission. Good AI tools will:
1. Suggest updates
2. Show you the diff
3. Wait for confirmation

Never let AI modify product docs without review.

## Troubleshooting

### AI isn't reading my .product/ files

Check that:
1. The integration is set up correctly for your tool
2. Files are in the correct location (`.product/`)
3. Files have the correct names (case-sensitive)

### My files are getting too long

Keep them concise. Product Context is for AI context, not comprehensive documentation. If you need more detail, link to external docs.

### I have multiple products in one repo

Create a `.product/` directory in each product's subdirectory, or use a naming convention like `.product-admin/`, `.product-api/`.
