import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-wan-v2.2-14b-animate-move',
  endpoint: 'fal-ai/wan/v2.2-14b/animate/move',
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

describe('wan-v2.2-14b-animate-move — param mapping', () => {
  it('maps required params: video and image', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-move',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/video.mp4',
      image_url: 'https://example.com/character.jpg',
    })
  })

  it('maps all params together', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-move',
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
      output_safety: false,
      return_frames_zip: true,
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
      enable_output_safety_checker: false,
      return_frames_zip: true,
    })
  })

  it('does NOT map phantom params (prompt, negative_prompt, format)', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-move',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
      prompt: 'should be ignored',
      negative_prompt: 'also ignored',
      format: 'mp4',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('negative_prompt')
    expect(mapped).not.toHaveProperty('output_format')
  })

  it('omits undefined optional params', () => {
    const request = {
      model: 'wan-v2.2-14b-animate-move',
      video: 'https://example.com/video.mp4',
      image: 'https://example.com/character.jpg',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(Object.keys(mapped)).toEqual(['video_url', 'image_url'])
  })
})

describe('wan-v2.2-14b-animate-move — output mapping', () => {
  it('extracts video URL from video.url', () => {
    const raw = {
      video: {
        url: 'https://fal.media/files/example/wan-move-output.mp4',
        content_type: 'video/mp4',
      },
      seed: 42,
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://fal.media/files/example/wan-move-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('returns empty array when video is missing', () => {
    const items = mapOutput({}, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })
})
