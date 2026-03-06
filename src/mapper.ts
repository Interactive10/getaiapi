import type {
  GenerateRequest,
  ProviderBinding,
  CategoryTemplate,
  ParamMapping,
  OutputItem,
  OutputMapping,
  ProviderName,
} from './types.js'
import { ValidationError } from './errors.js'

/**
 * Maps a universal GenerateRequest to provider-specific params
 * using the category template's input_mappings.
 */
export function mapInput(
  request: GenerateRequest,
  binding: ProviderBinding,
  template: CategoryTemplate,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const provider = binding.provider

  for (const mapping of template.input_mappings) {
    const value = getUniversalValue(request, mapping.universal)

    if (value === undefined || value === null) {
      if (mapping.required) {
        throw new ValidationError(
          mapping.universal,
          `"${mapping.universal}" is required but was not provided.`,
        )
      }
      continue
    }

    const providerKey = mapping.providers[provider]
    if (providerKey === undefined) {
      // Provider doesn't support this param — silently drop
      continue
    }

    const transformed = applyTransform(value, mapping, provider)

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

  // Merge options passthrough — options wins on conflict
  if (request.options) {
    for (const [key, val] of Object.entries(request.options)) {
      result[key] = val
    }
  }

  return result
}

/**
 * Extracts a universal field value from the GenerateRequest.
 */
function getUniversalValue(request: GenerateRequest, field: string): unknown {
  return (request as unknown as Record<string, unknown>)[field]
}

/**
 * Applies the specified transform to the value.
 */
function applyTransform(
  value: unknown,
  mapping: ParamMapping,
  provider: ProviderName,
): unknown {
  const transform = mapping.transform

  if (!transform || transform === 'none') {
    return value
  }

  if (transform === 'flip_boolean') {
    if (provider === 'replicate') {
      return !value
    }
    return value
  }

  if (transform === 'parse_size') {
    return parseSizeForProvider(value, mapping, provider)
  }

  return value
}

/**
 * Converts a size value to the provider-specific format.
 */
function parseSizeForProvider(
  value: unknown,
  mapping: ParamMapping,
  provider: ProviderName,
): unknown {
  if (provider === 'fal-ai') {
    if (typeof value === 'string') {
      const [w, h] = value.split('x').map(Number)
      return { width: w, height: h }
    }
    // Object passthrough
    return value
  }

  if (provider === 'replicate') {
    if (typeof value === 'string') {
      const [w, h] = value.split('x').map(Number)
      return { width: w, height: h }
    }
    if (typeof value === 'object' && value !== null) {
      return value
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
    return images.map((img: any) => ({
      type,
      url: img.url as string,
      content_type: (img.content_type as string) || defaultContentType,
    }))
  }

  if (extract_path === 'output[]') {
    const arr: unknown[] = Array.isArray(data) ? data : data?.output ?? []
    return arr.map((url: unknown) => ({
      type,
      url: url as string,
      content_type: defaultContentType,
    }))
  }

  if (extract_path === 'data.outputs[]') {
    const outputs: unknown[] = data?.data?.outputs ?? []
    return outputs.map((url: unknown) => ({
      type,
      url: url as string,
      content_type: defaultContentType,
    }))
  }

  if (extract_path === 'video.url') {
    return [{
      type: 'video',
      url: data?.video?.url as string,
      content_type: 'video/mp4',
    }]
  }

  if (extract_path === 'audio.url') {
    return [{
      type: 'audio',
      url: data?.audio?.url as string,
      content_type: 'audio/mpeg',
    }]
  }

  // Generic dot-notation traversal for unknown paths
  return genericExtract(data, extract_path, type, defaultContentType)
}

/**
 * Generic dot-notation traversal for unknown extract paths.
 * Supports paths like "foo.bar[].baz".
 */
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

    const arrayMatch = seg.match(/^(.+)\[\]$/)
    if (arrayMatch) {
      const key = arrayMatch[1]
      current = (current as Record<string, unknown>)[key]
      if (Array.isArray(current)) {
        // If there are more segments after this, we'd need to map deeper
        // For now, treat as final array
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

  // Single value at end of path
  if (typeof current === 'string') {
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
