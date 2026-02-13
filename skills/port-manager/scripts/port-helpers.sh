#!/bin/bash
# Port management shell helper functions
# Source this file to use the following commands in your terminal

CLAUDE_PORT_REGISTRY="$HOME/.claude/port-registry.json"

# port-check <port> - Check registry + lsof, report port status
port-check() {
    local port="$1"
    if [ -z "$port" ]; then
        echo "Usage: port-check <port>"
        return 1
    fi

    echo "=== Port $port Status ==="

    # Check registry
    if [ -f "$CLAUDE_PORT_REGISTRY" ]; then
        local entry
        entry=$(jq -r --arg p "$port" '.ports[$p] // empty' "$CLAUDE_PORT_REGISTRY")
        if [ -n "$entry" ]; then
            local project service
            project=$(echo "$entry" | jq -r '.project')
            service=$(echo "$entry" | jq -r '.service')
            echo "Registry: $project - $service"
        else
            echo "Registry: not registered"
        fi
    else
        echo "Registry: file not found"
    fi

    # Check lsof
    local lsof_result
    lsof_result=$(lsof -i :"$port" -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2)
    if [ -n "$lsof_result" ]; then
        local proc_name proc_pid
        proc_name=$(echo "$lsof_result" | head -1 | awk '{print $1}')
        proc_pid=$(echo "$lsof_result" | head -1 | awk '{print $2}')
        echo "Status: in use ($proc_name, PID: $proc_pid)"
    else
        echo "Status: available"
    fi
}

# port-find [count] - Find available ports in configurable range
port-find() {
    local count="${1:-3}"
    local found=0

    local range_min range_max
    range_min=$(jq -r '.port_ranges.available.min // 9000' "$CLAUDE_PORT_REGISTRY" 2>/dev/null)
    range_max=$(jq -r '.port_ranges.available.max // 9999' "$CLAUDE_PORT_REGISTRY" 2>/dev/null)
    echo "=== Finding $count available ports ($range_min-$range_max) ==="

    for port in $(seq "$range_min" "$range_max"); do
        if [ "$found" -ge "$count" ]; then
            break
        fi

        # Check registry
        if [ -f "$CLAUDE_PORT_REGISTRY" ]; then
            local registered
            registered=$(jq -r --arg p "$port" '.ports[$p] // empty' "$CLAUDE_PORT_REGISTRY")
            if [ -n "$registered" ]; then
                continue
            fi
        fi

        # Check lsof
        if lsof -i :"$port" -sTCP:LISTEN -P -n >/dev/null 2>&1; then
            continue
        fi

        echo "  $port - available"
        found=$((found + 1))
    done

    if [ "$found" -eq 0 ]; then
        echo "  No available ports found"
    fi
}

# port-reserve <port> <project> [service] - Add port to registry
port-reserve() {
    local port="$1"
    local project="$2"
    local service="${3:-unnamed}"

    if [ -z "$port" ] || [ -z "$project" ]; then
        echo "Usage: port-reserve <port> <project> [service description]"
        return 1
    fi

    # Validate port number
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
        echo "Error: port must be a number between 1 and 65535"
        return 1
    fi

    if [ ! -f "$CLAUDE_PORT_REGISTRY" ]; then
        echo "Error: registry not found, run /port-manager setup first"
        return 1
    fi

    # Check if already registered
    local existing
    existing=$(jq -r --arg p "$port" '.ports[$p] // empty' "$CLAUDE_PORT_REGISTRY")
    if [ -n "$existing" ]; then
        local reg_project
        reg_project=$(echo "$existing" | jq -r '.project')
        echo "Error: port $port is already registered to $reg_project"
        return 1
    fi

    # Add to registry
    local date_now
    date_now=$(date +%Y-%m-%d)
    local tmpfile
    tmpfile=$(mktemp "${CLAUDE_PORT_REGISTRY}.XXXXXX")
    jq --arg p "$port" --arg proj "$project" --arg svc "$service" --arg d "$date_now" \
        '.ports[$p] = {"project": $proj, "service": $svc, "added": $d} | .updated_at = $d' \
        "$CLAUDE_PORT_REGISTRY" > "$tmpfile" && \
        mv "$tmpfile" "$CLAUDE_PORT_REGISTRY" || rm -f "$tmpfile"

    echo "Registered: port $port -> $project ($service)"
}

