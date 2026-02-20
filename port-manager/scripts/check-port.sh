#!/bin/bash
# PreToolUse Hook: Check if Bash command ports conflict with the registry
# Exit codes: 0=allow, 2=block
#
# Two-layer detection:
#   1. Explicit ports: PORT=XXXX, --port, -p, localhost:XXXX, etc.
#   2. Indirect launch: npm run dev, pnpm dev, bun run dev, etc.
#      -> Extract ports from package.json scripts, vite.config, .env

REGISTRY="$HOME/.claude/port-registry.json"

# If registry doesn't exist, allow
if [ ! -f "$REGISTRY" ]; then
    exit 0
fi

# Validate registry JSON integrity
if ! jq empty "$REGISTRY" 2>/dev/null; then
    echo "Warning: port registry is corrupted, skipping port check" >&2
    exit 0
fi

# Read hook JSON from stdin
INPUT=$(cat)

# Extract tool name, only process Bash calls
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
if [ "$TOOL_NAME" != "Bash" ]; then
    exit 0
fi

# Extract Bash command content
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
if [ -z "$COMMAND" ]; then
    exit 0
fi

# Resolve current project directory name (walk up to find .git or CLAUDE.md)
resolve_project_name() {
    local dir="$PWD"
    while [ "$dir" != "/" ] && [ "$dir" != "$HOME" ]; do
        if [ -d "$dir/.git" ] || [ -f "$dir/CLAUDE.md" ]; then
            basename "$dir"
            return
        fi
        dir=$(dirname "$dir")
    done
    # Fallback: use current directory name
    basename "$PWD"
}
CURRENT_DIR=$(resolve_project_name)

# === Layer 1: Explicit port detection ===
# Patterns: PORT=XXXX, --port XXXX/=XXXX, -p XXXX/=XXXX,
#           localhost:XXXX, 127.0.0.1:XXXX, 0.0.0.0:XXXX, .listen(XXXX
PORTS=$(echo "$COMMAND" | grep -oE '(PORT|port)[= ]+[0-9]{1,5}|--port[= ]+[0-9]{1,5}|-p[= ]+[0-9]{1,5}|localhost:[0-9]{1,5}|127\.0\.0\.1:[0-9]{1,5}|0\.0\.0\.0:[0-9]{1,5}|\.listen\([0-9]{1,5}' | grep -oE '[0-9]{1,5}')

# === Layer 2: Indirect launch detection ===
# Detect npm/pnpm/bun/yarn run commands
if [ -z "$PORTS" ]; then
    IS_DEV_CMD=""

    # Match common dev server launch commands
    if echo "$COMMAND" | grep -qE '(npm|pnpm|yarn|bun)\s+(run\s+)?(dev|start|serve|preview)'; then
        IS_DEV_CMD="1"
    fi

    if [ -n "$IS_DEV_CMD" ]; then
        # Extract npm script name
        SCRIPT_NAME=$(echo "$COMMAND" | grep -oE '(run\s+)?(dev|start|serve|preview)(\S*)' | head -1 | awk '{print $NF}')

        # 1) Extract port from package.json scripts
        if [ -f "package.json" ]; then
            SCRIPT_CMD=$(jq -r --arg s "$SCRIPT_NAME" '.scripts[$s] // empty' package.json 2>/dev/null)
            if [ -n "$SCRIPT_CMD" ]; then
                PKG_PORTS=$(echo "$SCRIPT_CMD" | grep -oE -e '--port[= ]+[0-9]{4,5}' -e '-p[= ]+[0-9]{4,5}' -e 'PORT[= ]+[0-9]{4,5}' | grep -oE '[0-9]{4,5}')
                PORTS="$PORTS $PKG_PORTS"
            fi
        fi

        # 2) Extract port from vite.config.ts/js
        for cfg in vite.config.ts vite.config.js vite.config.mts vite.config.mjs; do
            if [ -f "$cfg" ]; then
                VITE_PORT=$(grep -oE 'port\s*:\s*[0-9]{4,5}' "$cfg" | grep -oE '[0-9]{4,5}' | head -1)
                if [ -n "$VITE_PORT" ]; then
                    PORTS="$PORTS $VITE_PORT"
                fi
                break
            fi
        done

        # 3) Extract port from .env / .env.local
        for envfile in .env .env.local .env.development; do
            if [ -f "$envfile" ]; then
                ENV_PORTS=$(grep -oE '^(PORT|VITE_PORT|DEV_PORT)[= ]+[0-9]{4,5}' "$envfile" | grep -oE '[0-9]{4,5}')
                PORTS="$PORTS $ENV_PORTS"
            fi
        done

        # 4) Extract port from next.config.js/mjs (Next.js)
        for cfg in next.config.js next.config.mjs next.config.ts; do
            if [ -f "$cfg" ]; then
                NEXT_PORT=$(grep -oE 'port\s*:\s*[0-9]{4,5}' "$cfg" | grep -oE '[0-9]{4,5}' | head -1)
                if [ -n "$NEXT_PORT" ]; then
                    PORTS="$PORTS $NEXT_PORT"
                fi
                break
            fi
        done

        # 5) If no port found, check registry for all ports of current project
        #    and warn if they are already in use
        if [ -z "$(echo "$PORTS" | tr -d ' ')" ]; then
            PROJECT_PORTS=$(jq -r --arg proj "$CURRENT_DIR" '[.ports | to_entries[] | select(.value.project == $proj) | .key] | join(" ")' "$REGISTRY" 2>/dev/null)
            if [ -n "$PROJECT_PORTS" ]; then
                for PP in $PROJECT_PORTS; do
                    LSOF_RESULT=$(lsof -i :"$PP" -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2)
                    if [ -n "$LSOF_RESULT" ]; then
                        PROC_NAME=$(echo "$LSOF_RESULT" | head -1 | awk '{print $1}')
                        PROC_PID=$(echo "$LSOF_RESULT" | head -1 | awk '{print $2}')
                        echo "Warning: project '$CURRENT_DIR' port $PP is already in use by $PROC_NAME (PID: $PROC_PID)." >&2
                        echo "The dev server may fail to start or use a different port." >&2
                    fi
                done
            fi
            # Allow (warning only)
            exit 0
        fi

        # Deduplicate
        PORTS=$(echo "$PORTS" | tr ' ' '\n' | sort -un | tr '\n' ' ')
    fi
