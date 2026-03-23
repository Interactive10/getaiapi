# Scoreboard

Quality tracking across disciplines. Updated on every ticket transition event.

## Totals

| Discipline | Score |
|-----------|-------|
| PM | 0 |
| Architect | 0 |
| PO | 0 |
| Engineering | 0 |
| UX | 0 |
| Security | 0 |
| QA | 0 |

## Scoring rules

### Positive (+1)

| Event | Who | When |
|-------|-----|------|
| Bug caught in QA | QA | QA finds a bug during `qa/` review and bounces ticket |
| Missing AC caught | QA | QA finds an acceptance criterion not met |
| Incomplete tasks caught | QA | QA finds unchecked task boxes in `qa/` |
| Risk saves rework | Architect | An identified risk prevents a bug or redesign later |
| UX issue caught in review | UX | UX finds a usability or design issue and bounces ticket |
| Clean UX pass | Engineering | Ticket passes UX review on first attempt |
| Vulnerability caught in security review | Security | Security finds a vulnerability and bounces ticket |
| Clean security pass | Engineering | Ticket passes security review on first attempt |
| Clean QA pass | Engineering | Ticket passes QA on first attempt with zero issues |

### Negative (-1)

| Event | Who | When |
|-------|-----|------|
| Stale ticket in drafts | PM | Proposal sits in `drafts/` without PM completing their section and moving to `review/` |
| Stale ticket in review | Architect | Ticket sits in `review/` without architecture, risks, and complexity filled |
| Stale ticket in backlog | PO | Ticket sits in `backlog/` without ACs and task breakdown added |
| Stale ticket in ux | UX | Ticket sits in `ux/` without UX review completed |
| Stale ticket in security | Security | Ticket sits in `security/` without security review completed |
| Stale ticket in qa | QA | Ticket sits in `qa/` without QA sign-off completed |
| Bug found in QA | Engineering | QA finds a bug — broken code was shipped to QA |
| Missing AC in QA | PO | Acceptance criteria were ambiguous or missing |
| Incomplete tasks sent to QA | Engineering | Unchecked tasks when ticket arrives in `qa/` |
| Bounced from QA twice | Engineering | Same ticket bounced back a second time (-1 additional) |
| Bug found after done | QA | Bug discovered in a `done/` ticket — QA missed it |
| Bug found after done | Engineering | Bug discovered in a `done/` ticket — Engineering wrote it |
| UX issue found in review | Engineering | UX finds a usability or design system violation in built code |
| Vulnerability found in security review | Engineering | Security finds a vulnerability in built code |
| Vulnerability found after done | Security | Vulnerability discovered in a `done/` ticket — Security missed it |
| Vulnerability found after done | Engineering | Vulnerability discovered in a `done/` ticket — Engineering wrote it |
| Vague architecture causes rework | Architect | Engineering redesigns mid-build due to missing detail |
| Vague AC causes rework | PO | Engineering built wrong thing because AC was unclear |

## Log

| Date | Ticket | Event | Discipline | Points | Reason |
|------|--------|-------|------------|--------|--------|
