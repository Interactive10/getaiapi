---
id: "002"
title: "**Async job submission & polling API**: New `submit()` function submits a job and returns immediately with the provider's task ID, model, provider, and endpoint — no blocking poll. New `poll()` function checks job status once and returns mapped outputs when completed. New `submitAndPoll()` alias for existing `generate()` behavior. New `SubmitResponse` and `PollResponse` types exported from the package. Synchronous providers (OpenRouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-002: **Async job submission & polling API**: New `submit()` function submits a job and returns immediately with the provider's task ID, model, provider, and endpoint — no blocking poll. New `poll()` function checks job status once and returns mapped outputs when completed. New `submitAndPoll()` alias for existing `generate()` behavior. New `SubmitResponse` and `PollResponse` types exported from the package. Synchronous providers (OpenRouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**Async job submission & polling API**: New `submit()` function submits a job and returns immediately with the provider's task ID, model, provider, and endpoint — no blocking poll. New `poll()` function checks job status once and returns mapped outputs when completed. New `submitAndPoll()` alias for existing `generate()` behavior. New `SubmitResponse` and `PollResponse` types exported from the package. Synchronous providers (OpenRouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`.

### Key metric

Completion of **async job submission & polling api**: new `submit()` function submits a job and returns immediately with the provider's task id, model, provider, and endpoint — no blocking poll. new `poll()` function checks job status once and returns mapped outputs when completed. new `submitandpoll()` alias for existing `generate()` behavior. new `submitresponse` and `pollresponse` types exported from the package. synchronous providers (openrouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`..

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

- AC-1: **Async job submission & polling API**: New `submit()` function submits a job and returns immediately with the provider's task ID, model, provider, and endpoint — no blocking poll. New `poll()` function checks job status once and returns mapped outputs when completed. New `submitAndPoll()` alias for existing `generate()` behavior. New `SubmitResponse` and `PollResponse` types exported from the package. Synchronous providers (OpenRouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`.

### Task breakdown
- [x] **Async job submission & polling API**: New `submit()` function submits a job and returns immediately with the provider's task ID, model, provider, and endpoint — no blocking poll. New `poll()` function checks job status once and returns mapped outputs when completed. New `submitAndPoll()` alias for existing `generate()` behavior. New `SubmitResponse` and `PollResponse` types exported from the package. Synchronous providers (OpenRouter) return `status: 'completed'` from `submit()` immediately — check status before calling `poll()`.

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
