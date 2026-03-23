---
id: "006"
title: "**kling-video-v3-pro-image-to-video**: Fixed `image` mapping (`image_url` → `start_image_url`) — fal.ai endpoint requires `start_image_url`, causing `input_value_error` on the required field. Removed 4 phantom params (`seed`, `guidance`, `steps`, `format`, `safety`), added real params (`duration`, `generate_audio`, `end_image_url`, `voice_ids`, `elements`, `aspect_ratio`, `cfg_scale`)."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-006: **kling-video-v3-pro-image-to-video**: Fixed `image` mapping (`image_url` → `start_image_url`) — fal.ai endpoint requires `start_image_url`, causing `input_value_error` on the required field. Removed 4 phantom params (`seed`, `guidance`, `steps`, `format`, `safety`), added real params (`duration`, `generate_audio`, `end_image_url`, `voice_ids`, `elements`, `aspect_ratio`, `cfg_scale`).

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**kling-video-v3-pro-image-to-video**: Fixed `image` mapping (`image_url` → `start_image_url`) — fal.ai endpoint requires `start_image_url`, causing `input_value_error` on the required field. Removed 4 phantom params (`seed`, `guidance`, `steps`, `format`, `safety`), added real params (`duration`, `generate_audio`, `end_image_url`, `voice_ids`, `elements`, `aspect_ratio`, `cfg_scale`).

### Key metric

Completion of **kling-video-v3-pro-image-to-video**: fixed `image` mapping (`image_url` → `start_image_url`) — fal.ai endpoint requires `start_image_url`, causing `input_value_error` on the required field. removed 4 phantom params (`seed`, `guidance`, `steps`, `format`, `safety`), added real params (`duration`, `generate_audio`, `end_image_url`, `voice_ids`, `elements`, `aspect_ratio`, `cfg_scale`)..

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

- AC-1: **kling-video-v3-pro-image-to-video**: Fixed `image` mapping (`image_url` → `start_image_url`) — fal.ai endpoint requires `start_image_url`, causing `input_value_error` on the required field. Removed 4 phantom params (`seed`, `guidance`, `steps`, `format`, `safety`), added real params (`duration`, `generate_audio`, `end_image_url`, `voice_ids`, `elements`, `aspect_ratio`, `cfg_scale`).

### Task breakdown
- [x] **kling-video-v3-pro-image-to-video**: Fixed `image` mapping (`image_url` → `start_image_url`) — fal.ai endpoint requires `start_image_url`, causing `input_value_error` on the required field. Removed 4 phantom params (`seed`, `guidance`, `steps`, `format`, `safety`), added real params (`duration`, `generate_audio`, `end_image_url`, `voice_ids`, `elements`, `aspect_ratio`, `cfg_scale`).

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
