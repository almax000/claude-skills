# OpenAI Codex CLI Integration

将以下内容添加到你项目的 `codex.md` 或相应配置文件中。

---

## Product Context

This project uses Product Context for product documentation.

### Context Files

Read these files in `.product/` directory:

1. **PRD.md** - Product Requirements Document
   - One-line description
   - Target users and their pain points
   - Core value proposition
   - Core features
   - Non-goals (what we explicitly don't do)

2. **ROADMAP.md** - Product Roadmap
   - Current phase (MVP/Beta/Growth/Scale)
   - Milestones and tasks

3. **BRAND.md** - Brand Guidelines
   - Tone of voice
   - Preferred/forbidden words
   - Visual style hints

4. **MEMO.md** - Current Status
   - Last session summary
   - Current task
   - Next steps
   - Important decisions

### Behavior Guidelines

- Check PRD.md before implementing new features
- Follow BRAND.md when writing user-facing content
- Refer to ROADMAP.md for prioritization
- Update MEMO.md after significant progress
- Warn when requested features are in Non-Goals
