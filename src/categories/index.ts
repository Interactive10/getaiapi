import { textToImageTemplate } from './text-to-image.js'
import { imageEditTemplate } from './image-edit.js'
import { textToVideoTemplate } from './text-to-video.js'
import { imageToVideoTemplate } from './image-to-video.js'
import { upscaleImageTemplate } from './upscale-image.js'
import { textToAudioTemplate } from './text-to-audio.js'
import { audioToTextTemplate } from './audio-to-text.js'
import { removeBackgroundTemplate } from './remove-background.js'
import type { CategoryTemplate, ModelCategory } from '../types.js'

const templates: Partial<Record<ModelCategory, CategoryTemplate>> = {
  'text-to-image': textToImageTemplate,
  'image-edit': imageEditTemplate,
  'text-to-video': textToVideoTemplate,
  'image-to-video': imageToVideoTemplate,
  'upscale-image': upscaleImageTemplate,
  'text-to-audio': textToAudioTemplate,
  'audio-to-text': audioToTextTemplate,
  'remove-background': removeBackgroundTemplate,
}

export function getCategoryTemplate(category: ModelCategory): CategoryTemplate | undefined {
  return templates[category]
}

export {
  textToImageTemplate,
  imageEditTemplate,
  textToVideoTemplate,
  imageToVideoTemplate,
  upscaleImageTemplate,
  textToAudioTemplate,
  audioToTextTemplate,
  removeBackgroundTemplate,
}
