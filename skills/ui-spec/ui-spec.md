---
user-invocable: true
description: Create, view, annotate, and update UI spec documents
arguments:
  - name: mode
    description: "Command mode: init, (empty)=view, annotate, update, add-screen, resolve, annotations"
    required: false
---

# /ui-spec Command

Manage UI spec design documents at `.claude/design/ui-spec.html`.

## Modes

### Init: `/ui-spec init`

Create a starter UI spec for the current project.

1. Ask the user about their app's name, primary flows, and key screens
2. Create `.claude/design/` directory if it doesn't exist
3. Generate `ui-spec.html` with:
   - Dark/light theme toggle
   - Interactive annotation system (pencil button, save button)
   - Badge counter for open annotations
   - Initial flow sections and screen placeholders based on user input
4. Include the standard CSS variable system for theming
5. Tell the user to open the file in a browser to view and annotate

### View (default): `/ui-spec`

1. Read `.claude/design/ui-spec.html`
2. List all flows (`.section[id]`) with their screen counts
3. List all screens (`.screen[id]`) with their labels
4. List all open annotations with their target screen/flow, author, priority
5. Present a concise summary to the user

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
5. Insert the new screen in the appropriate position within `.screens`
6. Add an arrow (`<div class="arrow">&rarr;</div>`) between screens if needed

### Resolve: `/ui-spec resolve`

Mark annotations as resolved.

1. Read the UI spec file
2. List all open annotations (those without `data-status` or with `data-status="open"`)
3. Ask which annotation(s) to resolve (or resolve based on conversation context)
4. Add `data-status="resolved"` to the annotation element

### List Annotations: `/ui-spec annotations`

List and filter annotations.

1. Read the UI spec file
2. Extract all `.annotation` elements with their attributes and content
3. Group by status: open, resolved, wontfix
4. Show target screen/flow for each annotation
5. Support filtering by: author, priority, status

## Important Rules

- Always read the current UI spec file before making changes
- Preserve existing content when adding annotations (don't modify screen content)
- Use CSS variables for theme-aware styling (never hardcode colors for new elements)
- Keep screen IDs descriptive and kebab-case: `screen-{meaningful-name}`
- Annotation authors: use `claude` for AI-added, user's name for user-requested
- Always include `data-date` with today's date in `YYYY-MM-DD` format
