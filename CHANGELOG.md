# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed
- **Breaking**: Restructured to 4+4 file format
  - Core 4: VISION → USERS → SCOPE → ROADMAP (define in order)
  - Extension 4: BRAND | MARKETING | BUSINESS | OPS (add as needed)
- **Breaking**: Simplified directory structure to `skills/`, `templates/`, `README.md`
- Removed MEMO.md (merged into ROADMAP.md Decision Log)
- Simplified `/product` commands to just `init` and update
- Made updates user-driven (no AI proactive proposals)

### Added
- Support for 9 AI coding assistants:
  - Claude Code, Gemini CLI, GitHub Copilot (SKILL.md)
  - Cursor (.mdc), Windsurf (rules), Continue.dev (rules)
  - Cline (Memory Bank), Aider (CONVENTIONS.md), Codex (AGENTS.md)
- Each platform has its own directory in `skills/` with native format

### Removed
- MEMO.md specification (use ROADMAP.md Decision Log instead)
- `/product sync`, `/product update`, `/product ask` commands
- `docs/` directory (merged into README)
- `spec/` directory (format specs now in templates)

## [1.0.0] - 2025-01-31

### Added
- Initial release of Product Context specification
- Core files: VISION.md, ROADMAP.md, BRAND.md, MEMO.md
- Templates: minimal, saas, indie-game, open-source
- AI tool integrations:
  - Claude Code (Skill + CLAUDE.md template)
  - Cursor (.cursorrules template)
  - GitHub Copilot (copilot-instructions.md template)
  - OpenAI Codex CLI (AGENTS.md template)
  - Windsurf (rules.md template)
  - Universal (OpenSkills compatible)
- Documentation: specification, methodology, getting-started, FAQ

### Changed
- Renamed PRD.md to VISION.md for modern naming
