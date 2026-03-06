import type { CategoryTemplate } from '../types.js'

export const textToImageTemplate: CategoryTemplate = {
  category: 'text-to-image',
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
      universal: 'negative_prompt',
      providers: {
        'fal-ai': 'negative_prompt',
        'replicate': 'negative_prompt',
        'wavespeed': 'negative_prompt',
      },
    },
    {
      universal: 'count',
      providers: {
        'fal-ai': 'num_images',
        'replicate': 'num_outputs',
        'wavespeed': 'num_outputs',
      },
    },
    {
      universal: 'size',
      providers: {
        'fal-ai': 'image_size',
        'replicate': ['width', 'height'],
        'wavespeed': 'resolution',
      },
      transform: 'parse_size',
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
      universal: 'steps',
      providers: {
        'fal-ai': 'num_inference_steps',
        'replicate': 'num_inference_steps',
        'wavespeed': 'num_inference_steps',
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
