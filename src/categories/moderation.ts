import type { CategoryTemplate } from '../types.js'

export const moderationTemplate: CategoryTemplate = {
  category: 'moderation',
  input_mappings: [
    {
      universal: 'prompt',
      providers: {
        'fal-ai': 'prompt',
        'replicate': 'prompt',
        'wavespeed': 'prompt',
      },
    },
    {
      universal: 'image',
      providers: {
        'fal-ai': 'image_url',
        'replicate': 'image',
        'wavespeed': 'image',
      },
    },
    {
      universal: 'video',
      providers: {
        'fal-ai': 'video_url',
        'replicate': 'video',
        'wavespeed': 'video',
      },
    },
    {
      universal: 'audio',
      providers: {
        'fal-ai': 'audio_url',
        'replicate': 'audio',
        'wavespeed': 'audio',
      },
    },
  ],
  output_type: 'text',
  output_extract: {
    'fal-ai': 'output',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 30000,
}
