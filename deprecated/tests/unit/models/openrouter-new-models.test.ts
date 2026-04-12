import { describe, it, expect } from 'vitest'
import { mapInput, mapOutput } from '../../../src/mapper.js'
import type { ProviderBinding, GenerateRequest } from '../../../src/types.js'

/**
 * Tests for the 14 new OpenRouter text-generation models added in the
 * [Unreleased] batch. All share the same param_map / output_map structure,
 * so we use describe.each to cover every model without duplication.
 */

const NEW_MODELS: Array<{
  canonical: string
  endpoint: string
}> = [
  // Flagship
  { canonical: 'gpt-5.4-pro', endpoint: 'openai/gpt-5.4-pro' },
  { canonical: 'gpt-5.4', endpoint: 'openai/gpt-5.4' },
  { canonical: 'gpt-5.4-mini', endpoint: 'openai/gpt-5.4-mini' },
  { canonical: 'gemini-3.1-pro', endpoint: 'google/gemini-3.1-pro-preview' },
  { canonical: 'grok-4.20', endpoint: 'x-ai/grok-4.20-beta' },
  { canonical: 'palmyra-x5', endpoint: 'writer/palmyra-x5' },
  // Notable
  { canonical: 'gpt-5.4-nano', endpoint: 'openai/gpt-5.4-nano' },
  { canonical: 'mimo-v2-pro', endpoint: 'xiaomi/mimo-v2-pro' },
  { canonical: 'mimo-v2-omni', endpoint: 'xiaomi/mimo-v2-omni' },
  { canonical: 'mistral-small-4', endpoint: 'mistralai/mistral-small-2603' },
  { canonical: 'minimax-m2.7', endpoint: 'minimax/minimax-m2.7' },
  { canonical: 'nemotron-3-super', endpoint: 'nvidia/nemotron-3-super-120b-a12b' },
  { canonical: 'qwen-3.5-72b', endpoint: 'qwen/qwen3.5-9b' },
  { canonical: 'glm-5-turbo', endpoint: 'z-ai/glm-5-turbo' },
]

function makeBinding(model: (typeof NEW_MODELS)[number]): ProviderBinding {
  return {
    provider: 'openrouter',
    skill_id: `openrouter-${model.canonical}`,
    endpoint: model.endpoint,
    auth_env: 'OPENROUTER_API_KEY',
    param_map: {
      prompt: 'prompt',
    },
    output_map: {
      type: 'text',
      extract_path: 'choices[0].message.content',
      content_type: 'text/plain',
    },
  }
}

describe.each(NEW_MODELS)('$canonical (openrouter)', (model) => {
  const binding = makeBinding(model)

  it('maps prompt param', () => {
    const request = {
      model: model.canonical,
      prompt: 'Hello, world!',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, binding)

    expect(mapped).toEqual({ prompt: 'Hello, world!' })
  })

  it('ignores params not in param_map', () => {
    const request = {
      model: model.canonical,
      prompt: 'test',
      temperature: 0.7,
      max_tokens: 256,
      seed: 42,
      negative_prompt: 'bad',
    } as unknown as GenerateRequest

    const mapped = mapInput(request, binding)

    // Only prompt is in param_map — the rest should be dropped
    expect(mapped).toEqual({ prompt: 'test' })
  })

  it('omits prompt when undefined', () => {
    const request = {
      model: model.canonical,
    } as unknown as GenerateRequest

    const mapped = mapInput(request, binding)

    expect(mapped).toEqual({})
  })

  it('extracts text from choices[0].message.content', () => {
    const raw = {
      id: 'gen-test-123',
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content: 'The answer is 42.' },
          finish_reason: 'stop',
        },
      ],
      model: model.endpoint,
      usage: { prompt_tokens: 5, completion_tokens: 6, total_tokens: 11 },
    }

    const items = mapOutput(raw, binding.output_map)

    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      type: 'text',
      content: 'The answer is 42.',
      content_type: 'text/plain',
    })
  })

  it('returns empty array when choices is missing', () => {
    const items = mapOutput({}, binding.output_map)
    expect(items).toEqual([])
  })

  it('returns empty array when choices is empty', () => {
    const items = mapOutput({ choices: [] }, binding.output_map)
    expect(items).toEqual([])
  })

  it('binding has correct skill_id and endpoint', () => {
    expect(binding.skill_id).toBe(`openrouter-${model.canonical}`)
    expect(binding.endpoint).toBe(model.endpoint)
    expect(binding.auth_env).toBe('OPENROUTER_API_KEY')
  })
})
