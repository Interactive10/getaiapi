#!/usr/bin/env npx tsx
/**
 * Kling AI Skill Scraper — Generate SKILL.md files from Kling API documentation.
 *
 * Phase 1: Fetches all Kling API doc pages via Playwright (SPA requires headless browser).
 * Phase 2: Parses the fetched .txt files and generates one SKILL.md per API endpoint.
 *
 * Usage:
 *   npx tsx kiani/tools/kling-skill-scraper.ts                    # full run
 *   npx tsx kiani/tools/kling-skill-scraper.ts --dry-run           # preview without writing
 *   npx tsx kiani/tools/kling-skill-scraper.ts --skip-fetch        # skip Playwright, use cached docs
 *   npx tsx kiani/tools/kling-skill-scraper.ts --filter video      # only endpoints matching keyword
 *   npx tsx kiani/tools/kling-skill-scraper.ts --output-dir ./out  # custom output dir
 */

import { chromium } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL = 'https://kling.ai/document-api'
const API_DOMAIN = 'https://api-singapore.klingai.com'
const DOCS_DIR = path.join(process.cwd(), '.kling-docs')
const DEFAULT_OUTPUT_DIR = './kiani/skills/kling'

// All doc page slugs (URL-encoded path segments)
const DOC_PAGES = [
  'quickStart%2FproductIntroduction%2Foverview',
  'quickStart%2FuserManual',
  'apiReference%2FupdateNotice',
  'apiReference%2FcommonInfo',
  'apiReference%2FrateLimits',
  'apiReference%2FcallbackProtocol',
  'apiReference%2Fmodel%2FvideoModels',
  'apiReference%2Fmodel%2FOmniVideo',
  'apiReference%2Fmodel%2FtextToVideo',
  'apiReference%2Fmodel%2FimageToVideo',
  'apiReference%2Fmodel%2FmultiImageToVideo',
  'apiReference%2Fmodel%2FmotionControl',
  'apiReference%2Fmodel%2FmultiElements',
  'apiReference%2Fmodel%2FvideoExtension',
  'apiReference%2Fmodel%2FlipSync',
  'apiReference%2Fmodel%2Favatar',
  'apiReference%2Fmodel%2FtextToAudio',
  'apiReference%2Fmodel%2FvideoToAudio',
  'apiReference%2Fmodel%2FTTS',
  'apiReference%2Fmodel%2FcustomVoices',
  'apiReference%2Fmodel%2FimageRecognize',
  'apiReference%2Fmodel%2Felement',
  'quickStart%2FproductIntroduction%2FeffectsCenter',
  'apiReference%2Fmodel%2FvideoEffects',
  'apiReference%2Fmodel%2FimageModels',
  'apiReference%2Fmodel%2FOmniImage',
  'apiReference%2Fmodel%2FimageGeneration',
  'apiReference%2Fmodel%2FmultiImageToImage',
  'apiReference%2Fmodel%2FimageExpansion',
  'apiReference%2Fmodel%2FaiMultiShot',
  'apiReference%2Fmodel%2FvirtualTryOn',
  'apiReference%2FaccountInfoInquiry',
  'productBilling%2FbillingMethod',
  'productBilling%2FprePaidResourcePackage',
]

// ---------------------------------------------------------------------------
// Endpoint definitions — each becomes a SKILL.md
// ---------------------------------------------------------------------------

interface EndpointDef {
  /** Skill directory name, e.g. "kling-text-to-video" */
  skillId: string
  /** Human title */
  title: string
  /** Short description for frontmatter */
  description: string
  /** POST endpoint for task creation */
  createEndpoint: string
  /** GET endpoint for task query */
  queryEndpoint: string
  /** Source doc page slug (for reference link) */
  docSlug: string
  /** Which .txt file(s) to parse for this endpoint */
  docFiles: string[]
  /** Modality inputs */
  inputs: string[]
  /** Modality outputs */
  outputs: string[]
  /** Default model_name */
  defaultModel: string
  /** Available model_name values */
  models: string[]
  /** Output result key: "videos", "images", etc. */
  resultKey: string
}

