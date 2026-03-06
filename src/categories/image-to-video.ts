import type { CategoryTemplate } from '../types.js'

export const imageToVideoTemplate: CategoryTemplate = {
  category: 'image-to-video',
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
      universal: 'prompt',
      providers: {
        'fal-ai': 'prompt',
        'replicate': 'prompt',
        'wavespeed': 'prompt',
      },
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
      universal: 'steps',
      providers: {
        'fal-ai': 'num_inference_steps',
        'replicate': 'num_inference_steps',
        'wavespeed': 'num_inference_steps',
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
      universal: 'safety',
      providers: {
        'fal-ai': 'enable_safety_checker',
        'replicate': 'disable_safety_checker',
        'wavespeed': 'enable_safety_checker',
      },
      transform: 'flip_boolean',
    },
  ],
  output_type: 'video',
  output_extract: {
    'fal-ai': 'video.url',
    'replicate': 'output',
    'wavespeed': 'data.outputs[]',
  },
  default_timeout_ms: 300000,
}
