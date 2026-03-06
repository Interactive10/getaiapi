import type { CategoryTemplate } from '../types.js'

export const upscaleVideoTemplate: CategoryTemplate = {
  category: 'upscale-video',
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
      universal: 'strength',
      providers: {
        'fal-ai': 'scale',
        'replicate': 'scale',
        'wavespeed': 'scale',
      },
    },
  ],
  output_type: 'video',
  output_extract: {
    'fal-ai': 'video.url',
    'replicate': 'output',
    'wavespeed': 'data.output',
  },
  default_timeout_ms: 600000,
}
