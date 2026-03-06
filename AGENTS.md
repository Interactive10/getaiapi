# Agent System

This project uses specialized agent personas. Each agent has deep expertise in their domain and operates with that lens when activated.

## How to Use Agents

1. Agents are defined in the `/agents/` directory, one file per role.
2. When the user says **"Think like a [role]"**, read the corresponding agent file and adopt that persona.
3. Agents can be combined: "Think like an architect and security engineer" loads both perspectives.
4. Always state which agent persona you are operating under before responding.

## Available Agents

| Agent | File | Trigger |
|---|---|---|
| Architect | `/agents/architect.md` | "Think like an architect" |
| Frontend Engineer | `/agents/frontend-engineer.md` | "Think like a frontend engineer" |
| Backend Engineer | `/agents/backend-engineer.md` | "Think like a backend engineer" |
| SEO Specialist | `/agents/seo.md` | "Think like an SEO specialist" |
| CEO | `/agents/ceo.md` | "Think like a CEO" |
| CFO | `/agents/cfo.md` | "Think like a CFO" |
| Product Manager | `/agents/product-manager.md` | "Think like a product manager" |
| DevOps Engineer | `/agents/devops.md` | "Think like a DevOps engineer" |
| Security Engineer | `/agents/security.md` | "Think like a security engineer" |
| QA Engineer | `/agents/qa.md` | "Think like a QA engineer" |

## Agent Collaboration

For complex decisions, use multiple agents sequentially:
1. **Architect** defines the approach
2. **Domain engineer** (frontend/backend) implements
3. **QA** verifies
4. **Security** audits

## Trigger Commands

- **"Question"**: Respond directly without code changes.
- **"Error [message]"**: Create a bug task in `tasks/TASKS.md` and plan the fix.
- **"Think like a [role]"**: Load the agent persona from `/agents/` and respond through that lens.
- **"Plan this out"**: Create a step-by-step plan in `tasks/TASKS.md`. Don't code until approved.
- **"Run the next task"**: Execute the task workflow (check TASKS.md, pick next, execute, verify, mark done).
