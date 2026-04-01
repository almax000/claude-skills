---
name: dev-console
description: Enable/disable the Dev Console plugin
user-invocable: true
---

# /dev-console

Toggle the Dev Console plugin on or off in your Vite config.

## Steps

### 1. Check Initialization

Confirm `.claude/plugins/vite-plugin-dev-console.mjs` exists.

- **Missing** → tell user to run `/dev-console-init` first
- **Exists** → continue

### 2. Detect Current State

Read the project's `vite.config` and look for:

```javascript
import devConsole from "...vite-plugin-dev-console.mjs"
```

and `devConsole(),` in the plugins array.

| Import line | Plugin call | State |
|-------------|-------------|-------|
| Present | Present | **Enabled** |
| Absent | Absent | **Disabled** |
| Mixed | — | **Broken** (fix it) |

### 3. Toggle

**Currently enabled → disable**:
- Remove the import line: `import devConsole from ...`
- Remove the plugin call: `devConsole(),` (mind trailing commas)

**Currently disabled → enable**:
- Add import after last existing import: `import devConsole from ".../.claude/plugins/vite-plugin-dev-console.mjs"`
- Add `devConsole(),` to plugins array

**Broken state → fix to enabled**:
- Add the missing piece

### 4. Output

```
Dev Console: enabled
Dev Console: disabled
```

If the dev server is running, remind to restart:
```
Restart dev server for changes to take effect.
```

### 5. Optional: View Annotations

If user asks to see current annotations:

```bash
cat .claude/feedback/annotations.json
```

Parse and display as a table:

| # | Element | Note | Status |
|---|---------|------|--------|
| 1 | `.search-box` | Border radius too large | open |
| 2 | `.sidebar__nav` | Active state color weak | resolved |

## Safety

- Plugin uses `apply: 'serve'` — **only active during `vite dev`**
- `vite build` completely ignores this plugin
- All runtime files in `.claude/plugins/` (gitignored) — never committed
- Annotation data in `.claude/feedback/` (gitignored) — never leaks to production
