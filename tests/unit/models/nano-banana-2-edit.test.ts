import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-nano-banana-2-edit',
  endpoint: 'fal-ai/nano-banana-2/edit',
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

const WAVESPEED_BINDING: ProviderBinding = {
  provider: 'wavespeed',
  skill_id: 'wavespeed-google-nano-banana-2-edit',
  endpoint: 'google/nano-banana-2/edit',
  auth_env: 'WAVESPEED_API_KEY',
  param_map: {
    prompt: 'prompt',
    image: 'image',
    images: 'image_urls',
    seed: 'seed',
    format: 'output_format',
  },
  output_map: {
    type: 'image',
    extract_path: 'data.outputs[]',
    content_type: 'image/png',
  },
}

describe('nano-banana-2-edit — fal-ai param mapping', () => {
  it('maps required params: prompt and images', () => {
    const request = {
      model: 'nano-banana-2-edit',
      prompt: 'make the sky purple',
      images: ['https://example.com/photo.jpg'],
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      prompt: 'make the sky purple',
      image_urls: ['https://example.com/photo.jpg'],
    })
  })

  it('maps all fal-ai params together', () => {
    const request = {
      model: 'nano-banana-2-edit',
      prompt: 'add sunglasses',
      images: ['https://example.com/face.jpg'],
      count: 2,
      seed: 42,
      resolution: '4K',
      aspect_ratio: '1:1',
      format: 'webp',
      safety_tolerance: '2',
      web_search: false,
      thinking_level: 'high',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      prompt: 'add sunglasses',
      image_urls: ['https://example.com/face.jpg'],
      num_images: 2,
      seed: 42,
      resolution: '4K',
      aspect_ratio: '1:1',
      output_format: 'webp',
      safety_tolerance: '2',
      enable_web_search: false,
      thinking_level: 'high',
    })
  })

  it('does NOT map phantom params (image, strength, mask, quality, safety)', () => {
    const request = {
      model: 'nano-banana-2-edit',
      prompt: 'test',
      images: ['https://example.com/photo.jpg'],
      image: 'https://example.com/single.jpg',
      strength: 0.8,
      mask: 'https://example.com/mask.png',
      quality: 90,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('image_url')
    expect(mapped).not.toHaveProperty('strength')
    expect(mapped).not.toHaveProperty('mask_url')
    expect(mapped).not.toHaveProperty('quality')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('nano-banana-2-edit — wavespeed param mapping', () => {
  it('maps required params', () => {
    const request = {
      model: 'nano-banana-2-edit',
      prompt: 'remove background',
      image: 'https://example.com/photo.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, WAVESPEED_BINDING)

    expect(mapped).toEqual({
      prompt: 'remove background',
      image: 'https://example.com/photo.jpg',
    })
  })

  it('maps all wavespeed params together', () => {
    const request = {
      model: 'nano-banana-2-edit',
      prompt: 'add hat',
      image: 'https://example.com/photo.jpg',
      images: ['https://example.com/ref.jpg'],
      seed: 99,
      format: 'png',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, WAVESPEED_BINDING)

    expect(mapped).toEqual({
      prompt: 'add hat',
      image: 'https://example.com/photo.jpg',
      image_urls: ['https://example.com/ref.jpg'],
      seed: 99,
      output_format: 'png',
    })
  })

  it('does NOT map phantom params (strength, mask, quality, safety)', () => {
    const request = {
      model: 'nano-banana-2-edit',
      prompt: 'test',
      image: 'https://example.com/photo.jpg',
      strength: 0.8,
      mask: 'https://example.com/mask.png',
      quality: 90,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, WAVESPEED_BINDING)

    expect(mapped).not.toHaveProperty('strength')
    expect(mapped).not.toHaveProperty('mask_url')
    expect(mapped).not.toHaveProperty('quality')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('nano-banana-2-edit — output mapping', () => {
  it('fal-ai: extracts image URLs from images[].url', () => {
    const raw = {
      images: [
        { url: 'https://fal.media/files/example/edited.png', content_type: 'image/png' },
      ],
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'image',
        url: 'https://fal.media/files/example/edited.png',
        content_type: 'image/png',
      },
    ])
  })

  it('wavespeed: extracts image URLs from data.outputs[]', () => {
    const raw = {
      data: {
        outputs: ['https://cdn.wavespeed.ai/example/edited.png'],
      },
    }

    const items = mapOutput(raw, WAVESPEED_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'image',
        url: 'https://cdn.wavespeed.ai/example/edited.png',
        content_type: 'image/png',
      },
    ])
  })
})
