import type { CategoryTemplate } from '../types.js'

export const textTo3dTemplate: CategoryTemplate = {
  category: 'text-to-3d',
  input_mappings: [
    {
      universal: 'prompt',
      providers: {
        'fal-ai': 'prompt',
        'replicate': 'prompt',
        'wavespeed': 'prompt',
      },
      required: true,
    },
    {
      universal: 'seed',
      providers: {
        'fal-ai': 'seed',
        'replicate': 'seed',
        'wavespeed': 'seed',
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
      universal: 'quality',
      providers: {
        'fal-ai': 'quality',
        'replicate': 'output_quality',
        'wavespeed': 'quality',
      },
    },
  ],
  output_type: '3d',
  output_extract: {
    'fal-ai': 'output.url',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 600000,
}
