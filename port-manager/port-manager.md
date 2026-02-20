---
name: port-manager
description: >
  Manage cross-project localhost port allocation.
  "port management", "port conflict", "check port", "allocate port",
  "port status", "setup port manager"
version: 1.0.0
user-invocable: true
allowed-tools: Read, Write, Edit, Bash(lsof:*), Bash(chmod:*), Bash(jq:*), Bash(source:*), Bash(cp:*), Bash(mkdir:*), Glob
---

# /port-manager

Manage cross-project localhost port allocation. Prevents port conflicts between Claude Code instances.

## Modes

Parse the arguments to determine the mode:

- `/port-manager` — Show global port status overview
- `/port-manager setup` — One-click install (hook, shell functions, registry)
- `/port-manager check <port>` — Check a specific port
- `/port-manager find [count]` — Find available ports (default: 3)
- `/port-manager reserve <port> <project> [service]` — Reserve a port
- `/port-manager release <port>` — Release a port
- `/port-manager scan` — Scan project CLAUDE.md files to discover ports

## Mode: Default (no args) — Status Overview

1. Read `~/.claude/port-registry.json`
2. For each registered port, run `lsof -i :<port> -sTCP:LISTEN -P -n` to check status
3. Also scan for unregistered active listeners
4. Output formatted table:

```
Registered Ports (14):
Port   Project                 Service              Status
----   -------                 -------              ------
3000   my-app                  Backend API (Koa)    Active (PID: 12345)
5173   my-app                  Client (Vite)        Idle
...

Unregistered Active Ports:
Port   Process    PID
----   -------    ---
4000   node       54321
```

## Mode: setup

Execute `~/.claude/skills/port-manager/scripts/setup.sh`:

1. Initialize `~/.claude/port-registry.json` from template
2. Copy `check-port.sh` hook to `~/.claude/hooks/`
3. Register PreToolUse hook in `~/.claude/settings.json` (use jq, don't break existing config)
4. Append port summary to `~/.claude/hooks/session-start.sh`
5. Add shell function source to `~/.zshrc`
6. Append port management section to `~/.claude/CLAUDE.md`

Each step reports: success / skipped / error.

## Mode: check \<port\>

1. Query registry: is the port assigned to a project?
2. Query lsof: is the port actively listening?
3. If occupied, get process details via `ps -p <PID> -o pid,ppid,command=`
4. Report combined status

## Mode: find [count]

1. Range: 9000-9999 (available pool)
2. Exclude ports in registry
3. Exclude ports with active lsof listeners
4. Return requested count (default: 3)

## Mode: reserve \<port\> \<project\> [service]

1. Check if port is already registered (error if conflict)
2. Check if port is actively occupied (warn)
3. Add to registry with `jq`
4. Report success

## Mode: release \<port\>

1. Confirm port exists in registry
2. Remove from registry with `jq`
3. If port still occupied by a process, warn user

## Mode: scan

1. Find CLAUDE.md files under `~/Documents/` and `~/Projects/`
2. Skip `node_modules/` and vendor directories
3. Extract port declarations via regex:
   - `port`, `PORT`, `localhost:`, `127.0.0.1:`
   - Markdown table patterns with port numbers
4. Compare with registry, report:
   - Registered ports found in CLAUDE.md (consistent)
   - Registered ports missing from CLAUDE.md (gaps)
   - Unregistered ports found in CLAUDE.md (candidates)
5. Offer to batch-register new discoveries

## Customization

Edit `examples/port-registry.example.json` to set your initial port allocation before running setup. The template is copied as-is to `~/.claude/port-registry.json`.
