# Lessons Learned

Record of mistakes and the rules created to prevent them from recurring.

<!-- Add lessons below as they occur -->

## 2026-03-09: Don't act without being asked

**Mistake**: User gave feedback/vented frustration. Instead of listening, I immediately ran tests and burned tokens on commands nobody asked for.

**Rule**: When the user gives feedback or expresses frustration, STOP and LISTEN. Do not run tools, do not "check what's broken", do not try to fix things proactively. Wait for explicit instructions.

## 2026-03-09: Don't change approach without permission

**Mistake**: User asked for a fallback approach on Replicate 404s. After implementing it, I independently decided to rewrite it to a completely different approach ("always use version-based") without being asked, breaking tests in the process.

**Rule**: Once an approach is agreed on and implemented, do NOT change it to a different approach unless the user explicitly asks. If you see a potential improvement, suggest it — don't just do it.