fi

# No port detected, allow
if [ -z "$(echo "$PORTS" | tr -d ' ')" ]; then
    exit 0
fi

# === Conflict check ===
for PORT in $PORTS; do
    # Skip empty values
    [ -z "$PORT" ] && continue
    # Validate port range (1-65535)
    if [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ] 2>/dev/null; then
        continue
    fi

    # Check registry
    ENTRY=$(jq -r --arg p "$PORT" '.ports[$p] // empty' "$REGISTRY")
    if [ -n "$ENTRY" ]; then
        REG_PROJECT=$(echo "$ENTRY" | jq -r '.project')
        REG_SERVICE=$(echo "$ENTRY" | jq -r '.service')

        # If port belongs to current project, allow
        if [ "$REG_PROJECT" = "$CURRENT_DIR" ]; then
            # But still check if port is already in use (possibly by another instance)
            LSOF_RESULT=$(lsof -i :"$PORT" -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2)
            if [ -n "$LSOF_RESULT" ]; then
                PROC_NAME=$(echo "$LSOF_RESULT" | head -1 | awk '{print $1}')
                PROC_PID=$(echo "$LSOF_RESULT" | head -1 | awk '{print $2}')
                echo "Warning: port $PORT ($REG_SERVICE) is already in use by $PROC_NAME (PID: $PROC_PID)." >&2
                echo "You may need to stop PID $PROC_PID first, or the server will fail/use a fallback port." >&2
            fi
            continue
        fi

        # Port belongs to another project, block
        echo "Port conflict detected: port $PORT is registered to project '$REG_PROJECT' ($REG_SERVICE)." >&2
        echo "Current project: $CURRENT_DIR" >&2
        echo "Use 'port-check $PORT' for details, or '/port-manager find' to find available ports." >&2
        exit 2
    fi

    # Unregistered port, check lsof for usage
    LSOF_RESULT=$(lsof -i :"$PORT" -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2)
    if [ -n "$LSOF_RESULT" ]; then
        PROC_NAME=$(echo "$LSOF_RESULT" | head -1 | awk '{print $1}')
        PROC_PID=$(echo "$LSOF_RESULT" | head -1 | awk '{print $2}')
        echo "Warning: port $PORT is in use by $PROC_NAME (PID: $PROC_PID) but not in the registry." >&2
        echo "Use '/port-manager reserve $PORT $CURRENT_DIR' to register it." >&2
    fi
done

exit 0
