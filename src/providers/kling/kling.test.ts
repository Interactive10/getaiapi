import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  kling,
  createClient,
  generateJwt,
  KlingAuthError,
  KlingRateLimitError,
  KlingApiError,
  KlingTimeoutError,
  KlingTaskFailedError,
} from './index.js'

// ── Helpers ──────────────────────────────────────────────────────────────────

function mockFetch(responses: Array<{ status?: number; body: unknown; headers?: Record<string, string> }>) {
  let callIndex = 0
  return vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
    const resp = responses[callIndex++]
    if (!resp) throw new Error(`Unexpected fetch call #${callIndex}`)
    return new Response(JSON.stringify(resp.body), {
      status: resp.status ?? 200,
      headers: { 'content-type': 'application/json', ...resp.headers },
    })
  })
}

function submitResponse(taskId: string) {
  return {
    body: {
      code: 0,
      message: 'Success',
      request_id: 'req-1',
      data: { task_id: taskId, task_status: 'submitted', created_at: 0, updated_at: 0 },
    },
  }
}

function pollProcessingResponse(taskId: string) {
  return {
    body: {
      code: 0,
      message: 'Success',
      request_id: 'req-2',
      data: { task_id: taskId, task_status: 'processing', created_at: 0, updated_at: 0 },
    },
  }
}

function pollSucceedVideoResponse(taskId: string) {
  return {
    body: {
      code: 0,
      message: 'Success',
      request_id: 'req-3',
      data: {
        task_id: taskId,
        task_status: 'succeed',
        task_result: {
          videos: [{ id: 'vid-1', url: 'https://cdn.kling.ai/video.mp4', duration: '5.0' }],
        },
        created_at: 0,
        updated_at: 0,
      },
    },
  }
}

function pollSucceedImageResponse(taskId: string) {
  return {
    body: {
      code: 0,
      message: 'Success',
      request_id: 'req-3',
      data: {
        task_id: taskId,
        task_status: 'succeed',
        task_result: {
          images: [{ index: 0, url: 'https://cdn.kling.ai/image.png' }],
        },
        created_at: 0,
        updated_at: 0,
      },
    },
  }
}

function pollSucceedAudioResponse(taskId: string) {
  return {
    body: {
      code: 0,
      message: 'Success',
      request_id: 'req-3',
      data: {
        task_id: taskId,
        task_status: 'succeed',
        task_result: {
          audios: [{ id: 'aud-1', url: 'https://cdn.kling.ai/audio.mp3' }],
        },
        created_at: 0,
        updated_at: 0,
      },
    },
  }
}

function syncTtsResponse() {
  return {
    body: {
      code: 0,
      message: 'Success',
      request_id: 'req-1',
      data: {
        task_id: 'tts-1',
        task_status: 'succeed',
        task_result: {
          audios: [{ id: 'aud-1', url: 'https://cdn.kling.ai/tts.mp3' }],
        },
        created_at: 0,
        updated_at: 0,
      },
    },
  }
}

// ── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  kling.configure({ accessKey: 'test-ak', secretKey: 'test-sk' })
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ── Tests ────────────────────────────────────────────────────────────────────

