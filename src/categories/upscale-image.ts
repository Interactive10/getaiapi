import type { CategoryTemplate } from '../types.js'

export const upscaleImageTemplate: CategoryTemplate = {
  category: 'upscale-image',
  input_mappings: [
    {
      universal: 'image',
      providers: {
        'fal-ai': 'image_url',
        'replicate': 'image',
        'wavespeed': 'image_url',
      },
      required: true,
    },
    {
      universal: 'strength',
      providers: {
        'fal-ai': 'scale',
        'replicate': 'scale',
        'wavespeed': 'scale',
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
  output_type: 'image',
  output_extract: {
    'fal-ai': 'images[].url',
    'replicate': 'output[]',
    'wavespeed': 'data.outputs[]',
  },
  default_timeout_ms: 120000,
}
