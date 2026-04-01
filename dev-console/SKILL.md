# Dev Console

> In-browser UI review + DOM annotation tool for frontend quality feedback loops.

## Safety Guarantee

- Vite plugin uses `apply: 'serve'` — **zero production footprint**
- All resources served via `/__dev-console/` middleware routes, nothing written to `dist/`
- Annotation data persists to `.claude/feedback/annotations.json` (gitignored)

## Commands

| Command | Description |
|---------|-------------|
| `/dev-console-init` | First-time setup: copy plugin files + inject into vite.config |
| `/dev-console` | Enable/disable the Dev Console |

## Modules

| Module | Description |
|--------|-------------|
| `annotation` | DOM element annotation + notes, state machine IDLE→SELECTING→FORM_OPEN→IDLE |
| `component-boundaries` | Vue component boundary visualization |
| `css-vars` | CSS variable viewer/editor |

## Architecture

```
plugin/                          # Source files (Git tracked, portable)
├── vite-plugin-dev-console.mjs  # Vite plugin entry (apply: 'serve')
├── dev-console-shell.js         # Shadow DOM host + panel UI
├── dev-console-shell.css        # Panel styles (dark/light themes)
├── dev-console-i18n.js          # Bilingual EN/ZH
├── dev-console-theme.js         # Theme system
└── modules/                     # Feature modules
    ├── annotation.js
    ├── component-boundaries.js
    └── css-vars.js
```

**Runtime paths** (created by init command, gitignored):
- `.claude/plugins/` — plugin runtime copies
- `.claude/feedback/annotations.json` — annotation data

## Workflow

```
/dev-console-init              # First time: copy plugin/ → .claude/plugins/ + inject vite.config
npm run dev                    # Start dev server, Console auto-loads
Browser bottom-right ● button  # Open/close Dev Console drawer
Annotate DOM elements + notes  # Data saved to .claude/feedback/annotations.json
Claude reads annotations       # Feedback loop closed
```

## Requirements

- **Vite** — any Vite-powered project (Vue, React, Svelte, etc.)
- **Node.js** >= 18
