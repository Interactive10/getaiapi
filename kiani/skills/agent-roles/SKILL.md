---
name: agent-roles
description: >
  Use this skill when deciding which agent persona to adopt, how to use agents effectively, how to commit code properly, and how to learn from mistakes. This is the operational playbook for Claude in this project.
---

# Agent Roles & Operational Playbook

## When to Use Which Agent

### Architecture & Design Decisions
- **Architect** for system design, technology choices, API design, and data modeling
- **Architect + Security** for any public-facing system design
- **Architect + DevOps** for infrastructure and deployment architecture

### Implementation
- **Frontend Engineer** for UI components, client-side state, styling, accessibility
- **Backend Engineer** for API endpoints, database queries, auth, background jobs
- **Frontend + Backend** for full-stack features that touch both layers

### Business & Strategy
- **CEO** for prioritization, go/no-go decisions, strategic direction
- **CFO** for cost analysis, pricing, vendor decisions, budget impact
- **Product Manager** for feature scoping, user stories, acceptance criteria, roadmap

### Quality & Operations
- **QA Engineer** for test planning, edge cases, regression testing
- **Security Engineer** for security audits, vulnerability assessment, auth review
- **DevOps Engineer** for CI/CD, deployment, monitoring, infrastructure

### Marketing & Growth
- **SEO Specialist** for search optimization, meta tags, structured data, site architecture

---

## How to Commit Code

### Commit Message Format
```
type(scope): concise description of the why

Optional body with more context if needed.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Types
| Type | When to Use |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code restructuring without behavior change |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, dependency updates |
| `style` | Formatting, whitespace, semicolons |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |

### Rules
1. Never commit without explicit user request
2. Stage specific files, never `git add .`
3. Never commit `.env`, credentials, or secrets
4. Never use `--no-verify` unless explicitly told
5. Always create NEW commits (never amend unless asked)
6. Run `git status` and `git diff` before committing
7. Follow existing commit message style in the repo

---

## How to Learn from Mistakes

### The Self-Improvement Loop
1. **Detect**: User corrects you or something fails unexpectedly
2. **Understand**: Identify the root cause, not just the symptom
3. **Document**: Add a lesson to `tasks/lessons.md` with:
   - What went wrong
   - Why it went wrong
   - The rule to prevent it
4. **Apply**: Follow the rule immediately and in all future sessions
5. **Review**: Check `tasks/lessons.md` at the start of each session

### Lesson Format
```markdown
## [Date] - [Short Title]
**What happened:** Brief description of the mistake
**Root cause:** Why it happened
**Rule:** The specific rule to follow going forward
```

### Common Mistake Patterns to Watch For
- Making assumptions about code without reading it first
- Over-engineering simple solutions
- Not verifying changes actually work
- Committing without being asked
- Calling paid APIs without permission
- Ignoring existing patterns in the codebase
- Not reading relevant skill/agent files before acting

---

## Agent Collaboration Patterns

### Feature Development Flow
1. **Product Manager**: Define the problem and scope
2. **Architect**: Design the solution
3. **Frontend/Backend Engineer**: Implement
4. **QA Engineer**: Test plan and verification
5. **Security Engineer**: Security review
6. **DevOps**: Deployment plan

### Bug Fix Flow
1. **QA Engineer**: Reproduce and document
2. **Relevant Engineer**: Root cause analysis and fix
3. **QA Engineer**: Verify fix and add regression test

### Cost Decision Flow
1. **CEO**: Strategic importance assessment
2. **CFO**: Financial impact analysis
3. **Architect**: Technical feasibility
4. **Decision**: Go/no-go with full context
