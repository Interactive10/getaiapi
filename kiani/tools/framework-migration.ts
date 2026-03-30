import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { copyBoilerplateTree } from './copy-directory';
import { FRAMEWORK_CHECKLIST } from './framework-checklist';
import { detectProjectSkills } from './skill-detection';

type AuditEntry = {
  path: string;
  status: 'ok' | 'missing' | 'drifted';
  description: string;
};

type AuditReport = {
  entries: AuditEntry[];
  summary: { ok: number; missing: number; drifted: number };
};

type MigrationResult = {
  added: string[];
  backedUp: string[];
  skipped: string[];
  needsAttention: string[];
  skills: { matched: string[]; available: string[]; skipped: string[] } | null;
};

/** AI model skill prefixes to always skip during boilerplate copy. */
const SKILL_SKIP_PATTERNS = ['fal-ai-*', 'replicate-*', 'wavespeed-*'];

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

/** Common filenames that may contain lessons or retrospective notes. */
const LESSON_FILENAMES = [
  'LESSONS.md',
  'lessons.md',
  'LEARNINGS.md',
  'learnings.md',
  'RETROSPECTIVE.md',
  'retrospective.md',
  'POSTMORTEM.md',
  'postmortem.md',
];

/** Scans the project for existing lesson-like files and appends their content to kiani/lessons.md. */
async function mergeExistingLessons(targetPath: string): Promise<void> {
  const lessonsPath = join(targetPath, 'kiani', 'lessons.md');
  const collected: string[] = [];

  for (const filename of LESSON_FILENAMES) {
    const filePath = join(targetPath, filename);
    try {
      const content = await readFile(filePath, 'utf-8');
      if (content.trim()) {
        collected.push(`\n---\n\n## Imported from ${filename}\n\n${content.trim()}\n`);
      }
    } catch {
      // File doesn't exist — skip
    }
  }

  if (collected.length === 0) {
    return;
  }

  try {
    const existing = await readFile(lessonsPath, 'utf-8');
    await writeFile(lessonsPath, existing + collected.join('\n'), 'utf-8');
  } catch {
    // kiani/lessons.md doesn't exist yet — skip
  }
}

/** Adds a "claude" script to the target project's package.json. */
async function addClaudeScript(targetPath: string): Promise<void> {
  const pkgPath = join(targetPath, 'package.json');
  try {
    const raw = await readFile(pkgPath, 'utf-8');
    const pkg = JSON.parse(raw) as Record<string, unknown>;
    const scripts = (pkg.scripts ?? {}) as Record<string, string>;

    if (scripts.claude) {
      return;
    }

    scripts.claude = 'bash kiani/start.sh';
    pkg.scripts = scripts;
    await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf-8');
  } catch {
    // No package.json — skip
  }
}

/**
 * Audits a target project against the framework checklist.
 * @param targetPath - absolute path to the project root
 */
export async function auditProject(targetPath: string): Promise<AuditReport> {
  const entries: AuditEntry[] = [];

  for (const item of FRAMEWORK_CHECKLIST) {
    const fullPath = join(targetPath, item.path);
    const exists = await pathExists(fullPath);

    if (!exists) {
      entries.push({ path: item.path, status: 'missing', description: item.description });
      continue;
    }

    if (item.isDirectory) {
      entries.push({ path: item.path, status: 'ok', description: item.description });
      continue;
    }

    entries.push({ path: item.path, status: 'ok', description: item.description });
  }

  return {
    entries,
    summary: {
      ok: entries.filter(e => e.status === 'ok').length,
      missing: entries.filter(e => e.status === 'missing').length,
      drifted: entries.filter(e => e.status === 'drifted').length,
    },
  };
}

/**
 * Resolves the boilerplate kiani/ path from projectTemplate.
 * @returns absolute path to `<templatePath>/boilerplate/kiani/` or null if not found
 */
async function resolveBoilerplatePath(templatePath?: string): Promise<string | null> {
  if (!templatePath) {
    return null;
  }

  const candidate = join(templatePath, 'boilerplate', 'kiani');
  if (await pathExists(candidate)) {
    return candidate;
  }

  return null;
}

/**
 * Scaffolds the full framework from projectTemplate boilerplate.
 *
 * Copies all agents, orchestration files, ticket infrastructure, and detected skills.
 * Existing files are backed up to .bak before overwriting.
 * @param targetPath - absolute path to the project root
 * @param boilerplatePath - absolute path to boilerplate/kiani/
 */
