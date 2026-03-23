# Ticket Board

## Board

```
                proposals/ ──→ drafts/
                 (tech)          PM
                                  ↓
              drafts/ → review/ → backlog/ → todo/ → current/ → ux/ → security/ → qa/ → done/
                PM      Architect     PO                         UX    Security    QA     ↕
                                                                                      on-hold/
```

| Status | Directory | Owner | Description |
|--------|-----------|-------|-------------|
| Proposals | [proposals/](proposals/) | Any engineer | Tech-initiated tickets awaiting PM review |
| Drafts | [drafts/](drafts/) | PM | Problem, proposal, metrics defined |
| Review | [review/](review/) | Architect | Technical design, risks, complexity added |
| Backlog | [backlog/](backlog/) | PO | Tasks broken down, acceptance criteria set. Ready |
| Todo | [todo/](todo/) | — | Approved and prioritized for next cycle |
| Current | [current/](current/) | — | Actively being built |
| UX | [ux/](ux/) | UX | Built UI reviewed for design system compliance and usability |
| Security | [security/](security/) | Security | Built code reviewed for vulnerabilities before QA |
| QA | [qa/](qa/) | — | Built, needs testing and verification |
| Done | [done/](done/) | — | Tested and complete |
| On Hold | [on-hold/](on-hold/) | — | Blocked or paused |

### Phases

Every feature is delivered incrementally through phases. Each phase is a standalone ticket file that moves through the board independently.

**P1** is always the MVP — the minimum useful version. Higher phases (P2, P3, P4) layer capabilities on top. A feature may have one phase or many, depending on scope.

#### Naming

```
{id}-{name}-P{phase}.md
```

Examples:
- `001-feature-name-P1.md` — Phase 1 MVP
- `001-feature-name-P2.md` — Phase 2
- `001-feature-name-P3.md` — Phase 3

#### ID format

P1 tickets use the bare feature id. Higher phases append `-P{n}`:

| Phase | `id` field | `depends_on` |
|-------|-----------|--------------|
| P1 | `"001"` | `[]` (or other features) |
| P2 | `"001-P2"` | `["001"]` |
| P3 | `"001-P3"` | `["001-P2"]` |
| P4 | `"001-P4"` | `["001-P3"]` |

Each phase depends on the previous phase of the same feature. This creates a chain: a P2 cannot start until its P1 is in `done/`, P3 waits for P2, and so on. Phases from different features can run in parallel.

### Ticket structure

Each ticket has **YAML frontmatter** for queryable metadata, followed by three sections per role:

```yaml
---
id: 001-P2
title: Feature name — phase description
priority: P2 # P0 | P1 | P2 | P3
complexity: M # S | M | L | XL
depends_on: ['001'] # ticket IDs this depends on
area: operate # create | build | operate | sunset
---
```

- **Product — PM**: problem, proposal, key metric, priority, dependencies
- **Technical — Architect**: architecture, risks & unknowns, complexity (S/M/L/XL)
- **Tasks — PO**: acceptance criteria, task breakdown with checkboxes

See [TEMPLATE.md](TEMPLATE.md) for the full template.

### Querying tickets

Frontmatter makes tickets greppable without reading the full body:

```bash
# All P0 tickets
grep -rl 'priority: P0' tickets/

# All tickets in the "operate" area
grep -rl 'area: operate' tickets/

# All tickets that depend on 001
grep -rl '"001"' tickets/ | xargs grep 'depends_on'

# All P2 phase tickets (by filename)
ls tickets/backlog/*-P2.md tickets/todo/*-P2.md 2>/dev/null
```

### Transition gates

Every board transition has prerequisites. If a gate is not met, the ticket **bounces back** to the previous stage and a [scoreboard](scoreboard.md) event is logged.

| Transition | Gate (must be true to move) | Owner |
|-----------|---------------------------|-------|
| `drafts/ → review/` | Problem, proposal, key metric, priority, and dependencies sections filled | PM |
| `review/ → backlog/` | Architecture, risks & unknowns, and complexity sections filled | Architect |
| `backlog/ → todo/` | Acceptance criteria (Given/When/Then) and task breakdown with checkboxes present | PO |
| `todo/ → current/` | All `depends_on` tickets are in `done/` | — |
| `current/ → ux/` | All task checkboxes checked. Types pass (`check:types`). Tests pass (`test`) | Engineering |
| `ux/ → security/` | UX checklist reviewed. No critical usability or accessibility issues. UX sign-off block filled with `Result: passed` | UX |
| `security/ → qa/` | OWASP checklist reviewed. No critical or high vulnerabilities. Security sign-off block filled with `Result: passed` | Security |
| `qa/ → done/` | Every acceptance criterion verified. QA sign-off block filled with `Result: passed` | QA |

**Bounces**: When a gate fails, move the ticket back and log a scoreboard event. Example: QA finds a bug → move ticket back to `current/`, log `-1 Engineering` and `+1 QA` in the [scoreboard](scoreboard.md). UX finds a usability issue → move ticket back to `current/`, log `-1 Engineering` and `+1 UX` in the [scoreboard](scoreboard.md). Security finds a vulnerability → move ticket back to `current/`, log `-1 Engineering` and `+1 Security` in the [scoreboard](scoreboard.md).

### How to move a ticket

```bash
# 1. Check the gate for the transition (see table above)
# 2. Move the file
mv tickets/current/001-feature-P1.md tickets/ux/
# 3. If a scoring event occurred, update kiani/tickets/scoreboard.md
```

When moving a ticket, update the `status` field in frontmatter to match the destination directory.

Multiple agents can work on different tickets simultaneously — each agent only touches its own ticket file.

### Prioritization model

Tickets are pulled from backlog/todo based on:
1. **Priority** (P0 first)
2. **Dependencies** (earlier phases must be in `done/` before later phases can start)
3. **Phase** (P1 tickets are MVP and ship first; P2+ layer on top)
