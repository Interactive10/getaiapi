import { randomUUID } from 'crypto'
import { resolveModel } from './registry.js'
import { mapInput, mapOutput } from './mapper.js'
import { AuthManager } from './auth.js'
import { falAiAdapter } from './adapters/fal-ai.js'
import { replicateAdapter } from './adapters/replicate.js'
import { wavespeedAdapter } from './adapters/wavespeed.js'
import { openRouterAdapter } from './adapters/openrouter.js'
import type {
  GenerateRequest, GenerateResponse, ProviderName, ProviderAdapter,
  ProviderBinding, SubmitResponse, PollResponse,
} from './types.js'
import { ValidationError, ProviderError, TimeoutError } from './errors.js'
import { withRetry } from './retry.js'
import { processParamsForUpload } from './storage.js'

const adapters: Record<string, ProviderAdapter> = {
  'fal-ai': falAiAdapter,
  'replicate': replicateAdapter,
  'wavespeed': wavespeedAdapter,
  'openrouter': openRouterAdapter,
}

const DEFAULT_TIMEOUT_MS = 120000

interface PrepareResult {
  binding: ProviderBinding
  adapter: ProviderAdapter
  apiKey: string
  finalParams: Record<string, unknown>
  model: ReturnType<typeof resolveModel>
}

async function _prepare(request: GenerateRequest): Promise<PrepareResult> {
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

  return { binding, adapter, apiKey, finalParams, model }
}

export async function submit(request: GenerateRequest): Promise<SubmitResponse> {
  const { binding, adapter, apiKey, finalParams, model } = await _prepare(request)

  const timeoutMs = (request.options?.timeout as number | undefined) ?? DEFAULT_TIMEOUT_MS
  const submitted = await withRetry(
    () => adapter.submit(binding.endpoint, finalParams, apiKey),
    { timeoutMs, provider: binding.provider, model: model.canonical_name },
  )

  return {
    id: submitted.id,
    model: model.canonical_name,
    provider: binding.provider,
    endpoint: binding.endpoint,
    status: submitted.status === 'completed' ? 'completed' : submitted.status as 'pending' | 'processing',
  }
}

export async function poll(job: SubmitResponse): Promise<PollResponse> {
  const adapter = adapters[job.provider]
  if (!adapter) {
    throw new ValidationError('provider', `Unknown provider "${job.provider}"`)
  }

  const auth = new AuthManager()
  const apiKey = auth.getKey(job.provider as any)

  const result = await adapter.poll(job.id, apiKey, job.endpoint)

  if (result.status === 'completed') {
    const model = resolveModel(job.model, auth.availableProviders() as ProviderName[])
    const binding = model.providers.find(p => p.provider === job.provider)
    if (!binding) {
      throw new ProviderError(job.provider, job.model, 0, 'Could not resolve provider binding for output mapping')
    }
    const outputs = mapOutput(result.output, binding.output_map)

    const rawOutput = typeof result.output === 'object' && result.output !== null
      ? result.output as Record<string, unknown>
      : undefined

    const metadata: GenerateResponse['metadata'] = {
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
      id: job.id,
      model: job.model,
      provider: job.provider,
      status: 'completed',
      outputs,
      metadata,
    }
  }

  if (result.status === 'failed') {
    return {
      id: job.id,
      model: job.model,
      provider: job.provider,
      status: 'failed',
      error: result.error || 'Generation failed',
    }
  }

  return {
    id: job.id,
    model: job.model,
    provider: job.provider,
    status: result.status,
  }
}

export async function submitAndPoll(request: GenerateRequest): Promise<GenerateResponse> {
  return generate(request)
}

export async function generate(request: GenerateRequest): Promise<GenerateResponse> {
  const startTime = Date.now()
  const { binding, adapter, apiKey, finalParams, model } = await _prepare(request)

  // 8. Submit with retry, then poll
  const timeoutMs = (request.options?.timeout as number | undefined) ?? DEFAULT_TIMEOUT_MS
  const submitted = await withRetry(
    () => adapter.submit(binding.endpoint, finalParams, apiKey),
    { timeoutMs, provider: binding.provider, model: model.canonical_name },
  )

  let result = submitted
  let pollInterval = 1000
  const maxPollInterval = 5000
  const pollStart = Date.now()
  while (result.status === 'processing' || result.status === 'pending') {
    if (Date.now() - pollStart >= timeoutMs) {
      throw new TimeoutError(binding.provider, model.canonical_name, timeoutMs)
    }
    await new Promise(resolve => setTimeout(resolve, pollInterval))
    pollInterval = Math.min(pollInterval + 500, maxPollInterval)
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
