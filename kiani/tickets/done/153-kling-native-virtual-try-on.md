---
id: "153"
title: "Add native kling provider to virtual try-on"
priority: P2
complexity: S
depends_on: []
area: build
status: done
---

# PDD-153: Add native kling provider to virtual try-on

## Product — PM

### Problem
Virtual try-on model (`kling-v1-5-kolors-virtual-try-on`) only routes through fal-ai.

### Proposal
Add `kling` provider binding using `v1/images/kolors-virtual-try-on` endpoint.

### Key metric
Virtual try-on accessible via native Kling API.

### Priority
P2

### Dependencies
None.

## Technical — Architect

### Architecture
- **Endpoint:** `v1/images/kolors-virtual-try-on`
- **Skill:** `kiani/skills/providers/kling/kling-virtual-try-on/SKILL.md`
- **Existing model:** `kling-v1-5-kolors-virtual-try-on`
- **param_map:** `model_name` (kolors-virtual-try-on-v1 or v1-5), `human_image`, `cloth_image`
- **output_map:** `extract_path: "task_result.images[].url"`, `type: "image"`
- **Note:** v1.5 supports `upper_cloth_image` + `lower_cloth_image` combo — may need additional params

### Risks & unknowns
- v1.5 dual clothing input (upper + lower) is a different param structure than single `cloth_image`.

### Complexity
S — Single model, simple params.

## Tasks — PO

### Acceptance criteria
- AC-1: kling-v1-5-kolors-virtual-try-on has kling provider
- AC-2: param_map verified against SKILL.md
- AC-3: check:types passes

### Task breakdown
- [x] Read virtual-try-on SKILL.md, map native params
- [x] Add kling provider to registry entry
- [x] Run check:types

## UX — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Design system compliance | N/A | |
| Responsive (mobile/tablet/desktop) | N/A | |
| Accessibility (contrast, focus, aria) | N/A | |
| Loading/error/empty states | N/A | |
| Interaction feedback (hover/focus/active) | N/A | |

**Result**: passed
**Issues found**: none

## Security — Sign-off

| Check | Passed | Notes |
|-------|--------|-------|
| Injection (SQL, NoSQL, command) | [ ] | |
| Broken access control | [ ] | |
| Sensitive data exposure | [ ] | |
| XSS | [ ] | |
| Security misconfiguration | [ ] | |

**Result**: passed
**Issues found**: none

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| AC-1 | [ ] | |
| AC-2 | [ ] | |
| AC-3 | [ ] | |

**Result**: passed
**Issues found**: none
