# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed
- **Breaking**: Restructured to 4+4 file format
  - Core 4: VISION → USERS → SCOPE → ROADMAP (define in order)
  - Extension 4: BRAND | MARKETING | BUSINESS | OPS (add as needed)
- Removed MEMO.md (merged into ROADMAP.md Decision Log)
- Renamed `agents/` to `integrations/`
- Moved Claude Code skill to `skill/` directory
- Simplified `/product` commands to just `init` and update
- Made updates user-driven (no AI proactive proposals)

### Added
- New spec files: USERS.md, SCOPE.md, MARKETING.md, BUSINESS.md, OPS.md
- Decision Log section in ROADMAP.md
- skill/README.md with installation instructions
- integrations/README.md overview

### Removed
- MEMO.md specification (use ROADMAP.md Decision Log instead)
- `/product sync`, `/product update`, `/product ask` commands

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
