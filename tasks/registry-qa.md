# Registry QA Checklist

Run this BEFORE every publish and after any registry/category change.

## 1. Duplicate Detection

Find entries across providers that refer to the same model but aren't merged.

```bash
node -e "
const r = JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8'));
const byFamily = {};
r.forEach(m => {
  // Normalize: strip provider prefixes, version suffixes, common words
  const norm = m.canonical_name
    .replace(/^(fal-ai-|replicate-|wavespeed-|wavespeed-ai-|kwaivgi-|wan-video-|prunaai-|bytedance-)/, '')
    .replace(/-(fast|turbo|pro|standard|lite|distilled)$/, '');
  if (!byFamily[norm]) byFamily[norm] = [];
  byFamily[norm].push({ name: m.canonical_name, providers: m.providers.map(p => p.provider) });
});
Object.entries(byFamily)
  .filter(([,v]) => v.length > 1 && v.some(x => x.providers.length === 1))
  .forEach(([k, v]) => {
    console.log(k + ':');
    v.forEach(x => console.log('  ' + x.name + ' [' + x.providers.join(', ') + ']'));
  });
"
```

**Action**: Merge duplicates into single entries with multiple providers. Add old canonical name as alias.

## 2. Category vs Modality Mismatch

Every model's category should match its declared modality inputs/outputs.

```bash
node -e "
const r = JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8'));
const rules = {
  'text-to-image': { inputs: ['text'], outputs: ['image'] },
  'text-to-video': { inputs: ['text'], outputs: ['video'] },
  'image-to-video': { expectInput: 'image', outputs: ['video'] },
  'image-to-image': { expectInput: 'image', outputs: ['image'] },
  'image-edit': { expectInput: 'image', outputs: ['image'] },
  'video-to-video': { expectInput: 'video', outputs: ['video'] },
  'video-to-audio': { expectInput: 'video', outputs: ['audio'] },
  'text-to-audio': { inputs: ['text'], outputs: ['audio'] },
  'audio-to-text': { expectInput: 'audio', outputs: ['text'] },
  'upscale-image': { expectInput: 'image', outputs: ['image'] },
  'upscale-video': { expectInput: 'video', outputs: ['video'] },
  'remove-background': { expectInput: 'image', outputs: ['image'] },
};
r.forEach(m => {
  const rule = rules[m.category];
  if (!rule) return;
  if (rule.expectInput && !m.modality.inputs.includes(rule.expectInput)) {
    console.log('MISSING INPUT: ' + m.canonical_name + ' (' + m.category + ') needs ' + rule.expectInput + ' but has [' + m.modality.inputs + ']');
  }
  if (rule.inputs && JSON.stringify(m.modality.inputs) === JSON.stringify(['text']) && rule.inputs[0] !== 'text') {
    console.log('WRONG INPUT: ' + m.canonical_name + ' (' + m.category + ') has [text] but expected ' + JSON.stringify(rule.inputs));
  }
});
"
```

**Action**: Fix modality inputs to match what the model actually requires (check the SKILL.md).

## 3. Category Template Coverage

Every category in the registry must have a corresponding template in `src/categories/`.

```bash
node -e "
const r = JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8'));
const cats = [...new Set(r.map(m => m.category))];
const fs = require('fs');
cats.forEach(c => {
  const file = 'src/categories/' + c + '.ts';
  if (!fs.existsSync(file)) console.log('MISSING TEMPLATE: ' + c + ' (used by ' + r.filter(m => m.category === c).length + ' models)');
});
"
```

**Action**: Create missing category templates or recategorize models.

## 4. Modality Input Audit (text-only in non-text categories)

Models categorized as image-to-video, video-to-video, etc. but with only `[text]` as modality input are likely wrong.

```bash
node -e "
const r = JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8'));
const needsMedia = ['image-to-video','video-to-video','image-to-image','image-edit',
  'upscale-image','upscale-video','remove-background','video-to-audio','audio-to-text'];
r.filter(m => needsMedia.includes(m.category) && m.modality.inputs.length === 1 && m.modality.inputs[0] === 'text')
  .forEach(m => console.log(m.canonical_name + ' (' + m.category + ') — only [text] input'));
"
```

**Action**: Check SKILL.md for actual required inputs and fix modality.

## 5. Output Map Sanity

Verify output_map type matches the category's expected output.

```bash
node -e "
const r = JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8'));
const expect = { 'text-to-image':'image', 'image-to-image':'image', 'image-edit':'image',
  'text-to-video':'video', 'image-to-video':'video', 'video-to-video':'video',
  'text-to-audio':'audio', 'video-to-audio':'audio', 'audio-to-text':'text',
  'upscale-image':'image', 'upscale-video':'video', 'remove-background':'image' };
r.forEach(m => {
  const exp = expect[m.category];
  if (!exp) return;
  m.providers.forEach(p => {
    if (p.output_map.type !== exp) {
      console.log(m.canonical_name + ' [' + p.provider + '] output_map.type=' + p.output_map.type + ' but category ' + m.category + ' expects ' + exp);
    }
  });
});
"
```

**Action**: Fix output_map type and content_type to match the actual model output.

## 6. Run Full Test Suite

```bash
npx vitest run
```

Must have 0 new failures before publish.

## When to Run

- **Every time** before `npm publish`
- **After** any registry regeneration (`scripts/generate-registry.ts`)
- **After** merging duplicates or recategorizing models
- **After** adding new category templates
- **When** a user reports a 422, wrong output, or missing model
