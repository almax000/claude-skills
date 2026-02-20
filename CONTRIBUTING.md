# Contributing to Claude Skills

Thanks for your interest in contributing! This collection grows through community submissions.

## Submitting a Skill

### Skill Structure

Your skill should follow this directory layout:

```
your-skill/
├── SKILL.md           # Reference docs (no frontmatter)
├── your-command.md    # Slash command (user-invocable: true)
└── [optional/]        # Scripts, templates, examples
```

### Requirements

- **Self-contained** — skill works independently, no external dependencies
- **Battle-tested** — extracted from real usage, not hypothetical
- **Documented** — SKILL.md explains what it does and how it works
- **MIT compatible** — your contribution must be MIT-licensable

### Command File Format

The slash command file needs YAML frontmatter:

```yaml
---
name: your-command
description: Brief description of what this command does
user-invocable: true
---
```

### What Makes a Good Skill

| Good | Not Good |
|------|----------|
| Solves a specific workflow gap | Generic utility scripts |
| Works across project types | Tied to one framework |
| Fills a Claude Code limitation | Duplicates built-in features |
| Clear, focused scope | Kitchen-sink collections |

## Pull Request Process

1. Fork this repository
2. Create your skill directory at the root level
3. Include both `SKILL.md` and at least one command `.md` file
4. Test that the skill works by copying it to `~/.claude/skills/`
5. Open a PR with:
   - **Title**: `add: skill-name`
   - **Description**: What problem does this skill solve? How did you use it?

## Questions?

Open an issue if you have questions about skill development or want to discuss an idea before building it.
