import { describe, it, expectTypeOf } from 'vitest'
import type { GenerateRequest, KlingOptions, ProviderOptionsFor } from '../../../src/types.js'

describe('provider-scoped type safety', () => {
  it('narrows options to KlingOptions when provider is kling', () => {
    expectTypeOf<GenerateRequest<'kling'>['options']>().toEqualTypeOf<KlingOptions | undefined>()
  })

  it('allows Record<string, unknown> for generic GenerateRequest', () => {
    expectTypeOf<GenerateRequest['options']>().toEqualTypeOf<Record<string, unknown> | undefined>()
  })

  it('resolves ProviderOptionsFor kling to KlingOptions', () => {
    expectTypeOf<ProviderOptionsFor<'kling'>>().toEqualTypeOf<KlingOptions>()
  })

  it('resolves ProviderOptionsFor fal-ai to Record<string, unknown>', () => {
    expectTypeOf<ProviderOptionsFor<'fal-ai'>>().toEqualTypeOf<Record<string, unknown>>()
  })

  it('accepts valid KlingOptions on typed request', () => {
    const req: GenerateRequest<'kling'> = {
      model: 'kling-video-v3-pro-text-to-video',
      provider: 'kling',
      prompt: 'A sunset',
      options: { sound: 'on', mode: 'pro', aspect_ratio: '16:9' },
    }
    expectTypeOf(req.options).toMatchTypeOf<KlingOptions | undefined>()
  })

  it('preserves backward compatibility — untyped GenerateRequest accepts any options', () => {
    const req: GenerateRequest = {
      model: 'some-model',
      prompt: 'hello',
      options: { any_key: 'any_value', nested: { deep: true } },
    }
    expectTypeOf(req).toMatchTypeOf<GenerateRequest>()
  })
})
