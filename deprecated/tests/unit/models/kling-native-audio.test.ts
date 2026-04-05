import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

const TTS: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-tts',
  endpoint: 'v1/audio/tts',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { prompt: 'text' },
  output_map: { type: 'audio', extract_path: 'task_result.audios[].url', content_type: 'audio/mpeg' },
}

const TEXT_TO_AUDIO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-text-to-audio',
  endpoint: 'v1/audio/text-to-audio',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { prompt: 'prompt', duration: 'duration' },
  output_map: { type: 'audio', extract_path: 'task_result.audios[].url', content_type: 'audio/mpeg' },
}

const VIDEO_TO_AUDIO: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-video-to-audio',
  endpoint: 'v1/audio/video-to-audio',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { video: 'video_url' },
  output_map: { type: 'audio', extract_path: 'task_result.audios[].url', content_type: 'audio/mpeg' },
}

const VOICE_CLONE: ProviderBinding = {
  provider: 'kling',
  skill_id: 'kling-voice-clone',
  endpoint: 'v1/general/custom-voices',
  auth_env: 'KLING_ACCESS_KEY',
  param_map: { audio: 'voice_url' },
  output_map: { type: 'audio', extract_path: 'task_result.audios[].url', content_type: 'audio/mpeg' },
}

describe('kling native — TTS param mapping', () => {
  it('maps prompt to text', () => {
    const mapped = mapInput({ model: 'test', prompt: 'Hello world' } as unknown as GenerateRequest, TTS)
    expect(mapped).toEqual({ text: 'Hello world' })
  })

  it('passes voice_id and voice_language via options', () => {
    const mapped = mapInput({
      model: 'test', prompt: 'Hello',
      options: { voice_id: 'en_male_01', voice_language: 'en', voice_speed: 1.2 },
    } as unknown as GenerateRequest, TTS)
    expect(mapped.text).toBe('Hello')
    expect(mapped.voice_id).toBe('en_male_01')
    expect(mapped.voice_language).toBe('en')
    expect(mapped.voice_speed).toBe(1.2)
  })
})

describe('kling native — text-to-audio param mapping', () => {
  it('maps prompt and duration', () => {
    const mapped = mapInput({
      model: 'test', prompt: 'Thunder crashing', duration: '5.0',
    } as unknown as GenerateRequest, TEXT_TO_AUDIO)
    expect(mapped).toEqual({ prompt: 'Thunder crashing', duration: '5.0' })
  })
})

describe('kling native — video-to-audio param mapping', () => {
  it('maps video to video_url', () => {
    const mapped = mapInput({
      model: 'test', video: 'https://example.com/clip.mp4',
    } as unknown as GenerateRequest, VIDEO_TO_AUDIO)
    expect(mapped).toEqual({ video_url: 'https://example.com/clip.mp4' })
  })

  it('passes sound_effect_prompt and bgm_prompt via options', () => {
    const mapped = mapInput({
      model: 'test', video: 'https://example.com/clip.mp4',
      options: { sound_effect_prompt: 'birds chirping', bgm_prompt: 'calm piano' },
    } as unknown as GenerateRequest, VIDEO_TO_AUDIO)
    expect(mapped.video_url).toBe('https://example.com/clip.mp4')
    expect(mapped.sound_effect_prompt).toBe('birds chirping')
    expect(mapped.bgm_prompt).toBe('calm piano')
  })
})

describe('kling native — voice clone param mapping', () => {
  it('maps audio to voice_url', () => {
    const mapped = mapInput({
      model: 'test', audio: 'https://example.com/voice.mp3',
      options: { voice_name: 'My Voice' },
    } as unknown as GenerateRequest, VOICE_CLONE)
    expect(mapped.voice_url).toBe('https://example.com/voice.mp3')
    expect(mapped.voice_name).toBe('My Voice')
  })
})

describe('kling native — audio output mapping', () => {
  it('extracts audios from task_result.audios[].url', () => {
    const raw = {
      task_result: {
        audios: [{ id: 'a1', url: 'https://cdn.klingai.com/audio.mp3', duration: '5' }],
      },
    }
    const items = mapOutput(raw, TTS.output_map)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({ type: 'audio', url: 'https://cdn.klingai.com/audio.mp3', content_type: 'audio/mpeg' })
  })

  it('returns empty array when no audios', () => {
    expect(mapOutput({}, TTS.output_map)).toEqual([])
    expect(mapOutput({ task_result: { audios: [] } }, TTS.output_map)).toEqual([])
  })
})
