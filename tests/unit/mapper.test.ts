import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../src/mapper.js'
import { textToImageTemplate } from '../../src/categories/text-to-image.js'
import { ValidationError } from '../../src/errors.js'
import type { GenerateRequest, ProviderBinding, OutputMapping } from '../../src/types.js'

// Helper to create a ProviderBinding stub
function makeBinding(provider: 'fal-ai' | 'replicate' | 'wavespeed'): ProviderBinding {
  return {
    provider,
    skill_id: `test-skill-${provider}`,
    endpoint: `https://${provider}.example.com/test`,
    auth_env: `${provider.toUpperCase().replace('-', '_')}_KEY`,
    param_map: {},
    output_map: {
      type: 'image',
      extract_path: textToImageTemplate.output_extract[provider],
    },
  }
}

const falBinding = makeBinding('fal-ai')
const replicateBinding = makeBinding('replicate')
const wavespeedBinding = makeBinding('wavespeed')
const template = textToImageTemplate

describe('mapInput', () => {
  it('maps prompt correctly for fal-ai', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat' }
    const result = mapInput(request, falBinding, template)
    expect(result.prompt).toBe('a cat')
  })

  it('maps prompt correctly for replicate', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat' }
    const result = mapInput(request, replicateBinding, template)
    expect(result.prompt).toBe('a cat')
  })

  it('maps prompt correctly for wavespeed', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat' }
    const result = mapInput(request, wavespeedBinding, template)
    expect(result.prompt).toBe('a cat')
  })

  it('maps count to num_images for fal-ai', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', count: 4 }
    const result = mapInput(request, falBinding, template)
    expect(result.num_images).toBe(4)
  })

  it('maps count to num_outputs for replicate', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', count: 4 }
    const result = mapInput(request, replicateBinding, template)
    expect(result.num_outputs).toBe(4)
  })

  it('parses size string "1024x1024" to fal-ai format (object)', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', size: '1024x1024' }
    const result = mapInput(request, falBinding, template)
    expect(result.image_size).toEqual({ width: 1024, height: 1024 })
  })

  it('parses size string "1024x768" to Replicate format (separate width/height)', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', size: '1024x768' }
    const result = mapInput(request, replicateBinding, template)
    expect(result.width).toBe(1024)
    expect(result.height).toBe(768)
  })

  it('passes size object through for fal-ai', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', size: { width: 512, height: 512 } }
    const result = mapInput(request, falBinding, template)
    expect(result.image_size).toEqual({ width: 512, height: 512 })
  })

  it('flips safety boolean for Replicate', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', safety: true }
    const result = mapInput(request, replicateBinding, template)
    expect(result.disable_safety_checker).toBe(false)
  })

  it('flips safety=false to disable_safety_checker=true for Replicate', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', safety: false }
    const result = mapInput(request, replicateBinding, template)
    expect(result.disable_safety_checker).toBe(true)
  })

  it('passes safety boolean through for fal-ai', () => {
    const request: GenerateRequest = { model: 'flux', prompt: 'a cat', safety: true }
    const result = mapInput(request, falBinding, template)
    expect(result.enable_safety_checker).toBe(true)
  })

  it('options passthrough merges and wins on conflict', () => {
    const request: GenerateRequest = {
      model: 'flux',
      prompt: 'a cat',
      count: 2,
      options: { num_images: 8, custom_param: 'value' },
    }
    const result = mapInput(request, falBinding, template)
    // options overrides the mapped num_images
    expect(result.num_images).toBe(8)
    expect(result.custom_param).toBe('value')
  })

  it('throws ValidationError when required prompt is missing', () => {
    const request: GenerateRequest = { model: 'flux' }
    expect(() => mapInput(request, falBinding, template)).toThrow(ValidationError)
  })

  it('silently drops unknown params not in the template', () => {
    const request: GenerateRequest = {
      model: 'flux',
      prompt: 'a cat',
    } as GenerateRequest & { unknown_field: string }
    // unknown_field is not in template mappings so it won't appear
    const result = mapInput(request, falBinding, template)
    expect(result).not.toHaveProperty('unknown_field')
    // Only prompt should be in the result (count, size, etc. were not provided)
    expect(result.prompt).toBe('a cat')
  })
})

describe('mapOutput', () => {
  it('extracts images from fal-ai response (images[].url)', () => {
    const raw = {
      images: [
        { url: 'https://example.com/img1.png', content_type: 'image/png' },
        { url: 'https://example.com/img2.png' },
      ],
    }
    const outputMapping: OutputMapping = {
      type: 'image',
      extract_path: 'images[].url',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://example.com/img1.png',
      content_type: 'image/png',
    })
    expect(items[1]).toEqual({
      type: 'image',
      url: 'https://example.com/img2.png',
      content_type: 'image/jpeg',
    })
  })

  it('extracts URLs from Replicate response (flat array)', () => {
    const raw = {
      output: [
        'https://replicate.com/img1.png',
        'https://replicate.com/img2.png',
      ],
    }
    const outputMapping: OutputMapping = {
      type: 'image',
      extract_path: 'output[]',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://replicate.com/img1.png',
      content_type: 'image/jpeg',
    })
    expect(items[1]).toEqual({
      type: 'image',
      url: 'https://replicate.com/img2.png',
      content_type: 'image/jpeg',
    })
  })

  it('extracts URLs from Replicate response (raw array)', () => {
    const raw = [
      'https://replicate.com/img1.png',
      'https://replicate.com/img2.png',
    ]
    const outputMapping: OutputMapping = {
      type: 'image',
      extract_path: 'output[]',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items).toHaveLength(2)
    expect(items[0].url).toBe('https://replicate.com/img1.png')
  })

  it('extracts URLs from WaveSpeed response (data.outputs[])', () => {
    const raw = {
      data: {
        outputs: [
          'https://wavespeed.com/img1.png',
          'https://wavespeed.com/img2.png',
        ],
      },
    }
    const outputMapping: OutputMapping = {
      type: 'image',
      extract_path: 'data.outputs[]',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://wavespeed.com/img1.png',
      content_type: 'image/jpeg',
    })
  })

  it('extracts video.url', () => {
    const raw = { video: { url: 'https://example.com/video.mp4' } }
    const outputMapping: OutputMapping = {
      type: 'video',
      extract_path: 'video.url',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      type: 'video',
      url: 'https://example.com/video.mp4',
      content_type: 'video/mp4',
    })
  })

  it('extracts audio.url', () => {
    const raw = { audio: { url: 'https://example.com/audio.mp3' } }
    const outputMapping: OutputMapping = {
      type: 'audio',
      extract_path: 'audio.url',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      type: 'audio',
      url: 'https://example.com/audio.mp3',
      content_type: 'audio/mpeg',
    })
  })

  it('uses custom content_type from outputMapping', () => {
    const raw = { output: ['https://example.com/img.webp'] }
    const outputMapping: OutputMapping = {
      type: 'image',
      extract_path: 'output[]',
      content_type: 'image/webp',
    }
    const items = mapOutput(raw, outputMapping)
    expect(items[0].content_type).toBe('image/webp')
  })
})
