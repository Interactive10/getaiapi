---
id: "063"
title: "**9 Wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. Fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. Fixed output_map content_type and extract_path where mismatched."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-063: **9 Wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. Fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. Fixed output_map content_type and extract_path where mismatched.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**9 Wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. Fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. Fixed output_map content_type and extract_path where mismatched.

### Key metric

Completion of **9 wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. fixed output_map content_type and extract_path where mismatched..

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

- AC-1: **9 Wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. Fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. Fixed output_map content_type and extract_path where mismatched.

### Task breakdown
- [x] **9 Wan models recategorized**: `lucataco-wan-2.1-1.3b-vid2vid` text-to-image → `video-to-video`; `krea-wan-14b-video-to-video` image-edit → `video-to-video`; `wan-v2.2-a14b-video-to-video` text-to-video → `video-to-video`; `wan-v2.2-a14b-image-to-image` image-edit → `image-to-image`; `wan-v2.2-a14b-text-to-image-lora` upscale-image → `text-to-image`; `wan-22-vace-fun-a14b-reframe` text-to-video → `image-to-video`. Fixed modality outputs from `[image]` to `[video]` for wan-22-vace-fun-a14b-depth, outpainting, pose. Fixed output_map content_type and extract_path where mismatched.

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
