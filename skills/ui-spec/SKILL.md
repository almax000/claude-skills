---
name: ui-spec
description: Manage UI spec documents with annotation workflow
user-invocable: false
---

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

## Interactive Annotation Mode

The UI spec has a built-in interactive annotation tool in the browser:

1. Click the **pencil button** in the top-right toolbar to enter annotate mode
2. **Hover** over elements to see highlight outlines
3. **Click** any element to open the annotation form
4. Write feedback, set priority, and save
5. Annotation is injected into the DOM as a real `.annotation` div at the right position
6. Click **save button** to download the modified HTML with all annotations embedded
7. User replaces `.claude/design/ui-spec.html` with the download
8. Claude reads the file and sees all annotations in their spatial context

### Workflow: User annotates → Claude reads → Claude executes

```
Browser: User clicks elements, adds annotations, downloads HTML
         ↓
File:    User replaces ui-spec.html with downloaded version
         ↓
Claude:  /ui-spec → reads file → sees annotations inside their parent screens
         ↓
Claude:  Proposes changes based on annotation context → /ui-spec update
```

### Badge counter
The pencil button shows a red badge with the count of open (unresolved) annotations.

## Theme System

The UI spec supports dark/light themes via CSS variables. When adding or modifying content:
- Use `var(--bg-*)` for backgrounds
- Use `var(--text-*)` for text colors
- Use `var(--border-*)` for borders
- Use `var(--accent)` for the primary theme color
- Character/brand-specific colors can remain as inline styles

## Quick Start

To create a UI spec for your project:

1. Run `/ui-spec init` to generate a starter `ui-spec.html`
2. Open it in a browser to view and annotate
3. Use `/ui-spec` to manage it from Claude Code
