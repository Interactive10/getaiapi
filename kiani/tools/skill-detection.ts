import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Maps package.json dependency names to boilerplate skill directory names. */
const DEP_TO_SKILL: Record<string, string[]> = {
  'next': [
    'nextjs-advanced-routing',
    'nextjs-anti-patterns',
    'nextjs-app-router-fundamentals',
    'nextjs-best-practices',
    'nextjs-client-cookie-pattern',
    'nextjs-dynamic-routes-params',
    'nextjs-pathname-id-fetch',
    'nextjs-server-client-components',
    'nextjs-server-navigation',
    'nextjs-use-search-params-suspense',
  ],
  '@clerk/nextjs': ['clerk'],
  'tailwindcss': ['tailwind-4'],
  '@cloudflare/r2': ['cloudflare-r2'],
};

/** Skills copied regardless of detected tech stack. */
const FOUNDATIONAL_SKILLS = [
  'agent-roles',
  'ui-design-document',
  'frontend-design',
  'branding',
];

/** Skill name prefixes that are always excluded (AI model integrations). */
const EXCLUDED_PREFIXES = ['fal-ai-', 'replicate-', 'wavespeed-'];

type SkillDetectionResult = {
  matched: string[];
  available: string[];
  skipped: string[];
};

/**
 * Detects which skills to copy based on the project's tech stack.
 * @param projectPath - absolute path to the project root
 * @param boilerplateSkillsPath - absolute path to boilerplate/kiani/skills/
 * @returns matched skills to copy, available skills not matched, and excluded AI skills
 */
export async function detectProjectSkills(
  projectPath: string,
  boilerplateSkillsPath: string,
): Promise<SkillDetectionResult> {
  const deps = await readProjectDeps(projectPath);
  const allSkills = await listAvailableSkills(boilerplateSkillsPath);

  const matched = new Set<string>(FOUNDATIONAL_SKILLS);
  const skipped: string[] = [];

  // Match deps to skills
  for (const [dep, skills] of Object.entries(DEP_TO_SKILL)) {
    if (deps.has(dep)) {
      for (const skill of skills) {
        matched.add(skill);
      }
    }
  }

  // Filter: only include skills that actually exist in boilerplate
  const validMatched = [...matched].filter(s => allSkills.includes(s));

  // Categorize remaining skills
  const available: string[] = [];
  for (const skill of allSkills) {
    if (validMatched.includes(skill)) {
      continue;
    }
    if (isExcludedSkill(skill)) {
      skipped.push(skill);
    } else {
      available.push(skill);
    }
  }

  return {
    matched: validMatched.sort(),
    available: available.sort(),
    skipped,
  };
}

/** Reads package.json and returns a set of all dependency names. */
async function readProjectDeps(projectPath: string): Promise<Set<string>> {
  const deps = new Set<string>();
  try {
    const raw = await readFile(join(projectPath, 'package.json'), 'utf-8');
    const pkg = JSON.parse(raw) as Record<string, unknown>;
    const sections = ['dependencies', 'devDependencies', 'peerDependencies'];
    for (const section of sections) {
      const sectionDeps = pkg[section];
      if (sectionDeps && typeof sectionDeps === 'object') {
        for (const dep of Object.keys(sectionDeps as Record<string, unknown>)) {
          deps.add(dep);
        }
      }
    }
  } catch {
    // No package.json or invalid — return empty set
  }
  return deps;
}

/** Lists all skill directory names in the boilerplate skills folder. */
async function listAvailableSkills(skillsPath: string): Promise<string[]> {
  try {
    const entries = await readdir(skillsPath, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    return [];
  }
}

function isExcludedSkill(name: string): boolean {
  return EXCLUDED_PREFIXES.some(prefix => name.startsWith(prefix));
}
