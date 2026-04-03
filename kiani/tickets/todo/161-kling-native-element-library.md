---
id: "161"
title: "Create kling element library models (create, list, delete)"
priority: P2
complexity: M
depends_on: []
area: build
status: todo
---

# PDD-161: Kling element library management

## Product — PM

### Problem
Kling's `element_list` param is used across image-to-video, omni-video, and motion control models for character/object consistency. But users on the native kling provider have no way to create or manage elements — the Element Library API has no registry representation. Without this, `element_list` is unusable via native Kling.

### Proposal
Create registry models for element library CRUD operations so native Kling users can create, list, and delete reusable elements.

### Key metric
Users can create elements via native API and reference them in video generation calls.

### Priority
P2 — Enables `element_list` param across multiple video models.

### Dependencies
None, but unlocks full functionality for tickets 154, 155, 156.

## Technical — Architect

### Architecture
- Skill: `kiani/skills/providers/kling/kling-element/SKILL.md`

**Create Element:**
- Endpoint: `POST v1/general/advanced-custom-elements`
- New model ID: `kling-element-create`
- Params: `element_name`, `element_description`, `reference_type` (video_refer/image_refer), `element_image_list`, `element_video_list`, `voice_id`, `tag_list`
- Output: `element_id` for use in generation tasks
- Modality: inputs [image, video, text], outputs [text]
- Category: training (closest fit — creates a reusable asset)

**List Elements:**
- Endpoint: `GET v1/general/advanced-custom-elements` (custom) and `GET v1/general/advanced-presets-elements` (presets)
- New model ID: `kling-element-list`
- Params: `pageNum`, `pageSize`
- Output: list of elements with IDs and metadata
- Note: This is a query, not generation — may not fit generate() pattern. Consider exposing via discovery/utility rather than generate.

**Delete Element:**
- Endpoint: `POST v1/general/delete-elements`
- New model ID: `kling-element-delete`
- Params: `element_id_list`
- Note: Destructive operation — same concern as list, doesn't fit generate().

**Design decision:** 
- Create element fits generate() (submit async job → get result). Include it.
- List/delete are synchronous CRUD — expose as separate models or skip and document as manual API calls.
- Minimum viable: just `kling-element-create` so users can create elements for use in generation.

### Risks & unknowns
- Element creation is async (like generation) but list/delete are sync CRUD.
- `tag_list` has 8 tag types (gender, age, ethnicity, etc.) — complex nested structure.
- Elements have a retention policy tied to account — management lifecycle concern.

### Complexity
M — 1-3 new models depending on design decision, moderate param complexity.

## Tasks — PO

### Acceptance criteria
- AC-1: kling-element-create model exists with kling provider
- AC-2: Decision documented on whether to include list/delete models
- AC-3: param_map verified against SKILL.md
- AC-4: Output mapping returns element_id
- AC-5: check:types passes

### Task breakdown
- [ ] Read element SKILL.md thoroughly
- [ ] Create kling-element-create registry entry
- [ ] Decide on list/delete model inclusion
- [ ] If including list/delete: create registry entries, handle sync response
- [ ] Run check:types

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | N/A | |
| Responsive (mobile/tablet/desktop) | N/A | |
| Accessibility (contrast, focus, aria) | N/A | |
| Loading/error/empty states | N/A | |
| Interaction feedback (hover/focus/active) | N/A | |

**Result**: pending
**Issues found**: none

## Security — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Injection (SQL, NoSQL, command) | [ ] | |
| Broken access control | [ ] | |
| Sensitive data exposure | [ ] | |
| XSS | [ ] | |
| Security misconfiguration | [ ] | |

**Result**: pending
**Issues found**: none

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| AC-1 | [ ] | |
| AC-2 | [ ] | |
| AC-3 | [ ] | |
| AC-4 | [ ] | |
| AC-5 | [ ] | |

**Result**: pending
**Issues found**: none
