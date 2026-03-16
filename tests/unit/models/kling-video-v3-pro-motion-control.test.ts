import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-kling-video-v3-pro-motion-control',
  endpoint: 'fal-ai/kling-video/v3/pro/motion-control',
  auth_env: 'FAL_KEY',
  param_map: {
    video: 'video_url',
    image: 'image_url',
    prompt: 'prompt',
    character_orientation: 'character_orientation',
    keep_audio: 'keep_original_sound',
    elements: 'elements',
  },
  output_map: {
    type: 'video',
    extract_path: 'video.url',
    content_type: 'video/mp4',
  },
}

const REPLICATE_BINDING: ProviderBinding = {
  provider: 'replicate',
  skill_id: 'replicate-kwaivgi-kling-v3-motion-control',
  endpoint: 'kwaivgi/kling-v3-motion-control',
  auth_env: 'REPLICATE_API_TOKEN',
  param_map: {
    video: 'video',
    image: 'image',
    prompt: 'prompt',
    character_orientation: 'character_orientation',
    mode: 'mode',
    keep_audio: 'keep_original_sound',
  },
  output_map: {
    type: 'video',
    extract_path: 'output[]',
    content_type: 'video/mp4',
  },
}

describe('kling-video-v3-pro-motion-control — fal-ai param mapping', () => {
  it('maps required params: video, image, character_orientation', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      character_orientation: 'image',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/ref-video.mp4',
      image_url: 'https://example.com/character.jpg',
      character_orientation: 'image',
    })
  })

  it('maps all fal-ai params together', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      prompt: 'dancing in the rain',
      character_orientation: 'video',
      keep_audio: true,
      elements: [{ image_url: 'https://example.com/face.jpg' }],
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/ref-video.mp4',
      image_url: 'https://example.com/character.jpg',
      prompt: 'dancing in the rain',
      character_orientation: 'video',
      keep_original_sound: true,
      elements: [{ image_url: 'https://example.com/face.jpg' }],
    })
  })

  it('does NOT map phantom params (resolution, seed, guidance, steps, safety)', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      character_orientation: 'image',
      resolution: '720p',
      seed: 42,
      guidance: 7.5,
      steps: 20,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('resolution')
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })

  it('omits undefined optional params', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      character_orientation: 'image',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('keep_original_sound')
    expect(mapped).not.toHaveProperty('elements')
  })
})

describe('kling-video-v3-pro-motion-control — replicate param mapping', () => {
  it('maps required params with correct replicate names', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
    })
  })

  it('maps all replicate params together', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      prompt: 'waving hello',
      character_orientation: 'video',
      mode: 'pro',
      keep_audio: false,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      prompt: 'waving hello',
      character_orientation: 'video',
      mode: 'pro',
      keep_original_sound: false,
    })
  })

  it('does NOT map phantom params (resolution, seed, guidance, steps, safety)', () => {
    const request = {
      model: 'kling-video-v3-pro-motion-control',
      video: 'https://example.com/ref-video.mp4',
      image: 'https://example.com/character.jpg',
      resolution: '720p',
      seed: 42,
      guidance: 7.5,
      steps: 20,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).not.toHaveProperty('resolution')
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('kling-video-v3-pro-motion-control — output mapping', () => {
  it('fal-ai: extracts video URL from video.url', () => {
    const raw = {
      video: {
        url: 'https://fal.media/files/example/kling-mc-output.mp4',
        content_type: 'video/mp4',
      },
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://fal.media/files/example/kling-mc-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('replicate: extracts video URL from output[]', () => {
    const raw = {
      output: ['https://replicate.delivery/example/kling-mc-output.mp4'],
    }

    const items = mapOutput(raw, REPLICATE_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://replicate.delivery/example/kling-mc-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('fal-ai: returns empty array when video is missing', () => {
    const items = mapOutput({}, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })
})
