import type { CategoryTemplate } from '../types.js'

export const imageToImageTemplate: CategoryTemplate = {
  category: 'image-to-image',
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
      universal: 'strength',
      providers: {
        'fal-ai': 'strength',
        'replicate': 'prompt_strength',
        'wavespeed': 'strength',
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
      universal: 'guidance',
      providers: {
        'fal-ai': 'guidance_scale',
        'replicate': 'guidance',
        'wavespeed': 'guidance_scale',
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
    {
      universal: 'safety',
      providers: {
        'fal-ai': 'enable_safety_checker',
        'replicate': 'disable_safety_checker',
        'wavespeed': 'enable_safety_checker',
      },
      transform: 'flip_boolean',
    },
  ],
  output_type: 'image',
  output_extract: {
    'fal-ai': 'images[].url',
    'replicate': 'output[]',
    'wavespeed': 'data.outputs[]',
  },
  default_timeout_ms: 60000,
}
