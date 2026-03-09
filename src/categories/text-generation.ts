import type { CategoryTemplate } from '../types.js'

export const textGenerationTemplate: CategoryTemplate = {
  category: 'text-generation',
  input_mappings: [
    {
      universal: 'prompt',
      providers: {
        openrouter: 'prompt',
      },
      required: true,
    },
  ],
  output_type: 'text',
  output_extract: {
    openrouter: 'choices[0].message.content',
  },
  default_timeout_ms: 120000,
}
