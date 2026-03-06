import type { CategoryTemplate } from '../types.js'

export const imageTo3dTemplate: CategoryTemplate = {
  category: 'image-to-3d',
  input_mappings: [
    {
      universal: 'image',
      providers: {
        'fal-ai': 'image_url',
        'replicate': 'image',
        'wavespeed': 'image',
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
  ],
  output_type: '3d',
  output_extract: {
    'fal-ai': 'output.url',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 600000,
}
