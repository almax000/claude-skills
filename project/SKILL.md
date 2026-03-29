---
name: project
description: >
  Unified project lifecycle manager — register, initialize, track status, archive, and health-check all local projects.
  Use for "new project", "list projects", "project status", "archive project", "project health",
  "register project", "scan projects", "新建项目", "项目列表", "项目状态", "归档项目".
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git:*), Bash(du:*), Bash(lsof:*), Bash(ls:*), Bash(mkdir:*), Bash(date:*), AskUserQuestion
---

# /project — Unified Project Lifecycle Manager

Manage the full lifecycle of all local projects through a single registry at `~/.claude/project-registry.json`.

**Status lifecycle**: `active` → `paused` → `archived` → `deleted`

## Command Routing

Parse the user's input to determine which command to execute:

| Input Pattern | Command |
|---------------|---------|
| `/project new <name>` | **New** — Create a new project from scratch |
| `/project list` | **List** — Show all registered projects |
| `/project status [name]` | **Status** — View/update a project's status |
| `/project archive <name>` | **Archive** — Archive a project |
| `/project health` | **Health** — Scan for issues across all projects |
| `/project register` | **Register** — Register the current directory as a project |
| `/project scan` | **Scan** — Auto-discover unregistered projects |
| `/project` (no args) | **List** (default) |

---

## Registry Format

**File**: `~/.claude/project-registry.json`

```json
{
  "version": "1.0.0",
  "scan_dirs": ["~/Documents", "~/Movies", "~/Music", "~/Photos"],
  "projects": {
    "<name>": {
      "path": "~/Documents/<name>",
      "status": "active|paused|archived|deleted",
      "description": "One-line description",
      "stack": "Key technologies",
      "created": "YYYY-MM-DD",
      "updated": "YYYY-MM-DD",
      "tags": ["tag1", "tag2"],
      "ports": [3000, 5173],
      "remote": "https://github.com/...",
      "archive_note": "(only for archived projects)"
    }
  }
}
```

---

## Command: `/project new <name>`

Create a new project with the full initialization pipeline.

### Phase 1: Register

1. Ask user for target directory (default: `~/Documents/<name>`)
2. Create directory: `mkdir -p <path>`
3. Initialize git: `cd <path> && git init`
4. Add entry to `project-registry.json` with status `active`
5. Auto-detect: ask user for description, stack, tags

### Phase 2: .claude/ Structure

Create the modular `.claude/` directory:

```
.claude/
├── agents/
│   ├── code-reviewer.md
│   ├── debugger.md
│   ├── deep-researcher.md
│   ├── general-researcher.md
│   └── lite-researcher.md
├── hooks/
│   ├── error-lesson-reminder.sh
│   └── session-start-read-lessons.sh
├── rules/
│   ├── code-quality.md
│   ├── git-workflow.md
│   └── _error-lessons.md
└── settings.json
```

**Agent templates:**

**code-reviewer.md:**
```markdown
---
model: sonnet
description: Code quality and security review
---
Review the code changes for: quality, security, maintainability, and test coverage.
Focus on: OWASP top 10, error handling, edge cases, naming clarity.
Output: structured review with severity levels (critical/warning/info).
```

**debugger.md:**
```markdown
---
model: sonnet
description: Root cause analysis and minimal fixes
---
Diagnose the issue by: reading error messages, tracing code paths, checking recent changes.
Focus on root cause, not symptoms. Propose the minimal fix.
Do NOT refactor surrounding code or add unrelated improvements.
```

**deep-researcher.md:**
```markdown
---
model: opus
description: Deep technical research — architecture, source analysis, advanced concepts
---
Conduct deep research. Read source code, analyze architecture, explore advanced concepts.
Return detailed analysis with complete code examples.
```

**general-researcher.md:**
```markdown
---
model: sonnet
description: Daily research — comparisons, best practices, API usage
---
Research the topic efficiently. Compare options, check latest developments, find practical solutions.
Return concise summary with actionable recommendations.
```

**lite-researcher.md:**
```markdown
---
model: haiku
description: Quick lookups and batch scanning
---
Quick research. Find the answer fast, keep it brief.
```

**error-lesson-reminder.sh:**
```bash
#!/bin/bash
echo "reminder: Check _error-lessons.md before ending session. Record any new lessons learned."
```

**session-start-read-lessons.sh:**
```bash
#!/bin/bash
if [ -f ".claude/rules/_error-lessons.md" ]; then
  echo "reminder: Review error lessons at .claude/rules/_error-lessons.md"
fi
```

**code-quality.md:**
```markdown
# Code Quality Standards

## Limits
| Metric | Limit |
|--------|-------|
| Function length | <= 50 lines |
| File length | <= 700 lines (soft), 1000 lines (hard) |
| Cyclomatic complexity | <= 10 |

## Comments
- Minimize — code should be self-explanatory
- Only comment non-obvious business rules or platform gotchas
- 1 line preferred, 3 lines max

## Naming
- Components/Classes: PascalCase
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Booleans: is/has/should/can prefix
```

**git-workflow.md:**
```markdown
# Git Workflow

## Commit Format
\`\`\`
<type>(<scope>): <subject>
\`\`\`

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| refactor | Refactoring |
| test | Tests |
| chore | Build/tooling |

## Principles
- One commit, one logical change
- Concise, meaningful messages
- English by default (check project CLAUDE.md for overrides)
```

**_error-lessons.md:**
```markdown
# Error Lessons

> Record mistakes to prevent repeating them.

## Template
\`\`\`
## EXXX: Short Title
**Severity**: HIGH / MEDIUM / LOW
**Date**: YYYY-MM-DD
**Context**: What were you doing?
**Mistake**: What went wrong?
**Rule**: What should be done instead?
\`\`\`

## Lessons

(none yet)
```

