/** Action to take when the checklist entry is evaluated during migration. */
type ChecklistAction = 'scaffold' | 'align';

/** Single entry in the framework compliance checklist. */
type ChecklistEntry = {
  path: string;
  action: ChecklistAction;
  description: string;
  /** True when the entry represents a directory rather than a file. */
  isDirectory: boolean;
};

/**
 * Canonical checklist of paths required for a kiani-compliant project.
 *
 * `scaffold` entries are created automatically when missing.
 * `align` entries are only diffed — never created or overwritten.
 */
export const FRAMEWORK_CHECKLIST: readonly ChecklistEntry[] = [
  // Root kiani directory
  { path: 'kiani', action: 'scaffold', description: 'Root kiani framework directory', isDirectory: true },

  // Ticket stage directories (all 12)
  { path: 'kiani/tickets', action: 'scaffold', description: 'Ticket storage', isDirectory: true },
  { path: 'kiani/tickets/proposals', action: 'scaffold', description: 'Proposals ticket stage', isDirectory: true },
  { path: 'kiani/tickets/drafts', action: 'scaffold', description: 'Drafts ticket stage', isDirectory: true },
  { path: 'kiani/tickets/review', action: 'scaffold', description: 'Review ticket stage', isDirectory: true },
  { path: 'kiani/tickets/backlog', action: 'scaffold', description: 'Backlog ticket stage', isDirectory: true },
  { path: 'kiani/tickets/todo', action: 'scaffold', description: 'Todo ticket stage', isDirectory: true },
  { path: 'kiani/tickets/current', action: 'scaffold', description: 'Current ticket stage', isDirectory: true },
  { path: 'kiani/tickets/ux', action: 'scaffold', description: 'UX review ticket stage', isDirectory: true },
  { path: 'kiani/tickets/security', action: 'scaffold', description: 'Security review ticket stage', isDirectory: true },
  { path: 'kiani/tickets/qa', action: 'scaffold', description: 'QA review ticket stage', isDirectory: true },
  { path: 'kiani/tickets/done', action: 'scaffold', description: 'Done ticket stage', isDirectory: true },
  { path: 'kiani/tickets/on-hold', action: 'scaffold', description: 'On-hold ticket stage', isDirectory: true },

  // Agent and skill directories
  { path: 'kiani/agents', action: 'scaffold', description: 'Agent definitions', isDirectory: true },
  { path: 'kiani/skills', action: 'scaffold', description: 'Skill definitions', isDirectory: true },
  { path: 'kiani/tools', action: 'scaffold', description: 'Migration tools', isDirectory: true },

  // Ticket infrastructure files
  { path: 'kiani/tickets/README.md', action: 'scaffold', description: 'Ticket board structure and rules', isDirectory: false },
  { path: 'kiani/tickets/TEMPLATE.md', action: 'scaffold', description: 'Ticket template', isDirectory: false },
  { path: 'kiani/tickets/scoreboard.md', action: 'scaffold', description: 'Quality scoreboard', isDirectory: false },

  // Orchestration and infrastructure files
  { path: 'kiani/orchestration.md', action: 'scaffold', description: 'Orchestration playbook', isDirectory: false },
  { path: 'kiani/lessons.md', action: 'scaffold', description: 'Lessons learned log', isDirectory: false },
  { path: 'kiani/primer.md', action: 'scaffold', description: 'Project primer', isDirectory: false },
  { path: 'kiani/primerPrompt.md', action: 'scaffold', description: 'AI system prompt template', isDirectory: false },
  { path: 'kiani/brainstorm.md', action: 'scaffold', description: 'Ideation notes', isDirectory: false },
  { path: 'kiani/MIGRATE.md', action: 'scaffold', description: 'Migration guide', isDirectory: false },

  // Agent files (all 12)
  { path: 'kiani/agents/architect.md', action: 'scaffold', description: 'Architect agent', isDirectory: false },
  { path: 'kiani/agents/backend-engineer.md', action: 'scaffold', description: 'Backend engineer agent', isDirectory: false },
  { path: 'kiani/agents/ceo.md', action: 'scaffold', description: 'CEO agent', isDirectory: false },
  { path: 'kiani/agents/cfo.md', action: 'scaffold', description: 'CFO agent', isDirectory: false },
  { path: 'kiani/agents/devops.md', action: 'scaffold', description: 'DevOps agent', isDirectory: false },
  { path: 'kiani/agents/frontend-engineer.md', action: 'scaffold', description: 'Frontend engineer agent', isDirectory: false },
  { path: 'kiani/agents/product-manager.md', action: 'scaffold', description: 'Product manager agent', isDirectory: false },
  { path: 'kiani/agents/product-owner.md', action: 'scaffold', description: 'Product owner agent', isDirectory: false },
  { path: 'kiani/agents/qa.md', action: 'scaffold', description: 'QA agent', isDirectory: false },
  { path: 'kiani/agents/security.md', action: 'scaffold', description: 'Security agent', isDirectory: false },
  { path: 'kiani/agents/seo.md', action: 'scaffold', description: 'SEO agent', isDirectory: false },
  { path: 'kiani/agents/ux.md', action: 'scaffold', description: 'UX agent', isDirectory: false },

  // Root config files — scaffold with backup if existing
  { path: 'CLAUDE.md', action: 'scaffold', description: 'Claude configuration', isDirectory: false },
  { path: 'AGENTS.md', action: 'scaffold', description: 'Agent conventions', isDirectory: false },
] as const;
