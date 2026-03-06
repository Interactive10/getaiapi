import type { CategoryTemplate } from '../types.js'

export const audioToTextTemplate: CategoryTemplate = {
  category: 'audio-to-text',
  input_mappings: [
    {
      universal: 'audio',
      providers: {
        'fal-ai': 'audio_url',
        'replicate': 'audio',
        'wavespeed': 'audio_url',
      },
      required: true,
    },
  ],
  output_type: 'text',
  output_extract: {
    'fal-ai': 'text',
    'replicate': 'output.text',
    'wavespeed': 'data.outputs[]',
  },
  default_timeout_ms: 120000,
}
