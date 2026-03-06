import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../src/mapper.js'
import type {
  GenerateRequest,
  ProviderBinding,
  OutputMapping,
  CategoryTemplate,
  ParamMapping,
} from '../../src/types.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeBinding(
  provider: 'fal-ai' | 'replicate' | 'wavespeed',
  extractPath = 'output[]',
): ProviderBinding {
  return {
    provider,
    skill_id: `test-skill-${provider}`,
    endpoint: `https://${provider}.example.com/test`,
    auth_env: `${provider.toUpperCase().replace('-', '_')}_KEY`,
    param_map: {},
    output_map: {
      type: 'image',
      extract_path: extractPath,
    },
  }
}

/**
 * Minimal template factory so we can craft precise mapping scenarios.
 */
function makeTemplate(overrides: {
  mappings?: ParamMapping[]
  outputExtract?: Record<string, string>
}): CategoryTemplate {
  return {
    category: 'text-to-image',
    input_mappings: overrides.mappings ?? [],
    output_type: 'image',
    output_extract: {
      'fal-ai': 'images[].url',
      'replicate': 'output[]',
      'wavespeed': 'data.outputs[]',
      ...(overrides.outputExtract ?? {}),
    },
    default_timeout_ms: 30000,
  }
}

// ===========================================================================
// genericExtract  (reached via mapOutput with an unrecognised extract_path)
// ===========================================================================

describe('genericExtract (via mapOutput)', () => {
  it('handles path with array notation like results[].url — extracts url from objects', () => {
    const raw = {
      results: [
        { url: 'https://a.com/1.png' },
        { url: 'https://a.com/2.png' },
      ],
    }
    const mapping: OutputMapping = { type: 'image', extract_path: 'results[].url' }
    // This path is NOT one of the hard-coded paths, so it falls through to genericExtract.
    // "results[]" is the array segment; remaining = "url", so getNestedValue is used.
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://a.com/1.png',
      content_type: 'image/jpeg',
    })
    expect(items[1]).toEqual({
      type: 'image',
      url: 'https://a.com/2.png',
      content_type: 'image/jpeg',
    })
  })

  it('handles path with array and deeper remaining segments like results[].data.url', () => {
    const raw = {
      results: [
        { data: { url: 'https://a.com/deep1.png' } },
        { data: { url: 'https://a.com/deep2.png' } },
      ],
    }
    const mapping: OutputMapping = { type: 'image', extract_path: 'results[].data.url' }
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(2)
    expect(items[0].url).toBe('https://a.com/deep1.png')
    expect(items[1].url).toBe('https://a.com/deep2.png')
  })

  it('handles array items that are plain strings (no remaining segments)', () => {
    const raw = {
      urls: [
        'https://a.com/s1.png',
        'https://a.com/s2.png',
      ],
    }
    const mapping: OutputMapping = { type: 'image', extract_path: 'urls[]' }
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(2)
    expect(items[0].url).toBe('https://a.com/s1.png')
    expect(items[1].url).toBe('https://a.com/s2.png')
  })

  it('handles array items that are objects with .url (no remaining segments)', () => {
    const raw = {
      urls: [
        { url: 'https://a.com/obj1.png' },
        { url: 'https://a.com/obj2.png' },
      ],
    }
    const mapping: OutputMapping = { type: 'image', extract_path: 'urls[]' }
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(2)
    expect(items[0].url).toBe('https://a.com/obj1.png')
    expect(items[1].url).toBe('https://a.com/obj2.png')
  })

  it('path ending in a single string value (no arrays)', () => {
    const raw = { nested: { deep: { link: 'https://a.com/single.png' } } }
    const mapping: OutputMapping = { type: 'image', extract_path: 'nested.deep.link' }
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://a.com/single.png',
      content_type: 'image/jpeg',
    })
  })

  it('returns [] when data is null at any traversal point', () => {
    const mapping: OutputMapping = { type: 'image', extract_path: 'a.b.c' }
    expect(mapOutput(null, mapping)).toEqual([])
  })

  it('returns [] when intermediate key is undefined', () => {
    const raw = { a: {} }
    const mapping: OutputMapping = { type: 'image', extract_path: 'a.b.c' }
    const items = mapOutput(raw, mapping)
    expect(items).toEqual([])
  })

  it('returns [] when the value at the array segment is not an array', () => {
    const raw = { results: 'not-an-array' }
    const mapping: OutputMapping = { type: 'image', extract_path: 'results[]' }
    const items = mapOutput(raw, mapping)
    expect(items).toEqual([])
  })

  it('returns [] when final value is not a string (e.g. a number)', () => {
    const raw = { a: { b: 42 } }
    const mapping: OutputMapping = { type: 'image', extract_path: 'a.b' }
    const items = mapOutput(raw, mapping)
    expect(items).toEqual([])
  })

  it('uses custom content_type from output mapping', () => {
    const raw = { items: ['https://a.com/x.webp'] }
    const mapping: OutputMapping = {
      type: 'image',
      extract_path: 'items[]',
      content_type: 'image/webp',
    }
    const items = mapOutput(raw, mapping)
    expect(items[0].content_type).toBe('image/webp')
  })
})

// ===========================================================================
// getNestedValue edge cases (exercised via genericExtract with remaining path)
// ===========================================================================

