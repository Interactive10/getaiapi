import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

// ── Text-to-Video ────────────────────────────────────────────────

const T2V_V3_PRO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-text2video',
  endpoint: 'v1/videos/text2video',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: {
    prompt: 'prompt',
    negative_prompt: 'negative_prompt',
    duration: 'duration',
    aspect_ratio: 'aspect_ratio',
  },
  defaults: { model_name: 'kling-v3', mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

// ── Image-to-Video ───────────────────────────────────────────────

const I2V_V3_PRO: ProviderBinding = {
  ...T2V_V3_PRO,
  endpoint: 'v1/videos/image2video',
  skill_id: 'kling-image2video',
  param_map: { ...T2V_V3_PRO.param_map, image: 'image' },
}

// ── Omni-Video (O3) ─────────────────────────────────────────────

const OMNI_O3_PRO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-video-omni',
  endpoint: 'v1/videos/omni-video',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { prompt: 'prompt', duration: 'duration', aspect_ratio: 'aspect_ratio', image: 'image' },
  defaults: { model_name: 'kling-v3-omni', mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

// ── Motion Control ───────────────────────────────────────────────

const MOTION_V26_PRO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-motion-control',
  endpoint: 'v1/videos/motion-control',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'image_url', video: 'video_url', prompt: 'prompt' },
  defaults: { model_name: 'kling-v2-6', mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

// ── Video Effects ────────────────────────────────────────────────

const EFFECTS: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-video-effects',
  endpoint: 'v1/videos/effects',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'image' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

// ── Video Extend ─────────────────────────────────────────────────

const VIDEO_EXTEND: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-video-extend',
  endpoint: 'v1/videos/video-extend',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { prompt: 'prompt', negative_prompt: 'negative_prompt' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

describe('kling native — text-to-video param mapping', () => {
  it('injects model_name and mode from defaults', () => {
    const mapped = mapInput({ model: 'kling-video-v3-pro-text-to-video', prompt: 'A wave' } as unknown as GenerateRequest, T2V_V3_PRO)
    expect(mapped).toEqual({ prompt: 'A wave', model_name: 'kling-v3', mode: 'pro' })
  })

  it('maps all params including duration and aspect_ratio', () => {
    const mapped = mapInput({
      model: 'test', prompt: 'Sunset', negative_prompt: 'dark', duration: '10', aspect_ratio: '9:16',
    } as unknown as GenerateRequest, T2V_V3_PRO)
    expect(mapped).toEqual({
      prompt: 'Sunset', negative_prompt: 'dark', duration: '10', aspect_ratio: '9:16',
      model_name: 'kling-v3', mode: 'pro',
    })
  })

  it('passes kling-specific options through (camera_control, sound)', () => {
    const mapped = mapInput({
      model: 'test', prompt: 'test',
      options: { sound: 'on', camera_control: { type: 'simple' } },
    } as unknown as GenerateRequest, T2V_V3_PRO)
    expect(mapped.sound).toBe('on')
    expect(mapped.camera_control).toEqual({ type: 'simple' })
  })
})

describe('kling native — image-to-video param mapping', () => {
  it('maps image param for i2v', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://example.com/img.png', prompt: 'Animate this',
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.image).toBe('https://example.com/img.png')
    expect(mapped.prompt).toBe('Animate this')
    expect(mapped.model_name).toBe('kling-v3')
  })
})

describe('kling native — omni-video (O3) param mapping', () => {
  it('uses kling-v3-omni model_name', () => {
    const mapped = mapInput({ model: 'test', prompt: 'test' } as unknown as GenerateRequest, OMNI_O3_PRO)
    expect(mapped.model_name).toBe('kling-v3-omni')
    expect(mapped.mode).toBe('pro')
  })
})

describe('kling native — motion control param mapping', () => {
  it('maps image to image_url and video to video_url', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/a.png', video: 'https://vid.com/b.mp4', prompt: 'Dance',
    } as unknown as GenerateRequest, MOTION_V26_PRO)
    expect(mapped.image_url).toBe('https://img.com/a.png')
    expect(mapped.video_url).toBe('https://vid.com/b.mp4')
    expect(mapped.prompt).toBe('Dance')
    expect(mapped.model_name).toBe('kling-v2-6')
  })
})

describe('kling native — video effects param mapping', () => {
  it('maps image directly and has no defaults', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/face.png',
      options: { effect_scene: 'flash_drive' },
    } as unknown as GenerateRequest, EFFECTS)
    expect(mapped.image).toBe('https://img.com/face.png')
    expect(mapped.effect_scene).toBe('flash_drive')
    expect(mapped).not.toHaveProperty('model_name')
  })
})

describe('kling native — video extend param mapping', () => {
  it('maps prompt and passes video_id via options', () => {
    const mapped = mapInput({
      model: 'test', prompt: 'Continue the scene',
      options: { video_id: 'task_abc123' },
    } as unknown as GenerateRequest, VIDEO_EXTEND)
    expect(mapped.prompt).toBe('Continue the scene')
    expect(mapped.video_id).toBe('task_abc123')
  })
})

describe('kling native — video output mapping', () => {
  it('extracts videos from task_result.videos[].url', () => {
    const raw = {
      task_result: {
        videos: [{ id: 'v1', url: 'https://cdn.klingai.com/vid.mp4', duration: '5' }],
      },
    }
    const items = mapOutput(raw, T2V_V3_PRO.output_map)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({ type: 'video', url: 'https://cdn.klingai.com/vid.mp4', content_type: 'video/mp4' })
  })

  it('returns empty array when task_result has no videos', () => {
    expect(mapOutput({}, T2V_V3_PRO.output_map)).toEqual([])
    expect(mapOutput({ task_result: {} }, T2V_V3_PRO.output_map)).toEqual([])
    expect(mapOutput({ task_result: { videos: [] } }, T2V_V3_PRO.output_map)).toEqual([])
  })
})
