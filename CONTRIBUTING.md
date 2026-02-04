# Contributing to Claude Skills

Thanks for your interest in contributing!

## Ways to Contribute

### Report Issues
- Bug reports
- Feature requests
- Documentation improvements

### Submit Pull Requests
- New skills
- Improvements to existing skills
- Documentation fixes
- Translations

## Adding a New Skill

1. Create a directory under `skills/`
2. Add a `SKILL.md` file with:
   - YAML frontmatter (name, description, user-invocable)
   - Clear execution flow
   - Examples

### Skill Requirements

- **Battle-tested**: Only share skills you've actually used
- **Self-contained**: Should work independently
- **Well-documented**: Clear instructions in SKILL.md

## Development Setup

```bash
# Clone the repo
git clone https://github.com/almax000/claude-skills.git
cd claude-skills

# No build step required - it's all Markdown!
```

## Commit Messages

Follow conventional commits:

```
feat: add new debugging skill
fix: correct typo in init-modular
docs: improve installation guide
```

## Questions?

Open an issue or start a discussion.