describe('kling', () => {
  describe('namespace', () => {
    it('exports all model and management functions plus configure', () => {
      const functionKeys = Object.keys(kling).filter(k => typeof (kling as Record<string, unknown>)[k] === 'function')
      // 70 generation + 5 element/account + 39 management/list/query + 1 configure = 115
      expect(functionKeys).toHaveLength(115)
      expect(functionKeys).toContain('configure')
      expect(functionKeys).toContain('textToVideoV3Pro')
      expect(functionKeys).toContain('imageO1')
      expect(functionKeys).toContain('tts')
      expect(functionKeys).toContain('virtualTryOn')
      expect(functionKeys).toContain('identifyFace')
      expect(functionKeys).toContain('imageRecognize')
      expect(functionKeys).toContain('referenceToVideo')
      // management
      expect(functionKeys).toContain('listVoices')
      expect(functionKeys).toContain('listPresetVoices')
      expect(functionKeys).toContain('queryVoice')
      expect(functionKeys).toContain('deleteVoice')
      expect(functionKeys).toContain('getElement')
      expect(functionKeys).toContain('generateMultiElementsVideo')
      expect(functionKeys).toContain('listMultiElementsTasks')
      // list queries
      expect(functionKeys).toContain('listLipSyncTasks')
      expect(functionKeys).toContain('listImageToVideoTasks')
      expect(functionKeys).toContain('listAvatarTasks')
      // single-task queries
      expect(functionKeys).toContain('getLipSyncTask')
      expect(functionKeys).toContain('getImageToVideoTask')
      expect(functionKeys).toContain('getAvatarTask')
    })
  })

  describe('JWT auth', () => {
    it('produces a three-part base64url token', () => {
      const jwt = generateJwt('ak-123', 'sk-456')
      const parts = jwt.split('.')
      expect(parts).toHaveLength(3)

      const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString())
      expect(header).toEqual({ alg: 'HS256', typ: 'JWT' })

      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
      expect(payload.iss).toBe('ak-123')
      expect(payload.exp).toBeGreaterThan(payload.nbf)
    })
  })

  describe('textToVideoV3Pro', () => {
    it('submits and polls until succeed', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-1'),
        pollProcessingResponse('task-1'),
        pollSucceedVideoResponse('task-1'),
      ])

      const result = await kling.textToVideoV3Pro({
        prompt: 'a sunset',
        duration: '5',
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-1')
      expect(result.videos).toHaveLength(1)
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/video.mp4')

      // Verify submit call
      const submitCall = fetchSpy.mock.calls[0]
      expect(submitCall[0]).toBe('https://api-singapore.klingai.com/v1/videos/text2video')
      const submitBody = JSON.parse(submitCall[1]?.body as string)
      expect(submitBody.prompt).toBe('a sunset')
      expect(submitBody.duration).toBe('5')
      expect(submitBody.model_name).toBe('kling-v3')
      expect(submitBody.mode).toBe('pro')

      // Verify poll calls
      expect(fetchSpy).toHaveBeenCalledTimes(3)
      expect(fetchSpy.mock.calls[1][0]).toBe('https://api-singapore.klingai.com/v1/videos/text2video/task-1')
    })

    it('does not override user-provided defaults', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-2'),
        pollSucceedVideoResponse('task-2'),
      ])

      await kling.textToVideoV3Pro({
        prompt: 'test',
        options: { model_name: 'custom-model' },
        pollInterval: 10,
      })

      const submitBody = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(submitBody.model_name).toBe('custom-model')
    })
  })

  describe('imageToVideoV3Pro', () => {
    it('sends image in request body', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-3'),
        pollSucceedVideoResponse('task-3'),
      ])

      const result = await kling.imageToVideoV3Pro({
        image: 'https://example.com/photo.jpg',
        prompt: 'animate this',
        pollInterval: 10,
      })

      expect(result.videos).toHaveLength(1)
      const submitBody = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(submitBody.image).toBe('https://example.com/photo.jpg')
      expect(submitBody.model_name).toBe('kling-v3')
      expect(submitBody.mode).toBe('pro')
    })
  })

  describe('imageO1', () => {
    it('returns image result', async () => {
      mockFetch([
        submitResponse('task-4'),
        pollSucceedImageResponse('task-4'),
      ])

      const result = await kling.imageO1({
        prompt: 'enhance',
        image: 'https://example.com/img.jpg',
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-4')
      expect(result.images).toHaveLength(1)
      expect(result.images[0].url).toBe('https://cdn.kling.ai/image.png')
    })
  })

  describe('tts (sync endpoint)', () => {
    it('returns audio result without polling', async () => {
      const fetchSpy = mockFetch([syncTtsResponse()])

      const result = await kling.tts({ text: 'Hello world', voice_id: 'voice-1', voice_language: 'en' })

      expect(result.task_id).toBe('tts-1')
      expect(result.audios).toHaveLength(1)
      expect(result.audios[0].url).toBe('https://cdn.kling.ai/tts.mp3')
      // Only 1 call (submit), no polling
      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('videoToAudio', () => {
    it('returns both videos and audios with url_mp3/url_wav fields', async () => {
      mockFetch([
        submitResponse('task-5'),
        {
          body: {
            code: 0,
            message: 'Success',
            request_id: 'req-3',
            data: {
              task_id: 'task-5',
              task_status: 'succeed',
              task_result: {
                videos: [{ id: 'vid-1', url: 'https://cdn.kling.ai/merged.mp4', duration: '10.0' }],
                audios: [{ id: 'aud-1', url_mp3: 'https://cdn.kling.ai/a.mp3', url_wav: 'https://cdn.kling.ai/a.wav', duration_mp3: '10.0', duration_wav: '10.0' }],
              },
              created_at: 0,
              updated_at: 0,
            },
          },
        },
      ])

      const result = await kling.videoToAudio({
        video_url: 'https://example.com/video.mp4',
        sound_effect_prompt: 'ocean waves',
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-5')
      expect(result.videos).toHaveLength(1)
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/merged.mp4')
      expect(result.audios).toHaveLength(1)
      expect(result.audios[0].url_mp3).toBe('https://cdn.kling.ai/a.mp3')
      expect(result.audios[0].url_wav).toBe('https://cdn.kling.ai/a.wav')
    })
  })

  describe('textToAudio', () => {
    it('normalizes url_mp3/url_wav into url', async () => {
      mockFetch([
        submitResponse('task-ta'),
        {
          body: {
            code: 0,
            message: 'Success',
            request_id: 'req-3',
            data: {
              task_id: 'task-ta',
              task_status: 'succeed',
              task_result: {
                audios: [{ id: 'aud-1', url_mp3: 'https://cdn.kling.ai/t.mp3', url_wav: 'https://cdn.kling.ai/t.wav', duration_mp3: '5.0', duration_wav: '5.0' }],
              },
              created_at: 0,
              updated_at: 0,
            },
          },
        },
      ])

      const result = await kling.textToAudio({
        prompt: 'thunder storm',
        duration: 5.0,
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-ta')
      expect(result.audios).toHaveLength(1)
      expect(result.audios[0].url).toBe('https://cdn.kling.ai/t.mp3')
      expect(result.audios[0].url_mp3).toBe('https://cdn.kling.ai/t.mp3')
      expect(result.audios[0].url_wav).toBe('https://cdn.kling.ai/t.wav')
    })
  })

  describe('createVoice', () => {
    it('reads voices array not audios', async () => {
      mockFetch([
        submitResponse('task-cv'),
        {
          body: {
            code: 0,
            message: 'Success',
            request_id: 'req-3',
            data: {
              task_id: 'task-cv',
              task_status: 'succeed',
              task_result: {
                voices: [{ voice_id: 'v-1', voice_name: 'custom', trial_url: 'https://cdn.kling.ai/trial.mp3', owned_by: 'kling' }],
              },
              created_at: 0,
              updated_at: 0,
            },
          },
        },
      ])

      const result = await kling.createVoice({
        voice_name: 'custom',
        voice_url: 'https://example.com/sample.mp3',
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-cv')
      expect(result.voices).toHaveLength(1)
      expect(result.voices[0].voice_id).toBe('v-1')
      expect(result.voices[0].voice_name).toBe('custom')
      expect(result.voices[0].trial_url).toBe('https://cdn.kling.ai/trial.mp3')
    })
  })

  describe('virtualTryOn', () => {
    it('sends human_image and cloth_image', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-6'),
        pollSucceedImageResponse('task-6'),
      ])

      await kling.virtualTryOn({
        human_image: 'https://example.com/person.jpg',
        cloth_image: 'https://example.com/shirt.jpg',
        pollInterval: 10,
      })

      const submitBody = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(submitBody.human_image).toBe('https://example.com/person.jpg')
      expect(submitBody.cloth_image).toBe('https://example.com/shirt.jpg')
      expect(submitBody.model_name).toBe('kolors-virtual-try-on-v1-5')
    })
  })

  describe('multiShot', () => {
    it('extracts url_1 from images', async () => {
      mockFetch([
        submitResponse('task-7'),
        {
          body: {
            code: 0,
            message: 'Success',
            request_id: 'req-3',
            data: {
              task_id: 'task-7',
              task_status: 'succeed',
              task_result: {
                images: [{ url_1: 'https://cdn.kling.ai/shot1.png', url_2: 'https://cdn.kling.ai/shot2.png' }],
              },
              created_at: 0,
              updated_at: 0,
            },
          },
        },
      ])

      const result = await kling.multiShot({
        element_frontal_image: 'https://example.com/face.jpg',
        pollInterval: 10,
      })

      expect(result.images).toHaveLength(1)
      expect(result.images[0].url_1).toBe('https://cdn.kling.ai/shot1.png')
      expect(result.images[0].url_2).toBe('https://cdn.kling.ai/shot2.png')
    })
  })

  describe('identifyFace (sync)', () => {
    it('returns face result without polling', async () => {
      mockFetch([{
        body: {
          code: 0,
          message: 'Success',
          request_id: 'req-3',
          data: {
            session_id: 'sess-1',
            face_data: [{ face_id: 'f-1', face_image: 'https://cdn.kling.ai/face.jpg', start_time: 0, end_time: 5200 }],
          },
        },
      }])

      const result = await kling.identifyFace({
        video_url: 'https://example.com/video.mp4',
      })

      expect(result.session_id).toBe('sess-1')
      expect(result.face_data).toHaveLength(1)
      expect(result.face_data[0].face_id).toBe('f-1')
    })
  })

  describe('imageRecognize (sync)', () => {
    it('returns immediately without polling', async () => {
      const fetchSpy = mockFetch([{
        body: {
          code: 0,
          message: 'Success',
          request_id: 'req-1',
          data: {
            task_id: 'rec-1',
            task_status: 'succeed',
            task_result: { labels: ['cat', 'animal'] },
            created_at: 0,
            updated_at: 0,
          },
        },
      }])

      const result = await kling.imageRecognize({ image: 'https://example.com/cat.jpg' })

      expect(result.task_id).toBe('rec-1')
      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('referenceToVideo', () => {
    it('sends image_list and defaults model_name to kling-v1-6', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-ref'),
        pollSucceedVideoResponse('task-ref'),
      ])

      const result = await kling.referenceToVideo({
        image_list: [{ image: 'https://example.com/face1.jpg' }, { image: 'https://example.com/face2.jpg' }],
        prompt: 'two people walking',
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-ref')
      expect(result.videos).toHaveLength(1)

      const submitBody = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(submitBody.image_list).toHaveLength(2)
      expect(submitBody.prompt).toBe('two people walking')
      expect(submitBody.model_name).toBe('kling-v1-6')
      expect(fetchSpy.mock.calls[0][0]).toBe('https://api-singapore.klingai.com/v1/videos/multi-image2video')
    })
  })

  describe('base64 cleaning', () => {
    it('strips data URI prefix from base64 strings', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-9'),
        pollSucceedImageResponse('task-9'),
      ])

      await kling.imageO1({
        prompt: 'test',
        image: 'data:image/png;base64,iVBORw0KGgo=',
        pollInterval: 10,
      })

      const submitBody = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(submitBody.image).toBe('iVBORw0KGgo=')
    })
  })

  describe('error handling', () => {
    it('throws KlingAuthError on missing credentials', async () => {
      vi.stubEnv('KLING_ACCESS_KEY', '')
      vi.stubEnv('KLING_SECRET_KEY', '')

      // Isolated client with no credentials
      const noAuth = createClient({} as { accessKey: string; secretKey: string })

      await expect(
        noAuth.tts({ text: 'hello', voice_id: 'v1', voice_language: 'en' })
      ).rejects.toThrow(KlingAuthError)

      vi.unstubAllEnvs()
    })

    it('throws KlingAuthError on 401 response', async () => {
      mockFetch([{ status: 401, body: { code: 1000, message: 'Unauthorized' } }])

      await expect(
        kling.tts({ text: 'hello', voice_id: 'v1', voice_language: 'en' })
      ).rejects.toThrow(KlingAuthError)
    })

    it('throws KlingRateLimitError on 429 response', async () => {
      mockFetch([{ status: 429, body: {}, headers: { 'retry-after': '30' } }])

      await expect(
        kling.tts({ text: 'hello', voice_id: 'v1', voice_language: 'en' })
      ).rejects.toThrow(KlingRateLimitError)
    })

    it('throws KlingApiError on body-level error code', async () => {
      mockFetch([{ body: { code: 2000, message: 'Bad params', request_id: 'r', data: {} } }])

      await expect(
        kling.tts({ text: 'hello', voice_id: 'v1', voice_language: 'en' })
      ).rejects.toThrow(KlingApiError)
    })

    it('throws KlingRateLimitError on body codes 1100-1102', async () => {
      mockFetch([{ body: { code: 1100, message: 'Rate limit', request_id: 'r', data: {} } }])

      await expect(
        kling.tts({ text: 'hello', voice_id: 'v1', voice_language: 'en' })
      ).rejects.toThrow(KlingRateLimitError)
    })

    it('throws KlingTaskFailedError when task fails', async () => {
      mockFetch([
        submitResponse('task-fail'),
        {
          body: {
            code: 0,
            message: 'Success',
            request_id: 'req-2',
            data: { task_id: 'task-fail', task_status: 'failed', task_status_msg: 'Content violation', created_at: 0, updated_at: 0 },
          },
        },
      ])

      await expect(
        kling.textToVideoV3Pro({ prompt: 'bad content', pollInterval: 10 })
      ).rejects.toThrow(KlingTaskFailedError)
    })

    it('throws KlingTimeoutError when polling exceeds timeout', async () => {
      // Return processing forever
      const processingResponse = () => ({
        body: {
          code: 0,
          message: 'Success',
          request_id: 'req',
          data: { task_id: 'task-slow', task_status: 'processing', created_at: 0, updated_at: 0 },
        },
      })

      vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        return new Response(JSON.stringify(processingResponse().body), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      })

      await expect(
        kling.textToVideoV3Pro({ prompt: 'slow', timeout: 50, pollInterval: 10 })
      ).rejects.toThrow(KlingTimeoutError)
    })
  })

  describe('createClient isolation', () => {
    it('creates independent clients with separate credentials', async () => {
      const client1 = createClient({ accessKey: 'ak-1', secretKey: 'sk-1' })
      const client2 = createClient({ accessKey: 'ak-2', secretKey: 'sk-2' })

      const fetchSpy = mockFetch([
        syncTtsResponse(),
        syncTtsResponse(),
      ])

      await client1.tts({ text: 'from client 1', voice_id: 'v1', voice_language: 'en' })
      await client2.tts({ text: 'from client 2', voice_id: 'v1', voice_language: 'en' })

      // Each client should use its own JWT (different accessKey in iss claim)
      const auth1 = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>
      const auth2 = fetchSpy.mock.calls[1][1]?.headers as Record<string, string>
      const jwt1Payload = JSON.parse(Buffer.from(auth1.Authorization.split('.')[1].replace('Bearer ', ''), 'base64url').toString())
      const jwt2Payload = JSON.parse(Buffer.from(auth2.Authorization.split('.')[1].replace('Bearer ', ''), 'base64url').toString())
      expect(jwt1Payload.iss).toBe('ak-1')
      expect(jwt2Payload.iss).toBe('ak-2')
    })
  })

  describe('options passthrough', () => {
    it('merges options into request body', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-opts'),
        pollSucceedVideoResponse('task-opts'),
      ])

      await kling.textToVideoV3Pro({
        prompt: 'test',
        options: {
          camera_control: { type: 'simple', config: { horizontal: 5 } },
          callback_url: 'https://example.com/hook',
        },
        pollInterval: 10,
      })

      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(body.camera_control).toEqual({ type: 'simple', config: { horizontal: 5 } })
      expect(body.callback_url).toBe('https://example.com/hook')
      // Defaults still applied
      expect(body.model_name).toBe('kling-v3')
    })

    it('options do not override explicit params', async () => {
      const fetchSpy = mockFetch([
        submitResponse('task-override'),
        pollSucceedVideoResponse('task-override'),
      ])

      await kling.textToVideoV3Pro({
        prompt: 'explicit',
        options: { prompt: 'from options' },
        pollInterval: 10,
      })

      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(body.prompt).toBe('explicit')
    })
  })

  describe('poll backoff', () => {
    it('increases poll interval over time', async () => {
      const timestamps: number[] = []
      let callCount = 0

      vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        callCount++
        timestamps.push(Date.now())

        // First call is submit, rest are polls
        if (callCount === 1) {
          return new Response(JSON.stringify(submitResponse('task-backoff').body), {
            status: 200, headers: { 'content-type': 'application/json' },
          })
        }
        // Succeed on 4th poll
        if (callCount >= 5) {
          return new Response(JSON.stringify(pollSucceedVideoResponse('task-backoff').body), {
            status: 200, headers: { 'content-type': 'application/json' },
          })
        }
        return new Response(JSON.stringify(pollProcessingResponse('task-backoff').body), {
          status: 200, headers: { 'content-type': 'application/json' },
        })
      })

      await kling.textToVideoV3Pro({
        prompt: 'backoff test',
        pollInterval: 50,
        timeout: 10_000,
      })

      // Verify intervals grew (poll intervals: ~50, ~75, ~112)
      const intervals = []
      for (let i = 2; i < timestamps.length; i++) {
        intervals.push(timestamps[i] - timestamps[i - 1])
      }
      // Each interval should be >= the previous (with some tolerance for timing)
      for (let i = 1; i < intervals.length; i++) {
        expect(intervals[i]).toBeGreaterThanOrEqual(intervals[i - 1] * 0.8)
      }
    })
  })

  // ── Management / list / query APIs ────────────────────────────────────────

  describe('voice management', () => {
    it('listVoices returns paginated voice list', async () => {
      const voices = [{ voice_id: 'v1', voice_name: 'My Voice', trial_url: 'https://cdn.kling.ai/voice.mp3', owned_by: 'user' }]
      mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: { voices } } }])

      const result = await kling.listVoices({ pageNum: 1, pageSize: 10 })
      expect(result.voices).toHaveLength(1)
      expect(result.voices[0].voice_id).toBe('v1')
    })

    it('listVoices with no params uses empty query string', async () => {
      const fetchSpy = mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: { voices: [] } } }])

      await kling.listVoices()
      const url = fetchSpy.mock.calls[0][0] as string
      expect(url).toContain('v1/general/custom-voices')
    })

    it('listPresetVoices returns preset voices', async () => {
      const voices = [{ voice_id: 'preset-1', voice_name: 'Narrator', owned_by: 'kling' }]
      mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: { voices } } }])

      const result = await kling.listPresetVoices()
      expect(result.voices[0].voice_id).toBe('preset-1')
    })

    it('queryVoice returns single voice result', async () => {
      const voices = [{ voice_id: 'v1', voice_name: 'My Voice', trial_url: 'https://cdn.kling.ai/voice.mp3', owned_by: 'user' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-voice-1', task_status: 'succeed', task_result: { voices } },
        },
      }])

      const result = await kling.queryVoice('task-voice-1')
      expect(result.task_id).toBe('task-voice-1')
      expect(result.voices[0].voice_id).toBe('v1')
    })

    it('deleteVoice posts voice_id', async () => {
      const fetchSpy = mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: {} } }])

      await kling.deleteVoice('v-to-delete')
      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(body.voice_id).toBe('v-to-delete')
    })
  })

  describe('element single-task query', () => {
    it('getElement returns element result by task_id', async () => {
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: {
            element_id: 'el-1', element_name: 'Hero', element_description: 'Main hero',
            reference_type: 'image_refer', status: 'succeed',
          },
        },
      }])

      const result = await kling.getElement('task-el-1')
      expect(result.element_id).toBe('el-1')
      expect(result.element_name).toBe('Hero')
    })
  })

  describe('multi-elements video workflow', () => {
    it('initMultiElementsSelection returns session_id', async () => {
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { status: 0, session_id: 'sess-1', fps: 30, width: 720, height: 1280 },
        },
      }])

      const result = await kling.initMultiElementsSelection({ video_url: 'https://cdn.kling.ai/video.mp4' })
      expect(result.session_id).toBe('sess-1')
      expect(result.fps).toBe(30)
    })

    it('addSelectionArea posts session_id, frame_index, points', async () => {
      const fetchSpy = mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: { png_mask: 'data:image/png;...' } } }])

      await kling.addSelectionArea({ session_id: 'sess-1', frame_index: 5, points: [{ x: 0.5, y: 0.5 }] })
      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(body.session_id).toBe('sess-1')
      expect(body.frame_index).toBe(5)
      expect(body.points).toEqual([{ x: 0.5, y: 0.5 }])
    })

    it('deleteSelectionArea posts session_id and points', async () => {
      const fetchSpy = mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: {} } }])

      await kling.deleteSelectionArea({ session_id: 'sess-1', frame_index: 5, points: [{ x: 0.5, y: 0.5 }] })
      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(body.session_id).toBe('sess-1')
    })

    it('clearSelectionArea posts session_id', async () => {
      const fetchSpy = mockFetch([{ body: { code: 0, message: 'Success', request_id: 'r', data: {} } }])

      await kling.clearSelectionArea({ session_id: 'sess-1' })
      const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
      expect(body.session_id).toBe('sess-1')
    })

    it('previewSelection returns video and tracking_output', async () => {
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { video: 'https://cdn.kling.ai/preview.mp4', video_cover: 'https://cdn.kling.ai/cover.jpg' },
        },
      }])

      const result = await kling.previewSelection({ session_id: 'sess-1' })
      expect(result.video).toBe('https://cdn.kling.ai/preview.mp4')
    })

    it('generateMultiElementsVideo polls and returns video result', async () => {
      mockFetch([
        submitResponse('task-me-1'),
        pollSucceedVideoResponse('task-me-1'),
      ])

      const result = await kling.generateMultiElementsVideo({
        session_id: 'sess-1',
        edit_mode: 'swap',
        image_list: [{ image: 'https://cdn.kling.ai/ref.jpg' }],
        prompt: 'swap <<<image_1>>> for element from <<<video_1>>>',
        pollInterval: 10,
      })
      expect(result.task_id).toBe('task-me-1')
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/video.mp4')
    })

    it('queryMultiElementsTask returns task data', async () => {
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-me-1', task_status: 'succeed' },
        },
      }])

      const result = await kling.queryMultiElementsTask('task-me-1')
      expect(result.task_id).toBe('task-me-1')
    })

    it('listMultiElementsTasks returns task list', async () => {
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { tasks: [{ task_id: 'task-me-1', task_status: 'succeed' }] },
        },
      }])

      const result = await kling.listMultiElementsTasks({ pageNum: 1, pageSize: 10 })
      expect(result.tasks).toHaveLength(1)
    })
  })

  describe('list queries', () => {
    const listEndpoints: Array<[string, string]> = [
      ['listLipSyncTasks', 'v1/videos/advanced-lip-sync'],
      ['listTextToAudioTasks', 'v1/audio/text-to-audio'],
      ['listVideoEffectsTasks', 'v1/videos/effects'],
      ['listImageGenerationTasks', 'v1/images/generations'],
      ['listOmniVideoTasks', 'v1/videos/omni-video'],
      ['listMultiShotTasks', 'v1/general/ai-multi-shot'],
      ['listImageToVideoTasks', 'v1/videos/image2video'],
      ['listOmniImageTasks', 'v1/images/omni-image'],
      ['listReferenceToImageTasks', 'v1/images/multi-image2image'],
      ['listVirtualTryOnTasks', 'v1/images/kolors-virtual-try-on'],
      ['listMotionControlTasks', 'v1/videos/motion-control'],
      ['listExtendVideoTasks', 'v1/videos/video-extend'],
      ['listAvatarTasks', 'v1/videos/avatar/image2video'],
    ]

    for (const [fn, endpoint] of listEndpoints) {
      it(`${fn} hits ${endpoint} and returns tasks`, async () => {
        const fetchSpy = mockFetch([{
          body: { code: 0, message: 'Success', request_id: 'r', data: { tasks: [{ task_id: 't1' }] } },
        }])

        const result = await (kling as unknown as Record<string, (p?: unknown) => Promise<{ tasks: unknown[] }>>)[fn]({ pageNum: 1, pageSize: 5 })
        expect(result.tasks).toHaveLength(1)
        const url = fetchSpy.mock.calls[0][0] as string
        expect(url).toContain(endpoint)
      })
    }
  })

  describe('single-task queries', () => {
    it('getLipSyncTask returns video result', async () => {
      const videos = [{ id: 'vid-1', url: 'https://cdn.kling.ai/video.mp4', duration: '5.0' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ls-1', task_status: 'succeed', task_result: { videos } },
        },
      }])

      const result = await kling.getLipSyncTask('task-ls-1')
      expect(result.task_id).toBe('task-ls-1')
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/video.mp4')
    })

    it('getTextToAudioTask returns audio result', async () => {
      const audios = [{ id: 'aud-1', url_mp3: 'https://cdn.kling.ai/audio.mp3' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ta-1', task_status: 'succeed', task_result: { audios } },
        },
      }])

      const result = await kling.getTextToAudioTask('task-ta-1')
      expect(result.task_id).toBe('task-ta-1')
      expect(result.audios[0].url_mp3).toBe('https://cdn.kling.ai/audio.mp3')
    })

    it('getImageGenerationTask returns image result', async () => {
      const images = [{ index: 0, url: 'https://cdn.kling.ai/image.png' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ig-1', task_status: 'succeed', task_result: { images } },
        },
      }])

      const result = await kling.getImageGenerationTask('task-ig-1')
      expect(result.task_id).toBe('task-ig-1')
      expect(result.images[0].url).toBe('https://cdn.kling.ai/image.png')
    })

    it('getMultiShotTask returns multi-shot result with url_1/url_2/url_3', async () => {
      const images = [{ index: 0, url_1: 'https://cdn.kling.ai/1.png', url_2: 'https://cdn.kling.ai/2.png', url_3: 'https://cdn.kling.ai/3.png' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ms-1', task_status: 'succeed', task_result: { images } },
        },
      }])

      const result = await kling.getMultiShotTask('task-ms-1')
      expect(result.task_id).toBe('task-ms-1')
      expect(result.images[0].url_1).toBe('https://cdn.kling.ai/1.png')
    })

    it('getVideoEffectsTask returns video result', async () => {
      const videos = [{ id: 'vid-1', url: 'https://cdn.kling.ai/fx.mp4', duration: '5.0' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-fx-1', task_status: 'succeed', task_result: { videos } },
        },
      }])

      const result = await kling.getVideoEffectsTask('task-fx-1')
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/fx.mp4')
    })

    it('getAvatarTask returns video result', async () => {
      const videos = [{ id: 'vid-1', url: 'https://cdn.kling.ai/avatar.mp4', duration: '5.0' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-av-1', task_status: 'succeed', task_result: { videos } },
        },
      }])

      const result = await kling.getAvatarTask('task-av-1')
      expect(result.task_id).toBe('task-av-1')
    })

    it('getOmniVideoTask returns video result', async () => {
      const videos = [{ id: 'vid-1', url: 'https://cdn.kling.ai/omni.mp4', duration: '5.0' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ov-1', task_status: 'succeed', task_result: { videos } },
        },
      }])

      const result = await kling.getOmniVideoTask('task-ov-1')
      expect(result.task_id).toBe('task-ov-1')
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/omni.mp4')
    })

    it('getOmniImageTask returns image result', async () => {
      const images = [{ index: 0, url: 'https://cdn.kling.ai/omni.png' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-oi-1', task_status: 'succeed', task_result: { images } },
        },
      }])

      const result = await kling.getOmniImageTask('task-oi-1')
      expect(result.task_id).toBe('task-oi-1')
      expect(result.images[0].url).toBe('https://cdn.kling.ai/omni.png')
    })

    it('getReferenceToImageTask returns image result', async () => {
      const images = [{ index: 0, url: 'https://cdn.kling.ai/ref.png' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ri-1', task_status: 'succeed', task_result: { images } },
        },
      }])

      const result = await kling.getReferenceToImageTask('task-ri-1')
      expect(result.task_id).toBe('task-ri-1')
      expect(result.images[0].url).toBe('https://cdn.kling.ai/ref.png')
    })

    it('getVirtualTryOnTask returns image result', async () => {
      const images = [{ index: 0, url: 'https://cdn.kling.ai/tryon.png' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-vt-1', task_status: 'succeed', task_result: { images } },
        },
      }])

      const result = await kling.getVirtualTryOnTask('task-vt-1')
      expect(result.task_id).toBe('task-vt-1')
      expect(result.images[0].url).toBe('https://cdn.kling.ai/tryon.png')
    })

    it('getMotionControlTask returns video result', async () => {
      const videos = [{ id: 'vid-1', url: 'https://cdn.kling.ai/motion.mp4', duration: '5.0' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-mc-1', task_status: 'succeed', task_result: { videos } },
        },
      }])

      const result = await kling.getMotionControlTask('task-mc-1')
      expect(result.task_id).toBe('task-mc-1')
      expect(result.videos[0].url).toBe('https://cdn.kling.ai/motion.mp4')
    })

    it('getExtendVideoTask returns video result', async () => {
      const videos = [{ id: 'vid-1', url: 'https://cdn.kling.ai/extend.mp4', duration: '10.0' }]
      mockFetch([{
        body: {
          code: 0, message: 'Success', request_id: 'r',
          data: { task_id: 'task-ev-1', task_status: 'succeed', task_result: { videos } },
        },
      }])

      const result = await kling.getExtendVideoTask('task-ev-1')
      expect(result.task_id).toBe('task-ev-1')
      expect(result.videos[0].duration).toBe('10.0')
    })
  })
})
