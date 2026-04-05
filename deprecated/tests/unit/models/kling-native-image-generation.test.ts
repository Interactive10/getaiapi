import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const KLING_V3_T2I: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-image-generation',
  endpoint: 'v1/images/generations',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: {
    prompt: 'prompt',
    negative_prompt: 'negative_prompt',
    count: 'n',
    aspect_ratio: 'aspect_ratio',
  },
  defaults: {
    model_name: 'kling-v3',
  },
  output_map: {
    type: 'image',
    extract_path: 'task_result.images[].url',
    content_type: 'image/png',
  },
}

const KLING_V3_I2I: ProviderBinding = {
  ...KLING_V3_T2I,
  param_map: {
    ...KLING_V3_T2I.param_map,
    image: 'image',
  },
}

const KLING_O3_T2I: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-image-omni',
  endpoint: 'v1/images/omni-image',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: {
    prompt: 'prompt',
    negative_prompt: 'negative_prompt',
    count: 'n',
    aspect_ratio: 'aspect_ratio',
  },
  defaults: {
    model_name: 'kling-v3-omni',
  },
  output_map: {
    type: 'image',
    extract_path: 'task_result.images[].url',
    content_type: 'image/png',
  },
}

describe('kling native — image generation param mapping', () => {
  it('includes defaults model_name when not overridden', () => {
    const request = {
      model: 'kling-image-v3-text-to-image',
      prompt: 'A beautiful sunset',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, KLING_V3_T2I)

    expect(mapped).toEqual({
      prompt: 'A beautiful sunset',
      model_name: 'kling-v3',
    })
  })

  it('maps all supported params for text-to-image', () => {
    const request = {
      model: 'kling-image-v3-text-to-image',
      prompt: 'A cat',
      negative_prompt: 'blurry',
      count: 4,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, KLING_V3_T2I)

    expect(mapped).toEqual({
      prompt: 'A cat',
      negative_prompt: 'blurry',
      n: 4,
      model_name: 'kling-v3',
    })
  })

  it('maps image param for image-to-image', () => {
    const request = {
      model: 'kling-image-v3-image-to-image',
      prompt: 'Make it painterly',
      image: 'https://example.com/photo.png',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, KLING_V3_I2I)

    expect(mapped).toEqual({
      prompt: 'Make it painterly',
      image: 'https://example.com/photo.png',
      model_name: 'kling-v3',
    })
  })

  it('uses kling-v3-omni for O3 models', () => {
    const request = {
      model: 'kling-image-o3-text-to-image',
      prompt: 'A sunset',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, KLING_O3_T2I)

    expect(mapped).toEqual({
      prompt: 'A sunset',
      model_name: 'kling-v3-omni',
    })
  })

  it('allows options to override defaults', () => {
    const request = {
      model: 'kling-image-v3-text-to-image',
      prompt: 'test',
      options: { model_name: 'kling-v2', resolution: '2k' },
    } as unknown as GenerateRequest

    const mapped = mapInput(request, KLING_V3_T2I)

    expect(mapped.model_name).toBe('kling-v2')
    expect(mapped.resolution).toBe('2k')
  })

  it('does NOT map phantom params (seed, guidance, steps, format, quality, safety)', () => {
    const request = {
      model: 'kling-image-v3-text-to-image',
      prompt: 'test',
      seed: 42,
      guidance: 7.5,
      steps: 20,
      format: 'png',
      quality: 90,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, KLING_V3_T2I)

    expect(mapped).toEqual({
      prompt: 'test',
      model_name: 'kling-v3',
    })
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('cfg_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('output_format')
    expect(mapped).not.toHaveProperty('quality')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('kling native — image generation output mapping', () => {
  it('extracts images from task_result.images[].url', () => {
    const raw = {
      task_result: {
        images: [
          { index: 0, url: 'https://cdn.klingai.com/img1.png' },
          { index: 1, url: 'https://cdn.klingai.com/img2.png' },
        ],
      },
    }

    const items = mapOutput(raw, KLING_V3_T2I.output_map)

    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      type: 'image',
      url: 'https://cdn.klingai.com/img1.png',
      content_type: 'image/png',
    })
    expect(items[1]).toEqual({
      type: 'image',
      url: 'https://cdn.klingai.com/img2.png',
      content_type: 'image/png',
    })
  })

  it('returns empty array when task_result is missing', () => {
    const items = mapOutput({}, KLING_V3_T2I.output_map)
    expect(items).toEqual([])
  })

  it('returns empty array when images array is empty', () => {
    const items = mapOutput({ task_result: { images: [] } }, KLING_V3_T2I.output_map)
    expect(items).toEqual([])
  })
})
