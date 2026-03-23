---
id: "088"
title: "**OpenRouter empty outputs**: `mapOutput()` returned empty `outputs[]` for OpenRouter responses because `genericExtract` didn't support indexed array access (`choices[0]`). Added `key[N]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-088: **OpenRouter empty outputs**: `mapOutput()` returned empty `outputs[]` for OpenRouter responses because `genericExtract` didn't support indexed array access (`choices[0]`). Added `key[N]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**OpenRouter empty outputs**: `mapOutput()` returned empty `outputs[]` for OpenRouter responses because `genericExtract` didn't support indexed array access (`choices[0]`). Added `key[N]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`.

### Key metric

Completion of **openrouter empty outputs**: `mapoutput()` returned empty `outputs[]` for openrouter responses because `genericextract` didn't support indexed array access (`choices[0]`). added `key[n]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`..

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

- AC-1: **OpenRouter empty outputs**: `mapOutput()` returned empty `outputs[]` for OpenRouter responses because `genericExtract` didn't support indexed array access (`choices[0]`). Added `key[N]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`.

### Task breakdown
- [x] **OpenRouter empty outputs**: `mapOutput()` returned empty `outputs[]` for OpenRouter responses because `genericExtract` didn't support indexed array access (`choices[0]`). Added `key[N]` support so `choices[0].message.content` is correctly traversed and text content is returned in `outputs[0].content`.

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
