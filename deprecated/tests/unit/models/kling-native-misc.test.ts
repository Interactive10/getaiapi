import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

// ── Avatar ───────────────────────────────────────────────────────

const AVATAR_V2_PRO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-avatar',
  endpoint: 'v1/videos/avatar/image2video',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'image', audio: 'sound_file', prompt: 'prompt' },
  defaults: { mode: 'pro' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

// ── Lip-Sync ─────────────────────────────────────────────────────

const LIPSYNC: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-lip-sync',
  endpoint: 'v1/videos/advanced-lip-sync',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { audio: 'sound_file' },
  output_map: { type: 'video', extract_path: 'task_result.videos[].url', content_type: 'video/mp4' },
}

// ── Virtual Try-On ───────────────────────────────────────────────

const TRYON: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-virtual-try-on',
  endpoint: 'v1/images/kolors-virtual-try-on',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'human_image' },
  defaults: { model_name: 'kolors-virtual-try-on-v1-5' },
  output_map: { type: 'image', extract_path: 'task_result.images[].url', content_type: 'image/png' },
}

// ── Extend Image ─────────────────────────────────────────────────

const EXTEND_IMAGE: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-extend-image',
  endpoint: 'v1/images/editing/expand',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'image', prompt: 'prompt', count: 'n' },
  output_map: { type: 'image', extract_path: 'task_result.images[].url', content_type: 'image/png' },
}

// ── Reference-to-Image ──────────────────────────────────────────

const REF_TO_IMAGE: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-reference-to-image',
  endpoint: 'v1/images/multi-image2image',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { prompt: 'prompt', count: 'n', aspect_ratio: 'aspect_ratio' },
  defaults: { model_name: 'kling-v2-1' },
  output_map: { type: 'image', extract_path: 'task_result.images[].url', content_type: 'image/png' },
}

// ── Image Recognize ──────────────────────────────────────────────

const IMAGE_RECOGNIZE: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-image-recognize',
  endpoint: 'v1/videos/image-recognize',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'image' },
  output_map: { type: 'segmentation', extract_path: 'task_result.images[].url', content_type: 'image/png' },
}

// ── AI Multi-Shot ────────────────────────────────────────────────

const MULTI_SHOT: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-ai-multi-shot',
  endpoint: 'v1/general/ai-multi-shot',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { image: 'element_frontal_image' },
  output_map: { type: 'image', extract_path: 'task_result.images[].url_1', content_type: 'image/png' },
}

// ── Identify Face ────────────────────────────────────────────────

const IDENTIFY_FACE: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-identify-face',
  endpoint: 'v1/videos/identify-face',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { video: 'video_url' },
  output_map: { type: 'text', extract_path: 'face_data', content_type: 'application/json' },
}

describe('kling native — avatar param mapping', () => {
  it('maps image, audio, and prompt with mode default', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/face.png', audio: 'https://audio.com/speech.mp3', prompt: 'Smile and wave',
    } as unknown as GenerateRequest, AVATAR_V2_PRO)
    expect(mapped).toEqual({
      image: 'https://img.com/face.png',
      sound_file: 'https://audio.com/speech.mp3',
      prompt: 'Smile and wave',
      mode: 'pro',
    })
  })
})

describe('kling native — lip-sync param mapping', () => {
  it('maps audio to sound_file and passes session_id via options', () => {
    const mapped = mapInput({
      model: 'test', audio: 'https://audio.com/voice.mp3',
      options: { session_id: 'sess_abc', face_id: 'face_1' },
    } as unknown as GenerateRequest, LIPSYNC)
    expect(mapped.sound_file).toBe('https://audio.com/voice.mp3')
    expect(mapped.session_id).toBe('sess_abc')
    expect(mapped.face_id).toBe('face_1')
  })
})

