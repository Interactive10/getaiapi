@AGENTS.md

## Golden Rule
- Before starting anything, read this document fully and follow all instructions.
- After ending any task, verify you followed all instructions.

## Project
- This is the **getaiapi** project. Refer to `README.md` and `docs/` for product context.
- Agent role definitions live in `/agents/`. Read the relevant agent file before adopting a persona.
- Skill definitions live in `/skills/`. Read only the skill relevant to the current task.

## Workflow
- Enter plan mode for any non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, STOP and re-plan immediately.
- Use subagents to keep the main context window clean.
- One task per subagent for focused execution.

## Commit Rules
- Never commit without explicit user request.
- Use conventional commits: `type(scope): description`
  - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `ci`
- Write meaningful commit messages that explain the "why", not just the "what".
- Never commit secrets, `.env` files, or credentials.
- Never use `--no-verify` or skip hooks unless explicitly told to.
- Always create NEW commits, never amend unless explicitly asked.
- Stage specific files, not `git add .` or `git add -A`.

## Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules that prevent the same mistake from recurring.
- Review lessons at session start.

## Verification Before Done
- Never mark a task complete without proving it works.
- Run tests, check logs, demonstrate correctness.
- Ask yourself: "Would a staff engineer approve this?"

## Core Principles
- **Simplicity First**: Make every change as simple as possible.
- **No Laziness**: Find root causes. No temporary fixes.
- **Minimal Impact**: Changes should only touch what's necessary.
- **No Over-Engineering**: Don't add features, abstractions, or "improvements" beyond what was asked.

## Ask Permission
- Never disable linting rules without explaining and asking for approval.
- Never call external/paid APIs without explicit user confirmation first.
