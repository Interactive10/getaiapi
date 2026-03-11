import type { CategoryTemplate } from '../types.js'

export const docToTextTemplate: CategoryTemplate = {
  category: 'doc-to-text',
  input_mappings: [
    {
      universal: 'file',
      providers: {
        'fal-ai': 'file_url',
        'replicate': 'file',
        'wavespeed': 'file',
      },
      required: true,
    },
    {
      universal: 'pages',
      providers: {
        'fal-ai': 'max_pages',
        'replicate': 'max_pages',
        'wavespeed': 'max_pages',
      },
    },
  ],
  output_type: 'text',
  output_extract: {
    'fal-ai': 'text',
    'replicate': 'output',
    'wavespeed': 'data.outputs[]',
    'openrouter': 'choices[0].message.content',
  },
  default_timeout_ms: 120000,
}
