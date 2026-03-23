---
id: "080"
title: "**Category registration**: Registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. These templates existed as files but were never added to the lookup map, causing `getCategoryTemplate()` to return `undefined` at runtime."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-080: **Category registration**: Registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. These templates existed as files but were never added to the lookup map, causing `getCategoryTemplate()` to return `undefined` at runtime.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**Category registration**: Registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. These templates existed as files but were never added to the lookup map, causing `getCategoryTemplate()` to return `undefined` at runtime.

### Key metric

Completion of **category registration**: registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. these templates existed as files but were never added to the lookup map, causing `getcategorytemplate()` to return `undefined` at runtime..

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

- AC-1: **Category registration**: Registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. These templates existed as files but were never added to the lookup map, causing `getCategoryTemplate()` to return `undefined` at runtime.

### Task breakdown
- [x] **Category registration**: Registered 8 missing category templates (image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training) in `src/categories/index.ts`. These templates existed as files but were never added to the lookup map, causing `getCategoryTemplate()` to return `undefined` at runtime.

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
