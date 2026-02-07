---
name: init-modular
description: Initialize modular .claude/ directory with agents, hooks, and rules
user-invocable: true
---

# /init-modular

Initialize a modular `.claude/` directory structure with battle-tested agents, hooks, and rules.

## Execution Flow

### 1. Check Existing Directory

```
.claude/ exists?
├─ Yes → Ask: Merge / Override / Cancel
└─ No  → Continue
```

### 2. Confirm Components

Ask user which components to include:

> "Which components do you want to initialize?"
> - [x] Agents (code-reviewer, debugger, researchers)
> - [x] Hooks (error lesson reminders)
> - [x] Rules (code quality, git workflow, error lessons)
> - [ ] Product docs (use /product-init instead)

### 3. Generate Files

Create the selected components.

### 4. Configure settings.json

Add hook configurations to `.claude/settings.json`:

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

### 5. Update CLAUDE.md

If CLAUDE.md exists, add reference to the modular structure.

## Usage

```
/init-modular
/init-modular --agents-only
/init-modular --no-hooks
```
