import type { CategoryTemplate } from '../types.js'

export const imageToTextTemplate: CategoryTemplate = {
  category: 'image-to-text',
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
  output_type: 'text',
  output_extract: {
    'fal-ai': 'output',
    'replicate': 'output',
    'wavespeed': 'data.outputs[]',
    'openrouter': 'choices[0].message.content',
  },
  default_timeout_ms: 60000,
}
