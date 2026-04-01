---
name: dev-console-init
description: First-time Dev Console setup — copy plugin files to runtime directory + inject into vite.config
user-invocable: true
---

# /dev-console-init

First-time setup: copies plugin source files to `.claude/plugins/` runtime directory and registers the plugin in your `vite.config`.

## Steps

### 1. Locate Project Root and Skill Source Directory

```
SKILL_DIR = .claude/skills/dev-console/plugin/
RUNTIME_DIR = .claude/plugins/
VITE_CONFIG = vite.config.mjs  (or vite.config.ts / vite.config.js — use glob to find)
```

Confirm `SKILL_DIR` exists and contains `vite-plugin-dev-console.mjs`.

### 2. Copy Plugin Files to Runtime Directory

```bash
mkdir -p .claude/plugins/modules
cp .claude/skills/dev-console/plugin/vite-plugin-dev-console.mjs .claude/plugins/
cp .claude/skills/dev-console/plugin/dev-console-shell.js .claude/plugins/
cp .claude/skills/dev-console/plugin/dev-console-shell.css .claude/plugins/
cp .claude/skills/dev-console/plugin/dev-console-i18n.js .claude/plugins/
cp .claude/skills/dev-console/plugin/dev-console-theme.js .claude/plugins/
cp .claude/skills/dev-console/plugin/modules/*.js .claude/plugins/modules/
```

### 3. Create Feedback Directory

```bash
mkdir -p .claude/feedback
# Only if file doesn't exist:
echo '[]' > .claude/feedback/annotations.json
```

### 4. Inject into vite.config

Read the project's Vite config file. Check if it already contains the `dev-console` plugin.

**If not yet injected**, add two things:

1. **Import line** (after the last existing import):
```javascript
import devConsole from "./.claude/plugins/vite-plugin-dev-console.mjs"
```

> **Note**: Adjust the relative path based on where `vite.config` lives relative to the project root. For monorepos where vite.config is in a subdirectory (e.g., `client/`), use `"../.claude/plugins/vite-plugin-dev-console.mjs"`.

2. **Plugin call** (inside the `plugins: [...]` array):
```javascript
devConsole(),
```

**If already present** — skip and inform user.

### 5. Ensure .gitignore Coverage

Check `.gitignore` includes:
```
.claude/plugins/
.claude/feedback/
```

If missing, append them.

### 6. Verify

```bash
ls -la .claude/plugins/vite-plugin-dev-console.mjs
ls -la .claude/plugins/modules/
grep "devConsole" <vite-config-path>
```

### 7. Inform User

```
Dev Console initialized!

- Plugin files copied to .claude/plugins/
- vite.config injected with devConsole plugin
- apply: 'serve' guarantees zero production impact

Start your dev server and look for the Dev Console button in the bottom-right corner.
Use /dev-console to enable/disable.
```

## Notes

- **Safety**: `apply: 'serve'` ensures the plugin only runs during `vite dev`, completely ignored by `vite build`
- **Idempotent**: Re-running won't duplicate injection — grep check prevents double-inject
- **Config path**: Different projects use `vite.config.ts`/`.js`/`.mjs` — use glob to find the right one
