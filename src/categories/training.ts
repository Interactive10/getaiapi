import type { CategoryTemplate } from '../types.js'

export const trainingTemplate: CategoryTemplate = {
  category: 'training',
  input_mappings: [
    {
      universal: 'image',
      providers: {
        'fal-ai': 'images_data_url',
        'replicate': 'input_images',
        'wavespeed': 'images',
      },
      required: true,
    },
  ],
  output_type: 'text',
  output_extract: {
    'fal-ai': 'output',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 1800000,
}
