# Migration Guide

Migrate any project to the standardized `kiani/` framework: orchestration, agents, skills, tickets, and lessons.

## When to use

Run this migration when a project needs to adopt the `kiani/` system — whether it has an existing task system, scattered docs, or nothing at all.

---

## Phase 1: Scaffold the framework

### 1.1 Check what exists

Scan the project for existing `kiani/` components:

| Component | Expected path | Status |
|-----------|--------------|--------|
| Orchestration | `kiani/orchestration.md` | Exists / Missing / Outdated |
| Agents | `kiani/agents/*.md` | Exists / Missing / Incomplete |
| Skills | `kiani/skills/*/SKILL.md` | Exists / Missing / Incomplete |
| Tickets | `kiani/tickets/` (with board dirs) | Exists / Missing / Legacy |
| Lessons | `kiani/lessons.md` | Exists / Missing |
| AGENTS.md | `AGENTS.md` (root) | Exists / Missing / Outdated |
| CLAUDE.md | `CLAUDE.md` (root) | Exists / Missing |

### 1.2 Copy missing components from the boilerplate

For each missing component, copy from the canonical boilerplate (`projectTemplate/boilerplate/`). Do not overwrite files that already exist unless they are outdated (see 1.3).

```
kiani/
├── orchestration.md          # Workflow rules, strategies, triggers
├── lessons.md                # Self-improvement loop (empty template)
├── agents/                   # Agent personas
│   ├── product-manager.md
│   ├── architect.md
│   ├── security.md
│   ├── product-owner.md
│   ├── frontend-engineer.md
│   ├── backend-engineer.md
│   ├── devops.md
│   ├── qa.md
│   ├── ceo.md
│   ├── cfo.md
│   └── seo.md
├── skills/                   # Knowledge modules
│   └── (project-relevant skills only)
├── tickets/                  # Board-based ticketing
│   ├── README.md
│   ├── TEMPLATE.md
│   ├── scoreboard.md
│   ├── proposals/
│   ├── drafts/
│   ├── review/
│   ├── backlog/
│   ├── todo/
│   ├── current/
│   ├── qa/
│   ├── done/
│   └── on-hold/
```

### 1.3 Update outdated components

Compare existing files against the boilerplate versions. Replace if:

- `orchestration.md` still references `TASKS.md`, `task-{N}.md`, or `TaskFormat.md` (legacy system)
- `orchestration.md` is missing agent roles, trigger commands, or scoreboard references
- `AGENTS.md` is missing the `## Database` section
- `CLAUDE.md` doesn't point to `AGENTS.md` (should contain `@AGENTS.md`)

---

## Phase 2: Migrate orchestration

### 2.1 Replace orchestration.md

If the project uses the legacy orchestration (references `TASKS.md`), replace it entirely with the boilerplate version. The new orchestration references `kiani/tickets/` for task management.

### 2.2 Update AGENTS.md

Ensure these sections exist (copy missing ones from boilerplate):
- Principles, Token efficiency, Commands, **Database**, Git Commits, Env, Styling, React, Pages, i18n, JSDoc, Tests

### 2.3 Update CLAUDE.md

Should contain at minimum:
```
@AGENTS.md
```

---

## Phase 3: Migrate agents

### 3.1 Detect existing agents

Check if `kiani/agents/` exists and which personas are present.

### 3.2 Copy missing agents

All 11 agent personas should be present. Copy any missing ones from the boilerplate. If the project has custom agents not in the standard set, keep them.

### 3.3 Preserve customizations

If an agent file has been customized for this project (project-specific context, domain knowledge), keep the customizations. Only replace if the file is identical to a stale boilerplate version.

---

## Phase 4: Migrate skills

### 4.1 Audit existing skills

List all skills in `kiani/skills/`. Skills are project-relevant knowledge modules — not every project needs every skill.

### 4.2 Ensure core skills exist

These skills are relevant to most projects and should be present:

| Skill | Path | Why |
|-------|------|-----|
| Agent roles | `agent-roles/SKILL.md` | How agents collaborate |
| UI design | `ui-design-document/SKILL.md` | Design tokens, component standards |
| Tailwind v4 | `tailwind-4/SKILL.md` | CSS-first syntax, breaking changes |
| Frontend design | `frontend-design/SKILL.md` | UI/UX patterns |

### 4.3 Copy project-relevant skills

From the boilerplate's full skill library, copy only skills relevant to this project's tech stack. Examples:

| If the project uses... | Copy these skills |
|----------------------|------------------|
| Next.js | `nextjs/` (all sub-skills) |
| Clerk auth | `clerk/SKILL.md` |
| Cloudflare R2 | `cloudflare-r2/SKILL.md` |
| fal.ai | relevant `fal-ai-*/SKILL.md` files |

Do NOT copy the entire skill library — only what's needed. Unused skills add noise.

### 4.4 Migrate scattered knowledge

If the project has knowledge docs outside `kiani/skills/` (e.g., `docs/patterns.md`, `CONVENTIONS.md`, inline comments explaining "how we do X"), consider converting them to skill files:

1. Create `kiani/skills/{topic}/SKILL.md`
2. Move the content into the skill format
3. Delete or link to the original file

---

## Phase 5: Migrate tickets

### 5.1 Detect existing task system

| Pattern | System |
|---------|--------|
| `TASKS.md` + `task-{N}.md` | Legacy task files |
| `tasks/` directory | Legacy task directory |
| `TaskFormat.md` | Legacy task template |
| `TODO.md` or `TODO` | Simple TODO list |
| `.github/ISSUE_TEMPLATE/` | GitHub Issues workflow |
| `kiani/tickets/` already populated | Partial adoption — fill gaps |
| None of the above | Greenfield — skip to 5.5 |

