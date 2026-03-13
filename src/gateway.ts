import { randomUUID } from 'crypto'
import { resolveModel } from './registry.js'
import { mapInput, mapOutput } from './mapper.js'
import { AuthManager } from './auth.js'
import { falAiAdapter } from './adapters/fal-ai.js'
import { replicateAdapter } from './adapters/replicate.js'
import { wavespeedAdapter } from './adapters/wavespeed.js'
import { openRouterAdapter } from './adapters/openrouter.js'
import type { GenerateRequest, GenerateResponse, ProviderName, ProviderAdapter } from './types.js'
import { ValidationError, ProviderError } from './errors.js'
import { withRetry } from './retry.js'
import { processParamsForUpload } from './storage.js'

const adapters: Record<string, ProviderAdapter> = {
  'fal-ai': falAiAdapter,
  'replicate': replicateAdapter,
  'wavespeed': wavespeedAdapter,
  'openrouter': openRouterAdapter,
}

const DEFAULT_TIMEOUT_MS = 120000

export async function generate(request: GenerateRequest): Promise<GenerateResponse> {
  const startTime = Date.now()

  // 1. Validate
  if (!request.model) throw new ValidationError('model', 'model is required')

  // 2. Auth
  const auth = new AuthManager()

  // 3. Resolve model
  const model = resolveModel(request.model, auth.availableProviders() as ProviderName[])

  // 4. Pick provider
  let availableBindings = model.providers.filter(p =>
    auth.availableProviders().includes(p.provider) && adapters[p.provider],
  )

  // If caller requested a specific provider, filter to it
  if (request.provider) {
    availableBindings = availableBindings.filter(p => p.provider === request.provider)
    if (availableBindings.length === 0) {
      throw new ValidationError(
        'provider',
        `Provider "${request.provider}" is not available for model "${model.canonical_name}". Available: ${model.providers.map(p => p.provider).join(', ')}`,
      )
    }
  }

  if (availableBindings.length === 0) {
    throw new ValidationError(
      'model',
      `No adapter available for model "${model.canonical_name}". Available providers: ${model.providers.map(p => p.provider).join(', ')}`,
    )
  }
  const binding = availableBindings[0]

  // 5. Map input — uses binding.param_map directly, no template lookup
  const providerParams = mapInput(request, binding)

  // 6. Upload binary params to R2 (no-op if storage not configured)
  const finalParams = await processParamsForUpload(providerParams, {
    reupload: request.options?.reupload as boolean | undefined,
  })

  // 7. Get adapter and auth key
  const adapter = adapters[binding.provider]
  const apiKey = auth.getKey(binding.provider as any)

  // 8. Submit with retry, then poll
  const timeoutMs = (request.options?.timeout as number | undefined) ?? DEFAULT_TIMEOUT_MS
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
  const rawOutput = typeof result.output === 'object' && result.output !== null
    ? result.output as Record<string, unknown>
    : undefined

  const metadata: GenerateResponse['metadata'] = {
    inference_time_ms: Date.now() - startTime,
    seed: rawOutput?.seed as number | undefined,
    safety_flagged: rawOutput
      ? (
          Array.isArray(rawOutput.has_nsfw_concepts)
            ? (rawOutput.has_nsfw_concepts as boolean[]).some((v: boolean) => v)
            : undefined
        )
      : undefined,
  }

  if (rawOutput?.usage) {
    const usage = rawOutput.usage as Record<string, number>
    metadata.tokens = usage.total_tokens
    metadata.prompt_tokens = usage.prompt_tokens
    metadata.completion_tokens = usage.completion_tokens
  }

  return {
    id: randomUUID(),
    model: model.canonical_name,
    provider: binding.provider,
    status: 'completed',
    outputs,
    metadata,
  }
}
