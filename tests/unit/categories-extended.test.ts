import { describe, it, expect } from 'vitest'
import { imageTo3dTemplate } from '../../src/categories/image-to-3d.js'
import { imageToImageTemplate } from '../../src/categories/image-to-image.js'
import { moderationTemplate } from '../../src/categories/moderation.js'
import { segmentationTemplate } from '../../src/categories/segmentation.js'
import { textTo3dTemplate } from '../../src/categories/text-to-3d.js'
import { trainingTemplate } from '../../src/categories/training.js'
import { upscaleVideoTemplate } from '../../src/categories/upscale-video.js'
import { videoToAudioTemplate } from '../../src/categories/video-to-audio.js'
import type { CategoryTemplate, ParamMapping } from '../../src/types.js'

// ---------------------------------------------------------------------------
// Template metadata for describe.each
// ---------------------------------------------------------------------------

const templates: {
  name: string
  template: CategoryTemplate
  expectedCategory: string
  expectedOutputType: string
  expectedTimeout: number
  requiredFields: string[]
  spotChecks: { universal: string; provider: string; key: string | string[] }[]
}[] = [
  {
    name: 'imageTo3dTemplate',
    template: imageTo3dTemplate,
    expectedCategory: 'image-to-3d',
    expectedOutputType: '3d',
    expectedTimeout: 600000,
    requiredFields: ['image'],
    spotChecks: [
      { universal: 'image', provider: 'fal-ai', key: 'image_url' },
      { universal: 'image', provider: 'replicate', key: 'image' },
      { universal: 'format', provider: 'fal-ai', key: 'output_format' },
    ],
  },
  {
    name: 'imageToImageTemplate',
    template: imageToImageTemplate,
    expectedCategory: 'image-to-image',
    expectedOutputType: 'image',
    expectedTimeout: 60000,
    requiredFields: ['image'],
    spotChecks: [
      { universal: 'image', provider: 'fal-ai', key: 'image_url' },
      { universal: 'strength', provider: 'replicate', key: 'prompt_strength' },
      { universal: 'safety', provider: 'replicate', key: 'disable_safety_checker' },
    ],
  },
  {
    name: 'moderationTemplate',
    template: moderationTemplate,
    expectedCategory: 'moderation',
    expectedOutputType: 'text',
    expectedTimeout: 30000,
    requiredFields: [],
    spotChecks: [
      { universal: 'image', provider: 'fal-ai', key: 'image_url' },
      { universal: 'video', provider: 'replicate', key: 'video' },
      { universal: 'audio', provider: 'wavespeed', key: 'audio' },
    ],
  },
  {
    name: 'segmentationTemplate',
    template: segmentationTemplate,
    expectedCategory: 'segmentation',
    expectedOutputType: 'segmentation',
    expectedTimeout: 60000,
    requiredFields: ['image'],
    spotChecks: [
      { universal: 'image', provider: 'fal-ai', key: 'image_url' },
      { universal: 'image', provider: 'replicate', key: 'image' },
    ],
  },
  {
    name: 'textTo3dTemplate',
    template: textTo3dTemplate,
    expectedCategory: 'text-to-3d',
    expectedOutputType: '3d',
    expectedTimeout: 600000,
    requiredFields: ['prompt'],
    spotChecks: [
      { universal: 'prompt', provider: 'fal-ai', key: 'prompt' },
      { universal: 'quality', provider: 'replicate', key: 'output_quality' },
    ],
  },
  {
    name: 'trainingTemplate',
    template: trainingTemplate,
    expectedCategory: 'training',
    expectedOutputType: 'text',
    expectedTimeout: 1800000,
    requiredFields: ['image'],
    spotChecks: [
      { universal: 'image', provider: 'fal-ai', key: 'images_data_url' },
      { universal: 'image', provider: 'replicate', key: 'input_images' },
      { universal: 'image', provider: 'wavespeed', key: 'images' },
    ],
  },
  {
    name: 'upscaleVideoTemplate',
    template: upscaleVideoTemplate,
    expectedCategory: 'upscale-video',
    expectedOutputType: 'video',
    expectedTimeout: 600000,
    requiredFields: ['video'],
    spotChecks: [
      { universal: 'video', provider: 'fal-ai', key: 'video_url' },
      { universal: 'strength', provider: 'replicate', key: 'scale' },
    ],
  },
  {
    name: 'videoToAudioTemplate',
    template: videoToAudioTemplate,
    expectedCategory: 'video-to-audio',
    expectedOutputType: 'audio',
    expectedTimeout: 120000,
    requiredFields: ['video'],
    spotChecks: [
      { universal: 'video', provider: 'fal-ai', key: 'video_url' },
      { universal: 'video', provider: 'replicate', key: 'video' },
      { universal: 'prompt', provider: 'wavespeed', key: 'prompt' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe.each(templates)(
  '$name',
  ({
    template,
    expectedCategory,
    expectedOutputType,
    expectedTimeout,
    requiredFields,
    spotChecks,
  }) => {
    it(`category is "${expectedCategory}"`, () => {
      expect(template.category).toBe(expectedCategory)
    })

    it('input_mappings is a non-empty array', () => {
      expect(Array.isArray(template.input_mappings)).toBe(true)
      expect(template.input_mappings.length).toBeGreaterThan(0)
    })

    it(`output_type is "${expectedOutputType}"`, () => {
      expect(template.output_type).toBe(expectedOutputType)
    })

    it('output_extract has entries for all 3 providers', () => {
      expect(template.output_extract).toHaveProperty('fal-ai')
      expect(template.output_extract).toHaveProperty('replicate')
      expect(template.output_extract).toHaveProperty('wavespeed')
    })

    it(`default_timeout_ms is ${expectedTimeout}`, () => {
      expect(template.default_timeout_ms).toBe(expectedTimeout)
      expect(template.default_timeout_ms).toBeGreaterThan(0)
    })

    it('has at least one required mapping (or none if expected)', () => {
      const requiredMappings = template.input_mappings.filter(
        (m: ParamMapping) => m.required,
      )
      if (requiredFields.length > 0) {
        expect(requiredMappings.length).toBeGreaterThanOrEqual(1)
        for (const field of requiredFields) {
          const found = requiredMappings.find(
            (m: ParamMapping) => m.universal === field,
          )
          expect(found).toBeDefined()
        }
      } else {
        // moderation has no required fields — verify that is the case
        expect(requiredMappings).toHaveLength(0)
      }
    })

    it('each mapping has universal and providers', () => {
      for (const mapping of template.input_mappings) {
        expect(typeof mapping.universal).toBe('string')
        expect(mapping.universal.length).toBeGreaterThan(0)
        expect(mapping.providers).toBeDefined()
        expect(typeof mapping.providers).toBe('object')
      }
    })

    it.each(spotChecks)(
      'mapping "$universal" maps to "$key" for $provider',
      ({ universal, provider, key }) => {
        const mapping = template.input_mappings.find(
          (m: ParamMapping) => m.universal === universal,
        )
        expect(mapping).toBeDefined()
        expect(
          mapping!.providers[provider as keyof typeof mapping.providers],
        ).toEqual(key)
      },
    )
  },
)
