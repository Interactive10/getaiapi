import { describe, it, expect } from 'vitest'
import {
  getCategoryTemplate,
  textToImageTemplate,
  imageEditTemplate,
  textToVideoTemplate,
  imageToVideoTemplate,
  upscaleImageTemplate,
  textToAudioTemplate,
  audioToTextTemplate,
  removeBackgroundTemplate,
  textGenerationTemplate,
} from '../../src/categories/index.js'
import type { CategoryTemplate, ModelCategory } from '../../src/types.js'

const allTemplates: { name: string; template: CategoryTemplate; category: ModelCategory }[] = [
  { name: 'text-to-image', template: textToImageTemplate, category: 'text-to-image' },
  { name: 'image-edit', template: imageEditTemplate, category: 'image-edit' },
  { name: 'text-to-video', template: textToVideoTemplate, category: 'text-to-video' },
  { name: 'image-to-video', template: imageToVideoTemplate, category: 'image-to-video' },
  { name: 'upscale-image', template: upscaleImageTemplate, category: 'upscale-image' },
  { name: 'text-to-audio', template: textToAudioTemplate, category: 'text-to-audio' },
  { name: 'audio-to-text', template: audioToTextTemplate, category: 'audio-to-text' },
  { name: 'remove-background', template: removeBackgroundTemplate, category: 'remove-background' },
  { name: 'text-generation', template: textGenerationTemplate, category: 'text-generation' },
]

describe('Category Templates', () => {
  it('has exactly 9 registered templates', () => {
    const registeredCategories: ModelCategory[] = [
      'text-to-image',
      'image-edit',
      'text-to-video',
      'image-to-video',
      'upscale-image',
      'text-to-audio',
      'audio-to-text',
      'remove-background',
      'text-generation',
    ]
    for (const cat of registeredCategories) {
      expect(getCategoryTemplate(cat)).toBeDefined()
    }
    expect(registeredCategories).toHaveLength(9)
  })

  describe.each(allTemplates)('$name template', ({ template, category }) => {
    it('has correct category field', () => {
      expect(template.category).toBe(category)
    })

    it('has input_mappings array', () => {
      expect(Array.isArray(template.input_mappings)).toBe(true)
      expect(template.input_mappings.length).toBeGreaterThan(0)
    })

    it('has a valid output_type', () => {
      expect(['image', 'video', 'audio', 'text', '3d', 'segmentation']).toContain(template.output_type)
    })

    it('has output_extract with at least one provider', () => {
      expect(Object.keys(template.output_extract).length).toBeGreaterThan(0)
    })

    it('has a positive default_timeout_ms', () => {
      expect(template.default_timeout_ms).toBeGreaterThan(0)
    })

    it('has at least one required input mapping', () => {
      const requiredMappings = template.input_mappings.filter((m) => m.required)
      expect(requiredMappings.length).toBeGreaterThanOrEqual(1)
    })

    it('each mapping has universal name and providers', () => {
      for (const mapping of template.input_mappings) {
        expect(typeof mapping.universal).toBe('string')
        expect(mapping.providers).toBeDefined()
        expect(Object.keys(mapping.providers).length).toBeGreaterThan(0)
      }
    })
  })
})

describe('getCategoryTemplate', () => {
  it('returns correct template for each registered category', () => {
    for (const { template, category } of allTemplates) {
      expect(getCategoryTemplate(category)).toBe(template)
    }
  })

  it('returns undefined for unregistered categories', () => {
    expect(getCategoryTemplate('training' as ModelCategory)).toBeUndefined()
    expect(getCategoryTemplate('moderation' as ModelCategory)).toBeUndefined()
    expect(getCategoryTemplate('image-to-3d' as ModelCategory)).toBeUndefined()
  })
})

describe('Specific template validations', () => {
  it('text-to-image has prompt as required', () => {
    const prompt = textToImageTemplate.input_mappings.find((m) => m.universal === 'prompt')
    expect(prompt?.required).toBe(true)
  })

  it('image-edit has image and prompt as required', () => {
    const image = imageEditTemplate.input_mappings.find((m) => m.universal === 'image')
    const prompt = imageEditTemplate.input_mappings.find((m) => m.universal === 'prompt')
    expect(image?.required).toBe(true)
    expect(prompt?.required).toBe(true)
  })

  it('text-to-video output type is video', () => {
    expect(textToVideoTemplate.output_type).toBe('video')
  })

  it('text-to-video timeout is 5 minutes', () => {
    expect(textToVideoTemplate.default_timeout_ms).toBe(300000)
  })

  it('image-to-video timeout is 5 minutes', () => {
    expect(imageToVideoTemplate.default_timeout_ms).toBe(300000)
  })

  it('audio-to-text output type is text', () => {
    expect(audioToTextTemplate.output_type).toBe('text')
  })

  it('text-to-audio maps prompt to text for fal-ai', () => {
    const prompt = textToAudioTemplate.input_mappings.find((m) => m.universal === 'prompt')
    expect(prompt?.providers['fal-ai']).toBe('text')
  })

  it('upscale-image maps strength to scale', () => {
    const strength = upscaleImageTemplate.input_mappings.find((m) => m.universal === 'strength')
    expect(strength?.providers['fal-ai']).toBe('scale')
    expect(strength?.providers['replicate']).toBe('scale')
  })

  it('text-to-video maps count to num_videos for fal-ai', () => {
    const count = textToVideoTemplate.input_mappings.find((m) => m.universal === 'count')
    expect(count?.providers['fal-ai']).toBe('num_videos')
  })

  it('image-edit maps image to image_url for fal-ai and wavespeed', () => {
    const image = imageEditTemplate.input_mappings.find((m) => m.universal === 'image')
    expect(image?.providers['fal-ai']).toBe('image_url')
    expect(image?.providers['wavespeed']).toBe('image_url')
    expect(image?.providers['replicate']).toBe('image')
  })

  it('text-generation has prompt as required', () => {
    const prompt = textGenerationTemplate.input_mappings.find((m) => m.universal === 'prompt')
    expect(prompt?.required).toBe(true)
  })

  it('text-generation output type is text', () => {
    expect(textGenerationTemplate.output_type).toBe('text')
  })

  it('text-generation has openrouter in output_extract', () => {
    expect(textGenerationTemplate.output_extract).toHaveProperty('openrouter')
    expect(textGenerationTemplate.output_extract.openrouter).toBe('choices[0].message.content')
  })

  it('text-generation timeout is 2 minutes', () => {
    expect(textGenerationTemplate.default_timeout_ms).toBe(120000)
  })
})
