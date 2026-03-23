---
id: "005"
title: "**kling-video-create-voice**: Fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: \"...\" }`, not `{ video: { url: \"...\" } }`. Fixed `param_map` (`image` → `voice_url`) to match actual API input schema."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-005: **kling-video-create-voice**: Fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: "..." }`, not `{ video: { url: "..." } }`. Fixed `param_map` (`image` → `voice_url`) to match actual API input schema.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**kling-video-create-voice**: Fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: "..." }`, not `{ video: { url: "..." } }`. Fixed `param_map` (`image` → `voice_url`) to match actual API input schema.

### Key metric

Completion of **kling-video-create-voice**: fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: "..." }`, not `{ video: { url: "..." } }`. fixed `param_map` (`image` → `voice_url`) to match actual api input schema..

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

- AC-1: **kling-video-create-voice**: Fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: "..." }`, not `{ video: { url: "..." } }`. Fixed `param_map` (`image` → `voice_url`) to match actual API input schema.

### Task breakdown
- [x] **kling-video-create-voice**: Fixed wrong `output_map.extract_path` (`video.url` → `voice_id`) — endpoint returns `{ voice_id: "..." }`, not `{ video: { url: "..." } }`. Fixed `param_map` (`image` → `voice_url`) to match actual API input schema.

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
