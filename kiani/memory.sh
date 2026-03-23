#!/bin/bash
# Captures the last 5 commits with details and saves to context file
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_FILE="$SCRIPT_DIR/last_5_commits.txt"

cd "$REPO_DIR" || exit 1

{
  echo "=== Last 5 Commits ==="
  echo ""
  git log -5 --pretty=format:"--- Commit: %h ---
Date: %ai
Author: %an
Message: %s

%b
"
  echo ""
  echo "=== Diffs ==="
  echo ""
  git log -5 --pretty=format:"--- %h: %s ---" --stat
} > "$OUTPUT_FILE"

echo "→ Saved last 5 commits to $OUTPUT_FILE"
