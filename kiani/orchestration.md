# Workflow Orchestration

## Agents

Each agent has a defined persona and responsibilities. Agent definitions live in [`kiani/agents/`](agents/).

### Pipeline roles

| Stage | Agent | File | What they do |
|-------|-------|------|--------------|
| Drafts | Product Manager | [product-manager.md](agents/product-manager.md) | Defines user problem, scopes proposal, sets metrics |
| Review | Architect | [architect.md](agents/architect.md) | Designs technical approach, flags risks, estimates complexity |
| Review | Security | [security.md](agents/security.md) | Reviews public-facing or auth-related tickets |
| Backlog | Product Owner | [product-owner.md](agents/product-owner.md) | Breaks into tasks, writes acceptance criteria, prioritizes |
| Current | Frontend Engineer | [frontend-engineer.md](agents/frontend-engineer.md) | Implements UI, components, client-side logic |
| Current | Backend Engineer | [backend-engineer.md](agents/backend-engineer.md) | Implements APIs, database, auth, background jobs |
| Current | DevOps | [devops.md](agents/devops.md) | CI/CD, infrastructure, deployment |
| UX | UX Reviewer | [ux.md](agents/ux.md) | Reviews built UI for design system compliance and usability |
| Security | Security | [security.md](agents/security.md) | Reviews built code for vulnerabilities before QA |
| QA | QA Engineer | [qa.md](agents/qa.md) | Test planning, edge cases, regression testing |

### Advisory roles

| Agent | File | When to involve |
|-------|------|-----------------|
| CEO | [ceo.md](agents/ceo.md) | Prioritization, go/no-go, strategic direction |
| CFO | [cfo.md](agents/cfo.md) | Cost analysis, pricing, vendor decisions |
| SEO | [seo.md](agents/seo.md) | Search optimization, meta tags, site architecture |

### Collaboration patterns

**Feature development:** PM → Architect → PO → Frontend/Backend Engineer → UX → Security → QA → DevOps

**Bug fix:** QA (reproduce) → Engineer (fix) → QA (verify)

**Cost decision:** CEO (strategic importance) → CFO (financial impact) → Architect (feasibility) → Go/no-go

## Rules

- **Ticket movement**: Each agent may ONLY move a ticket to the next stage they own (see transition gates in `kiani/tickets/README.md`). No agent may skip stages or move tickets to stages outside their ownership. UX can move tickets from `ux/` to `security/`. Security can move tickets from `security/` to `qa/`. Only the QA agent can move tickets to `done/`. Violating this rule logs a scoreboard penalty.
- Before starting a task, review the skill index in `kiani/skills/`. Read ONLY the `SKILL.md` files explicitly relevant to the current task. Do not read all skills.
- Never commit anything unless user says commit.
- Never push anything unless user says push.
- Never ask for context that already exists in the codebase.
- After ending any task:
  - Review the code to make sure it is well written.
  - Ask yourself if you have followed all the instructions.

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## Permissions

- Never add `eslint-disable-next-line` without explaining and asking for approval.
- **NEVER call external/paid APIs (fal.ai, Kling, ElevenLabs, etc.) without explicit user confirmation first** — this includes test calls, background tasks, and debugging. Always ask before hitting any real service.

---

## Workflow Strategies

### 1. Plan First

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, STOP and re-plan immediately — don't keep pushing.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront to reduce ambiguity.

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- One task per subagent for focused execution.

### 3. Self-Improvement Loop

- Before starting a task, review lessons at `kiani/lessons.md` to not make the same mistake.
- After ANY correction from the user: update `kiani/lessons.md` with the pattern.
- If you made the same mistake again, move it up in the list.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.

### 4. Verification Before Done

- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness.
- **UI Consistency:** After completing any visual or structural task, verify it complies with `kiani/skills/ui-design-document/SKILL.md`.
- **Analytics:** After completing any feature that adds user-facing interactions, generation flows, or downloads, review `kiani/skills/analytics/SKILL.md` and add the necessary tracking calls.

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution."
- Skip this for simple, obvious fixes — don't over-engineer.
- Challenge your own work before presenting it.

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.
- Go fix failing CI tests without being told how.

---

## Trigger Commands

When the user uses the following specific phrases, execute the corresponding action:

