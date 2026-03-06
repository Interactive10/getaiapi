import type { CategoryTemplate } from '../types.js'

export const segmentationTemplate: CategoryTemplate = {
  category: 'segmentation',
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
  ],
  output_type: 'segmentation',
  output_extract: {
    'fal-ai': 'output.url',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 60000,
}