**settings.json:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Stop",
        "hooks": [".claude/hooks/error-lesson-reminder.sh"]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "SessionStart",
        "hooks": [".claude/hooks/session-start-read-lessons.sh"]
      }
    ]
  }
}
```

Make all `.sh` files executable with `chmod +x`.

### Phase 3: Product Context

Create `.claude/product/` with template files:

**VISION.md:**
```markdown
# Vision

## Problem
What problem does this project solve?

## Solution
How does it solve it?

## Differentiation
What makes this different from alternatives?
```

**USERS.md:**
```markdown
# Users

## Primary User
- **Who**:
- **Use case**:
- **Pain point**:

## Secondary Users
(add as discovered)
```

**SCOPE.md:**
```markdown
# Scope

## Core Features (IN)
-

## Out of Scope (NOT doing)
-

## Future Consideration
-
```

**ROADMAP.md:**
```markdown
# Roadmap

## Current Milestone
- **Goal**:
- **Target**:

## Decision Log
| Date | Decision | Rationale |
|------|----------|-----------|
```

Use AskUserQuestion to guide user through filling in VISION and SCOPE basics interactively.

### Phase 4: Port Reservation

Ask: "Does this project need localhost ports (e.g., dev server, API, database)?"

If yes:
1. Read `~/.claude/port-registry.json` to find available ports in 9000-9999
2. Reserve requested number of ports
3. Update port-registry.json
4. Record ports in project-registry.json

### Phase 5: CLAUDE.md Generation

Generate a project CLAUDE.md with:
- Project name and description
- Quick start commands
- Directory structure reference
- Port assignments (if any)
- Reference to `.claude/` modular structure

### Phase 6: Summary

Output a creation summary:
```
Project "<name>" created at <path>

  .claude/     agents(5), hooks(2), rules(3)
  product/     VISION, USERS, SCOPE, ROADMAP
  ports:       <list or none>
  remote:      <not yet — run `git remote add origin <url>` when ready>

Next steps:
  1. cd <path>
  2. Start coding or run `/product update` to refine product context
```

---

## Command: `/project list`

1. Read `~/.claude/project-registry.json`
2. Output table sorted by: status (active first), then updated date (newest first)
3. Format:

```
| # | Project | Status | Stack | Updated | Path |
|---|---------|--------|-------|---------|------|
```

Show summary counts: X active, Y paused, Z archived.

---

## Command: `/project status [name]`

If name provided:
1. Look up project in registry
2. If project has a local path, check:
   - `git log -1 --format="%ai"` for last commit
   - `du -sh` for disk usage
   - `git status --short` for uncommitted changes
3. Display full project info

If status change requested (user says "pause it", "archive it", etc.):
1. Update status in registry
2. Update the `updated` date
3. Confirm change

If no name and running inside a project directory:
- Auto-detect project from current working directory matching registry paths

---

## Command: `/project archive <name>`

1. Look up project in registry
2. Confirm with user: "Archive <name>? This will update the registry. Options: backup to SanDisk / just mark as archived"
3. If backup requested:
   - Check if `/Volumes/Sandisk` is mounted
   - `zip -r -q /Volumes/Sandisk/<name>.zip <path>`
   - Record archive location in `archive_note`
4. Update status to `archived` in registry
5. Ask: "Delete local directory to free disk space?" (only if backup succeeded)
6. If yes, delete and set `path` to `null`

---

## Command: `/project health`

Scan all projects and report issues:

### 1. Disk Usage (top 5)
For each registered project with a local path, run `du -sh` and rank.

### 2. Stale Projects
Projects with `status: active` but last git commit > 30 days ago. Suggest pausing.

### 3. Unregistered Projects
Scan `scan_dirs` for directories containing `.git` or `.claude` that are NOT in the registry. List them and offer batch registration.

### 4. Redundancy Detection
Projects with similar `stack` and `tags` where both are `paused`. Flag for potential consolidation.

### 5. Port Conflicts
Cross-reference `ports` across all projects. Flag any duplicates.

### 6. Summary & Recommendations
For each issue, suggest a specific action: register, pause, archive, cleanup, consolidate.

---

## Command: `/project register`

Register the current working directory as an existing project.

1. Determine project name from directory name (allow override)
2. Auto-detect:
   - **stack**: from `package.json` (Node/TS), `pyproject.toml`/`requirements.txt` (Python), `Cargo.toml` (Rust), `go.mod` (Go), `build.gradle` (Java)
   - **remote**: from `git remote get-url origin`
   - **created**: from `git log --reverse --format="%ai" | head -1`
   - **updated**: from `git log -1 --format="%ai"`
   - **ports**: from existing port-registry.json entries matching this project
3. Ask user for: description, tags
4. Write to registry
5. Confirm registration

---

## Command: `/project scan`

1. Read `scan_dirs` from registry
2. For each dir, find subdirectories containing `.git` or `.claude` (max depth 2)
3. Compare with registry — identify unregistered projects
4. For each unregistered project, show: name, path, last commit date, size
5. Ask user: "Register all / select individually / skip?"
6. For selected projects, run the register flow (auto-detect + ask description/tags)

---

## Important Rules

- **Always read `~/.claude/project-registry.json` before any operation** — it is the single source of truth
- **Always write back to registry after modifications** — keep it in sync
- **Never delete local files without explicit user confirmation**
- **Backup before delete** — always offer backup option before removing local directories
- **Expand `~` to full path** when running shell commands, but store as `~` in registry for portability
