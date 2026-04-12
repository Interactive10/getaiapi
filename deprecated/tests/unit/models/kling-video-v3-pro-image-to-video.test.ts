import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-kling-video-pro',
  endpoint: 'fal-ai/kling-video/v3/pro/image-to-video',
  auth_env: 'FAL_KEY',
  param_map: {
    image: 'start_image_url',
    prompt: 'prompt',
    negative_prompt: 'negative_prompt',
    duration: 'duration',
    generate_audio: 'generate_audio',
    end_image_url: 'end_image_url',
    voice_ids: 'voice_ids',
    elements: 'elements',
    aspect_ratio: 'aspect_ratio',
    cfg_scale: 'cfg_scale',
  },
  output_map: {
    type: 'video',
    extract_path: 'video.url',
    content_type: 'video/mp4',
  },
}

describe('kling-video-v3-pro-image-to-video — fal-ai param mapping', () => {
  it('maps image to start_image_url (not image_url)', () => {
    const request = {
      model: 'kling-video-v3-pro-image-to-video',
      image: 'https://example.com/photo.png',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped.start_image_url).toBe('https://example.com/photo.png')
    expect(mapped).not.toHaveProperty('image_url')
    expect(mapped).not.toHaveProperty('image')
  })

  it('maps all real params together', () => {
    const request = {
      model: 'kling-video-v3-pro-image-to-video',
      image: 'https://example.com/start.png',
      prompt: 'A slow zoom on the subject',
      negative_prompt: 'blur, distort',
      duration: '10',
      generate_audio: true,
      end_image_url: 'https://example.com/end.png',
      voice_ids: ['voice_1'],
      elements: [{ frontal_image_url: 'https://example.com/front.png' }],
      aspect_ratio: '16:9',
      cfg_scale: 0.5,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      start_image_url: 'https://example.com/start.png',
      prompt: 'A slow zoom on the subject',
      negative_prompt: 'blur, distort',
      duration: '10',
      generate_audio: true,
      end_image_url: 'https://example.com/end.png',
      voice_ids: ['voice_1'],
      elements: [{ frontal_image_url: 'https://example.com/front.png' }],
      aspect_ratio: '16:9',
      cfg_scale: 0.5,
    })
  })

  it('does NOT map phantom params (seed, guidance, steps, format, safety)', () => {
    const request = {
      model: 'kling-video-v3-pro-image-to-video',
      image: 'https://example.com/photo.png',
      seed: 42,
      guidance: 7.5,
      steps: 20,
      format: 'mp4',
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      start_image_url: 'https://example.com/photo.png',
    })
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('output_format')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('kling-video-v3-pro-image-to-video — output mapping', () => {
  it('extracts video URL from video.url', () => {
    const raw = {
      video: {
        url: 'https://storage.googleapis.com/example/out.mp4',
        content_type: 'video/mp4',
        file_name: 'out.mp4',
        file_size: 8431922,
      },
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      type: 'video',
      url: 'https://storage.googleapis.com/example/out.mp4',
      content_type: 'video/mp4',
    })
  })

  it('returns empty array when video is missing', () => {
    const items = mapOutput({}, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })
})
