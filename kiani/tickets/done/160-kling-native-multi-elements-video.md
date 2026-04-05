---
id: "160"
title: "Design and implement kling multi-elements video editing workflow"
priority: P3
complexity: XL
depends_on: ["154"]
area: build
status: done
---

# PDD-160: Kling multi-elements video editing (6-step workflow)

## Product — PM

### Problem
Kling's multi-elements video editing is a unique interactive capability (replace/remove objects in video via point-based selection) with no registry representation. It uses a 6-step stateful workflow that doesn't fit the standard single-call `generate()` pattern.

### Proposal
Design spike to determine how (or whether) to expose this capability, then implement.

### Key metric
Decision documented. If implemented, multi-elements editing accessible via API.

### Priority
P3 — Advanced capability, needs design work first.

### Dependencies
Ticket 154 (video patterns established).

## Technical — Architect

### Architecture
**6-Step Workflow:**
1. `POST v1/videos/multi-elements/init-selection` — Upload video, get session
2. `POST v1/videos/multi-elements/add-selection` — Mark areas with points on specific frames
3. `POST v1/videos/multi-elements/delete-selection` — Remove marks
4. `POST v1/videos/multi-elements/clear-selection` — Clear all marks
5. `POST v1/videos/multi-elements/preview-selection` — Preview mask tracking
6. `POST v1/videos/multi-elements/generation` — Execute edit with replacement element/prompt

- Skill: `kiani/skills/providers/kling/kling-multi-elements-video/SKILL.md`
- All steps share a `session_id` for state management
- Point selection uses normalized coordinates (0-1 range)

**Design Options:**
- **Option A: Skip** — Too complex for unified API, document as kling-exclusive manual workflow
- **Option B: Simplified single-call** — Only expose the generation step, require user to manage sessions externally
- **Option C: Multi-model** — Create separate models for each step (init, select, generate), user orchestrates
- **Option D: Orchestrated** — Single model that auto-runs init → select → generate with smart defaults

### Risks & unknowns
- Stateful session management across multiple API calls is fundamentally different from stateless generation
- Interactive point selection (step 2) requires visual feedback — hard to automate
- Video input constraints: 2-5s or 7-10s only
- This may be better suited as a SDK-level feature than a registry model

### Complexity
XL — Architectural design decision + potential multi-endpoint implementation.

## Tasks — PO

### Acceptance criteria
- AC-1: Design decision documented (which option chosen and why)
- AC-2: If implementing: models created with correct param_maps
- AC-3: If skipping: documented in registry as known limitation
- AC-4: check:types passes

### Task breakdown
- [ ] Read multi-elements SKILL.md thoroughly
- [ ] Evaluate all 4 design options against generate() API pattern
- [ ] Document decision in ticket
- [ ] Implement chosen approach (or document skip rationale)
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

**Result**: pending
**Issues found**: none
