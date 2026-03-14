#!/usr/bin/env node
import { parseArgs } from 'node:util'
import { generate } from './gateway.js'
import { listModels, deriveCategory } from './discovery.js'
import { resolveModel } from './registry.js'
import type { GenerateRequest, ListModelsFilters, InputType, OutputType, ProviderName } from './types.js'

const HELP = `
getaiapi - Unified AI API Gateway CLI

Usage:
  getaiapi <command> [options]

Commands:
  generate    Generate content using an AI model
  list        List available models
  info        Show details for a specific model

Options:
  --help, -h  Show this help message

Examples:
  getaiapi generate --model flux-schnell --prompt "a cat"
  getaiapi list --input text --output image --provider fal-ai
  getaiapi list --query flux
  getaiapi info flux-schnell
`.trim()

const GENERATE_HELP = `
Usage: getaiapi generate --model <name> --prompt <text> [options]

Options:
  --model, -m     Model name (required)
  --prompt, -p    Text prompt (required)
  --provider      Preferred provider (e.g. fal-ai, replicate)
  --seed          Seed for reproducibility
  --count, -n     Number of outputs
  --size          Output size (e.g. "1024x1024")
  --guidance      Guidance scale
  --steps         Number of inference steps
  --format        Output format (png, jpeg, webp, mp4, etc.)
  --help, -h      Show this help
`.trim()

const LIST_HELP = `
Usage: getaiapi list [options]

Options:
  --input, -i    Filter by input modality (text, image, audio, video)
  --output, -o   Filter by output modality (image, video, audio, text, 3d, segmentation)
  --provider, -p Filter by provider (e.g. fal-ai)
  --query, -q    Search by name or alias
  --help, -h     Show this help
`.trim()

const INFO_HELP = `
Usage: getaiapi info <model-name>

Shows detailed information about a model including:
  - Canonical name
  - Modality (inputs/outputs)
  - Aliases
  - Available providers
`.trim()

function padRight(str: string, len: number): string {
  return str.length >= len ? str : str + ' '.repeat(len - str.length)
}

function printTable(
  headers: string[],
  rows: string[][],
): void {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => (r[i] ?? '').length)),
  )
  const sep = widths.map((w) => '-'.repeat(w)).join('  ')
  console.log(headers.map((h, i) => padRight(h, widths[i])).join('  '))
  console.log(sep)
  for (const row of rows) {
    console.log(row.map((cell, i) => padRight(cell ?? '', widths[i])).join('  '))
  }
}

async function cmdGenerate(args: string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      model: { type: 'string', short: 'm' },
      prompt: { type: 'string', short: 'p' },
      provider: { type: 'string' },
      seed: { type: 'string' },
      count: { type: 'string', short: 'n' },
      size: { type: 'string' },
      guidance: { type: 'string' },
      steps: { type: 'string' },
      format: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
    strict: true,
  })

  if (values.help) {
    console.log(GENERATE_HELP)
    return
  }

  if (!values.model) {
    console.error('Error: --model is required\n')
    console.log(GENERATE_HELP)
    process.exit(1)
  }

  if (!values.prompt) {
    console.error('Error: --prompt is required\n')
    console.log(GENERATE_HELP)
    process.exit(1)
  }

  function parseNum(name: string, value: string | undefined): number | undefined {
    if (!value) return undefined
    const n = Number(value)
    if (Number.isNaN(n)) {
      console.error(`Error: --${name} must be a number, got "${value}"\n`)
      process.exit(1)
    }
    return n
  }

  const result = await generate({
    model: values.model,
    prompt: values.prompt,
    provider: values.provider as ProviderName | undefined,
    seed: parseNum('seed', values.seed),
    count: parseNum('count', values.count),
    size: values.size ?? undefined,
    guidance: parseNum('guidance', values.guidance),
    steps: parseNum('steps', values.steps),
    format: values.format as GenerateRequest['format'],
  })

  console.log(JSON.stringify(result, null, 2))
}

function cmdList(args: string[]): void {
  const { values } = parseArgs({
    args,
    options: {
      input: { type: 'string', short: 'i' },
      output: { type: 'string', short: 'o' },
      provider: { type: 'string', short: 'p' },
      query: { type: 'string', short: 'q' },
      help: { type: 'boolean', short: 'h' },
    },
    strict: true,
  })

  if (values.help) {
    console.log(LIST_HELP)
    return
  }

  const models = listModels({
    input: values.input as InputType | undefined,
    output: values.output as OutputType | undefined,
    provider: values.provider as ProviderName | undefined,
    query: values.query ?? undefined,
  })

  if (models.length === 0) {
    console.log('No models found matching the given filters.')
    return
  }

  const rows = models.map((m) => [
    m.canonical_name,
    deriveCategory(m),
    m.providers.map((p) => p.provider).join(', '),
  ])

  printTable(['Name', 'Modality', 'Providers'], rows)
}

function cmdInfo(args: string[]): void {
  const { values, positionals } = parseArgs({
    args,
    options: {
      help: { type: 'boolean', short: 'h' },
    },
    allowPositionals: true,
    strict: true,
  })

  if (values.help) {
    console.log(INFO_HELP)
    return
  }

  const name = positionals[0]
  if (!name) {
    console.error('Error: model name is required\n')
    console.log(INFO_HELP)
    process.exit(1)
  }

  const model = resolveModel(name)

  console.log(`Name:       ${model.canonical_name}`)
  console.log(`Modality:   ${deriveCategory(model)}`)
  console.log(`Inputs:     ${model.modality.inputs.join(', ')}`)
  console.log(`Outputs:    ${model.modality.outputs.join(', ')}`)
  console.log(`Aliases:    ${model.aliases.length > 0 ? model.aliases.join(', ') : '(none)'}`)
  console.log(`Providers:  ${model.providers.map((p) => p.provider).join(', ')}`)
  console.log()
  console.log('Provider details:')
  for (const p of model.providers) {
    console.log(`  ${p.provider}`)
    console.log(`    Skill:    ${p.skill_id}`)
    console.log(`    Endpoint: ${p.endpoint}`)
    console.log(`    Auth env: ${p.auth_env}`)
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(HELP)
    return
  }

  const command = args[0]
  const rest = args.slice(1)

  switch (command) {
    case 'generate':
      await cmdGenerate(rest)
      break
    case 'list':
      cmdList(rest)
      break
    case 'info':
      cmdInfo(rest)
      break
    default:
      console.error(`Unknown command: ${command}\n`)
      console.log(HELP)
      process.exit(1)
  }
}

main().catch((err: Error) => {
  console.error(`Error: ${err.message}`)
  process.exit(1)
})