const ENDPOINTS: EndpointDef[] = [
  {
    skillId: 'kling-text-to-video',
    title: 'Kling Text to Video',
    description: 'Generate videos from text prompts using the Kling AI API. Supports multiple model versions (v1 through v3), standard/pro modes, multi-shot storyboards, camera control, sound generation, and variable duration (3-15s).',
    createEndpoint: '/v1/videos/text2video',
    queryEndpoint: '/v1/videos/text2video/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FtextToVideo',
    docFiles: ['apiReference_model_textToVideo.txt'],
    inputs: ['text'],
    outputs: ['video'],
    defaultModel: 'kling-v2-6',
    models: ['kling-v1', 'kling-v1-6', 'kling-v2-master', 'kling-v2-1-master', 'kling-v2-5-turbo', 'kling-v2-6', 'kling-v3'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-image-to-video',
    title: 'Kling Image to Video',
    description: 'Generate videos from images using the Kling AI API. Supports start/end frames, multiple model versions, standard/pro modes, camera control, sound generation, and variable duration (3-15s).',
    createEndpoint: '/v1/videos/image2video',
    queryEndpoint: '/v1/videos/image2video/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FimageToVideo',
    docFiles: ['apiReference_model_imageToVideo.txt'],
    inputs: ['image', 'text'],
    outputs: ['video'],
    defaultModel: 'kling-v2-6',
    models: ['kling-v1', 'kling-v1-5', 'kling-v1-6', 'kling-v2-master', 'kling-v2-1', 'kling-v2-1-master', 'kling-v2-5-turbo', 'kling-v2-6', 'kling-v3'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-video-omni',
    title: 'Kling Video Omni',
    description: 'Unified video generation endpoint using the Kling Omni model. Supports text-to-video, image-to-video, elements, multi-shot, and voice control through a single API with prompt-based element references.',
    createEndpoint: '/v1/videos/text2video',
    queryEndpoint: '/v1/videos/text2video/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FOmniVideo',
    docFiles: ['apiReference_model_OmniVideo.txt'],
    inputs: ['text', 'image'],
    outputs: ['video'],
    defaultModel: 'kling-v3-omni',
    models: ['kling-v3-omni', 'kling-video-o1'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-reference-to-video',
    title: 'Kling Reference to Video',
    description: 'Generate videos using multiple reference images with the Kling AI API. Supports character consistency across frames using face/subject references and multi-image elements.',
    createEndpoint: '/v1/videos/image2video',
    queryEndpoint: '/v1/videos/image2video/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FmultiImageToVideo',
    docFiles: ['apiReference_model_multiImageToVideo.txt'],
    inputs: ['image', 'text'],
    outputs: ['video'],
    defaultModel: 'kling-v1-6',
    models: ['kling-v1-6', 'kling-v3'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-motion-control',
    title: 'Kling Motion Control',
    description: 'Generate videos with motion brush control using the Kling AI API. Paint motion trajectories on specific regions of an image to control object movement in the generated video.',
    createEndpoint: '/v1/videos/image2video',
    queryEndpoint: '/v1/videos/image2video/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FmotionControl',
    docFiles: ['apiReference_model_motionControl.txt'],
    inputs: ['image', 'text'],
    outputs: ['video'],
    defaultModel: 'kling-v2-6',
    models: ['kling-v1', 'kling-v1-5', 'kling-v2-6', 'kling-v3'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-multi-elements-video',
    title: 'Kling Multi-Elements to Video',
    description: 'Generate videos with multiple character/element control using the Kling AI API. Reference specific characters or objects in generation using element IDs and image references.',
    createEndpoint: '/v1/videos/image2video',
    queryEndpoint: '/v1/videos/image2video/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FmultiElements',
    docFiles: ['apiReference_model_multiElements.txt'],
    inputs: ['image', 'text'],
    outputs: ['video'],
    defaultModel: 'kling-v1-6',
    models: ['kling-v1-6', 'kling-v3'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-extend-video',
    title: 'Kling Extend Video',
    description: 'Extend existing videos using the Kling AI API. Continue a generated video by appending additional frames with optional prompt guidance.',
    createEndpoint: '/v1/videos/video-extend',
    queryEndpoint: '/v1/videos/video-extend/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FvideoExtension',
    docFiles: ['apiReference_model_videoExtension.txt'],
    inputs: ['video', 'text'],
    outputs: ['video'],
    defaultModel: 'kling-v1',
    models: ['kling-v1', 'kling-v1-5', 'kling-v1-6', 'kling-v2-5-turbo'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-lip-sync',
    title: 'Kling Lip Sync',
    description: 'Synchronize lip movements in videos with audio or text using the Kling AI API. Supports both text-driven and audio-driven lip sync on existing videos.',
    createEndpoint: '/v1/videos/lip-sync',
    queryEndpoint: '/v1/videos/lip-sync/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FlipSync',
    docFiles: ['apiReference_model_lipSync.txt'],
    inputs: ['video', 'text', 'audio'],
    outputs: ['video'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-avatar',
    title: 'Kling Avatar',
    description: 'Generate digital human broadcast-style videos from a single photo using the Kling AI API. Supports text-driven and audio-driven modes with customizable avatar settings.',
    createEndpoint: '/v1/videos/avatar',
    queryEndpoint: '/v1/videos/avatar/{task_id}',
    docSlug: 'apiReference%2Fmodel%2Favatar',
    docFiles: ['apiReference_model_avatar.txt'],
    inputs: ['image', 'text', 'audio'],
    outputs: ['video'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'videos',
  },
  {
    skillId: 'kling-text-to-audio',
    title: 'Kling Text to Audio',
    description: 'Generate audio/sound effects from text descriptions using the Kling AI API. Create background music, ambient sounds, and sound effects from text prompts.',
    createEndpoint: '/v1/audios/generation',
    queryEndpoint: '/v1/audios/generation/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FtextToAudio',
    docFiles: ['apiReference_model_textToAudio.txt'],
    inputs: ['text'],
    outputs: ['audio'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'audios',
  },
  {
    skillId: 'kling-video-to-audio',
    title: 'Kling Video to Audio',
    description: 'Generate audio for existing videos using the Kling AI API. Add matching soundtracks, sound effects, or ambient audio to videos.',
    createEndpoint: '/v1/audios/video2audio',
    queryEndpoint: '/v1/audios/video2audio/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FvideoToAudio',
    docFiles: ['apiReference_model_videoToAudio.txt'],
    inputs: ['video', 'text'],
    outputs: ['audio'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'audios',
  },
  {
    skillId: 'kling-tts',
    title: 'Kling Text to Speech',
    description: 'Convert text to speech using the Kling AI API. Supports multiple languages and voice styles with customizable speech parameters.',
    createEndpoint: '/v1/audios/tts',
    queryEndpoint: '/v1/audios/tts/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FTTS',
    docFiles: ['apiReference_model_TTS.txt'],
    inputs: ['text'],
    outputs: ['audio'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'audios',
  },
  {
    skillId: 'kling-voice-clone',
    title: 'Kling Voice Clone',
    description: 'Clone voices and manage custom voice profiles using the Kling AI API. Upload audio samples to create custom voices for TTS and lip sync.',
    createEndpoint: '/v1/audios/voice-clone',
    queryEndpoint: '/v1/audios/voice-clone/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FcustomVoices',
    docFiles: ['apiReference_model_customVoices.txt'],
    inputs: ['audio', 'text'],
    outputs: ['audio'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'audios',
  },
  {
    skillId: 'kling-image-generation',
    title: 'Kling Image Generation',
    description: 'Generate images from text prompts or reference images using the Kling AI API. Supports text-to-image and image-to-image with multiple model versions, resolutions up to 2K, and batch generation.',
    createEndpoint: '/v1/images/generations',
    queryEndpoint: '/v1/images/generations/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FimageGeneration',
    docFiles: ['apiReference_model_imageGeneration.txt'],
    inputs: ['text', 'image'],
    outputs: ['image'],
    defaultModel: 'kling-v2-1',
    models: ['kling-v1', 'kling-v1-5', 'kling-v2', 'kling-v2-new', 'kling-v2-1', 'kling-v3'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-image-omni',
    title: 'Kling Image Omni',
    description: 'Unified image generation endpoint using the Kling Omni model. Supports text-to-image, image-to-image, element control, and series generation through a single API.',
    createEndpoint: '/v1/images/generations',
    queryEndpoint: '/v1/images/generations/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FOmniImage',
    docFiles: ['apiReference_model_OmniImage.txt'],
    inputs: ['text', 'image'],
    outputs: ['image'],
    defaultModel: 'kling-v3-omni',
    models: ['kling-v3-omni', 'kling-image-o1'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-reference-to-image',
    title: 'Kling Reference to Image',
    description: 'Generate images using multiple reference images with the Kling AI API. Supports character consistency, face reference, and subject reference across generated images.',
    createEndpoint: '/v1/images/generations',
    queryEndpoint: '/v1/images/generations/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FmultiImageToImage',
    docFiles: ['apiReference_model_multiImageToImage.txt'],
    inputs: ['image', 'text'],
    outputs: ['image'],
    defaultModel: 'kling-v2',
    models: ['kling-v2', 'kling-v2-1', 'kling-v3'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-extend-image',
    title: 'Kling Extend Image (Outpainting)',
    description: 'Expand images beyond their original boundaries using the Kling AI API. Supports directional expansion (top/bottom/left/right) with AI-generated content.',
    createEndpoint: '/v1/images/image-expansion',
    queryEndpoint: '/v1/images/image-expansion/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FimageExpansion',
    docFiles: ['apiReference_model_imageExpansion.txt'],
    inputs: ['image', 'text'],
    outputs: ['image'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-ai-multi-shot',
    title: 'Kling AI Multi-Shot',
    description: 'Generate consistent multi-shot image series using the Kling AI API. Create character-consistent image sequences for storyboards and comics.',
    createEndpoint: '/v1/images/ai-multi-shot',
    queryEndpoint: '/v1/images/ai-multi-shot/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FaiMultiShot',
    docFiles: ['apiReference_model_aiMultiShot.txt'],
    inputs: ['image', 'text'],
    outputs: ['image'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-virtual-try-on',
    title: 'Kling Virtual Try-On',
    description: 'Virtual clothing try-on using the Kling AI API. Upload a person image and clothing image to generate realistic try-on results.',
    createEndpoint: '/v1/images/kolors-virtual-try-on',
    queryEndpoint: '/v1/images/kolors-virtual-try-on/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FvirtualTryOn',
    docFiles: ['apiReference_model_virtualTryOn.txt'],
    inputs: ['image'],
    outputs: ['image'],
    defaultModel: 'kolors-virtual-try-on-v1-5',
    models: ['kolors-virtual-try-on-v1', 'kolors-virtual-try-on-v1-5'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-image-recognize',
    title: 'Kling Image Recognize',
    description: 'Recognize and understand image content using the Kling AI API. Extract descriptions, objects, and semantic information from images.',
    createEndpoint: '/v1/images/image-recognize',
    queryEndpoint: '/v1/images/image-recognize/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FimageRecognize',
    docFiles: ['apiReference_model_imageRecognize.txt'],
    inputs: ['image'],
    outputs: ['text'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'images',
  },
  {
    skillId: 'kling-element',
    title: 'Kling Element Management',
    description: 'Manage reusable elements (characters, objects) for the Kling AI API. Create, list, and delete elements that can be referenced across image and video generation tasks.',
    createEndpoint: '/v1/elements',
    queryEndpoint: '/v1/elements/{element_id}',
    docSlug: 'apiReference%2Fmodel%2Felement',
    docFiles: ['apiReference_model_element.txt'],
    inputs: ['image', 'text'],
    outputs: ['text'],
    defaultModel: 'kling-v1',
    models: ['kling-v1'],
    resultKey: 'elements',
  },
  {
    skillId: 'kling-video-effects',
    title: 'Kling Video Effects',
    description: 'Apply special effects to images/videos using the Kling AI API. Includes dual-character effects (hug, kiss, heart gesture), aging effects, and other creative transformations.',
    createEndpoint: '/v1/videos/effects',
    queryEndpoint: '/v1/videos/effects/{task_id}',
    docSlug: 'apiReference%2Fmodel%2FvideoEffects',
    docFiles: ['apiReference_model_videoEffects.txt'],
    inputs: ['image'],
    outputs: ['video'],
    defaultModel: 'kling-v1',
    models: ['kling-v1', 'kling-v1-5', 'kling-v1-6'],
    resultKey: 'videos',
  },
]

// ---------------------------------------------------------------------------
// Parse CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const skipFetch = args.includes('--skip-fetch')
const filterIdx = args.indexOf('--filter')
const filterKeyword = filterIdx >= 0 ? args[filterIdx + 1]?.toLowerCase() : null
const outIdx = args.indexOf('--output-dir')
const outputDir = outIdx >= 0 ? args[outIdx + 1] : DEFAULT_OUTPUT_DIR
const verbose = args.includes('--verbose')

// ---------------------------------------------------------------------------
// Phase 1: Fetch docs via Playwright
// ---------------------------------------------------------------------------

async function fetchDocs(): Promise<void> {
  console.log('Phase 1: Fetching Kling API docs via Playwright...\n')
  fs.mkdirSync(DOCS_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  let fetched = 0

  for (const slug of DOC_PAGES) {
    const url = `${BASE_URL}/${slug}`
    const name = slug.replace(/%2F/g, '_')
    const txtPath = path.join(DOCS_DIR, `${name}.txt`)

    if (fs.existsSync(txtPath) && fs.statSync(txtPath).size > 100) {
      if (verbose) console.log(`  SKIP (cached): ${name}`)
      continue
    }

    console.log(`  Fetching: ${name}...`)
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(2500)

      const content = await page.evaluate(() => {
        const el = document.querySelector('.markdown-body')
        if (!el) return { text: '', html: '' }
        return { text: el.textContent?.trim() || '', html: el.innerHTML }
      })

      fs.writeFileSync(path.join(DOCS_DIR, `${name}.html`), content.html)
      fs.writeFileSync(txtPath, content.text)
      console.log(`    ${content.text.length} chars`)
      fetched++
    } catch (err) {
      console.error(`    ERROR: ${err}`)
    }
  }

  await browser.close()
  console.log(`\n  Fetched ${fetched} new pages (${DOC_PAGES.length - fetched} cached)\n`)
}

// ---------------------------------------------------------------------------
// Phase 2: Parse docs and extract parameters
// ---------------------------------------------------------------------------

interface Param {
  name: string
  type: string
  required: boolean
  default_: string
  description: string
}

/** Known Kling API param names to filter false positives */
const KNOWN_PARAMS = new Set([
  'model_name', 'prompt', 'negative_prompt', 'image', 'image_url', 'end_image',
  'end_image_url', 'duration', 'mode', 'aspect_ratio', 'cfg_scale', 'sound',
  'camera_control', 'type', 'config', 'horizontal', 'vertical', 'pan', 'tilt',
  'roll', 'zoom', 'callback_url', 'external_task_id', 'watermark_info', 'enabled',
  'multi_shot', 'shot_type', 'multi_prompt', 'index', 'n', 'resolution',
  'image_reference', 'image_fidelity', 'human_fidelity', 'element_list', 'element_id',
  'model_avatar_id', 'voice_id', 'voice_language', 'voice_speed', 'voice_volume',
  'text', 'audio_url', 'audio_type', 'video_url', 'video_id', 'tail_image',
  'tail_image_url', 'image_list', 'ref_image_list', 'face_image_list',
  'effect_scene', 'input_type', 'human_image', 'cloth_image', 'voice_list',
  'generation_type', 'subtitle', 'subtitle_language', 'voice_clone_audio',
  'voice_clone_text', 'mask_info', 'static_mask', 'dynamic_mask',
  'motion_brush_info', 'motion_brush_list', 'mask', 'motion',
  'element_type', 'element_name', 'image_count', 'ref_image',
  'crop_strategy', 'output_video_ratio', 'reference_image', 'reference_type',
  'top', 'bottom', 'left', 'right', 'seed',
])

function parseParams(rawText: string): Param[] {
  // Extract only the Request Body section (skip Request Header, Path Parameters, Query Parameters)
  const bodyMatch = rawText.match(/Request Body([\s\S]*?)(?:Query Task|More Scene|Query Parameters|Path Parameters|$)/i)
  if (!bodyMatch) return []

  const bodyText = bodyMatch[1]
  const params: Param[] = []
  const seen = new Set<string>()

  // Pattern: paramName + type + Required/Optional in the concatenated text
  const paramRegex = /(\w[\w._]*)(string|int|float|boolean|object|array|long)(Required|Optional)(?:Default to ([^\n]*?))?([A-Z][\s\S]*?)(?=\w[\w._]*(?:string|int|float|boolean|object|array|long)(?:Required|Optional)|$)/g

  let match
  while ((match = paramRegex.exec(bodyText)) !== null) {
    const [, name, type, reqOpt, defaultVal, desc] = match

    // Skip noise: child attribute markers, header fields, duplicate entries
    if (name.startsWith('Hide') || name.startsWith('Show')) continue
    if (name === 'Type' || name === 'FormatAuthorization') continue
    if (name.includes('Authorization') || name.includes('Content')) continue
    if (seen.has(name)) continue

    // Fix common merge artifacts from concatenated text
    // e.g. "v3multi_shot" → "multi_shot", "attributestype" → "type", "1duration" → "duration"
    let cleanName = name
      .replace(/^(?:v\d+|attributes|Bodymodel_|Parameters|querying\.)/, '')
      .replace(/^\d+/, '')
    if (!cleanName || cleanName.length < 2) continue

    // Only include known params or names that look like real API params
    const isKnown = KNOWN_PARAMS.has(cleanName)
    const looksReal = /^[a-z][a-z0-9_]*$/.test(cleanName) && cleanName.length <= 30
    if (!isKnown && !looksReal) continue

    if (seen.has(cleanName)) continue
    seen.add(cleanName)
    params.push({
      name: cleanName,
      type,
      required: reqOpt === 'Required',
      default_: defaultVal?.trim() || '—',
      description: cleanDescription(desc),
    })
  }

  return params
}

function cleanDescription(raw: string): string {
  return raw
    .replace(/CopyCollapse[\s\S]*?(?=\w)/g, '') // Remove code block artifacts
    .replace(/\s+/g, ' ')                        // Normalize whitespace
    .replace(/Enum values[：:]\s*/g, 'Enum: ')
    .trim()
    .slice(0, 300)                                // Cap length
}

function extractCurlExample(rawText: string): string | null {
  // Find the first curl example
  const match = rawText.match(/curl\s+--request\s+POST[\s\S]*?'\s*\}/m)
  if (!match) return null

  // Clean up the copy/collapse artifacts
  return match[0]
    .replace(/CopyCollapse/g, '')
    .replace(/cURL/g, '')
    .trim()
}

function extractResponseExample(rawText: string): string | null {
  // Find JSON response after a 200 status
  const match = rawText.match(/200CopyCollapse\{[\s\S]*?\n\}/)
  if (!match) return null

  return match[0]
    .replace(/200CopyCollapse/, '')
    .trim()
}

// ---------------------------------------------------------------------------
// Phase 3: Generate SKILL.md files
// ---------------------------------------------------------------------------

function generateSkillMd(endpoint: EndpointDef): string {
  const docContent = endpoint.docFiles
    .map(f => {
      const p = path.join(DOCS_DIR, f)
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : ''
    })
    .join('\n')

  const params = parseParams(docContent)
  const curlExample = extractCurlExample(docContent)
  const responseExample = extractResponseExample(docContent)
  const docUrl = `${BASE_URL}/${endpoint.docSlug}`

  const isVideo = endpoint.outputs.includes('video')
  const isImage = endpoint.outputs.includes('image')
  const isAudio = endpoint.outputs.includes('audio')

  const resultType = isVideo ? 'video' : isImage ? 'image' : 'audio'
  const resultUrlPath = isVideo
    ? 'task_result.videos[0].url'
    : isImage
      ? 'task_result.images[0].url'
      : 'task_result.audios[0].url'

  // Build minimal example payload
  const examplePayload: Record<string, unknown> = {
    model_name: endpoint.defaultModel,
  }
  if (endpoint.inputs.includes('text')) {
    examplePayload.prompt = '<your prompt>'
  }
  if (endpoint.inputs.includes('image') && endpoint.createEndpoint.includes('image2video')) {
    examplePayload.image = '<image_url_or_base64>'
  }

  let md = `---
name: ${endpoint.skillId}
description: >
  Use this skill for the Kling AI ${endpoint.title} API (${endpoint.createEndpoint}).
  ${endpoint.description}
---

# ${endpoint.title}

${endpoint.description}

**Provider:** Kling AI (Kuaishou)
**API Domain:** \`${API_DOMAIN}\`
**Create Task:** \`POST ${endpoint.createEndpoint}\`
**Query Task:** \`GET ${endpoint.queryEndpoint}\`
**Source:** [Kling API Docs](${docUrl})

---

## Authentication

Kling uses **JWT (JSON Web Token)** authentication with an Access Key + Secret Key pair.

1. Get your Access Key and Secret Key from [Kling Developer Console](https://kling.ai/dev/api-key)
2. Generate a JWT token:

\`\`\`python
import time
import jwt

ak = ""  # Access Key
sk = ""  # Secret Key

def encode_jwt_token(ak, sk):
    headers = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "iss": ak,
        "exp": int(time.time()) + 1800,  # 30 min validity
        "nbf": int(time.time()) - 5
    }
    return jwt.encode(payload, sk, headers=headers)

token = encode_jwt_token(ak, sk)
\`\`\`

3. Include in request: \`Authorization: Bearer <token>\`

---

## Quick Start (cURL)

\`\`\`bash
curl --request POST \\
  --url ${API_DOMAIN}${endpoint.createEndpoint} \\
  --header 'Authorization: Bearer <token>' \\
  --header 'Content-Type: application/json' \\
  --data '${JSON.stringify(examplePayload, null, 4)}'
\`\`\`

## Quick Start (Python)

\`\`\`python
import os, time, jwt, requests

AK = os.environ["KLING_ACCESS_KEY"]
SK = os.environ["KLING_SECRET_KEY"]

def get_token():
    headers = {"alg": "HS256", "typ": "JWT"}
    payload = {"iss": AK, "exp": int(time.time()) + 1800, "nbf": int(time.time()) - 5}
    return jwt.encode(payload, SK, headers=headers)

HEADERS = {
    "Authorization": f"Bearer {get_token()}",
    "Content-Type": "application/json",
}

# 1. Create task
payload = ${JSON.stringify(examplePayload, null, 4)}

resp = requests.post(
    "${API_DOMAIN}${endpoint.createEndpoint}",
    json=payload,
    headers=HEADERS,
)
task_id = resp.json()["data"]["task_id"]
print(f"Task created: {task_id}")

# 2. Poll for result
while True:
    result = requests.get(
        f"${API_DOMAIN}${endpoint.queryEndpoint.replace('{task_id}', '{task_id}')}",
        headers=HEADERS,
    ).json()
    status = result["data"]["task_status"]
    print(f"Status: {status}")
    if status == "succeed":
        ${resultType}_url = result["data"]["${resultUrlPath.replace('task_result.', '')}"]
        print(f"Result: {${resultType}_url}")
        break
    elif status == "failed":
        print(f"Failed: {result['data'].get('task_status_msg', 'unknown')}")
        break
    time.sleep(5)
\`\`\`

## Quick Start (JavaScript / Node.js)

\`\`\`javascript
import jwt from "jsonwebtoken";

const AK = process.env.KLING_ACCESS_KEY;
const SK = process.env.KLING_SECRET_KEY;

function getToken() {
  return jwt.sign(
    { iss: AK, exp: Math.floor(Date.now() / 1000) + 1800, nbf: Math.floor(Date.now() / 1000) - 5 },
    SK,
    { algorithm: "HS256", header: { alg: "HS256", typ: "JWT" } }
  );
}

// 1. Create task
const createResp = await fetch("${API_DOMAIN}${endpoint.createEndpoint}", {
  method: "POST",
  headers: { Authorization: \`Bearer \${getToken()}\`, "Content-Type": "application/json" },
  body: JSON.stringify(${JSON.stringify(examplePayload, null, 4)}),
});
const { data } = await createResp.json();
const taskId = data.task_id;
console.log("Task:", taskId);

// 2. Poll for result
while (true) {
  const resp = await fetch(\`${API_DOMAIN}${endpoint.queryEndpoint.replace('{task_id}', '${taskId}')}\`, {
    headers: { Authorization: \`Bearer \${getToken()}\` },
  });
  const result = await resp.json();
  if (result.data.task_status === "succeed") {
    console.log("Result:", result.data.${resultUrlPath.replace('task_result.', '').replace('[0].url', '[0].url')});
    break;
  }
  if (result.data.task_status === "failed") {
    console.error("Failed:", result.data.task_status_msg);
    break;
  }
  await new Promise((r) => setTimeout(r, 5000));
}
\`\`\`

---

## Models

| Model Name | Description |
| --- | --- |
${endpoint.models.map(m => `| \`${m}\` | ${modelDescription(m)} |`).join('\n')}

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
${params.length > 0
    ? params.map(p => `| \`${p.name}\` | ${p.type} | ${p.required ? '**Yes**' : 'No'} | ${p.default_} | ${p.description.slice(0, 200)} |`).join('\n')
    : '| *(see raw documentation below)* | | | | |'
  }

---

## Output Schema

### Create Task Response

\`\`\`json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "submitted | processing | succeed | failed",
    "task_info": {
      "external_task_id": "string"
    },
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
\`\`\`

### Query Task Response (on success)

\`\`\`json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "succeed",
    "task_status_msg": "string",
    "task_info": {
      "external_task_id": "string"
    },
    "task_result": {
      "${endpoint.resultKey}": [
        {${isVideo ? `
          "id": "string",
          "url": "string",
          "watermark_url": "string",
          "duration": "string"` : isImage ? `
          "index": 0,
          "url": "string"` : `
          "id": "string",
          "url": "string",
          "duration": "string"`}
        }
      ]
    },
    "final_unit_deduction": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
\`\`\`

---

## Task Lifecycle

1. **Create Task** — \`POST ${endpoint.createEndpoint}\` → returns \`task_id\` with status \`submitted\`
2. **Poll Status** — \`GET ${endpoint.queryEndpoint}\` → status cycles: \`submitted\` → \`processing\` → \`succeed\` / \`failed\`
3. **Get Result** — When \`task_status === "succeed"\`, result URLs are in \`data.task_result.${endpoint.resultKey}[].url\`

**Polling interval:** 5-10 seconds recommended.
**Results expire:** Generated files are cleared after 30 days.

---

## Callback Support

Set \`callback_url\` in the create request to receive webhook notifications on status changes.

---

## Error Codes

| HTTP | Code | Meaning | Solution |
| --- | --- | --- | --- |
| 200 | 0 | Success | — |
| 401 | 1000-1004 | Auth failure | Check JWT token |
| 429 | 1100-1102 | Account issue | Check balance/package |
| 400 | 1200-1201 | Invalid params | Check request body |
| 400 | 1300-1301 | Content policy | Modify input content |
| 429 | 1302-1304 | Rate limited | Reduce frequency, use backoff |
| 500 | 5000-5002 | Server error | Retry later |

---

## References

- [Kling API Documentation](${docUrl})
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](${BASE_URL}/apiReference%2FcommonInfo)
- [Rate Limits](${BASE_URL}/apiReference%2FrateLimits)
- [Callback Protocol](${BASE_URL}/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](${BASE_URL}/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](${BASE_URL}/apiReference%2Fmodel%2FimageModels)
`

  // Append raw doc content if params were poorly parsed
  if (params.length < 3 && docContent.length > 200) {
    md += `\n---\n\n## Raw Documentation\n\n<details>\n<summary>Full API documentation text</summary>\n\n\`\`\`\n${docContent.slice(0, 8000)}\n\`\`\`\n\n</details>\n`
  }

  return md
}

function modelDescription(model: string): string {
  const descriptions: Record<string, string> = {
    'kling-v1': 'V1 base model, 720p, 30fps',
    'kling-v1-5': 'V1.5, improved image-to-video, 720p/1080p',
    'kling-v1-6': 'V1.6, multi-image support, 720p/1080p',
    'kling-v2-master': 'V2 Master, 720p, 24fps',
    'kling-v2-1': 'V2.1, std+pro modes, 720p/1080p, 24fps',
    'kling-v2-1-master': 'V2.1 Master, 1080p, 24fps',
    'kling-v2-5-turbo': 'V2.5 Turbo, faster generation, 1080p',
    'kling-v2-6': 'V2.6, latest v2 with sound + motion control',
    'kling-v3': 'V3, 3-15s variable duration, multi-shot, std/pro',
    'kling-v3-omni': 'V3 Omni, unified model with prompt-based element references',
    'kling-video-o1': 'Video O1, reasoning-enhanced video generation',
    'kling-image-o1': 'Image O1, reasoning-enhanced image generation',
    'kling-v2': 'V2 base image model, 1K/2K resolution',
    'kling-v2-new': 'V2 New, restyle-focused image model',
    'kolors-virtual-try-on-v1': 'Kolors V1 virtual try-on model',
    'kolors-virtual-try-on-v1-5': 'Kolors V1.5, improved try-on quality',
  }
  return descriptions[model] || model
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('Kling AI Skill Scraper')
  console.log('='.repeat(50))
  console.log(`Output dir: ${outputDir}`)
  console.log(`Dry run: ${dryRun}`)
  console.log(`Skip fetch: ${skipFetch}`)
  if (filterKeyword) console.log(`Filter: ${filterKeyword}`)
  console.log()

  // Phase 1: Fetch docs
  if (!skipFetch) {
    await fetchDocs()
  } else {
    console.log('Phase 1: SKIPPED (--skip-fetch)\n')
  }

  // Phase 2 & 3: Generate skills
  console.log('Phase 2: Generating SKILL.md files...\n')

  let endpoints = ENDPOINTS
  if (filterKeyword) {
    endpoints = endpoints.filter(
      e =>
        e.skillId.includes(filterKeyword) ||
        e.title.toLowerCase().includes(filterKeyword) ||
        e.description.toLowerCase().includes(filterKeyword),
    )
  }

  let created = 0
  let skipped = 0

  for (const endpoint of endpoints) {
    const skillDir = path.join(outputDir, endpoint.skillId)
    const skillPath = path.join(skillDir, 'SKILL.md')

    if (dryRun) {
      console.log(`  [DRY-RUN] Would create: ${skillPath}`)
      created++
      continue
    }

    fs.mkdirSync(skillDir, { recursive: true })

    const content = generateSkillMd(endpoint)
    fs.writeFileSync(skillPath, content)
    console.log(`  Created: ${skillPath} (${content.length} chars)`)
    created++
  }

  console.log(`\nDone! Created ${created} skills, skipped ${skipped}`)
  if (dryRun) console.log('(dry-run mode — no files written)')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
