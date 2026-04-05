import type {
  KlingVideoResult, KlingImageResult, KlingAudioResult, KlingJsonResult,
  KlingFaceResult, KlingMultiShotResult, KlingVoiceResult, KlingVideoAudioResult,
} from './types.js'

export type Extractor<T> = (data: Record<string, unknown>) => T

export function extractVideos(data: Record<string, unknown>): KlingVideoResult {
  const taskResult = data.task_result as Record<string, unknown> | undefined
  const videos = (taskResult?.videos ?? []) as Array<{ id: string; url: string; duration: string }>
  return { task_id: data.task_id as string, videos }
}

export function extractImages(data: Record<string, unknown>): KlingImageResult {
  const taskResult = data.task_result as Record<string, unknown> | undefined
  const images = (taskResult?.images ?? []) as Array<{ index: number; url: string }>
  return { task_id: data.task_id as string, images }
}

/** Extracts audios, normalizing url_mp3/url_wav to url for endpoints that use them. */
export function extractAudios(data: Record<string, unknown>): KlingAudioResult {
  const taskResult = data.task_result as Record<string, unknown> | undefined
  const rawAudios = (taskResult?.audios ?? []) as Array<Record<string, unknown>>
  const audios = rawAudios.map(a => ({
    id: a.id as string,
    url: (a.url ?? a.url_mp3 ?? a.url_wav ?? '') as string,
    url_mp3: a.url_mp3 as string | undefined,
    url_wav: a.url_wav as string | undefined,
    duration: (a.duration ?? a.duration_mp3) as string | undefined,
    duration_mp3: a.duration_mp3 as string | undefined,
    duration_wav: a.duration_wav as string | undefined,
  }))
  return { task_id: data.task_id as string, audios }
}

export function extractJson(data: Record<string, unknown>): KlingJsonResult {
  return { task_id: data.task_id as string, data: data.task_result ?? data }
}

/** Extracts identify-face sync response: session_id + face_data[]. */
export function extractFace(data: Record<string, unknown>): KlingFaceResult {
  return {
    session_id: data.session_id as string,
    face_data: (data.face_data ?? []) as KlingFaceResult['face_data'],
  }
}

/** Extracts multi-shot images with url_1, url_2, url_3 per image. */
export function extractMultiShot(data: Record<string, unknown>): KlingMultiShotResult {
  const taskResult = data.task_result as Record<string, unknown> | undefined
  const rawImages = (taskResult?.images ?? []) as Array<Record<string, unknown>>
  const images = rawImages.map((img, i) => ({
    index: (img.index as number) ?? i,
    url_1: img.url_1 as string,
    url_2: img.url_2 as string,
    url_3: img.url_3 as string,
  }))
  return { task_id: data.task_id as string, images }
}

/** Extracts voices[] from create-voice response. */
export function extractVoices(data: Record<string, unknown>): KlingVoiceResult {
  const taskResult = data.task_result as Record<string, unknown> | undefined
  const voices = (taskResult?.voices ?? []) as KlingVoiceResult['voices']
  return { task_id: data.task_id as string, voices }
}

/** Extracts video-to-audio response: both videos[] and audios[]. */
export function extractVideoAudio(data: Record<string, unknown>): KlingVideoAudioResult {
  const taskResult = data.task_result as Record<string, unknown> | undefined
  const videos = (taskResult?.videos ?? []) as Array<{ id: string; url: string; duration: string }>
  const rawAudios = (taskResult?.audios ?? []) as Array<Record<string, unknown>>
  const audios = rawAudios.map(a => ({
    id: a.id as string,
    url_mp3: a.url_mp3 as string | undefined,
    url_wav: a.url_wav as string | undefined,
    duration_mp3: a.duration_mp3 as string | undefined,
    duration_wav: a.duration_wav as string | undefined,
  }))
  return { task_id: data.task_id as string, videos, audios }
}
