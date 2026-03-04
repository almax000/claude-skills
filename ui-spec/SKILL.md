# UI Spec Skill

Manages UI spec design documents. Supports viewing, annotating, updating screens, and managing annotations through an interactive browser-based workflow.

## UI Spec File

Location: `.claude/design/ui-spec.html`

## HTML Conventions

- Every `.section` (flow) has a descriptive `id` starting with `flow-`
- Every `.screen` has a descriptive `id` starting with `screen-`
- All colors use CSS custom properties
- Design notes use `.note` class (yellow border, for design documentation)
- Annotations use `.annotation` class (blue border, for feedback/review)

## Screen ID Convention

Screens and flows use descriptive kebab-case IDs:

```
flow-onboarding        # A user flow grouping related screens
screen-login           # Individual screen within a flow
screen-dashboard       # Another screen
```

When adding screens, choose IDs that clearly describe the screen's purpose.

## Annotation Format

```html
<!-- Screen-level: inside .screen-body, at the bottom -->
<div class="annotation" data-author="author" data-date="YYYY-MM-DD" data-priority="high">
  Annotation text here.
</div>

<!-- Flow-level: inside .section, before .screens -->
<div class="annotation" data-author="author" data-date="YYYY-MM-DD">
  Annotation text here.
</div>
```

### Attributes

| Attribute | Required | Values |
|-----------|----------|--------|
| `data-author` | Yes | `jojo`, `claude`, etc. |
| `data-date` | Yes | `YYYY-MM-DD` |
| `data-priority` | No | `high`, `medium`, `low` |
| `data-status` | No | `open` (default), `resolved`, `wontfix` |

## Blank Screen Template

```html
<div class="screen" id="screen-{name}">
  <div class="screen-label">{Label Text}</div>
  <div class="screen-body">
    <div class="status-bar"><span>9:41</span><span>100%</span></div>
    <!-- Screen content here -->
  </div>
</div>
```

## MCP Server Integration

The `ui-spec` MCP server provides tools for zero-friction spec management:

| Tool | Purpose |
|------|---------|
| `open_spec` | Start HTTP server + open spec in browser |
| `get_status` | Summary: flows, screens, annotation counts |
| `list_annotations` | List annotations with screen/flow context |
| `resolve_annotation` | Mark an annotation as resolved by index |

The server auto-starts with Claude Code (configured in `~/.mcp.json`).
HTTP endpoint on `localhost:9012` handles browser save via `POST /save`.

## Interactive Annotation Mode

The UI spec has a built-in interactive annotation tool in the browser:

1. Click the **pencil button** in the top-right toolbar to enter annotate mode
2. **Hover** over elements to see highlight outlines
3. **Click** any element to open the annotation form
4. Write feedback, set priority, and save
5. Annotation is injected into the DOM as a real `.annotation` div at the right position
6. Press **Cmd+S** (Mac) / **Ctrl+S** (Windows) or click the **save button** to save in-place

### Workflow: User annotates → Claude reads → Claude executes

1. Claude calls `mcp__ui-spec__open_spec()` → HTTP server starts + browser opens
2. User annotates in browser → presses Cmd+S → saved in-place via POST /save
3. Claude calls `mcp__ui-spec__list_annotations()` → sees all open annotations
4. Claude processes annotations → updates spec
5. Claude calls `mcp__ui-spec__resolve_annotation(n)` → marks as done

### Badge counter
The pencil button shows a red badge with the count of open (unresolved) annotations.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Cmd+S` / `Ctrl+S` | Save spec in-place (via server) or download (file:// fallback) |
| `A` | Toggle annotate mode (same as pencil button) |
| `S` | Save/download HTML (same as save button) |
| `T` | Toggle dark/light theme |
| `L` | Cycle through languages |
| `1` | Switch to Mobile viewport (375px) |
| `2` | Switch to Tablet viewport (768px) |
| `3` | Switch to Desktop viewport (1440px) |
| `Escape` | Cancel annotation form / exit annotate mode |

Shortcuts are disabled when the annotation form is focused (to avoid conflicts with typing).
`Cmd+S` / `Ctrl+S` works even in form fields.

## Theme System

The UI spec supports dark/light themes via CSS variables. When adding or modifying content:
- Use `var(--bg-*)` for backgrounds
- Use `var(--text-*)` for text colors
- Use `var(--border-*)` for borders
- Use `var(--accent)` for the primary theme color
- Character/brand-specific colors can remain as inline styles

## Viewport System

### Viewport Sizes

| Name | Width | Use case |
|------|-------|----------|
| Mobile | 375px | Phone (default) |
| Tablet | 768px | Tablet portrait |
| Desktop | 1440px | Desktop browser |

### Viewport Toggle (Toolbar)

The toolbar includes three viewport buttons that switch the container width:

```html
<!-- In toolbar, after existing buttons -->
<div class="viewport-toggle">
  <button class="vp-btn active" data-vp="mobile" title="Mobile 375px">📱</button>
  <button class="vp-btn" data-vp="tablet" title="Tablet 768px">📋</button>
  <button class="vp-btn" data-vp="desktop" title="Desktop 1440px">🖥️</button>
