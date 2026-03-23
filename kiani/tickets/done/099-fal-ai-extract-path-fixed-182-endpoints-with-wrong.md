---
id: "099"
title: "**fal-ai extract_path**: Fixed 182 endpoints with wrong `extract_path` in the registry. Models were silently returning empty output because `parseOutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.)."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-099: **fal-ai extract_path**: Fixed 182 endpoints with wrong `extract_path` in the registry. Models were silently returning empty output because `parseOutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.).

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**fal-ai extract_path**: Fixed 182 endpoints with wrong `extract_path` in the registry. Models were silently returning empty output because `parseOutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.).

### Key metric

Completion of **fal-ai extract_path**: fixed 182 endpoints with wrong `extract_path` in the registry. models were silently returning empty output because `parseoutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.)..

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

- AC-1: **fal-ai extract_path**: Fixed 182 endpoints with wrong `extract_path` in the registry. Models were silently returning empty output because `parseOutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.).

### Task breakdown
- [x] **fal-ai extract_path**: Fixed 182 endpoints with wrong `extract_path` in the registry. Models were silently returning empty output because `parseOutput` was looking for the wrong field (e.g., `images[].url` when the model returns `image`, `video`, `audio`, `audio_file`, etc.).

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