# port-release <port> - Remove port from registry
port-release() {
    local port="$1"
    if [ -z "$port" ]; then
        echo "Usage: port-release <port>"
        return 1
    fi

    if [ ! -f "$CLAUDE_PORT_REGISTRY" ]; then
        echo "Error: registry not found"
        return 1
    fi

    local existing
    existing=$(jq -r --arg p "$port" '.ports[$p] // empty' "$CLAUDE_PORT_REGISTRY")
    if [ -z "$existing" ]; then
        echo "Port $port is not in the registry"
        return 1
    fi

    local reg_project
    reg_project=$(echo "$existing" | jq -r '.project')

    local date_now
    date_now=$(date +%Y-%m-%d)
    local tmpfile
    tmpfile=$(mktemp "${CLAUDE_PORT_REGISTRY}.XXXXXX")
    jq --arg p "$port" --arg d "$date_now" \
        'del(.ports[$p]) | .updated_at = $d' \
        "$CLAUDE_PORT_REGISTRY" > "$tmpfile" && \
        mv "$tmpfile" "$CLAUDE_PORT_REGISTRY" || rm -f "$tmpfile"

    echo "Released: port $port (was registered to $reg_project)"

    # Check if still in use
    if lsof -i :"$port" -sTCP:LISTEN -P -n >/dev/null 2>&1; then
        echo "Warning: port $port is still in use by a process, you may need to stop it manually"
    fi
}

# port-status - Print full port status report
port-status() {
    if [ ! -f "$CLAUDE_PORT_REGISTRY" ]; then
        echo "Registry not found, run /port-manager setup first"
        return 1
    fi

    echo "=================================="
    echo "      Port Management Overview"
    echo "=================================="
    echo ""

    # Declare all local variables upfront (zsh prints values on repeated local declarations)
    local port_count port project service_rest service port_state lsof_result pid
    local found_unregistered proc addr registered

    # Registered ports
    port_count=$(jq '.ports | length' "$CLAUDE_PORT_REGISTRY")
    echo "Registered ports ($port_count):"
    printf "%-7s %-26s %-22s %s\n" "Port" "Project" "Service" "Status"
    printf "%-7s %-26s %-22s %s\n" "----" "-------" "-------" "------"
    while IFS=' ' read -r port project service_rest; do
        service="$service_rest"

        # Check port status (avoid zsh read-only 'status' builtin)
        port_state="available"
        lsof_result=$(lsof -i :"$port" -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2)
        if [ -n "$lsof_result" ]; then
            pid=$(echo "$lsof_result" | head -1 | awk '{print $2}')
            port_state="in use (PID: $pid)"
        fi

        printf "%-7s %-26s %-22s %s\n" "$port" "$project" "$service" "$port_state"
    done < <(jq -r '.ports | to_entries | sort_by(.key | tonumber) | .[] | "\(.key) \(.value.project) \(.value.service)"' "$CLAUDE_PORT_REGISTRY")

    echo ""

    # Unregistered but active ports
    echo "Unregistered but active ports:"
    printf "%-7s %-16s %s\n" "Port" "Process" "PID"
    printf "%-7s %-16s %s\n" "----" "-------" "---"

    found_unregistered=0
    while IFS=' ' read -r proc pid addr; do
        port=$(echo "$addr" | grep -oE '[0-9]+$')
        if [ -n "$port" ]; then
            registered=$(jq -r --arg p "$port" '.ports[$p] // empty' "$CLAUDE_PORT_REGISTRY" 2>/dev/null)
            if [ -z "$registered" ]; then
                printf "%-7s %-16s %s\n" "$port" "$proc" "$pid"
                found_unregistered=1
            fi
        fi
    done < <(lsof -i -sTCP:LISTEN -P -n 2>/dev/null | tail -n +2 | awk '{print $1, $2, $9}' | sort -u)

    if [ "$found_unregistered" -eq 0 ]; then
        echo "  (none)"
    fi
}