</div>
```

Switching viewport sets a `data-viewport` attribute on `<body>` and adjusts `.screen` width:

```css
/* Default: mobile */
.screen-body { width: 375px; }

body[data-viewport="tablet"] .screen-body { width: 768px; }
body[data-viewport="desktop"] .screen-body { width: 1440px; }
```

Screens use **flex/relative layout** inside `.screen-body` so content reflows naturally at wider widths. Use percentage widths and `max-width` where appropriate.

### Viewport Group (Optional)

When mobile and desktop layouts are **structurally different** (e.g., bottom tab bar vs sidebar navigation), use a viewport group to show multiple variants:

```html
<div class="viewport-group" id="screen-dashboard-variants">
  <div class="screen" id="screen-dashboard-mobile" data-viewport="mobile">
    <div class="screen-label">Dashboard (Mobile)</div>
    <div class="screen-body">
      <!-- Bottom tab bar layout -->
    </div>
  </div>
  <div class="screen" id="screen-dashboard-desktop" data-viewport="desktop">
    <div class="screen-label">Dashboard (Desktop)</div>
    <div class="screen-body">
      <!-- Sidebar layout -->
    </div>
  </div>
</div>
```

```css
.viewport-group {
  display: flex; gap: 2rem; flex-wrap: wrap;
}
.viewport-group .screen { flex: none; }
```

**Rule**: Only use viewport-group when layouts are structurally incompatible. For most screens, CSS reflow via the viewport toggle is sufficient.

## Source Code Reading Conventions (for capture mode)

When generating screens from an existing project's source code:

1. **Project config** → `package.json`, framework config → identify tech stack
2. **Router/navigation** → route definitions → build page list
3. **Page components** → component tree, layout structure, conditional rendering
4. **Style sources** → CSS modules, Tailwind classes, styled-components, theme files → extract colors, spacing, typography
5. **Shared components** → design system primitives (Button, Card, Input, etc.) → reuse patterns

The goal is **maximum-effort visual fidelity** from source code alone — no screenshots, no running the app. Structure must be faithful; visual styling should match as closely as static HTML/CSS allows.

## Desktop App Conventions — Electron (for capture mode)

When generating screens for an Electron desktop app:

1. **Main process** → Read `electron/main/index.ts` (or similar) for window chrome config:
   - `titleBarStyle` (`hidden`, `hiddenInset`) → affects traffic light / title bar area
   - `trafficLightPosition` → macOS traffic light placement
   - `titleBarOverlay` → Windows/Linux native control buttons
   - `minWidth`/`minHeight` → minimum viewport sizes

2. **Platform CSS** → Detect `.platform-darwin`, `.platform-win32`, `.platform-linux` classes
   - Generate platform variant annotations if layouts differ significantly
   - macOS: traffic lights in sidebar area, no header padding
   - Windows: `titleBarOverlay` occupies top-right, extra header `padding-right`

3. **Chrome vs Content theming** → Identify theme-independent variables (e.g., `--chrome-*`)
   - "Always-dark chrome" pattern: sidebar + header use fixed dark colors
   - Content area follows theme toggle (light/dark)
   - Capture both theme states for content area; chrome stays constant

4. **Viewport sizes** → Use desktop-appropriate sizes instead of mobile defaults:

| Name | Width | Use case |
|------|-------|----------|
| Compact | 800px | Minimum window size |
| Default | 1200px | Typical desktop |
| Wide | 1600px | Large displays |

## Quick Start

To create a UI spec for your project:

1. Run `/ui-spec init` to generate a starter `ui-spec.html`
2. Run `/ui-spec capture` to generate screens from an existing project's source code
3. Open it in a browser to view and annotate
4. Use `/ui-spec` to manage it from Claude Code
