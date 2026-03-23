---
id: '002'
title: Migrate existing projects to kiani framework
priority: P1
complexity: M
depends_on:
  - '001'
area: build
status: done
---

# PDD-002: Migrate existing projects to kiani framework

## Product — PM

### Problem

Existing projects use inconsistent task management approaches (TASKS.md, task files, TODO lists, ad-hoc markdown). This makes cross-project workflows unpredictable and prevents agents from operating uniformly across the portfolio.

### Proposal

Run the migration guide (`kiani/MIGRATE.md`) on each existing project to adopt the standardized kiani framework: orchestration, agents, skills, tickets, and lessons.

### Key metric

All active projects use the kiani ticket board system with consistent orchestration, agents, and skills.

### Priority

P1 — required before any cross-project workflow automation can work reliably.

### Dependencies

Depends on 001 (framework must be bootstrapped in the boilerplate first).

## Technical — Architect

### Architecture

The migration follows 8 phases defined in `kiani/MIGRATE.md`:

1. **Scaffold** — detect existing kiani components, copy missing ones from boilerplate
2. **Orchestration** — replace legacy orchestration.md, update AGENTS.md and CLAUDE.md
3. **Agents** — ensure all 11 personas exist, preserve project-specific customizations
4. **Skills** — copy only project-relevant skills, convert scattered knowledge docs
5. **Tickets** — inventory existing tasks, map to board format, create ticket files
6. **Lessons** — collect from legacy paths, code comments, post-mortems
7. **Clean up** — delete legacy files, fix stale references
8. **Verify** — confirm no items lost, no orphaned references

### Risks & unknowns

- Projects with heavily customized workflows may need manual adaptation beyond the guide
- Some projects may have tasks split across multiple systems (GitHub Issues + local files)
- Skill selection requires understanding each project's tech stack

### Complexity
<!-- S / M / L / XL -->
M (per project — repeatable process)

## Tasks — PO

### Acceptance criteria

- Given an existing project with a legacy task system, when the migration is run, then all tasks are converted to ticket files in `kiani/tickets/` with valid YAML frontmatter
- Given an existing project, when the migration completes, then `orchestration.md` references `kiani/tickets/` (not `TASKS.md`)
- Given an existing project, when the migration completes, then no legacy task files remain (`TASKS.md`, `task-{N}.md`, `TaskFormat.md`)
- Given an existing project, when the migration completes, then all 11 agent personas exist in `kiani/agents/`
- Given an existing project, when the migration completes, then only project-relevant skills are present in `kiani/skills/`

### Task breakdown
- [ ] Identify all active projects that need migration
- [ ] Run migration on each project following `kiani/MIGRATE.md`
- [ ] Verify each project passes the Phase 8 checklist
- [ ] Remove legacy task files from each project

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
