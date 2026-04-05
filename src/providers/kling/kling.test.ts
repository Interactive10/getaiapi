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
    it('exports 70 model functions plus configure', () => {
      const functionKeys = Object.keys(kling).filter(k => typeof (kling as Record<string, unknown>)[k] === 'function')
      // 70 model functions + 1 configure = 71
      expect(functionKeys).toHaveLength(71)
      expect(functionKeys).toContain('configure')
      expect(functionKeys).toContain('textToVideoV3Pro')
      expect(functionKeys).toContain('imageO1')
      expect(functionKeys).toContain('tts')
      expect(functionKeys).toContain('virtualTryOn')
      expect(functionKeys).toContain('identifyFace')
      expect(functionKeys).toContain('imageRecognize')
      expect(functionKeys).toContain('referenceToVideo')
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
    it('submits and polls for audio result', async () => {
      mockFetch([
        submitResponse('task-5'),
        pollSucceedAudioResponse('task-5'),
      ])

      const result = await kling.videoToAudio({
        video_url: 'https://example.com/video.mp4',
        sound_effect_prompt: 'ocean waves',
        pollInterval: 10,
      })

      expect(result.task_id).toBe('task-5')
      expect(result.audios).toHaveLength(1)
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
})
