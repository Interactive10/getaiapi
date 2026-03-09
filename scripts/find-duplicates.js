#!/usr/bin/env node

/**
 * Find potential duplicate model entries in registry.json
 *
 * Groups entries that normalize to the same string after stripping
 * provider/org prefixes, normalizing separators, and lowercasing.
 * Only reports groups where entries share the same category.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const registry = JSON.parse(readFileSync(join(__dirname, '..', 'registry', 'registry.json'), 'utf8'));

// Known provider/org prefixes to strip (gathered from actual registry data)
const KNOWN_PREFIXES = [
  // AI companies / model creators
  'openai', 'anthropic', 'google', 'meta', 'microsoft', 'nvidia', 'xai', 'ibm',
  'deepseek', 'deepseek-ai', 'mistral', 'mistralai',
  'qwen', 'alibaba',
  'stability-ai', 'stabilityai', 'stability',
  'black-forest-labs',
  'bytedance',
  'minimax',
  'tencent', 'tencentarc',
  'kwaivgi',
  'lightricks',
  'luma',
  'runwayml',
  'pixverse',
  'ideogram', 'ideogram-ai',
  'recraft', 'recraft-ai',
  'elevenlabs',
  'heygen',
  'leonardoai',
  'moonvalley',
  'reve',
  'bria',
  'decart',
  'veed',
  'inworld',
  'sonauto',

  // Replicate usernames / GitHub orgs
  'lucataco', 'zsxkib', 'abiruyt', 'cjwbw', 'chenxwh', 'yorickvp',
  'fofr', 'jagilley', 'andreasjansson', 'adirik', 'daanelson',
  'prunaai', 'cuuupid', 'philz1337x', 'nateraw', 'sakemin',
  'arielreplicate', 'fermatresearch', 'codeplugtech', 'mirelo-ai',
  'sourceful', 'cassetteai', 'resemble-ai', 'retro-diffusion',
  'topazlabs', 'sync',
  'konieshadow', 'jbilcke-hf', 'pbarker', 'charlesmccarthy',
  'nightmareai', 'schananas', 'cswry', 'jd7h', 'm1guelpf',
  'thomasmol', 'fewjative', 'zylim0702', 'sabuhigr', 'tahercoolguy',
  'hadilq', 'naklecha', 'men1scus', 'tmappdev',
  'firtoz', 'georgedavila', 'mickeybeurskens', 'usamaehsan',

  // Platform prefixes
  'replicate', 'fal-ai', 'wavespeed', 'wavespeed-ai', 'wavespeedai',
  'openrouter',
  'rundiffusion', 'rundiffusion-fal',

  // Granite sub-prefix
  'ibm-granite',
];

// Sort prefixes longest first so we strip the most specific one
const SORTED_PREFIXES = KNOWN_PREFIXES
  .map(p => p.toLowerCase())
  .sort((a, b) => b.length - a.length);

function normalize(name) {
  let n = name.toLowerCase();

  // Normalize separators: dots, underscores → dashes
  n = n.replace(/[._]/g, '-');

  // Strip known prefixes (try longest first)
  for (const prefix of SORTED_PREFIXES) {
    if (n.startsWith(prefix + '-')) {
      n = n.slice(prefix.length + 1);
      // Try stripping another prefix (e.g., "wavespeed-ai-google-xxx")
      for (const prefix2 of SORTED_PREFIXES) {
        if (n.startsWith(prefix2 + '-')) {
          n = n.slice(prefix2.length + 1);
          break;
        }
      }
      break;
    }
  }

  return n;
}

// Build groups by normalized name
const groups = {};

for (const entry of registry) {
  const norm = normalize(entry.canonical_name);
  if (!groups[norm]) groups[norm] = [];
  groups[norm].push({
    canonical_name: entry.canonical_name,
    category: entry.category,
    providers: entry.providers.map(p => p.provider),
  });
}

// Filter: only groups with 2+ entries that share at least one common category
const duplicates = [];

for (const [norm, entries] of Object.entries(groups)) {
  if (entries.length < 2) continue;

  // Group by category within the normalized group
  const byCategory = {};
  for (const e of entries) {
    if (!byCategory[e.category]) byCategory[e.category] = [];
    byCategory[e.category].push(e);
  }

  for (const [category, catEntries] of Object.entries(byCategory)) {
    if (catEntries.length < 2) continue;
    duplicates.push({
      normalized_name: norm,
      category,
      entries: catEntries.map(e => ({
        canonical_name: e.canonical_name,
        providers: e.providers,
      })),
    });
  }
}

// Known model family brands - used to detect false positives where
// different brands share a generic normalized name (e.g., "v3")
const MODEL_FAMILIES = [
  'ideogram', 'recraft', 'pixverse', 'bria', 'minimax', 'elevenlabs',
  'stability', 'openai', 'anthropic', 'google', 'meta', 'nvidia',
  'bytedance', 'tencent', 'qwen', 'deepseek', 'mistral', 'luma',
  'lightricks', 'runwayml', 'veed', 'sync', 'heygen',
  'sonauto', 'kwaivgi',
];

function extractFamily(canonicalName) {
  const cn = canonicalName.toLowerCase().replace(/[._]/g, '-');
  for (const family of MODEL_FAMILIES) {
    if (cn.includes(family)) return family;
  }
  return '';
}

// Filter out false positives where different model brands collide on a short name
function likelyFalsePositive(group) {
  if (group.normalized_name.length < 6) {
    const families = group.entries.map(e => extractFamily(e.canonical_name));
    const uniqueFamilies = [...new Set(families.filter(f => f.length > 0))];
    if (uniqueFamilies.length > 1) return true;
  }
  return false;
}

const filtered = duplicates.filter(g => !likelyFalsePositive(g));

// Sort by normalized name
filtered.sort((a, b) => a.normalized_name.localeCompare(b.normalized_name));

// Output
console.log(`\n=== Potential Duplicate Model Groups ===\n`);
console.log(`Found ${filtered.length} potential duplicate groups (${duplicates.length - filtered.length} overly-generic groups filtered out):\n`);

for (const group of filtered) {
  console.log(`--- ${group.normalized_name} (category: ${group.category}) ---`);
  for (const entry of group.entries) {
    console.log(`  ${entry.canonical_name}  [${entry.providers.join(', ')}]`);
  }
  console.log('');
}

console.log(`\nTotal: ${filtered.length} duplicate groups found across ${registry.length} registry entries.`);
console.log(`(${duplicates.length - filtered.length} groups were excluded as likely false positives)`);

// Also list the excluded generic groups for reference
const excluded = duplicates.filter(g => likelyFalsePositive(g));
if (excluded.length > 0) {
  console.log(`\n=== Excluded Generic Groups (for reference) ===\n`);
  for (const group of excluded) {
    console.log(`--- "${group.normalized_name}" (category: ${group.category}) ---`);
    for (const entry of group.entries) {
      console.log(`  ${entry.canonical_name}  [${entry.providers.join(', ')}]`);
    }
    console.log('');
  }
}
