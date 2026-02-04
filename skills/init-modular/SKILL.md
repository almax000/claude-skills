---
name: init-modular
description: Initialize modular .claude/ directory with agents, hooks, and rules
user-invocable: true
---

# /init-modular

Initialize a modular `.claude/` directory structure with battle-tested agents, hooks, and rules.

## What Gets Created

```
.claude/
├── agents/
│   ├── code-reviewer.md      # Code review before commits
│   ├── debugger.md           # Root cause analysis
│   ├── deep-researcher.md    # Deep research (Opus)
│   ├── general-researcher.md # Daily research (Sonnet)
│   └── lite-researcher.md    # Quick lookup (Haiku)
├── hooks/
│   ├── error-lesson-reminder.sh  # Session end reminder
│   └── session-start-read-lessons.sh  # Session start reminder
├── rules/
│   ├── code-quality.md       # Code quality standards
│   ├── git-workflow.md       # Git commit conventions
│   └── _error-lessons.md     # Error lessons log
└── settings.json             # Hook configurations
```

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

## Component Details

### Agents

#### code-reviewer
- **Purpose**: Code review before commits
- **Model**: Sonnet
- **Focus**: Quality, security, maintainability

#### debugger
- **Purpose**: Root cause analysis and minimal fixes
- **Model**: Sonnet
- **Focus**: Find root cause, not symptoms

#### Research Agents (3-tier)

| Agent | Model | Use Case |
|-------|-------|----------|
| deep-researcher | Opus | Architecture, source analysis |
| general-researcher | Sonnet | Daily research, comparisons |
| lite-researcher | Haiku | Quick lookups, batch queries |

### Hooks

#### error-lesson-reminder.sh
- **Trigger**: Session end
- **Action**: Remind to record error lessons

#### session-start-read-lessons.sh
- **Trigger**: Session start
- **Action**: Show high-priority error lessons

### Rules

#### code-quality.md
- Function length limit (50 lines)
- File length limit (700 lines)
- Cyclomatic complexity limit (10)
- TypeScript: no `any`
- Comment guidelines

#### git-workflow.md
- Commit message format
- Type conventions (feat, fix, docs, etc.)

#### _error-lessons.md
- Template for recording errors
- Prevents repeating mistakes

## Customization

After initialization, customize for your project:

1. **Adjust limits** in `rules/code-quality.md`
2. **Add project-specific rules** in `rules/`
3. **Create custom agents** in `agents/`
4. **Modify hooks** for your workflow

## Usage

```
/init-modular
/init-modular --agents-only
/init-modular --no-hooks
```

## Why Modular?

| Benefit | Explanation |
|---------|-------------|
| **Organized** | Each concern has its own file |
| **Version controlled** | Track changes to individual configs |
| **Shareable** | Copy specific files to other projects |
| **Extensible** | Add new agents/rules without touching others |
