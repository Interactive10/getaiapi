#!/usr/bin/env node
/**
 * Validates registry.json for duplicate model entries.
 * Checks that no two entries share the same alias or have
 * canonical names that normalize to the same base model.
 *
 * Usage: node scripts/validate-registry.js
 * Exit code 0 = no duplicates, 1 = duplicates found
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryPath = join(__dirname, '..', 'registry', 'registry.json');

const registry = JSON.parse(readFileSync(registryPath, 'utf-8'));

let hasErrors = false;

// Check 1: No two entries should share the same alias
const aliasMap = new Map(); // alias → canonical_name
for (const entry of registry) {
  for (const alias of entry.aliases) {
    if (aliasMap.has(alias)) {
      console.error(
        `DUPLICATE ALIAS: "${alias}" is claimed by both "${aliasMap.get(alias)}" and "${entry.canonical_name}"`
      );
      hasErrors = true;
    } else {
      aliasMap.set(alias, entry.canonical_name);
    }
  }
}

// Check 2: No duplicate canonical names
const canonicalSet = new Set();
for (const entry of registry) {
  if (canonicalSet.has(entry.canonical_name)) {
    console.error(`DUPLICATE CANONICAL NAME: "${entry.canonical_name}"`);
    hasErrors = true;
  }
  canonicalSet.add(entry.canonical_name);
}

// Check 3: Normalized name collision detection
// Strip common provider prefixes and normalize separators
function normalize(name) {
  return name
    .replace(/^(openai|anthropic|google|meta|deepseek-ai|mistralai|qwen|replicate)-/i, '')
    .replace(/[._]/g, '-')
    .toLowerCase();
}

const normalizedMap = new Map(); // normalized → [canonical_name, ...]
for (const entry of registry) {
  const norm = normalize(entry.canonical_name);
  if (!normalizedMap.has(norm)) {
    normalizedMap.set(norm, []);
  }
  normalizedMap.get(norm).push(entry.canonical_name);
}

for (const [norm, names] of normalizedMap) {
  if (names.length > 1) {
    const entries = names.map(n => registry.find(e => e.canonical_name === n));
    const categories = entries.map(e => e.category);
    const sameCategory = categories.every(c => c === categories[0]);

    if (sameCategory) {
      console.warn(
        `POTENTIAL DUPLICATE: normalized name "${norm}" matches: ${names.join(', ')} (all ${categories[0]})`
      );
    }
  }
}

if (hasErrors) {
  console.error('\nValidation FAILED: duplicate entries found.');
  process.exit(1);
} else {
  console.log(`Validation PASSED: ${registry.length} entries, no duplicate aliases or canonical names.`);
  process.exit(0);
}
