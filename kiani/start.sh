#!/bin/bash
# Runs memory.sh to capture commits, then starts Claude with full context
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTEXT_FILE="$SCRIPT_DIR/last_5_commits.txt"
ORCHESTRATION_FILE="$SCRIPT_DIR/orchestration.md"
PRIMER_FILE="$SCRIPT_DIR/primer.md"
PROMPT_FILE="$SCRIPT_DIR/primerPrompt.md"

cd "$REPO_DIR" || exit 1

# Capture latest commits
echo "→ Capturing recent commits..."
bash "$SCRIPT_DIR/memory.sh"

# Build context
CONTEXT=""

if [ -f "$PROMPT_FILE" ]; then
  CONTEXT+="=== Session Primer ===
$(cat "$PROMPT_FILE")

"
fi

if [ -f "$PRIMER_FILE" ]; then
  CONTEXT+="=== Context ===
$(cat "$PRIMER_FILE")
"
fi

if [ -f "$ORCHESTRATION_FILE" ]; then
  CONTEXT+="$(cat "$ORCHESTRATION_FILE")

"
fi

if [ -f "$CONTEXT_FILE" ]; then
  CONTEXT+="$(cat "$CONTEXT_FILE")"
fi

echo "→ Starting Claude..."

claude \
  --dangerously-skip-permissions \
  --append-system-prompt "$CONTEXT"
