#!/bin/bash
# Port manager one-click installer
# Usage: bash ~/.claude/skills/port-manager/scripts/setup.sh

set -e

SKILL_DIR="$HOME/.claude/skills/port-manager"
HOOKS_DIR="$HOME/.claude/hooks"
REGISTRY="$HOME/.claude/port-registry.json"
SETTINGS="$HOME/.claude/settings.json"
SESSION_START="$HOOKS_DIR/session-start.sh"
ZSHRC="$HOME/.zshrc"
CLAUDE_MD="$HOME/.claude/CLAUDE.md"

echo "=========================================="
echo "  Port Manager Installation"
echo "=========================================="
echo ""

# Step 1: Initialize registry
echo "[1/6] Initializing port registry..."
if [ -f "$REGISTRY" ]; then
    echo "  Skipped: $REGISTRY already exists"
else
    cp "$SKILL_DIR/examples/port-registry.example.json" "$REGISTRY"
    echo "  Done: created $REGISTRY (with 14 preconfigured ports)"
fi

# Step 2: Install hook script
echo "[2/6] Installing port check hook..."
if [ -f "$HOOKS_DIR/check-port.sh" ]; then
    # Compare contents to decide whether to update
    if diff -q "$SKILL_DIR/scripts/check-port.sh" "$HOOKS_DIR/check-port.sh" > /dev/null 2>&1; then
        echo "  Skipped: check-port.sh is up to date"
    else
        cp "$SKILL_DIR/scripts/check-port.sh" "$HOOKS_DIR/check-port.sh"
        chmod +x "$HOOKS_DIR/check-port.sh"
        echo "  Done: updated check-port.sh"
    fi
else
    cp "$SKILL_DIR/scripts/check-port.sh" "$HOOKS_DIR/check-port.sh"
    chmod +x "$HOOKS_DIR/check-port.sh"
    echo "  Done: installed check-port.sh"
fi

# Step 3: Register PreToolUse hook in settings.json
echo "[3/6] Configuring PreToolUse hook..."
if [ -f "$SETTINGS" ]; then
    # Check if check-port hook already exists
    if jq -e '.hooks.PreToolUse[]? | select(.hooks[]?.command | test("check-port"))' "$SETTINGS" > /dev/null 2>&1; then
        echo "  Skipped: PreToolUse hook already configured"
    else
        # Append new PreToolUse hook
        TMPFILE=$(mktemp "${SETTINGS}.XXXXXX")
        jq '.hooks.PreToolUse += [{
            "matcher": "Bash",
            "hooks": [{
                "type": "command",
                "command": "~/.claude/hooks/check-port.sh"
            }]
        }]' "$SETTINGS" > "$TMPFILE" && mv "$TMPFILE" "$SETTINGS" || rm -f "$TMPFILE"
        echo "  Done: registered PreToolUse hook in settings.json"
    fi
else
    echo "  Error: $SETTINGS not found"
fi

# Step 4: Append port summary to session-start.sh
echo "[4/6] Integrating SessionStart port summary..."
if [ -f "$SESSION_START" ]; then
    if grep -q "port-registry" "$SESSION_START"; then
        echo "  Skipped: session-start.sh already includes port summary"
    else
        cat >> "$SESSION_START" << 'HOOK_EOF'

# === Port management summary ===
PORT_REGISTRY="$HOME/.claude/port-registry.json"
if [ -f "$PORT_REGISTRY" ]; then
    PORT_COUNT=$(jq '.ports | length' "$PORT_REGISTRY")
    ACTIVE_PORTS=$(lsof -i -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2 | awk '{print $9}' | grep -oE '[0-9]+$' | sort -un | wc -l | tr -d ' ')
    echo ""
    echo "Port Registry: $PORT_COUNT registered, $ACTIVE_PORTS active listeners"
    echo "Use '/port-manager' for details"
fi
HOOK_EOF
        echo "  Done: appended port summary to session-start.sh"
    fi
else
    echo "  Error: $SESSION_START not found"
fi

# Step 5: Add source reference in .zshrc
echo "[5/6] Configuring shell helper functions..."
if grep -q "port-helpers.sh" "$ZSHRC" 2>/dev/null; then
    echo "  Skipped: .zshrc already includes port-helpers.sh reference"
else
    cat >> "$ZSHRC" << 'ZSHRC_EOF'

# Port management helper functions
[ -f "$HOME/.claude/skills/port-manager/scripts/port-helpers.sh" ] && source "$HOME/.claude/skills/port-manager/scripts/port-helpers.sh"
ZSHRC_EOF
    echo "  Done: added source reference in .zshrc"
fi

# Step 6: Append port management section to CLAUDE.md
echo "[6/6] Updating CLAUDE.md..."
if grep -q "Port Management" "$CLAUDE_MD" 2>/dev/null; then
    echo "  Skipped: CLAUDE.md already includes port management section"
else
    # Dynamically generate port table from registry
    PORT_TABLE=""
    if [ -f "$REGISTRY" ]; then
        PORT_TABLE=$(jq -r '.ports | to_entries | sort_by(.key | tonumber) | .[] | "| \(.key) | \(.value.project) | \(.value.service) |"' "$REGISTRY" 2>/dev/null)
    fi

    {
        echo ""
        echo "## Port Management"
        echo ""
        echo "Global port registry: \`~/.claude/port-registry.json\`"
        echo ""
        echo "### Registered Ports"
        echo ""
        echo "| Port | Project | Service |"
        echo "|------|---------|---------|"
        if [ -n "$PORT_TABLE" ]; then
            echo "$PORT_TABLE"
        else
            echo "| (none) | Run \`/port-manager reserve\` to add | |"
        fi
        echo ""
        echo "### Rules"
        echo ""
        echo "- Check \`port-registry.json\` before starting services to avoid port conflicts"
        echo "- Register new ports via \`/port-manager reserve\`"
        echo "- Available port pool: 9000-9999"
        echo "- PreToolUse hook automatically blocks conflicting port usage"
    } >> "$CLAUDE_MD"
    echo "  Done: added port management section to CLAUDE.md"
fi

echo ""
echo "=========================================="
echo "  Installation Complete!"
echo "=========================================="
echo ""
echo "Installed components:"
echo "  - Port registry: $REGISTRY"
echo "  - PreToolUse hook: $HOOKS_DIR/check-port.sh"
echo "  - Shell functions: port-check, port-find, port-reserve, port-release, port-status"
echo ""
echo "Next steps:"
echo "  - Run 'source ~/.zshrc' to load shell functions"
echo "  - Run '/port-manager' to view port status"
echo "  - Try 'port-status' in a new terminal"
