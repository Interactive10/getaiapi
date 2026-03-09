#!/usr/bin/env node
/**
 * Generates docs/MODELS.md from registry.json.
 * Usage: node scripts/generate-models-md.js
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryPath = join(__dirname, '..', 'registry', 'registry.json');
const outputPath = join(__dirname, '..', 'docs', 'MODELS.md');

const registry = JSON.parse(readFileSync(registryPath, 'utf-8'));

const providers = ['fal-ai', 'replicate', 'wavespeed', 'openrouter'];
const providerHeaders = ['fal-ai', 'Replicate', 'WaveSpeed', 'OpenRouter'];

// Sort entries alphabetically by canonical name
const sorted = [...registry].sort((a, b) =>
  a.canonical_name.localeCompare(b.canonical_name)
);

const lines = [];
lines.push('# Model Directory');
lines.push('');
lines.push(`Complete list of all ${sorted.length} models supported by getaiapi, sorted alphabetically.`);
lines.push('');
lines.push(`| Model | Category | ${providerHeaders.join(' | ')} |`);
lines.push(`|---|---|${providers.map(() => '---').join('|')}|`);

for (const entry of sorted) {
  const entryProviders = new Set(entry.providers.map(p => p.provider));
  const cols = providers.map(p => (entryProviders.has(p) ? 'Y' : '-'));
  lines.push(`| \`${entry.canonical_name}\` | ${entry.category} | ${cols.join(' | ')} |`);
}

lines.push('');

writeFileSync(outputPath, lines.join('\n'));
console.log(`Generated ${outputPath} with ${sorted.length} models.`);
