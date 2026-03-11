import type { CategoryTemplate } from '../types.js'

export const videoToVideoTemplate: CategoryTemplate = {
  category: 'video-to-video',
  input_mappings: [
    {
      universal: 'video',
      providers: {
        'fal-ai': 'video_url',
        'replicate': 'video',
        'wavespeed': 'video',
      },
      required: true,
    },
    {
      universal: 'image',
      providers: {
        'fal-ai': 'image_url',
        'replicate': 'character_image',
        'wavespeed': 'image',
      },
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
      universal: 'resolution',
      providers: {
        'fal-ai': 'resolution',
        'replicate': 'resolution',
        'wavespeed': 'resolution',
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
        'replicate': 'guidance_scale',
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
      universal: 'safety',
      providers: {
        'fal-ai': 'enable_safety_checker',
        'replicate': 'enable_safety_checker',
        'wavespeed': 'enable_safety_checker',
      },
    },
  ],
  output_type: 'video',
  output_extract: {
    'fal-ai': 'video.url',
    'replicate': 'output[]',
    'wavespeed': 'data.outputs[]',
  },
  default_timeout_ms: 300000,
}
