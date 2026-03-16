import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-nano-banana-2',
  endpoint: 'fal-ai/nano-banana-2',
  auth_env: 'FAL_KEY',
  param_map: {
    prompt: 'prompt',
    images: 'image_urls',
    count: 'num_images',
    seed: 'seed',
    resolution: 'resolution',
    aspect_ratio: 'aspect_ratio',
    format: 'output_format',
    safety_tolerance: 'safety_tolerance',
    web_search: 'enable_web_search',
    thinking_level: 'thinking_level',
  },
  output_map: {
    type: 'image',
    extract_path: 'images[].url',
    content_type: 'image/png',
  },
}

const REPLICATE_BINDING: ProviderBinding = {
  provider: 'replicate',
  skill_id: 'replicate-google-nano-banana-2',
  endpoint: 'google/nano-banana-2',
  auth_env: 'REPLICATE_API_TOKEN',
  param_map: {
    prompt: 'prompt',
    images: 'image_input',
    resolution: 'resolution',
    aspect_ratio: 'aspect_ratio',
    format: 'output_format',
    web_search: 'google_search',
    image_search: 'image_search',
  },
  output_map: {
    type: 'image',
    extract_path: 'output[]',
    content_type: 'image/png',
  },
}

describe('nano-banana-2 — fal-ai param mapping', () => {
  it('maps required prompt param', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'a sunset over mountains',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      prompt: 'a sunset over mountains',
    })
  })

  it('maps all fal-ai params together', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'a cat in space',
      images: ['https://example.com/ref1.jpg', 'https://example.com/ref2.jpg'],
      count: 2,
      seed: 42,
      resolution: '2K',
      aspect_ratio: '16:9',
      format: 'webp',
      safety_tolerance: '3',
      web_search: true,
      thinking_level: 'high',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      prompt: 'a cat in space',
      image_urls: ['https://example.com/ref1.jpg', 'https://example.com/ref2.jpg'],
      num_images: 2,
      seed: 42,
      resolution: '2K',
      aspect_ratio: '16:9',
      output_format: 'webp',
      safety_tolerance: '3',
      enable_web_search: true,
      thinking_level: 'high',
    })
  })

  it('does NOT map phantom params (negative_prompt, size, guidance, steps, quality, safety)', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'test',
      negative_prompt: 'ugly',
      size: '1024x1024',
      guidance: 7.5,
      steps: 20,
      quality: 90,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('negative_prompt')
    expect(mapped).not.toHaveProperty('image_size')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('quality')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('nano-banana-2 — replicate param mapping', () => {
  it('maps required prompt param', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'a sunset over mountains',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      prompt: 'a sunset over mountains',
    })
  })

  it('maps all replicate params together', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'a cat in space',
      images: ['https://example.com/ref1.jpg'],
      resolution: '2K',
      aspect_ratio: '1:1',
      format: 'png',
      web_search: true,
      image_search: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      prompt: 'a cat in space',
      image_input: ['https://example.com/ref1.jpg'],
      resolution: '2K',
      aspect_ratio: '1:1',
      output_format: 'png',
      google_search: true,
      image_search: true,
    })
  })

  it('web_search maps to google_search on replicate', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'latest news',
      web_search: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped.google_search).toBe(true)
    expect(mapped).not.toHaveProperty('web_search')
    expect(mapped).not.toHaveProperty('enable_web_search')
  })

  it('does NOT map phantom params (negative_prompt, count, size, guidance, steps, seed, quality, safety)', () => {
    const request = {
      model: 'nano-banana-2',
      prompt: 'test',
      negative_prompt: 'ugly',
      count: 2,
      size: '1024x1024',
      guidance: 7.5,
      steps: 20,
      seed: 42,
      quality: 90,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).not.toHaveProperty('negative_prompt')
    expect(mapped).not.toHaveProperty('num_outputs')
    expect(mapped).not.toHaveProperty('width')
    expect(mapped).not.toHaveProperty('height')
    expect(mapped).not.toHaveProperty('guidance')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('output_quality')
    expect(mapped).not.toHaveProperty('disable_safety_checker')
  })
})

describe('nano-banana-2 — output mapping', () => {
  it('fal-ai: extracts image URLs from images[].url', () => {
    const raw = {
      images: [
        { url: 'https://fal.media/files/example/output1.png', content_type: 'image/png' },
        { url: 'https://fal.media/files/example/output2.png', content_type: 'image/png' },
      ],
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://fal.media/files/example/output1.png',
      content_type: 'image/png',
    })
  })

  it('replicate: extracts image URL from output[]', () => {
    const raw = {
      output: ['https://replicate.delivery/example/output.png'],
    }

    const items = mapOutput(raw, REPLICATE_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'image',
        url: 'https://replicate.delivery/example/output.png',
        content_type: 'image/png',
      },
    ])
  })
})
