---
name: ui-spec
user-invocable: true
description: Create, view, annotate, and update UI spec documents
arguments:
  - name: mode
    description: "Command mode: open, status, annotations, resolve, annotate, update, add-screen, init, capture. Default (no args) = status + open browser."
    required: false
---

# /ui-spec Command

Manage UI spec design documents at `.claude/design/ui-spec.html`.

## Modes

### Default: `/ui-spec`

Open the spec in the browser and show a compact status summary. No questions asked.

1. Call `mcp__ui-spec__get_status` to get current state
2. Call `mcp__ui-spec__open_spec` to open in browser
3. Print a compact summary: flow count, screen count, open annotation count
4. Done — do NOT ask the user what they want to do next

### Open: `/ui-spec open`

Just open the spec in the browser. No status dump.

1. Call `mcp__ui-spec__open_spec`
2. Print the URL or confirmation
3. Done

### Status: `/ui-spec status`

Quick status check without opening the browser.

1. Call `mcp__ui-spec__get_status`
2. Print formatted summary:
   - Flows with screen counts
   - Total screens
   - Open annotations (count + brief list if any)
3. Done — do NOT open the browser

### List Annotations: `/ui-spec annotations`

List and filter annotations.

1. Call `mcp__ui-spec__list_annotations`
2. Group by status: open, resolved, wontfix
3. Show target screen/flow for each annotation
4. Support filtering by: author, priority, status

### Resolve: `/ui-spec resolve`

Mark annotations as resolved.

1. Read the UI spec file
2. List all open annotations (those without `data-status` or with `data-status="open"`)
3. Ask which annotation(s) to resolve (or resolve based on conversation context)
4. Call `mcp__ui-spec__resolve_annotation` for each

### Annotate: `/ui-spec annotate`

Add an annotation to a specific screen or flow based on conversation context.

1. Read the UI spec file
2. Determine which screen/flow the annotation targets (ask user if ambiguous)
3. Determine annotation content from conversation context or ask the user
4. Insert annotation HTML:
   - **Screen-level**: Add `<div class="annotation">` inside `.screen-body`, after the last content element but before `.tab-bar` or `.input-bar`
   - **Flow-level**: Add `<div class="annotation">` inside `.section`, before the `.screens` div
5. Use `data-author="claude"` and today's date for `data-date`
6. Set `data-priority` if the issue is urgent

### Update: `/ui-spec update`

Modify a specific screen's content based on annotations or conversation.

1. Read the UI spec file
2. Identify which screen to update (by ID or by asking user)
3. Make the requested changes to the screen content
4. If the update resolves an annotation, mark it with `data-status="resolved"`
5. Use CSS variables for any new colors (see SKILL.md for variable names)

### Add Screen: `/ui-spec add-screen`

Add a new screen to an existing flow.

1. Read the UI spec file and SKILL.md for the blank template
2. Ask which flow to add to (if not specified)
3. Generate a descriptive `id` following the `screen-{name}` convention
4. Create screen content based on conversation context
5. Use flex/relative layout in `.screen-body` for responsive reflow
6. If the screen has structurally different layouts at different viewports, use a viewport-group (see SKILL.md)
7. Insert the new screen in the appropriate position within `.screens`
8. Add an arrow (`<div class="arrow">&rarr;</div>`) between screens if needed

### Init: `/ui-spec init`

Create a starter UI spec for the current project.

1. Ask the user about their app's name, primary flows, and key screens
2. Create `.claude/design/` directory if it doesn't exist
3. Generate `ui-spec.html` with:
   - Dark/light theme toggle
   - Viewport toggle (Mobile 375px / Tablet 768px / Desktop 1440px) — see SKILL.md
   - Interactive annotation system (pencil button, save button)
   - Badge counter for open annotations
   - Initial flow sections and screen placeholders based on user input
   - Screen bodies use flex/relative layout for natural reflow across viewports
4. Include the standard CSS variable system for theming
5. Include viewport switching CSS and JS (see SKILL.md for template)
6. Call `mcp__ui-spec__open_spec` to open the spec in the browser

### Capture: `/ui-spec capture`

Generate UI spec screens from an existing project's source code.

1. **Discover project structure**:
   - Read `package.json` (or equivalent) → identify framework (React, Vue, Next.js, Electron, etc.)
   - Read router/navigation config → build a list of all pages/routes
   - Read theme/design-token files → extract color palette, typography, spacing
2. **Present page list** to user, ask which pages to capture (or all)
3. **For each selected page**:
   - Read the page component source code → component tree, layout structure, conditional rendering
   - Read associated style files (CSS modules, Tailwind config, styled-components, etc.) → extract colors, spacing, typography
   - Read shared components (Button, Card, Input, etc.) → reuse patterns
4. **Generate screens**:
   - Create (or update) `.claude/design/ui-spec.html`
   - If the file doesn't exist, scaffold it first (same as `init` mode, including viewport toggle)
   - For each page, generate a `<div class="screen">` that faithfully replicates the UI
   - Use CSS variables aligned with the project's actual color palette
   - Generate responsive layout by default (CSS reflow via viewport toggle)
   - When mobile and desktop layouts are structurally different, use viewport-group (see SKILL.md)
5. **Group screens into flows** based on route structure or user input
6. Call `mcp__ui-spec__open_spec` to open the spec in the browser for review

**Electron desktop apps**: See SKILL.md "Desktop App Conventions — Electron" section for main process config, platform CSS, chrome vs content theming, and desktop viewport sizes (Compact 800px / Default 1200px / Wide 1600px).

**Fidelity principle**: Maximum-effort visual fidelity from source code alone — no screenshots, no running the app. Structure must be faithful; visual styling should match as closely as static HTML/CSS allows.

## Important Rules

- Always read the current UI spec file before making changes
- Preserve existing content when adding annotations (don't modify screen content)
- Use CSS variables for theme-aware styling (never hardcode colors for new elements)
- Keep screen IDs descriptive and kebab-case: `screen-{meaningful-name}`
- Annotation authors: use `claude` for AI-added, user's name for user-requested
- Always include `data-date` with today's date in `YYYY-MM-DD` format
