import type { CategoryTemplate } from '../types.js'

export const videoToAudioTemplate: CategoryTemplate = {
  category: 'video-to-audio',
  input_mappings: [
    {
      universal: 'video',
      providers: {
        'fal-ai': 'video_url',
        'replicate': 'video',
        'wavespeed': 'video',
      },
      required: true,
    },
    {
      universal: 'prompt',
      providers: {
        'fal-ai': 'prompt',
        'replicate': 'prompt',
        'wavespeed': 'prompt',
      },
    },
  ],
  output_type: 'audio',
  output_extract: {
    'fal-ai': 'audio.url',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 120000,
}
