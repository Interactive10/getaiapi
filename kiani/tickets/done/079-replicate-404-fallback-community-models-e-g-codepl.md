---
id: "079"
title: "**Replicate 404 fallback**: Community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. The adapter fetches the version via `GET /models/{owner}/{name}` on 404, matching the official Replicate SDK behavior."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-079: **Replicate 404 fallback**: Community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. The adapter fetches the version via `GET /models/{owner}/{name}` on 404, matching the official Replicate SDK behavior.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**Replicate 404 fallback**: Community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. The adapter fetches the version via `GET /models/{owner}/{name}` on 404, matching the official Replicate SDK behavior.

### Key metric

Completion of **replicate 404 fallback**: community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. the adapter fetches the version via `get /models/{owner}/{name}` on 404, matching the official replicate sdk behavior..

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

- AC-1: **Replicate 404 fallback**: Community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. The adapter fetches the version via `GET /models/{owner}/{name}` on 404, matching the official Replicate SDK behavior.

### Task breakdown
- [x] **Replicate 404 fallback**: Community models (e.g., `codeplugtech/face-swap`) that don't support the newer `/v1/models/{owner}/{name}/predictions` endpoint now automatically fall back to `/v1/predictions` with the latest version hash. The adapter fetches the version via `GET /models/{owner}/{name}` on 404, matching the official Replicate SDK behavior.

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