describe('getNestedValue (via genericExtract with remaining segments)', () => {
  it('returns undefined when an item in the array has null at a nested key', () => {
    const raw = {
      results: [
        { data: null },
      ],
    }
    const mapping: OutputMapping = { type: 'image', extract_path: 'results[].data.url' }
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(1)
    // getNestedValue returns undefined for null.data => url becomes undefined
    expect(items[0].url).toBeUndefined()
  })

  it('returns undefined when an item in the array is missing the nested key entirely', () => {
    const raw = {
      results: [
        { other: 'value' },
      ],
    }
    const mapping: OutputMapping = { type: 'image', extract_path: 'results[].data.url' }
    const items = mapOutput(raw, mapping)
    expect(items).toHaveLength(1)
    expect(items[0].url).toBeUndefined()
  })
})

// ===========================================================================
// parseSizeForProvider edge cases
// ===========================================================================

describe('parseSizeForProvider edge cases', () => {
  const sizeMapping: ParamMapping = {
    universal: 'size',
    providers: {
      'fal-ai': 'image_size',
      'replicate': ['width', 'height'],
      'wavespeed': 'size',
    },
    transform: 'parse_size',
  }

  it('replicate with object value passes through and spreads into width/height', () => {
    const template = makeTemplate({ mappings: [sizeMapping] })
    const request = { model: 'test', size: { width: 768, height: 512 } } as GenerateRequest
    const binding = makeBinding('replicate')
    const result = mapInput(request, binding, template)
    expect(result.width).toBe(768)
    expect(result.height).toBe(512)
  })

  it('replicate with non-string, non-object value passes through (number)', () => {
    const template = makeTemplate({ mappings: [sizeMapping] })
    // Force a numeric size to exercise the final `return value` in replicate branch
    const request = { model: 'test', size: 1024 as unknown as string } as GenerateRequest
    const binding = makeBinding('replicate')
    const result = mapInput(request, binding, template)
    // Non-object result with array providerKey — the if(typeof transformed === 'object') check fails,
    // so nothing is spread. Result should NOT have width/height.
    expect(result).not.toHaveProperty('width')
    expect(result).not.toHaveProperty('height')
  })

  it('wavespeed passes size through as-is (falls through to default)', () => {
    const template = makeTemplate({ mappings: [sizeMapping] })
    const request = { model: 'test', size: '1024x1024' } as GenerateRequest
    const binding = makeBinding('wavespeed')
    const result = mapInput(request, binding, template)
    expect(result.size).toBe('1024x1024')
  })

  it('fal-ai with object size passes through as-is', () => {
    const template = makeTemplate({ mappings: [sizeMapping] })
    const request = { model: 'test', size: { width: 512, height: 512 } } as GenerateRequest
    const binding = makeBinding('fal-ai')
    const result = mapInput(request, binding, template)
    expect(result.image_size).toEqual({ width: 512, height: 512 })
  })
})

// ===========================================================================
// mapInput — missing branches
// ===========================================================================

describe('mapInput missing branches', () => {
  it('silently drops param when provider key is undefined (provider does not support it)', () => {
    const template = makeTemplate({
      mappings: [
        {
          universal: 'prompt',
          providers: {
            'fal-ai': 'prompt',
            // replicate is intentionally omitted
          },
          required: false,
        },
      ],
    })
    const request = { model: 'test', prompt: 'hello' } as GenerateRequest
    const binding = makeBinding('replicate')
    const result = mapInput(request, binding, template)
    // prompt should not appear because replicate has no mapping for it
    expect(result).not.toHaveProperty('prompt')
    expect(Object.keys(result)).toHaveLength(0)
  })

  it('array provider key with non-object transformed value does not spread', () => {
    const template = makeTemplate({
      mappings: [
        {
          universal: 'prompt',
          providers: {
            'replicate': ['field_a', 'field_b'],
          },
        },
      ],
    })
    const request = { model: 'test', prompt: 'just a string' } as GenerateRequest
    const binding = makeBinding('replicate')
    const result = mapInput(request, binding, template)
    // 'just a string' is not an object, so the spread branch is skipped
    expect(result).not.toHaveProperty('field_a')
    expect(result).not.toHaveProperty('field_b')
  })

  it('array provider key with array transformed value does not spread (arrays are excluded)', () => {
    const template = makeTemplate({
      mappings: [
        {
          universal: 'prompt',
          providers: {
            'replicate': ['field_a', 'field_b'],
          },
        },
      ],
    })
    // Force an array value
    const request = { model: 'test', prompt: ['a', 'b'] as unknown as string } as GenerateRequest
    const binding = makeBinding('replicate')
    const result = mapInput(request, binding, template)
    // Arrays pass the typeof === 'object' check but fail the !Array.isArray check
    expect(result).not.toHaveProperty('field_a')
    expect(result).not.toHaveProperty('field_b')
  })

  it('passes value through for unknown transform type', () => {
    const template = makeTemplate({
      mappings: [
        {
          universal: 'prompt',
          providers: {
            'fal-ai': 'prompt',
          },
          // Force an unknown transform value
          transform: 'unknown_transform' as ParamMapping['transform'],
        },
      ],
    })
    const request = { model: 'test', prompt: 'hello' } as GenerateRequest
    const binding = makeBinding('fal-ai')
    const result = mapInput(request, binding, template)
    // Unknown transform passes value through unchanged
    expect(result.prompt).toBe('hello')
  })
})
