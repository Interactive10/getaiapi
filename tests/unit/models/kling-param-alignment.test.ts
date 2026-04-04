import { describe, it, expect } from 'vitest'
import { mapInput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

// ── Bindings matching registry.json after alignment ──

const I2V_V3_PRO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-image2video',
  endpoint: 'v1/videos/image2video',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: {
    prompt: 'prompt',
    negative_prompt: 'negative_prompt',
    duration: 'duration',
    aspect_ratio: 'aspect_ratio',
    image: 'image',
    cfg_scale: 'cfg_scale',
    generate_audio: 'sound',
    end_image_url: 'image_tail',
    voice_ids: 'voice_list',
    elements: 'element_list',
  },
  defaults: { model_name: 'kling-v3', mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

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
    cfg_scale: 'cfg_scale',
    generate_audio: 'sound',
  },
  defaults: { model_name: 'kling-v3', mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

const MOTION_V3_PRO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-motion-control',
  endpoint: 'v1/videos/motion-control',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: {
    image: 'image_url',
    video: 'video_url',
    prompt: 'prompt',
    keep_audio: 'keep_original_sound',
    character_orientation: 'character_orientation',
    elements: 'element_list',
  },
  defaults: { model_name: 'kling-v3', mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

const VIDEO_TO_AUDIO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-video-to-audio',
  endpoint: 'v1/audio/video-to-audio',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { video: 'video_url', prompt: 'sound_effect_prompt' },
  output_map: { type: 'audio', extract_path: 'task_result.audios[].url', content_type: 'audio/mpeg' },
}

const FAL_I2V_V3_PRO: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-kling-video-v3-pro-image-to-video',
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
  output_map: { type: 'video', extract_path: 'video.url', content_type: 'video/mp4' },
}

// ── Options passthrough with param_map renames ──

describe('kling — options keys renamed via param_map', () => {
  it('renames generate_audio to sound and transforms boolean to string', () => {
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { generate_audio: true },
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.sound).toBe('on')
    expect(mapped).not.toHaveProperty('generate_audio')
  })

  it('transforms generate_audio false to off', () => {
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { generate_audio: false },
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.sound).toBe('off')
  })

  it('renames end_image_url to image_tail', () => {
    const mapped = mapInput({
      model: 'test',
      image: 'https://example.com/start.png',
      options: { end_image_url: 'https://example.com/end.png' },
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.image_tail).toBe('https://example.com/end.png')
    expect(mapped).not.toHaveProperty('end_image_url')
  })

  it('renames voice_ids to voice_list with structural transform', () => {
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { voice_ids: ['voice_a', 'voice_b'] },
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.voice_list).toEqual([
      { voice_id: 'voice_a' },
      { voice_id: 'voice_b' },
    ])
    expect(mapped).not.toHaveProperty('voice_ids')
  })

  it('renames elements to element_list', () => {
    const elems = [{ element_id: 123, image: 'https://example.com/face.png' }]
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { elements: elems },
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.element_list).toEqual(elems)
    expect(mapped).not.toHaveProperty('elements')
  })

  it('passes cfg_scale through with same name', () => {
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { cfg_scale: 0.7 },
    } as unknown as GenerateRequest, I2V_V3_PRO)
    expect(mapped.cfg_scale).toBe(0.7)
  })
})

describe('kling — motion control aligned params', () => {
  it('renames keep_audio to keep_original_sound', () => {
    const mapped = mapInput({
      model: 'test',
      image: 'https://img.com/a.png',
      video: 'https://vid.com/b.mp4',
      options: { keep_audio: 'yes' },
    } as unknown as GenerateRequest, MOTION_V3_PRO)
    expect(mapped.keep_original_sound).toBe('yes')
    expect(mapped).not.toHaveProperty('keep_audio')
  })

  it('passes character_orientation through param_map', () => {
    const mapped = mapInput({
      model: 'test',
      image: 'https://img.com/a.png',
      video: 'https://vid.com/b.mp4',
      options: { character_orientation: 'image' },
    } as unknown as GenerateRequest, MOTION_V3_PRO)
    expect(mapped.character_orientation).toBe('image')
  })
})

describe('kling — video-to-audio prompt mapping', () => {
  it('maps prompt to sound_effect_prompt', () => {
    const mapped = mapInput({
      model: 'test',
      video: 'https://vid.com/a.mp4',
      prompt: 'birds chirping',
    } as unknown as GenerateRequest, VIDEO_TO_AUDIO)
    expect(mapped.sound_effect_prompt).toBe('birds chirping')
    expect(mapped).not.toHaveProperty('prompt')
  })
})

// ── Provider portability: same input works on both fal-ai and kling ──

describe('provider portability — same options work across providers', () => {
  it('handles generate_audio on both fal-ai and kling', () => {
    const request = {
      model: 'kling-video-v3-pro-image-to-video',
      image: 'https://example.com/img.png',
      prompt: 'Animate',
      options: { generate_audio: true, cfg_scale: 0.5 },
    } as unknown as GenerateRequest

    const falResult = mapInput(request, FAL_I2V_V3_PRO)
    const klingResult = mapInput(request, I2V_V3_PRO)

    // fal-ai keeps generate_audio as-is
    expect(falResult.generate_audio).toBe(true)
    // kling transforms to sound: "on"
    expect(klingResult.sound).toBe('on')
    // Both get cfg_scale
    expect(falResult.cfg_scale).toBe(0.5)
    expect(klingResult.cfg_scale).toBe(0.5)
  })

  it('handles end_image_url on both fal-ai and kling', () => {
    const request = {
      model: 'kling-video-v3-pro-image-to-video',
      image: 'https://example.com/start.png',
      prompt: 'Animate',
      options: { end_image_url: 'https://example.com/end.png' },
    } as unknown as GenerateRequest

    const falResult = mapInput(request, FAL_I2V_V3_PRO)
    const klingResult = mapInput(request, I2V_V3_PRO)

    // fal-ai keeps end_image_url
    expect(falResult.end_image_url).toBe('https://example.com/end.png')
    // kling renames to image_tail
    expect(klingResult.image_tail).toBe('https://example.com/end.png')
  })

  it('handles voice_ids on both fal-ai and kling', () => {
    const request = {
      model: 'kling-video-v3-pro-image-to-video',
      image: 'https://example.com/start.png',
      prompt: 'Animate',
      options: { voice_ids: ['voice1'] },
    } as unknown as GenerateRequest

    const falResult = mapInput(request, FAL_I2V_V3_PRO)
    const klingResult = mapInput(request, I2V_V3_PRO)

    // fal-ai passes array as-is
    expect(falResult.voice_ids).toEqual(['voice1'])
    // kling transforms to voice_list objects
    expect(klingResult.voice_list).toEqual([{ voice_id: 'voice1' }])
  })
})

// ── Backward compatibility ──

describe('backward compatibility — unknown options pass through unchanged', () => {
  it('passes unknown options through without renaming', () => {
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { camera_control: { type: 'simple' }, watermark_info: { watermark: false } },
    } as unknown as GenerateRequest, T2V_V3_PRO)
    expect(mapped.camera_control).toEqual({ type: 'simple' })
    expect(mapped.watermark_info).toEqual({ watermark: false })
  })

  it('does not send internal keys to provider', () => {
    const mapped = mapInput({
      model: 'test',
      prompt: 'hello',
      options: { timeout: 5000, reupload: true, sound: 'on' },
    } as unknown as GenerateRequest, T2V_V3_PRO)
    expect(mapped).not.toHaveProperty('timeout')
    expect(mapped).not.toHaveProperty('reupload')
    expect(mapped.sound).toBe('on')
  })
})
