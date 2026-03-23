---
id: "083"
title: "**NoProviderError**: When a model exists but none of the user's configured providers support it, the error now says `Model \"X\" found but requires Y (ENV_VAR)` instead of the misleading `Model \"X\" not found. Did you mean: X?`."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-083: **NoProviderError**: When a model exists but none of the user's configured providers support it, the error now says `Model "X" found but requires Y (ENV_VAR)` instead of the misleading `Model "X" not found. Did you mean: X?`.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**NoProviderError**: When a model exists but none of the user's configured providers support it, the error now says `Model "X" found but requires Y (ENV_VAR)` instead of the misleading `Model "X" not found. Did you mean: X?`.

### Key metric

Completion of **noprovidererror**: when a model exists but none of the user's configured providers support it, the error now says `model "x" found but requires y (env_var)` instead of the misleading `model "x" not found. did you mean: x?`..

### Priority

P2

### Dependencies

None.

## Technical — Architect

### Architecture

Auto-discovered from CHANGELOG.md. Review and update as needed.

### Risks & unknowns

None identified (auto-generated ticket).

### Complexity

S

## Tasks — PO

### Acceptance criteria

- AC-1: **NoProviderError**: When a model exists but none of the user's configured providers support it, the error now says `Model "X" found but requires Y (ENV_VAR)` instead of the misleading `Model "X" not found. Did you mean: X?`.

### Task breakdown
- [x] **NoProviderError**: When a model exists but none of the user's configured providers support it, the error now says `Model "X" found but requires Y (ENV_VAR)` instead of the misleading `Model "X" not found. Did you mean: X?`.

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | [x] | Auto-generated |
| Responsive (mobile/tablet/desktop) | [x] | Auto-generated |
| Accessibility (contrast, focus, aria) | [x] | Auto-generated |
| Loading/error/empty states | [x] | Auto-generated |
| Interaction feedback (hover/focus/active) | [x] | Auto-generated |

**Result**: passed
**Issues found**: none

## Security — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Injection (SQL, NoSQL, command) | [x] | Auto-generated |
| Broken access control | [x] | Auto-generated |
| Sensitive data exposure | [x] | Auto-generated |
| XSS | [x] | Auto-generated |
| Security misconfiguration | [x] | Auto-generated |

**Result**: passed
**Issues found**: none

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| AC-1 | [x] | Auto-generated |

**Result**: passed
**Issues found**: none
