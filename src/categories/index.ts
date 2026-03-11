import { textToImageTemplate } from './text-to-image.js'
import { imageEditTemplate } from './image-edit.js'
import { textToVideoTemplate } from './text-to-video.js'
import { imageToVideoTemplate } from './image-to-video.js'
import { upscaleImageTemplate } from './upscale-image.js'
import { textToAudioTemplate } from './text-to-audio.js'
import { audioToTextTemplate } from './audio-to-text.js'
import { removeBackgroundTemplate } from './remove-background.js'
import { textGenerationTemplate } from './text-generation.js'
import { imageToImageTemplate } from './image-to-image.js'
import { textTo3dTemplate } from './text-to-3d.js'
import { imageTo3dTemplate } from './image-to-3d.js'
import { upscaleVideoTemplate } from './upscale-video.js'
import { videoToAudioTemplate } from './video-to-audio.js'
import { segmentationTemplate } from './segmentation.js'
import { moderationTemplate } from './moderation.js'
import { trainingTemplate } from './training.js'
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
  'text-generation': textGenerationTemplate,
  'image-to-image': imageToImageTemplate,
  'text-to-3d': textTo3dTemplate,
  'image-to-3d': imageTo3dTemplate,
  'upscale-video': upscaleVideoTemplate,
  'video-to-audio': videoToAudioTemplate,
  'segmentation': segmentationTemplate,
  'moderation': moderationTemplate,
  'training': trainingTemplate,
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
  textGenerationTemplate,
  imageToImageTemplate,
  textTo3dTemplate,
  imageTo3dTemplate,
  upscaleVideoTemplate,
  videoToAudioTemplate,
  segmentationTemplate,
  moderationTemplate,
  trainingTemplate,
}
