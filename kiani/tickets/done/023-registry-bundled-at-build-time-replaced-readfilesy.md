---
id: "023"
title: "**Registry bundled at build time**: Replaced `readFileSync` with a JSON import (`import ... with { type: 'json' }`). The registry is now bundled into the dist output by tsup. No filesystem access at runtime — works in Vercel Edge, Cloudflare Workers, Deno Deploy, and any ESM runtime without special bundler config."
priority: P2
complexity: S
depends_on: []
area: "build"
status: "done"
auto_generated: true
---

# PDD-023: **Registry bundled at build time**: Replaced `readFileSync` with a JSON import (`import ... with { type: 'json' }`). The registry is now bundled into the dist output by tsup. No filesystem access at runtime — works in Vercel Edge, Cloudflare Workers, Deno Deploy, and any ESM runtime without special bundler config.

## Product — PM

### Problem

Discovered from CHANGELOG.md

### Proposal

**Registry bundled at build time**: Replaced `readFileSync` with a JSON import (`import ... with { type: 'json' }`). The registry is now bundled into the dist output by tsup. No filesystem access at runtime — works in Vercel Edge, Cloudflare Workers, Deno Deploy, and any ESM runtime without special bundler config.

### Key metric

Completion of **registry bundled at build time**: replaced `readfilesync` with a json import (`import ... with { type: 'json' }`). the registry is now bundled into the dist output by tsup. no filesystem access at runtime — works in vercel edge, cloudflare workers, deno deploy, and any esm runtime without special bundler config..

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

- AC-1: **Registry bundled at build time**: Replaced `readFileSync` with a JSON import (`import ... with { type: 'json' }`). The registry is now bundled into the dist output by tsup. No filesystem access at runtime — works in Vercel Edge, Cloudflare Workers, Deno Deploy, and any ESM runtime without special bundler config.

### Task breakdown
- [x] **Registry bundled at build time**: Replaced `readFileSync` with a JSON import (`import ... with { type: 'json' }`). The registry is now bundled into the dist output by tsup. No filesystem access at runtime — works in Vercel Edge, Cloudflare Workers, Deno Deploy, and any ESM runtime without special bundler config.

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
