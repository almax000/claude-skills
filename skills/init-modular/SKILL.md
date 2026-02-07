# init-modular

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

## Why Modular?

| Benefit | Explanation |
|---------|-------------|
| **Organized** | Each concern has its own file |
| **Version controlled** | Track changes to individual configs |
| **Shareable** | Copy specific files to other projects |
| **Extensible** | Add new agents/rules without touching others |
