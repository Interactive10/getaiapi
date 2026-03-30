---
id: "001"
title: Bootstrap kiani framework with orchestration, tickets, and migration guide
priority: P1
complexity: M
depends_on: []
area: build
---

# PDD-001: Bootstrap kiani framework

## Product — PM

### Problem

Projects spawned from the boilerplate lack a standardized workflow system. Each project develops its own ad-hoc task management, leading to inconsistency and lost institutional knowledge.

### Proposal

Bootstrap the full `kiani/` framework into the boilerplate so every new project starts with: enhanced orchestration (agent roles, trigger commands, board-based task workflow), ticket board system (proposals through done with transition gates and quality scoring), self-improvement loop (lessons.md), and a migration guide for existing projects.

### Key metric

Every new project scaffolded from the boilerplate has a working ticket board and orchestration system on day one.

### Priority

P1 — foundational infrastructure that all other workflow improvements depend on.

### Dependencies

None.

## Technical — Architect

### Architecture

- `kiani/orchestration.md` — enhanced with agent roles table, collaboration patterns, board-based task execution, scoreboard tracking
- `kiani/tickets/` — full board system (README, TEMPLATE, scoreboard, 9 state directories)
- `kiani/lessons.md` — empty template for self-improvement loop
- `kiani/MIGRATE.md` — 8-phase migration guide for existing projects
- `AGENTS.md` — added Database section (Drizzle migration workflow)

### Risks & unknowns

- Existing projects will need to run the migration guide to adopt the new system
- Projects with heavily customized workflows may need manual adaptation

### Complexity
<!-- S / M / L / XL -->
M

## Tasks — PO

### Acceptance criteria

- Given a new project scaffolded from the boilerplate, when an agent reads `kiani/orchestration.md`, then it knows about agent roles, trigger commands, and the ticket board workflow
- Given a new project, when an agent is told "Run the next task", then it follows the board-based execution workflow (not the legacy TASKS.md approach)
- Given an existing project with a legacy task system, when an agent reads `kiani/MIGRATE.md`, then it can migrate tickets, skills, agents, and lessons to the new framework

### Task breakdown
- [x] Add Database section to AGENTS.md
- [x] Replace orchestration.md with enhanced version (agent roles, triggers, board workflow)
- [x] Create ticket board system (README, TEMPLATE, scoreboard, board directories)
- [x] Create empty lessons.md template
- [x] Create MIGRATE.md covering full framework migration (orchestration, agents, skills, tickets, lessons)
- [x] Remove all missionControl-specific references from templated files

## QA — Sign-off

| AC | Verified | Notes |
|----|----------|-------|
| AC-1 | [x] | orchestration.md has agent roles, triggers, board workflow |
| AC-2 | [x] | Task execution references kiani/tickets/, not TASKS.md |
| AC-3 | [x] | MIGRATE.md covers all 8 phases |

**Result**: passed
**Issues found**: none
