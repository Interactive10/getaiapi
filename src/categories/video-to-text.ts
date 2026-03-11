import type { CategoryTemplate } from '../types.js'

export const videoToTextTemplate: CategoryTemplate = {
  category: 'video-to-text',
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
  output_type: 'text',
  output_extract: {
    'fal-ai': 'output',
    'replicate': 'output',
    'wavespeed': 'data.outputs[]',
    'openrouter': 'choices[0].message.content',
  },
  default_timeout_ms: 120000,
}
