import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-wan-v2.2-14b-animate-replace',
  endpoint: 'fal-ai/wan/v2.2-14b/animate/replace',
  auth_env: 'FAL_KEY',
  param_map: {
    video: 'video_url',
    image: 'image_url',
    resolution: 'resolution',
    seed: 'seed',
    guidance: 'guidance_scale',
    steps: 'num_inference_steps',
    safety: 'enable_safety_checker',
    shift: 'shift',
    video_write_mode: 'video_write_mode',
    video_quality: 'video_quality',
    turbo: 'use_turbo',
    output_safety: 'enable_output_safety_checker',
    return_frames_zip: 'return_frames_zip',
  },
  output_map: {
    type: 'video',
    extract_path: 'video.url',
    content_type: 'video/mp4',
  },
}

const REPLICATE_BINDING: ProviderBinding = {
  provider: 'replicate',
  skill_id: 'replicate-wan-video-wan-2.2-animate-replace',
  endpoint: 'wan-video/wan-2.2-animate-replace',
  auth_env: 'REPLICATE_API_TOKEN',
  param_map: {
    video: 'video',
    image: 'character_image',
    resolution: 'resolution',
    seed: 'seed',
    keep_audio: 'merge_audio',
    turbo: 'go_fast',
  },
  output_map: {
    type: 'video',
    extract_path: 'output[]',
    content_type: 'video/mp4',
  },
}

describe('wan-v2.2-14b-animate-replace — fal-ai param mapping', () => {
  it('maps required params: video and image', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/video.mp4',
      image_url: 'https://example.com/character.jpg',
    })
  })

  it('maps all fal-ai params together', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      resolution: '720p',
      seed: 42,
      guidance: 1.5,
      steps: 30,
      safety: true,
      shift: 5.0,
      video_write_mode: 'balanced',
      video_quality: 'high',
      turbo: true,
      output_safety: true,
      return_frames_zip: false,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/video.mp4',
      image_url: 'https://example.com/character.jpg',
      resolution: '720p',
      seed: 42,
      guidance_scale: 1.5,
      num_inference_steps: 30,
      enable_safety_checker: true,
      shift: 5.0,
      video_write_mode: 'balanced',
      video_quality: 'high',
      use_turbo: true,
      enable_output_safety_checker: true,
      return_frames_zip: false,
    })
  })

  it('does NOT map phantom prompt param', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      prompt: 'should be ignored',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('prompt')
  })

  it('omits undefined optional params', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(Object.keys(mapped)).toEqual(['video_url', 'image_url'])
  })
})

describe('wan-v2.2-14b-animate-replace — replicate param mapping', () => {
  it('maps required params with provider-specific names', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      video: 'https://example.com/video.mp4',
      character_image: 'https://example.com/character.jpg',
    })
  })

  it('maps keep_audio to merge_audio', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      keep_audio: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped.merge_audio).toBe(true)
  })

  it('maps turbo to go_fast', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      turbo: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped.go_fast).toBe(true)
  })

  it('does NOT map phantom params (prompt, guidance, steps, safety)', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      prompt: 'ignored',
      guidance: 7.5,
      steps: 20,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })

  it('maps all replicate params together', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-replace',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      resolution: '720',
      seed: 99,
      keep_audio: false,
      turbo: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      video: 'https://example.com/video.mp4',
      character_image: 'https://example.com/character.jpg',
      resolution: '720',
      seed: 99,
      merge_audio: false,
      go_fast: true,
    })
  })
})

describe('wan-v2.2-14b-animate-replace — output mapping', () => {
  it('fal-ai: extracts video URL from video.url', () => {
    const raw = {
      video: {
        url: 'https://fal.media/files/example/wan-replace-output.mp4',
        content_type: 'video/mp4',
      },
      seed: 42,
      prompt: 'auto-generated prompt',
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://fal.media/files/example/wan-replace-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('replicate: extracts video URL from output[]', () => {
    const raw = {
      output: ['https://replicate.delivery/example/wan-replace-output.mp4'],
    }

    const items = mapOutput(raw, REPLICATE_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://replicate.delivery/example/wan-replace-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('fal-ai: returns empty array when video is missing', () => {
    const items = mapOutput({}, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })
})
