import type { CategoryTemplate } from '../types.js'

export const imageEditTemplate: CategoryTemplate = {
  category: 'image-edit',
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
      universal: 'images',
      providers: {
        'fal-ai': 'image_urls',
        'replicate': 'image_urls',
        'wavespeed': 'image_urls',
      },
    },
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
      universal: 'strength',
      providers: {
        'fal-ai': 'strength',
        'replicate': 'strength',
        'wavespeed': 'strength',
      },
    },
    {
      universal: 'mask',
      providers: {
        'fal-ai': 'mask_url',
        'replicate': 'mask',
        'wavespeed': 'mask_url',
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