async function scaffoldFromBoilerplate(
  targetPath: string,
  boilerplatePath: string,
): Promise<MigrationResult> {
  const kianiTarget = join(targetPath, 'kiani');

  // Copy the kiani/ tree (skip skills — handled separately)
  const treeResult = await copyBoilerplateTree({
    source: boilerplatePath,
    target: kianiTarget,
    skipPatterns: ['skills', ...SKILL_SKIP_PATTERNS],
  });

  // Copy root config files (CLAUDE.md, AGENTS.md) with backup
  const boilerplateRoot = resolve(boilerplatePath, '..');
  const rootConfigFiles = ['CLAUDE.md', 'AGENTS.md'];
  for (const file of rootConfigFiles) {
    const sourcePath = join(boilerplateRoot, file);
    const destPath = join(targetPath, file);

    if (!(await pathExists(sourcePath))) {
      continue;
    }

    if (await pathExists(destPath)) {
      await rename(destPath, `${destPath}.bak`);
      treeResult.backedUp.push(file);
    }

    const content = await readFile(sourcePath);
    await writeFile(destPath, content);
    treeResult.added.push(file);
  }

  // Merge existing lessons into kiani/lessons.md
  await mergeExistingLessons(targetPath);

  // Add "claude" script to package.json
  await addClaudeScript(targetPath);
  treeResult.added.push('package.json (claude script)');

  // Detect and copy matched skills
  const boilerplateSkillsPath = join(boilerplatePath, 'skills');
  let skillResult = null;

  if (await pathExists(boilerplateSkillsPath)) {
    skillResult = await detectProjectSkills(targetPath, boilerplateSkillsPath);

    // Ensure skills directory exists
    const skillsTarget = join(kianiTarget, 'skills');
    await mkdir(skillsTarget, { recursive: true });

    // Copy matched skills
    for (const skillName of skillResult.matched) {
      const skillSource = join(boilerplateSkillsPath, skillName);
      const skillDest = join(skillsTarget, skillName);

      if (await pathExists(skillSource)) {
        const skillCopy = await copyBoilerplateTree({
          source: skillSource,
          target: skillDest,
        });
        treeResult.added.push(...skillCopy.added.map(p => `skills/${skillName}/${p}`));
      }
    }
  }

  // Copy migration tools into kiani/tools/
  const toolsTarget = join(kianiTarget, 'tools');
  await mkdir(toolsTarget, { recursive: true });

  const srcLibs = join(process.cwd(), 'src', 'libs');
  const toolFiles = ['framework-migration.ts', 'framework-checklist.ts', 'skill-detection.ts'];

  for (const name of toolFiles) {
    const source = join(srcLibs, name);
    if (await pathExists(source)) {
      const content = await readFile(source);
      await writeFile(join(toolsTarget, name), content);
      treeResult.added.push(`tools/${name}`);
    }
  }

  return {
    added: treeResult.added,
    backedUp: treeResult.backedUp,
    skipped: treeResult.skipped,
    needsAttention: [],
    skills: skillResult,
  };
}

/**
 * Fallback when projectTemplate is not available.
 *
 * Only creates directories — does not write stub files. Files without
 * real boilerplate content are flagged as needsAttention so the user
 * knows to copy them manually from projectTemplate.
 */
async function scaffoldFallback(targetPath: string, report: AuditReport): Promise<MigrationResult> {
  const added: string[] = [];
  const skipped: string[] = [];
  const needsAttention: string[] = [];

  for (const entry of report.entries) {
    const item = FRAMEWORK_CHECKLIST.find(c => c.path === entry.path);
    if (!item) {
      continue;
    }

    if (entry.status === 'ok') {
      skipped.push(entry.path);
      continue;
    }

    const fullPath = join(targetPath, entry.path);

    if (item.isDirectory) {
      await mkdir(fullPath, { recursive: true });
      added.push(entry.path);
    } else {
      // Don't write empty stubs — flag as needing manual copy
      needsAttention.push(entry.path);
    }
  }

  return { added, backedUp: [], skipped, needsAttention, skills: null };
}

/**
 * Runs the full migration pipeline on a target project.
 *
 * 1. Audit — scans against the framework checklist
 * 2. Scaffold — copies from boilerplate (or falls back to stubs)
 * 3. Skills — detects tech stack and copies matching skills
 * @param targetPath - absolute path to the project root
 * @param templatePath - optional path to projectTemplate root
 */
export async function migrateProject(targetPath: string, templatePath?: string): Promise<{
  audit: AuditReport;
  result: MigrationResult;
}> {
  const audit = await auditProject(targetPath);
  const boilerplatePath = await resolveBoilerplatePath(templatePath);

  let result: MigrationResult;
  if (boilerplatePath) {
    result = await scaffoldFromBoilerplate(targetPath, boilerplatePath);
  } else {
    result = await scaffoldFallback(targetPath, audit);
  }

  return { audit, result };
}

export type { AuditReport };
