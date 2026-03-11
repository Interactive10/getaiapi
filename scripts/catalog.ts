import * as fs from "node:fs";
import * as path from "node:path";
import { readAllSkills, type SkillData } from "./shared.js";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SKILLS_DIR = path.resolve(import.meta.dirname ?? __dirname, "..", "skills");
const OUTPUT_DIR = path.resolve(import.meta.dirname ?? __dirname, "..", "registry");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "catalog.json");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DuplicateGroup {
  canonical_name: string;
  skills: string[];
}

interface SkillCatalog {
  categories: Record<string, string[]>;
  providers: Record<string, string[]>;
  duplicates: DuplicateGroup[];
  total: number;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const { skills, warnings } = readAllSkills(SKILLS_DIR);

  // Print warnings
  if (warnings.length > 0) {
    console.warn(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.warn(`  - ${w}`);
    console.warn("");
  }

  // Build catalog structure
  const categories: Record<string, string[]> = {};
  const providers: Record<string, string[]> = {};

  for (const skill of skills) {
    if (!categories[skill.category]) categories[skill.category] = [];
    categories[skill.category].push(skill.skill_id);

    if (!providers[skill.provider]) providers[skill.provider] = [];
    providers[skill.provider].push(skill.skill_id);
  }

  // Detect cross-provider duplicates
  const familyMap = new Map<string, string[]>();
  for (const skill of skills) {
    const existing = familyMap.get(skill.model_family);
    if (existing) {
      existing.push(skill.skill_id);
    } else {
      familyMap.set(skill.model_family, [skill.skill_id]);
    }
  }

  const duplicates: DuplicateGroup[] = [];
  for (const [family, skillIds] of familyMap) {
    if (skillIds.length > 1) {
      // Verify they are from different providers
      const skillProviders = new Set(
        skillIds.map((id) => skills.find((s) => s.skill_id === id)?.provider)
      );
      if (skillProviders.size > 1) {
        duplicates.push({ canonical_name: family, skills: skillIds });
      }
    }
  }

  const catalog: SkillCatalog = {
    categories,
    providers,
    duplicates,
    total: skills.length,
  };

  // Write output
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2), "utf-8");

  // Print summary
  const categorySummary = Object.entries(categories)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([cat, ids]) => `${cat} (${ids.length})`)
    .join(", ");

  const providerSummary = Object.entries(providers)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([prov, ids]) => `  ${prov}: ${ids.length}`)
    .join("\n");

  console.log(`\nCataloger complete:`);
  console.log(`  Total skills: ${skills.length}`);
  console.log(providerSummary);
  console.log(`  Categories: ${categorySummary}`);
  console.log(`  Cross-provider duplicates: ${duplicates.length}`);
}

main();
