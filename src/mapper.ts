import type {
  GenerateRequest,
  ProviderBinding,
  OutputMapping,
  OutputItem,
  ProviderName,
} from './types.js'

/**
 * Maps a universal GenerateRequest to provider-specific params
 * using the binding's own param_map. No template lookup needed.
 */
export function mapInput(
  request: GenerateRequest,
  binding: ProviderBinding,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const provider = binding.provider

  for (const [universal, providerKey] of Object.entries(binding.param_map)) {
    const value = (request as unknown as Record<string, unknown>)[universal]
    if (value === undefined || value === null) continue

    const transformed = applyTransform(universal, value, provider)

    if (Array.isArray(providerKey)) {
      // Spread into multiple params (e.g., Replicate's ["width", "height"])
      if (typeof transformed === 'object' && transformed !== null && !Array.isArray(transformed)) {
        const obj = transformed as Record<string, unknown>
        for (const key of providerKey) {
          if (obj[key] !== undefined) {
            result[key] = obj[key]
          }
        }
      }
    } else {
      result[providerKey] = transformed
    }
  }

  // Merge options passthrough — skip internal keys
  const INTERNAL_KEYS = new Set(['timeout', 'reupload'])
  if (request.options) {
    for (const [key, val] of Object.entries(request.options)) {
      if (!INTERNAL_KEYS.has(key)) {
        result[key] = val
      }
    }
  }

  return result
}

/**
 * Applies transform based on the universal key name and provider.
 * Transforms are deterministic — no need to store them in the registry.
 */
function applyTransform(
  universal: string,
  value: unknown,
  provider: ProviderName,
): unknown {
  if (universal === 'safety') {
    // Replicate uses inverted boolean (disable_safety_checker)
    if (provider === 'replicate') return !value
    return value
  }

  if (universal === 'size') {
    return parseSizeForProvider(value, provider)
  }

  return value
}

/**
 * Converts a size value to the provider-specific format.
 */
function parseSizeForProvider(value: unknown, provider: ProviderName): unknown {
  if (provider === 'fal-ai' || provider === 'replicate') {
    if (typeof value === 'string') {
      const [w, h] = value.split('x').map(Number)
      return { width: w, height: h }
    }
    return value
  }
  // wavespeed and others: pass through as-is
  return value
}

/**
 * Maps raw provider response to OutputItem[] using the output mapping.
 */
export function mapOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
  const { type, extract_path, content_type } = outputMapping
  const defaultContentType = content_type || 'image/jpeg'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = raw as any

  if (extract_path === 'images[].url') {
    const images: unknown[] = data?.images ?? []
    return images
      .filter((img: any) => img?.url)
      .map((img: any) => ({
        type,
        url: img.url as string,
        content_type: (img.content_type as string) || defaultContentType,
      }))
  }

  if (extract_path === 'output[]') {
    const arr: unknown[] = Array.isArray(data) ? data : data?.output ?? []
    return arr
      .filter((url: unknown) => typeof url === 'string' && url)
      .map((url: unknown) => ({
        type,
        url: url as string,
        content_type: defaultContentType,
      }))
  }

  if (extract_path === 'data.outputs[]') {
    const outputs: unknown[] = data?.data?.outputs ?? []
    return outputs
      .filter((url: unknown) => typeof url === 'string' && url)
      .map((url: unknown) => ({
        type,
        url: url as string,
        content_type: defaultContentType,
      }))
  }

  if (extract_path === 'video.url') {
    const videoUrl = data?.video?.url
    if (!videoUrl) return []
    return [{
      type: 'video',
      url: videoUrl as string,
      content_type: 'video/mp4',
    }]
  }

  if (extract_path === 'audio.url') {
    const audioUrl = data?.audio?.url
    if (!audioUrl) return []
    return [{
      type: 'audio',
      url: audioUrl as string,
      content_type: 'audio/mpeg',
    }]
  }

  // Generic dot-notation traversal for unknown paths
  return genericExtract(data, extract_path, type, defaultContentType)
}

function genericExtract(
  data: unknown,
  path: string,
  type: OutputMapping['type'],
  contentType: string,
): OutputItem[] {
  const segments = path.split('.')
  let current: unknown = data

  for (const seg of segments) {
    if (current === null || current === undefined) return []

    const indexMatch = seg.match(/^(.+)\[(\d+)\]$/)
    if (indexMatch) {
      const key = indexMatch[1]
      const index = parseInt(indexMatch[2], 10)
      const arr = (current as Record<string, unknown>)[key]
      if (!Array.isArray(arr) || index >= arr.length) return []
      current = arr[index]
      continue
    }

    const arrayMatch = seg.match(/^(.+)\[\]$/)
    if (arrayMatch) {
      const key = arrayMatch[1]
      current = (current as Record<string, unknown>)[key]
      if (Array.isArray(current)) {
        const remaining = segments.slice(segments.indexOf(seg) + 1).join('.')
        if (remaining) {
          return (current as unknown[]).map((item: any) => ({
            type,
            url: getNestedValue(item, remaining) as string,
            content_type: contentType,
          }))
        }
        return (current as unknown[]).map((item: unknown) => ({
          type,
          url: (typeof item === 'string' ? item : (item as any)?.url) as string,
          content_type: contentType,
        }))
      }
      return []
    }

    current = (current as Record<string, unknown>)[seg]
  }

  if (typeof current === 'string') {
    if (type === 'text') {
      return [{ type, content: current, content_type: contentType }]
    }
    return [{ type, url: current, content_type: contentType }]
  }

  return []
}

function getNestedValue(obj: unknown, path: string): unknown {
  let current = obj
  for (const key of path.split('.')) {
    if (current === null || current === undefined) return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}
