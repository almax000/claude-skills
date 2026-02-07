# UI Spec Skill — Development Context

> Complete context from creation to current state, for continuing optimization.

## 1. Origin & Motivation

The ui-spec skill was born in the [Vibling](https://github.com/almax000/vibling) project — an English learning app where users chat with AI NPCs. The project needed a way to design, review, and iterate on mobile UI screens without traditional design tools.

**The insight**: A single self-contained HTML file can serve as both a **visual design document** (viewable in any browser) and a **machine-readable spec** (parseable by Claude). By embedding an interactive annotation system directly in the HTML, we created a feedback loop:

```
Designer/PM annotates in browser → saves HTML → Claude reads annotations → Claude updates spec
```

This eliminates the "Figma → screenshot → paste into prompt" workflow entirely.

## 2. Architecture

### 2.1 The HTML Spec File

`ui-spec.html` is a **self-contained single HTML file** with zero external dependencies:

```
ui-spec.html
├── <style>           ~450 lines
│   ├── CSS Variables (dark theme default + light theme override)
│   ├── Base Styles (screen, flow, chat, moments, NPC list, etc.)
│   ├── Annotation System (.annotation, priority variants, resolved state)
│   ├── Theme Toggle (fixed position button)
│   └── Interactive Annotation Mode (toolbar, form overlay, toast)
├── <body>            ~550 lines
│   ├── Toolbar (theme toggle, annotate button with badge, save button)
│   ├── Annotation Form Overlay (modal with textarea, priority select)
│   ├── Toast notification
│   ├── Design Principles (principle-box)
│   ├── Flow sections (.section#flow-*) containing:
│   │   ├── Flow title & description
│   │   ├── Principle boxes (design rationale)
│   │   └── Screens (.screen#screen-*) within .screens flex container
│   └── Design Summary
└── <script>          ~250 lines
    ├── Theme Toggle (system preference detection, localStorage persistence)
    ├── Annotation System
    │   ├── Toggle annotate mode (crosshair cursor, hover outlines)
    │   ├── Click handler (target detection, insertion point calculation)
    │   ├── Form display & save (creates .annotation div with metadata)
    │   ├── Delete button injection (only visible in annotate mode)
    │   └── Badge counter (counts open annotations)
    ├── Download (serializes DOM → clean HTML, strips UI-only elements)
    └── Keyboard shortcuts (Escape to cancel/exit)
```

### 2.2 Key HTML Conventions

| Convention | Pattern | Purpose |
|-----------|---------|---------|
| Flow IDs | `id="flow-{name}"` | Group related screens |
| Screen IDs | `id="screen-{name}"` | Identify individual screens |
| Design Notes | `.note` (yellow border) | Document design rationale |
| Annotations | `.annotation` (blue border) | Feedback/review comments |
| CSS Variables | `var(--bg-*)`, `var(--text-*)` | Theme-aware styling |

### 2.3 The Annotation Data Model

```html
<div class="annotation"
  data-author="jojo"           <!-- who wrote it -->
  data-date="2026-02-07"       <!-- when -->
  data-priority="high"         <!-- urgency: high/medium/low -->
  data-status="open"           <!-- lifecycle: open/resolved/wontfix -->
>
  Annotation text content here.
</div>
```

Visual rendering:
- **Normal priority**: Blue left border, blue tint background
- **High priority**: Red left border, red tint background
- **Resolved/wontfix**: Faded + strikethrough
- **Meta line**: Auto-generated from `data-author` and `data-date` via CSS `::before`

### 2.4 The Skill Files

```
skills/ui-spec/
├── SKILL.md        # Reference documentation (HTML conventions, templates, workflow)
├── ui-spec.md      # Command definition with 7 modes (user-invocable: true)
└── CONTEXT.md      # This file
```

**Important lesson**: SKILL.md must NOT have YAML frontmatter with `name: ui-spec`, because it conflicts with `ui-spec.md` (the actual command). The system matches `/ui-spec` to `SKILL.md`'s `user-invocable: false` instead of `ui-spec.md`'s `user-invocable: true`. This was a bug we discovered and fixed.

## 3. Command Modes

| Mode | Command | What it does |
|------|---------|-------------|
| **init** | `/ui-spec init` | Scaffold a new ui-spec.html for any project |
| **view** | `/ui-spec` | List flows/screens/annotations + open in browser |
| **annotate** | `/ui-spec annotate` | Add annotation from conversation context |
| **update** | `/ui-spec update` | Modify screen content, resolve annotations |
| **add-screen** | `/ui-spec add-screen` | Add new screen to existing flow |
| **resolve** | `/ui-spec resolve` | Mark annotations as resolved |
| **annotations** | `/ui-spec annotations` | List/filter all annotations |

### View mode details

The default mode reads the HTML, extracts structure via CSS selectors, and presents a summary:
1. Grep for `.section[id]` → list flows with screen counts
2. Grep for `.screen[id]` → list all screens
3. Grep for `.annotation` → list open annotations with author/priority/target
4. Run `open .claude/design/ui-spec.html` to open in browser

### Init mode (not yet implemented)

This is the key mode for making the skill useful in new projects. It should:
1. Ask about app name, primary flows, key screens
2. Generate a complete `ui-spec.html` with the full annotation system
3. Include the CSS variable system, theme toggle, toolbar, scripts
4. Pre-populate with flow/screen placeholders based on user input

## 4. The Annotation Workflow (Key Innovation)

The bidirectional workflow between browser and Claude is what makes this skill powerful:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Browser UI    │     │   HTML File      │     │   Claude Code   │
│                 │     │                  │     │                 │
│ User clicks     │────>│ Annotation divs  │────>│ /ui-spec reads  │
│ elements, adds  │     │ embedded in DOM  │     │ annotations in  │
│ annotations     │     │ at correct       │     │ spatial context │
│                 │     │ positions        │     │ of their target │
│ Downloads HTML  │     │                  │     │ screens         │
│ with annotations│     │ Machine-readable │     │                 │
│                 │     │ data-* attrs     │     │ Proposes changes│
│                 │<────│                  │<────│ Updates spec    │
│ Views updated   │     │ Changes applied  │     │ Resolves annot. │
│ spec            │     │ by Claude        │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

**Why this is better than screenshots + prompts**:
- Annotations have **spatial context** — Claude sees them inside the screen they reference
- Annotations have **structured metadata** — priority, author, status, date
- The spec is **version-controllable** — git diff shows exactly what changed
- The workflow is **bidirectional** — both human and AI can read and write
- No external tools needed — just a browser and Claude Code

## 5. Reference Implementation (Vibling)

The Vibling project has a fully realized ui-spec.html with:

- **5 flows**: first-launch, npc-discovery, level-detection, npc-profile, summary
- **8 screens**: language-select, sarah-first-contact, level-detection, tom-introduction, chat-list, moments-feed, path-a2, path-b1, npc-profile
- **Rich CSS**: 60+ CSS variables, mobile screen mockups (280px width, rounded corners)
- **Full annotation system**: Theme toggle, annotate mode with hover outlines, form overlay, save/download, badge counter, delete buttons, keyboard shortcuts (Escape)
- **Design notes**: Yellow-bordered `.note` elements explain design rationale inline

The Vibling project-level SKILL.md additionally has a **Screen ID Reference** table mapping all IDs to descriptions — useful for project-specific context.

Location: `github.com/almax000/vibling/.claude/design/ui-spec.html`

## 6. Three Deployment Targets

| Location | Version | Purpose |
|----------|---------|---------|
| `vibling/.claude/skills/ui-spec/` | Vibling-specific (has Screen ID Reference, "Vibling" in description) | Project-level override |
| `~/.claude/skills/ui-spec/` | Generalized (no project-specific content, has init mode) | User-level, works in any project |
| `claude-skills/skills/ui-spec/` | Generalized (same as user-level) | Public distribution |

When both project-level and user-level exist, the project-level takes precedence.

## 7. Lessons Learned

### SKILL.md frontmatter naming conflict

**Problem**: SKILL.md had `name: ui-spec` + `user-invocable: false` in YAML frontmatter. When user types `/ui-spec`, the system matched SKILL.md (not invocable) instead of ui-spec.md (invocable).

**Fix**: Remove YAML frontmatter from SKILL.md entirely. SKILL.md serves as reference documentation, not a command definition. The `product-context` skill avoids this because its SKILL.md name (`product-context`) doesn't match any command filename (`product.md`, `product-init.md`).

**Rule**: If SKILL.md has a `name` field, it must NOT match any sibling `.md` filename that defines a command.

### Auto-open browser

Users expect `/ui-spec` (view mode) to actually show them the spec, not just print a text summary. Added `open .claude/design/ui-spec.html` as the last step of view mode.

## 8. Optimization Opportunities

### High Priority

- **`/ui-spec init` implementation**: Generate the full HTML scaffold with annotation system. This is the gateway for adoption — without it, users have to manually create the HTML or copy from Vibling.
- **Claude in Chrome integration**: Instead of `open` + manual browser viewing, use `mcp__claude-in-chrome__` tools to take a screenshot and show it inline. Could also read the DOM directly.
- **Template library**: Pre-built screen patterns (chat screen, list screen, form screen, profile screen, settings screen, onboarding flow) that `/ui-spec add-screen` can use.

### Medium Priority

- **Annotation threading**: Annotations that reference each other (reply chains). Currently each annotation is standalone.
- **Diff mode**: `/ui-spec diff` — compare current spec with a git-committed version, highlight what changed.
- **Export modes**: Generate React Native / SwiftUI component stubs from screen specs. The HTML structure maps surprisingly well to component trees.
- **Multi-spec support**: Some projects need multiple spec files (e.g., admin panel + user app). Support `--file` parameter or auto-detect from `.claude/design/*.html`.
- **Design tokens extraction**: Parse CSS variables into a design tokens JSON that can feed into actual app theming.

### Exploratory

- **AI-powered screen generation**: `/ui-spec generate` — describe a screen in natural language, Claude generates the HTML screen markup following all conventions.
- **Responsive variants**: Show same screen at different widths (mobile, tablet, desktop).
- **Interaction flows**: Arrow connections between screens showing user journeys, not just linear flow ordering.
- **Accessibility annotations**: A special annotation type for a11y issues (contrast, touch targets, screen reader text).
- **Version history**: Track annotation lifecycle (created → discussed → resolved) with timestamps.
- **Collaborative mode**: Multiple annotators with different author names, filtered views per author.

## 9. Technical Notes for Continuation

### Parsing the HTML

Claude can parse ui-spec.html effectively using:
- `Grep` with `class="section"[^>]*id="flow-` to list flows
- `Grep` with `class="screen"[^>]*id="screen-` to list screens
- `Grep` with `class="annotation"` to find annotations
- `Read` with offset/limit to read specific sections by line number

### Editing the HTML

Use the `Edit` tool with exact string matching. The HTML is well-structured with consistent indentation, making `old_string` → `new_string` replacements reliable.

### The CSS variable system

The theming system has two layers:
1. `:root` — dark theme (default)
2. `[data-theme="light"]` — light theme override

All new styles must use CSS variables. The variable naming convention:
- `--bg-*` for backgrounds
- `--text-*` for text colors
- `--border-*` for borders
- `--accent` for the primary brand color
- `--annotation-*` for the annotation system (normal + high priority variants)

### Download/save mechanism

The download button serializes the current DOM state (including dynamically added annotations) to a clean HTML file. It temporarily hides UI-only elements (toolbar, overlay, toast) and removes delete buttons before serializing, then restores them.
