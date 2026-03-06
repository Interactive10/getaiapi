import type { CategoryTemplate } from '../types.js'

export const textToAudioTemplate: CategoryTemplate = {
  category: 'text-to-audio',
  input_mappings: [
    {
      universal: 'prompt',
      providers: {
        'fal-ai': 'text',
        'replicate': 'prompt',
        'wavespeed': 'prompt',
      },
      required: true,
    },
    {
      universal: 'count',
      providers: {
        'fal-ai': 'num_outputs',
        'replicate': 'num_outputs',
        'wavespeed': 'num_outputs',
      },
    },
    {
      universal: 'format',
      providers: {
        'fal-ai': 'output_format',
        'replicate': 'output_format',
        'wavespeed': 'output_format',
      },
    },
    {
      universal: 'seed',
      providers: {
        'fal-ai': 'seed',
        'replicate': 'seed',
        'wavespeed': 'seed',
      },
    },
  ],
  output_type: 'audio',
  output_extract: {
    'fal-ai': 'audio.url',
    'replicate': 'output',
    'wavespeed': 'data.outputs[]',
  },
  default_timeout_ms: 60000,
}
