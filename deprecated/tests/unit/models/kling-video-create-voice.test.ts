import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-kling-video-create-voice',
  endpoint: 'fal-ai/kling-video/create-voice',
  auth_env: 'FAL_KEY',
  param_map: {
    voice_url: 'voice_url',
  },
  output_map: {
    type: 'text',
    extract_path: 'voice_id',
    content_type: 'text/plain',
  },
}

describe('kling-video-create-voice — fal-ai param mapping', () => {
  it('maps voice_url param', () => {
    const request = {
      model: 'kling-video-create-voice',
      voice_url: 'https://example.com/audio.mp3',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      voice_url: 'https://example.com/audio.mp3',
    })
  })

  it('does NOT map phantom params (image, prompt, negative_prompt)', () => {
    const request = {
      model: 'kling-video-create-voice',
      voice_url: 'https://example.com/audio.mp3',
      image: 'https://example.com/img.png',
      prompt: 'test',
      negative_prompt: 'bad',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      voice_url: 'https://example.com/audio.mp3',
    })
    expect(mapped).not.toHaveProperty('image')
    expect(mapped).not.toHaveProperty('images_data_url')
    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('negative_prompt')
  })
})

describe('kling-video-create-voice — output mapping', () => {
  it('extracts voice_id from response', () => {
    const raw = {
      voice_id: 'vc-abc123-def456',
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      type: 'text',
      content: 'vc-abc123-def456',
      content_type: 'text/plain',
    })
  })

  it('returns empty array when voice_id is missing', () => {
    const items = mapOutput({}, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })

  it('returns empty array when response is null-ish', () => {
    const items = mapOutput({ voice_id: null }, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })

  it('does NOT incorrectly extract from video.url path', () => {
    const raw = {
      video: { url: 'https://example.com/video.mp4' },
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    // Should be empty — there's no voice_id in this response
    expect(items).toEqual([])
  })
})
