import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'
import pixverseSwapFixture from '../../fixtures/fal-ai/video-swap/pixverse-swap.json'

const PIXVERSE_SWAP_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-pixverse-swap',
  endpoint: 'fal-ai/pixverse/swap',
  auth_env: 'FAL_KEY',
  param_map: {
    video: 'video_url',
    image: 'image_url',
    resolution: 'resolution',
    seed: 'seed',
    mode: 'mode',
    keep_audio: 'original_sound_switch',
    keyframe: 'keyframe_id',
  },
  output_map: {
    type: 'video',
    extract_path: 'video.url',
    content_type: 'video/mp4',
  },
}

describe('pixverse-swap param mapping', () => {
  it('maps required params: video and image', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/video.mp4',
      image_url: 'https://example.com/face.jpg',
    })
  })

  it('maps mode param (person/object/background)', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
      mode: 'background',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped.mode).toBe('background')
  })

  it('maps keep_audio to original_sound_switch', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
      keep_audio: false,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped.original_sound_switch).toBe(false)
  })

  it('maps keyframe to keyframe_id', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
      keyframe: 5,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped.keyframe_id).toBe(5)
  })

  it('maps all params together', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
      resolution: '720p',
      seed: 42,
      mode: 'person',
      keep_audio: true,
      keyframe: 1,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/video.mp4',
      image_url: 'https://example.com/face.jpg',
      resolution: '720p',
      seed: 42,
      mode: 'person',
      original_sound_switch: true,
      keyframe_id: 1,
    })
  })

  it('does NOT map phantom params (prompt, guidance, steps, safety)', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
      prompt: 'should be ignored',
      guidance: 7.5,
      steps: 20,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })

  it('omits undefined optional params', () => {
    const request = {
      model: 'pixverse-swap',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/face.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, PIXVERSE_SWAP_BINDING)

    expect(mapped).not.toHaveProperty('mode')
    expect(mapped).not.toHaveProperty('original_sound_switch')
    expect(mapped).not.toHaveProperty('keyframe_id')
    expect(mapped).not.toHaveProperty('resolution')
    expect(mapped).not.toHaveProperty('seed')
  })
})

describe('pixverse-swap output mapping', () => {
  it('extracts video URL from video.url path', () => {
    const items = mapOutput(pixverseSwapFixture, PIXVERSE_SWAP_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://fal.media/files/example/pixverse-swap-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('returns empty array when video is missing', () => {
    const items = mapOutput({}, PIXVERSE_SWAP_BINDING.output_map)
    expect(items).toEqual([])
  })
})
