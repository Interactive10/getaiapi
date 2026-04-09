import type { KlingClient } from './client.js'
import type {
  TextToVideoInput, ImageToVideoInput, OmniVideoInput,
  ImageGenerationInput, OmniImageInput, VirtualTryOnInput,
  AvatarInput, LipSyncInput, EffectsInput, MotionControlInput,
  TtsInput, VideoToAudioInput, TextToAudioInput, CreateVoiceInput,
  MultiShotInput, ReferenceToImageInput, ExpandImageInput,
  ExtendVideoInput, IdentifyFaceInput, ImageRecognizeInput,
  ReferenceToVideoInput, AccountCostsInput, AccountCostsResult,
  KlingVideoResult, KlingImageResult, KlingAudioResult, KlingJsonResult,
  KlingFaceResult, KlingMultiShotResult, KlingVoiceResult, KlingVideoAudioResult,
} from './types.js'
import { extractVideos, extractImages, extractAudios, extractJson, extractFace, extractMultiShot, extractVoices, extractVideoAudio } from './extract.js'

/** Builds all 69 typed model functions bound to a client instance. */
export function createModels(client: KlingClient) {
  return {
    // ── text2video (9 models) ──────────────────────────────────────────────

    textToVideoV1Standard(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v1', mode: 'std' }, input, extractVideos)
    },
    textToVideoV1_6Pro(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v1-6', mode: 'pro' }, input, extractVideos)
    },
    textToVideoV1_6Standard(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v1-6', mode: 'std' }, input, extractVideos)
    },
    textToVideoV2Master(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v2-master' }, input, extractVideos)
    },
    textToVideoV2_1Master(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v2-1-master' }, input, extractVideos)
    },
    textToVideoV2_5TurboPro(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v2-5-turbo', mode: 'pro' }, input, extractVideos)
    },
    textToVideoV2_6Pro(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v2-6', mode: 'pro' }, input, extractVideos)
    },
    textToVideoV3Pro(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v3', mode: 'pro' }, input, extractVideos)
    },
    textToVideoV3Standard(input: TextToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/text2video', { model_name: 'kling-v3', mode: 'std' }, input, extractVideos)
    },

    // ── image2video (13 models) ────────────────────────────────────────────

    imageToVideoV1Standard(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v1', mode: 'std' }, input, extractVideos)
    },
    imageToVideoV1_5Pro(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v1-5', mode: 'pro' }, input, extractVideos)
    },
    imageToVideoV1_6Pro(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v1-6', mode: 'pro' }, input, extractVideos)
    },
    imageToVideoV1_6Standard(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v1-6', mode: 'std' }, input, extractVideos)
    },
    imageToVideoV2Master(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-master' }, input, extractVideos)
    },
    imageToVideoV2_1Master(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-1-master' }, input, extractVideos)
    },
    imageToVideoV2_1Pro(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-1', mode: 'pro' }, input, extractVideos)
    },
    imageToVideoV2_1Standard(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-1', mode: 'std' }, input, extractVideos)
    },
    imageToVideoV2_5TurboPro(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-5-turbo', mode: 'pro' }, input, extractVideos)
    },
    imageToVideoV2_5TurboStandard(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-5-turbo', mode: 'std' }, input, extractVideos)
    },
    imageToVideoV2_6Pro(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v2-6', mode: 'pro' }, input, extractVideos)
    },
    imageToVideoV3Pro(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v3', mode: 'pro' }, input, extractVideos)
    },
    imageToVideoV3Standard(input: ImageToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/image2video', { model_name: 'kling-v3', mode: 'std' }, input, extractVideos)
    },

    // ── omni-video (17 models) ─────────────────────────────────────────────

    omniVideoO1ImageToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1' }, input, extractVideos)
    },
    omniVideoO1ReferenceToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1' }, input, extractVideos)
    },
    omniVideoO1StandardImageToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1', mode: 'std' }, input, extractVideos)
    },
    omniVideoO1StandardReferenceToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1', mode: 'std' }, input, extractVideos)
    },
    omniVideoO1StandardVideoEdit(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1', mode: 'std' }, input, extractVideos)
    },
    omniVideoO1StandardVideoReference(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1', mode: 'std' }, input, extractVideos)
    },
    omniVideoO1VideoEdit(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1' }, input, extractVideos)
    },
    omniVideoO1VideoReference(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-video-o1' }, input, extractVideos)
    },
    omniVideoO3ProImageToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'pro' }, input, extractVideos)
    },
    omniVideoO3ProReferenceToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'pro' }, input, extractVideos)
    },
    omniVideoO3ProTextToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'pro' }, input, extractVideos)
    },
    omniVideoO3ProVideoEdit(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'pro' }, input, extractVideos)
    },
    omniVideoO3ProVideoReference(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'pro' }, input, extractVideos)
    },
    omniVideoO3StandardReferenceToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'std' }, input, extractVideos)
    },
    omniVideoO3StandardTextToVideo(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'std' }, input, extractVideos)
    },
    omniVideoO3StandardVideoEdit(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'std' }, input, extractVideos)
    },
    omniVideoO3StandardVideoReference(input: OmniVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/omni-video', { model_name: 'kling-v3-omni', mode: 'std' }, input, extractVideos)
    },

    // ── images/generations (2 models) ──────────────────────────────────────

    imageV3TextToImage(input: ImageGenerationInput): Promise<KlingImageResult> {
      return client.execute('v1/images/generations', { model_name: 'kling-v3' }, input, extractImages)
    },
    imageV3ImageToImage(input: ImageGenerationInput): Promise<KlingImageResult> {
      return client.execute('v1/images/generations', { model_name: 'kling-v3' }, input, extractImages)
    },

    // ── images/omni-image (3 models) ───────────────────────────────────────

    imageO1(input: OmniImageInput): Promise<KlingImageResult> {
      return client.execute('v1/images/omni-image', { model_name: 'kling-image-o1' }, input, extractImages)
    },
    imageO3TextToImage(input: OmniImageInput): Promise<KlingImageResult> {
      return client.execute('v1/images/omni-image', { model_name: 'kling-v3-omni' }, input, extractImages)
    },
    imageO3ImageToImage(input: OmniImageInput): Promise<KlingImageResult> {
      return client.execute('v1/images/omni-image', { model_name: 'kling-v3-omni' }, input, extractImages)
    },

    // ── virtual-try-on (1 model) ───────────────────────────────────────────

    virtualTryOn(input: VirtualTryOnInput): Promise<KlingImageResult> {
      return client.execute('v1/images/kolors-virtual-try-on', { model_name: 'kolors-virtual-try-on-v1-5' }, input, extractImages)
    },

    // ── avatar (4 models) ──────────────────────────────────────────────────

    avatarV2Pro(input: AvatarInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/avatar/image2video', { mode: 'pro' }, input, extractVideos)
    },
    avatarV2Standard(input: AvatarInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/avatar/image2video', { mode: 'std' }, input, extractVideos)
    },
    avatarV1Pro(input: AvatarInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/avatar/image2video', { mode: 'pro' }, input, extractVideos)
    },
    avatarV1Standard(input: AvatarInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/avatar/image2video', { mode: 'std' }, input, extractVideos)
    },

    // ── lip-sync (2 models) ────────────────────────────────────────────────

    lipSyncAudioToVideo(input: LipSyncInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/advanced-lip-sync', {}, input, extractVideos)
    },
    lipSyncTextToVideo(input: LipSyncInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/advanced-lip-sync', {}, input, extractVideos)
    },

    // ── effects (4 models) ─────────────────────────────────────────────────

    effectsV1Standard(input: EffectsInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/effects', {}, input, extractVideos)
    },
    effectsV1_5Pro(input: EffectsInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/effects', {}, input, extractVideos)
    },
    effectsV1_6Pro(input: EffectsInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/effects', {}, input, extractVideos)
    },
    effectsV1_6Standard(input: EffectsInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/effects', {}, input, extractVideos)
    },

    // ── motion-control (4 models) ──────────────────────────────────────────

    motionControlV2_6Pro(input: MotionControlInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/motion-control', { model_name: 'kling-v2-6', mode: 'pro' }, input, extractVideos)
    },
    motionControlV2_6Standard(input: MotionControlInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/motion-control', { model_name: 'kling-v2-6', mode: 'std' }, input, extractVideos)
    },
    motionControlV3Pro(input: MotionControlInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/motion-control', { model_name: 'kling-v3', mode: 'pro' }, input, extractVideos)
    },
    motionControlV3Standard(input: MotionControlInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/motion-control', { model_name: 'kling-v3', mode: 'std' }, input, extractVideos)
    },

    // ── tts (1 model, sync) ────────────────────────────────────────────────

    tts(input: TtsInput): Promise<KlingAudioResult> {
      return client.execute('v1/audio/tts', {}, input, extractAudios, true)
    },

    // ── video-to-audio (1 model) ───────────────────────────────────────────

    videoToAudio(input: VideoToAudioInput): Promise<KlingVideoAudioResult> {
      return client.execute('v1/audio/video-to-audio', {}, input, extractVideoAudio)
    },

    // ── text-to-audio (1 model) ────────────────────────────────────────────

    textToAudio(input: TextToAudioInput): Promise<KlingAudioResult> {
      return client.execute('v1/audio/text-to-audio', {}, input, extractAudios)
    },

    // ── create-voice (1 model) ─────────────────────────────────────────────

    createVoice(input: CreateVoiceInput): Promise<KlingVoiceResult> {
      return client.execute('v1/general/custom-voices', {}, input, extractVoices)
    },

    // ── multi-shot (1 model) ───────────────────────────────────────────────

    multiShot(input: MultiShotInput): Promise<KlingMultiShotResult> {
      return client.execute('v1/general/ai-multi-shot', {}, input, extractMultiShot)
    },

    // ── reference-to-image (1 model) ───────────────────────────────────────

    referenceToImage(input: ReferenceToImageInput): Promise<KlingImageResult> {
      return client.execute('v1/images/multi-image2image', { model_name: 'kling-v2-1' }, input, extractImages)
    },

    // ── expand-image (1 model) ─────────────────────────────────────────────

    expandImage(input: ExpandImageInput): Promise<KlingImageResult> {
      return client.execute('v1/images/editing/expand', {}, input, extractImages)
    },

    // ── extend-video (1 model) ─────────────────────────────────────────────

    extendVideo(input: ExtendVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/video-extend', {}, input, extractVideos)
    },

    // ── identify-face (1 model) ────────────────────────────────────────────

    identifyFace(input: IdentifyFaceInput): Promise<KlingFaceResult> {
      return client.execute('v1/videos/identify-face', {}, input, extractFace, true)
    },

    // ── image-recognize (1 model, sync) ────────────────────────────────────

    imageRecognize(input: ImageRecognizeInput): Promise<KlingJsonResult> {
      return client.execute('v1/videos/image-recognize', {}, input, extractJson, true)
    },

    // ── reference-to-video (1 model) ──────────────────────────────────────

    referenceToVideo(input: ReferenceToVideoInput): Promise<KlingVideoResult> {
      return client.execute('v1/videos/multi-image2video', { model_name: 'kling-v1-6' }, input, extractVideos)
    },

    // ── account ───────────────────────────────────────────────────────────

    accountCosts(input: AccountCostsInput): Promise<AccountCostsResult> {
      return client.accountCosts(input)
    },
  }
}