describe('kling native — virtual try-on param mapping', () => {
  it('maps image to human_image with model_name default', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/person.png',
      options: { cloth_image: 'https://img.com/dress.png' },
    } as unknown as GenerateRequest, TRYON)
    expect(mapped).toEqual({
      human_image: 'https://img.com/person.png',
      cloth_image: 'https://img.com/dress.png',
      model_name: 'kolors-virtual-try-on-v1-5',
    })
  })
})

describe('kling native — extend image param mapping', () => {
  it('maps image, prompt, count and passes expansion ratios via options', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/photo.png', prompt: 'Extend the sky', count: 2,
      options: { up_expansion_ratio: 1.5, left_expansion_ratio: 0.5 },
    } as unknown as GenerateRequest, EXTEND_IMAGE)
    expect(mapped).toEqual({
      image: 'https://img.com/photo.png',
      prompt: 'Extend the sky',
      n: 2,
      up_expansion_ratio: 1.5,
      left_expansion_ratio: 0.5,
    })
  })
})

describe('kling native — reference-to-image param mapping', () => {
  it('maps prompt with model_name default and passes subject images via options', () => {
    const mapped = mapInput({
      model: 'test', prompt: 'A portrait in a garden', count: 3,
      options: { subject_image_list: [{ subject_image: 'https://img.com/face.png' }] },
    } as unknown as GenerateRequest, REF_TO_IMAGE)
    expect(mapped.prompt).toBe('A portrait in a garden')
    expect(mapped.n).toBe(3)
    expect(mapped.model_name).toBe('kling-v2-1')
    expect(mapped.subject_image_list).toEqual([{ subject_image: 'https://img.com/face.png' }])
  })
})

describe('kling native — image recognize param mapping', () => {
  it('maps image directly', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/photo.png',
    } as unknown as GenerateRequest, IMAGE_RECOGNIZE)
    expect(mapped).toEqual({ image: 'https://img.com/photo.png' })
  })
})

describe('kling native — image recognize output mapping', () => {
  it('extracts segmentation mask URLs', () => {
    const raw = {
      task_result: {
        images: [
          { type: 'object_seg', is_contain: true, url: 'https://cdn.klingai.com/mask_obj.png' },
          { type: 'head_seg', is_contain: true, url: 'https://cdn.klingai.com/mask_head.png' },
          { type: 'face_seg', is_contain: false, url: '' },
          { type: 'cloth_seg', is_contain: true, url: 'https://cdn.klingai.com/mask_cloth.png' },
        ],
      },
    }
    const items = mapOutput(raw, IMAGE_RECOGNIZE.output_map)
    // genericExtract returns all items including empty-url ones
    const validItems = items.filter(i => i.url)
    expect(validItems).toHaveLength(3)
    expect(validItems[0].url).toBe('https://cdn.klingai.com/mask_obj.png')
    expect(validItems[0].type).toBe('segmentation')
  })
})

describe('kling native — multi-shot param mapping', () => {
  it('maps image to element_frontal_image', () => {
    const mapped = mapInput({
      model: 'test', image: 'https://img.com/character.png',
    } as unknown as GenerateRequest, MULTI_SHOT)
    expect(mapped).toEqual({ element_frontal_image: 'https://img.com/character.png' })
  })
})

describe('kling native — multi-shot output mapping', () => {
  it('extracts url_1 from images array', () => {
    const raw = {
      task_result: {
        images: [
          { index: 0, url_1: 'https://cdn.klingai.com/angle1.png', url_2: 'https://cdn.klingai.com/angle2.png', url_3: 'https://cdn.klingai.com/angle3.png' },
        ],
      },
    }
    const items = mapOutput(raw, MULTI_SHOT.output_map)
    expect(items).toHaveLength(1)
    expect(items[0].url).toBe('https://cdn.klingai.com/angle1.png')
  })
})

describe('kling native — identify face param mapping', () => {
  it('maps video to video_url', () => {
    const mapped = mapInput({
      model: 'test', video: 'https://example.com/clip.mp4',
    } as unknown as GenerateRequest, IDENTIFY_FACE)
    expect(mapped).toEqual({ video_url: 'https://example.com/clip.mp4' })
  })
})