### 5.2 Inventory existing items

Collect every task, ticket, issue, or TODO into a flat list. For each item, extract:

- **Title**: what it describes
- **Status**: done, in progress, blocked, or not started
- **Priority**: existing priority or infer (critical bug = P0, nice-to-have = P3)
- **Dependencies**: references to other tasks
- **Acceptance criteria**: any existing definition of done
- **Technical notes**: architecture decisions, risks, implementation details

### 5.3 Map to ticket board

#### Status mapping

| Existing status | Board directory |
|----------------|-----------------|
| Done / Complete / Closed | `done/` |
| In Progress / Current / Active | `current/` |
| Blocked / On Hold / Waiting | `on-hold/` |
| Ready / Approved / Next Up | `todo/` |
| Planned / Backlog / Later | `backlog/` |
| Idea / Proposal / Draft | `proposals/` |
| Has technical design | `review/` (if missing ACs) or `backlog/` (if ACs exist) |

#### Priority mapping

| Existing signal | Priority |
|----------------|----------|
| Critical / Urgent / Blocker / Hotfix | P0 |
| High / Important / Must-have | P1 |
| Medium / Normal / Should-have | P2 |
| Low / Nice-to-have / Could-have | P3 |
| No priority specified | P2 (default) |

#### Complexity mapping

| Existing signal | Complexity |
|----------------|------------|
| "Quick fix" / < 1 hour | S |
| "Small" / < 1 day | M |
| "Multiple components" / 1–3 days | L |
| "Epic" / 3+ days | XL |
| No estimate | M (default) |

#### Area assignment

| What it's about | Area |
|----------------|------|
| Creating new projects / scaffolding | `create` |
| Dev tooling, CI, templates, testing infrastructure | `build` |
| Features, monitoring, day-to-day functionality | `operate` |
| Removing features, deprecation, teardown | `sunset` |

### 5.4 Create ticket files

For each item:

1. **Assign an ID**: Start from `001` and increment. Preserve existing IDs if they exist.
2. **Determine phase**: MVP = P1. Enhancements = P2+. When in doubt, P1.
3. **Create the file** using `kiani/tickets/TEMPLATE.md`:
   - Fill YAML frontmatter (`id`, `title`, `priority`, `complexity`, `depends_on`, `area`)
   - Fill sections that have existing content (Product, Technical, Tasks)
   - Leave sections empty if no prior content — they'll be filled as the ticket moves through the board
   - For `done/` tickets: fill QA sign-off with `Result: passed`
4. **Name**: `{id}-{kebab-case-name}-P{phase}.md`
5. **Place** in the correct board directory

### 5.5 Initialize supporting files

Ensure these exist:

- [ ] `kiani/tickets/README.md` — board documentation
- [ ] `kiani/tickets/TEMPLATE.md` — ticket template
- [ ] `kiani/tickets/scoreboard.md` — quality tracking (reset totals to 0)
- [ ] All board directories with `.gitkeep`: `proposals/`, `drafts/`, `review/`, `backlog/`, `todo/`, `current/`, `qa/`, `done/`, `on-hold/`

---

## Phase 6: Migrate lessons

### 6.1 Collect existing lessons

Look for project knowledge in:
- `tasks/lessons.md` (legacy path)
- `LESSONS.md` or `LEARNINGS.md`
- Comments in code tagged `// LESSON:` or `// NOTE:`
- Post-mortems or retrospective docs
- README sections about "gotchas" or "known issues"

### 6.2 Convert to lessons format

Move relevant lessons into `kiani/lessons.md`:

```markdown
### N. Title (Severity: High|Medium|Low)

Description of what went wrong and the rule to prevent it.
```

Only migrate lessons that are still relevant. Skip ones about deprecated code or resolved one-time issues.

---

## Phase 7: Clean up

### 7.1 Delete legacy files

After all items are migrated, remove:
- `TASKS.md`, `task-{N}.md`, `TaskFormat.md`
- `tasks/` directory (if fully migrated)
- `TODO.md` (if fully migrated)
- Any orphaned docs that were converted to skills

### 7.2 Fix stale references

```bash
# Check for legacy references in kiani/
grep -r 'TASKS\.md\|task-{N}\|TaskFormat\|tasks/lessons' kiani/

# Check root docs
grep -r 'TASKS\.md\|task-{N}\|TaskFormat' AGENTS.md CLAUDE.md README.md 2>/dev/null
```

Update any references found to point to the new paths.

---

## Phase 8: Verify

- [ ] `kiani/orchestration.md` references `kiani/tickets/`, not `TASKS.md`
- [ ] `kiani/orchestration.md` has agent roles, trigger commands, scoreboard section
- [ ] `AGENTS.md` has Database section
- [ ] `CLAUDE.md` contains `@AGENTS.md`
- [ ] All 11 agent personas exist in `kiani/agents/`
- [ ] Core skills are present in `kiani/skills/`
- [ ] No project-irrelevant skills were copied (no bloat)
- [ ] All legacy tasks have corresponding ticket files in correct board directories
- [ ] All ticket files have valid YAML frontmatter
- [ ] `depends_on` references use the new ID format
- [ ] No legacy task files remain
- [ ] `kiani/lessons.md` exists
- [ ] Scoreboard totals are at 0
- [ ] No stale references to legacy paths