| Phrase | Action |
|---|---|
| **"Question"** | Respond directly without making any code or file changes. |
| **"Error [message]"** | Create a bug ticket in `kiani/tickets/proposals/` using `kiani/tickets/TEMPLATE.md` (include frontmatter), and plan the fix. |
| **"Think like a product manager"** | Read `kiani/skills/product-manager/SKILL.md` and adopt that persona before responding. |
| **"Plan this out"** | Create a ticket in `kiani/tickets/proposals/` using `kiani/tickets/TEMPLATE.md` (include frontmatter). Do not code until approved. |
| **"Run the next task"** | Execute the task workflow below. |
| **"setup board meeting [DATE] - [TOPIC]"** | See `docs/board`. |
| **"board meeting [DATE]"** | Read the last `meeting/[date].md` and answer founders' questions. |

---

## Task Execution Workflow

When instructed to "Run the next task":

1. Check `kiani/tickets/current/` for an active ticket. If empty, move the highest-priority ticket from `kiani/tickets/todo/` into `current/` (verify `depends_on` tickets are in `done/` first).
2. Open the ticket file, read its frontmatter and task breakdown.
3. Complete all related subtasks one by one.
4. As each subtask is completed, update its checkbox in the ticket file (`[ ]` → `[x]`).
5. **Gate check before UX**: Verify ALL checkboxes are checked. Run `check:types` and `test`. If either fails, fix before moving.
6. Move the ticket to `kiani/tickets/ux/`. Log `+1 Engineering` in the [scoreboard](tickets/scoreboard.md) if this is a first-time pass (no prior bounces).
7. **UX review**: Review built UI against the design system and usability checklist. Fill in the UX sign-off block in the ticket.
   - If no critical UX issues: set `Result: passed`, move to `kiani/tickets/security/`.
   - If UX issues found: set `Result: bounced`, list issues, move ticket back to `current/`. Log `-1 Engineering` and `+1 UX` in the scoreboard.
8. **Security review**: Review code against OWASP checklist. Fill in the Security sign-off block in the ticket.
   - If no critical/high vulnerabilities: set `Result: passed`, move to `kiani/tickets/qa/`.
   - If vulnerabilities found: set `Result: bounced`, list issues, move ticket back to `current/`. Log `-1 Engineering` and `+1 Security` in the scoreboard.
9. **QA review**: Verify every acceptance criterion. Fill in the QA sign-off block at the bottom of the ticket.
   - If all ACs pass: set `Result: passed`, move to `done/`.
   - If issues found: set `Result: bounced`, list issues, move ticket back to `current/`. Log `-1 Engineering` and `+1 QA` in the scoreboard.
10. When moving a ticket between directories, update the `status` field in frontmatter to match the destination.

### Scoreboard

Every transition event that reflects on quality is logged in `kiani/tickets/scoreboard.md`. This tracks accountability across disciplines (PM, Architect, PO, Engineering, QA). See the scoreboard file for the full rules table.

When logging an event, update both the **Log** table (append a row) and the **Totals** table (adjust the score).

## Task Management

1. **Plan First**: Create a ticket in `kiani/tickets/proposals/` using `kiani/tickets/TEMPLATE.md` (include frontmatter and QA sign-off block).
2. **Verify Plan**: Check in before starting implementation.
3. **Track Progress**: Mark subtasks complete in the ticket file as you go.
4. **Explain Changes**: High-level summary at each step.
5. **Gate + Move**: Check transition gates (see `kiani/tickets/README.md`), move through the board, log scoreboard events.
6. **Capture Lessons**: Update `kiani/lessons.md` after corrections.

---

## Workflow Files

| File | Purpose |
|---|---|
| `kiani/tickets/` | Board-based ticketing system (see `kiani/tickets/README.md` for workflow) |
| `kiani/tickets/TEMPLATE.md` | Template required for creating any new tickets |
| `kiani/tickets/scoreboard.md` | Quality tracking — scoring events per discipline |
| `kiani/lessons.md` | Self-improvement log — lessons from mistakes and corrections |
| `kiani/skills/` | Directory containing specific skill instructions |
| `kiani/skills/ui-design-document/SKILL.md` | Single source of truth for UI/UX |
| `docs/ProductDesignDocument.md` | Overall project details and product clarifications |
| `docs/TECH_STACK.md` | Stack and environment |
