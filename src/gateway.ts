import { randomUUID } from 'crypto'
import { AuthManager } from './auth.js'
import { resolveModel } from './resolver.js'
import { mapInput, mapOutput } from './mapper.js'
import { getCategoryTemplate } from './categories/index.js'
import { falAiAdapter } from './adapters/fal-ai.js'
import { replicateAdapter } from './adapters/replicate.js'
import { wavespeedAdapter } from './adapters/wavespeed.js'
import type { GenerateRequest, GenerateResponse, ProviderAdapter, ProviderName } from './types.js'
import { ValidationError, ProviderError } from './errors.js'
import { withRetry } from './retry.js'
import { processParamsForUpload } from './storage.js'

// Adapter registry
const adapters: Record<string, ProviderAdapter> = {
  'fal-ai': falAiAdapter,
  'replicate': replicateAdapter,
  'wavespeed': wavespeedAdapter,
}

export async function generate(request: GenerateRequest): Promise<GenerateResponse> {
  const startTime = Date.now()

  // 1. Validate request
  if (!request.model) throw new ValidationError('model', 'model is required')

  // 2. Auth - check available providers
  const auth = new AuthManager()

  // 3. Resolve model
  const model = resolveModel(request.model, auth.availableProviders())

  // 4. Pick provider (first available)
  const availableBindings = model.providers.filter(p =>
    auth.availableProviders().includes(p.provider) && adapters[p.provider]
  )
  if (availableBindings.length === 0) {
    throw new ValidationError(
      'model',
      `No adapter available for model "${model.canonical_name}". Available providers: ${model.providers.map(p => p.provider).join(', ')}`,
    )
  }
  const binding = availableBindings[0]

  // 5. Get category template
  const template = getCategoryTemplate(model.category)
  if (!template) {
    throw new ValidationError('model', `No category template for "${model.category}" yet`)
  }

  // 6. Map input
  const providerParams = mapInput(request, binding, template)

  // 6.5 Upload binary params to R2 (no-op if storage not configured)
  const finalParams = await processParamsForUpload(providerParams, {
    reupload: request.options?.reupload as boolean | undefined,
  })

  // 7. Get adapter and auth key
  const adapter = adapters[binding.provider]
  const apiKey = auth.getKey(binding.provider)

  // 8. Submit with retry, then poll
  const timeoutMs = (request.options?.timeout as number | undefined) ?? template.default_timeout_ms
  const submitted = await withRetry(
    () => adapter.submit(binding.endpoint, finalParams, apiKey),
    { timeoutMs },
  )

  let result = submitted
  while (result.status === 'processing' || result.status === 'pending') {
    await new Promise(resolve => setTimeout(resolve, 1000))
    result = await adapter.poll(submitted.id, apiKey, binding.endpoint)
  }

  if (result.status === 'failed') {
    throw new ProviderError(
      binding.provider,
      model.canonical_name,
      0,
      result.error || 'Generation failed',
    )
  }

  // 9. Map output
  const outputs = mapOutput(result.output, binding.output_map)

  // 10. Build response
  return {
    id: randomUUID(),
    model: model.canonical_name,
    provider: binding.provider,
    status: 'completed',
    outputs,
    metadata: {
      inference_time_ms: Date.now() - startTime,
      seed: typeof result.output === 'object' && result.output !== null
        ? (result.output as Record<string, unknown>).seed as number | undefined
        : undefined,
      safety_flagged: typeof result.output === 'object' && result.output !== null
        ? (
            Array.isArray((result.output as Record<string, unknown>).has_nsfw_concepts)
              ? ((result.output as Record<string, unknown>).has_nsfw_concepts as boolean[]).some((v: boolean) => v)
              : undefined
          )
        : undefined,
    },
  }
}
