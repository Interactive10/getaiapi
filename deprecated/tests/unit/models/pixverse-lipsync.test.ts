import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const FAL_BINDING: ProviderBinding = {
  provider: 'fal-ai',
  skill_id: 'fal-ai-pixverse-lipsync',
  endpoint: 'fal-ai/pixverse/lipsync',
  auth_env: 'FAL_KEY',
  param_map: {
    video: 'video_url',
    audio: 'audio_url',
    text: 'text',
    voice_id: 'voice_id',
  },
  output_map: {
    type: 'video',
    extract_path: 'video.url',
    content_type: 'video/mp4',
  },
}

const REPLICATE_BINDING: ProviderBinding = {
  provider: 'replicate',
  skill_id: 'replicate-pixverse-lipsync',
  endpoint: 'pixverse/lipsync',
  auth_env: 'REPLICATE_API_TOKEN',
  param_map: {
    video: 'video',
    audio: 'audio',
  },
  output_map: {
    type: 'video',
    extract_path: 'output[]',
    content_type: 'video/mp4',
  },
}

describe('pixverse-lipsync — fal-ai param mapping', () => {
  it('maps audio + video mode (primary use case)', () => {
    const request = {
      model: 'pixverse-lipsync',
      video: 'https://example.com/face-video.mp4',
      audio: 'https://example.com/speech.mp3',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/face-video.mp4',
      audio_url: 'https://example.com/speech.mp3',
    })
  })

  it('maps TTS mode (text + voice instead of audio)', () => {
    const request = {
      model: 'pixverse-lipsync',
      video: 'https://example.com/face-video.mp4',
      text: 'Hello, how are you?',
      voice_id: 'Auto',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/face-video.mp4',
      text: 'Hello, how are you?',
      voice_id: 'Auto',
    })
  })

  it('does NOT map phantom params (image, prompt, resolution, seed, guidance, steps, safety)', () => {
    const request = {
      model: 'pixverse-lipsync',
      video: 'https://example.com/face-video.mp4',
      audio: 'https://example.com/speech.mp3',
      image: 'https://example.com/face.jpg',
      prompt: 'ignored',
      resolution: '720p',
      seed: 42,
      guidance: 7.5,
      steps: 20,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).not.toHaveProperty('image_url')
    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('resolution')
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })

  it('omits undefined optional params', () => {
    const request = {
      model: 'pixverse-lipsync',
      video: 'https://example.com/face-video.mp4',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, FAL_BINDING)

    expect(mapped).toEqual({
      video_url: 'https://example.com/face-video.mp4',
    })
    expect(mapped).not.toHaveProperty('audio_url')
    expect(mapped).not.toHaveProperty('text')
    expect(mapped).not.toHaveProperty('voice_id')
  })
})

describe('pixverse-lipsync — replicate param mapping', () => {
  it('maps required params: video and audio', () => {
    const request = {
      model: 'pixverse-lipsync',
      video: 'https://example.com/face-video.mp4',
      audio: 'https://example.com/speech.mp3',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).toEqual({
      video: 'https://example.com/face-video.mp4',
      audio: 'https://example.com/speech.mp3',
    })
  })

  it('does NOT map phantom params', () => {
    const request = {
      model: 'pixverse-lipsync',
      video: 'https://example.com/face-video.mp4',
      audio: 'https://example.com/speech.mp3',
      image: 'https://example.com/face.jpg',
      prompt: 'ignored',
      resolution: '720p',
      seed: 42,
      guidance: 7.5,
      steps: 20,
      safety: true,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, REPLICATE_BINDING)

    expect(mapped).not.toHaveProperty('character_image')
    expect(mapped).not.toHaveProperty('prompt')
    expect(mapped).not.toHaveProperty('resolution')
    expect(mapped).not.toHaveProperty('seed')
    expect(mapped).not.toHaveProperty('guidance_scale')
    expect(mapped).not.toHaveProperty('num_inference_steps')
    expect(mapped).not.toHaveProperty('enable_safety_checker')
  })
})

describe('pixverse-lipsync — output mapping', () => {
  it('fal-ai: extracts video URL from video.url', () => {
    const raw = {
      video: {
        url: 'https://fal.media/files/example/lipsync-output.mp4',
        content_type: 'video/mp4',
      },
    }

    const items = mapOutput(raw, FAL_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://fal.media/files/example/lipsync-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('replicate: extracts video URL from output[]', () => {
    const raw = {
      output: ['https://replicate.delivery/example/lipsync-output.mp4'],
    }

    const items = mapOutput(raw, REPLICATE_BINDING.output_map)

    expect(items).toEqual([
      {
        type: 'video',
        url: 'https://replicate.delivery/example/lipsync-output.mp4',
        content_type: 'video/mp4',
      },
    ])
  })

  it('fal-ai: returns empty array when video is missing', () => {
    const items = mapOutput({}, FAL_BINDING.output_map)
    expect(items).toEqual([])
  })
})
