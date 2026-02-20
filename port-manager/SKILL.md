# port-manager

Manage cross-project localhost port allocation. Prevents port conflicts when multiple Claude Code instances work on different projects simultaneously.

## Architecture

```
~/.claude/
├── port-registry.json              # Central registry (source of truth)
├── hooks/
│   └── check-port.sh               # PreToolUse hook (auto-installed)
└── skills/
    └── port-manager/
        ├── SKILL.md                 # This file
        ├── port-manager.md          # Command definition
        ├── scripts/
        │   ├── setup.sh             # One-click installer
        │   ├── check-port.sh        # Hook script source
        │   └── port-helpers.sh      # Shell helper functions
        └── examples/
            └── port-registry.example.json  # Registry template
```

## Port Registry Format

```json
{
  "version": "1.0.0",
  "updated_at": "2026-02-08",
  "port_ranges": {
    "reserved": { "min": 1024, "max": 8999, "description": "Project ports" },
    "available": { "min": 9000, "max": 9999, "description": "Allocation pool" },
    "system": { "min": 1, "max": 1023, "description": "System reserved" }
  },
  "ports": {
    "3000": {
      "project": "my-app",
      "service": "Backend API (Koa)",
      "added": "2026-02-08"
    }
  }
}
```

## Detection Mechanism

The PreToolUse hook (`check-port.sh`) uses two layers of detection:

### Layer 1: Explicit Port Detection

Regex patterns matched against Bash command strings:

| Pattern | Example |
|---------|---------|
| `PORT=XXXX` | `PORT=3000 node server.js` |
| `--port XXXX` / `--port=XXXX` | `vite --port 5173` |
| `-p XXXX` / `-p=XXXX` | `docker run -p 8080:80` |
| `localhost:XXXX` | `curl localhost:3000` |
| `127.0.0.1:XXXX` | `curl 127.0.0.1:8080` |
| `0.0.0.0:XXXX` | `nc -l 0.0.0.0:9000` |
| `.listen(XXXX` | `app.listen(3000)` |

### Layer 2: Indirect Startup Detection

When `npm run dev`, `pnpm dev`, `bun run dev`, etc. are detected:

1. **package.json scripts** — extract `--port` from script commands
2. **vite.config.{ts,js,mts,mjs}** — extract `port:` value
3. **next.config.{js,mjs,ts}** — extract `port:` value
4. **.env / .env.local / .env.development** — extract `PORT=`, `VITE_PORT=`, `DEV_PORT=`
5. **Registry fallback** — if no port found in config files, look up all ports registered to the current project and check if they're occupied

### Project Resolution

The hook resolves the current project name by walking up from `$PWD` to find the nearest `.git` directory or `CLAUDE.md` file. This correctly handles monorepo subdirectories (e.g., `my-app/packages/client/` resolves to `my-app`).

### Conflict Actions

| Scenario | Action |
|----------|--------|
| Port belongs to **other project** | **Block** (exit 2) with conflict message |
| Port belongs to **current project**, occupied | **Allow** with warning |
| Port belongs to **current project**, free | **Allow** silently |
| Port **not registered**, occupied | **Allow** with warning to register |
| Port **not registered**, free | **Allow** silently |

## Shell Helper Functions

Installed to `~/.claude/skills/port-manager/scripts/port-helpers.sh`, sourced via `~/.zshrc`:

| Function | Usage | Description |
|----------|-------|-------------|
| `port-check <port>` | `port-check 3000` | Check registry + lsof status |
| `port-find [count]` | `port-find 5` | Find available ports in 9000-9999 |
| `port-reserve <port> <project> [service]` | `port-reserve 9001 my-app "API"` | Register a port |
| `port-release <port>` | `port-release 9001` | Unregister a port |
| `port-status` | `port-status` | Full status report |

## Setup Components

The `/port-manager setup` command installs:

1. **Port registry** — `~/.claude/port-registry.json` (from template)
2. **Hook script** — `~/.claude/hooks/check-port.sh`
3. **PreToolUse hook config** — added to `~/.claude/settings.json`
4. **SessionStart integration** — port summary in `~/.claude/hooks/session-start.sh`
5. **Shell functions** — source reference in `~/.zshrc`
6. **CLAUDE.md section** — port management rules appended

## Uninstall

```bash
# Remove registry
rm ~/.claude/port-registry.json

# Remove hook
rm ~/.claude/hooks/check-port.sh

# Manual cleanup needed:
# - ~/.claude/settings.json: remove PreToolUse hook entry for check-port
# - ~/.claude/hooks/session-start.sh: remove port summary section
# - ~/.zshrc: remove port-helpers.sh source line
# - ~/.claude/CLAUDE.md: remove port management section
```

## Known Limitations

| Limitation | Workaround |
|------------|------------|
| Docker Compose port mappings | Register ports manually via `/port-manager reserve` |
| Direct terminal usage (outside Claude Code) | Use `port-status` shell function |
| Ports in deep config files (e.g., `src/config.ts`) | Register in port-registry.json |
