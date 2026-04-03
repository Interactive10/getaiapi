---
name: kling-lip-sync
description: >
  Use this skill for the Kling AI Lip-Sync API. Synchronize lip movements in videos to audio, with face identification, audio cropping, and volume control.
---

# Kling Lip-Sync

Synchronize lip movements in videos to provided audio. This is a multi-step process: first identify faces in the video, then create a lip-sync task with audio and timing parameters.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Step 1: Identify Face

**POST** `/v1/videos/identify-face`

Identifies faces in a video and returns face data with timing information.

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `video_id` | `string` | Optional |  | Kling AI generated video ID. Mutually exclusive with `video_url`. Only supports videos within 30 days, max 60 seconds. |
| `video_url` | `string` | Optional |  | Video URL. Mutually exclusive with `video_id`. Formats: .mp4/.mov, <=100MB, 2s-60s, 720p/1080p, 512px-2160px. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "session_id": "string",
    "final_unit_deduction": "string",
    "face_data": [
      {
        "face_id": "string",
        "face_image": "url",
        "start_time": 0,
        "end_time": 5200
      }
    ]
  }
}
```

### Step 2: Create Lip-Sync Task

**POST** `/v1/videos/advanced-lip-sync`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `session_id` | `string` | Required |  | Session ID from the identify-face step |
| `face_choose` | `array` | Required |  | Face selection for lip-sync. Currently supports one person only. |
| `face_choose[].face_id` | `string` | Required |  | Face ID from identify-face response |
| `face_choose[].audio_id` | `string` | Optional |  | Audio ID from TTS API. Duration 2s-60s, within last 30 days. Mutually exclusive with `sound_file`. |
| `face_choose[].sound_file` | `string` | Optional |  | Audio file (Base64 or URL). Formats: .mp3/.wav/.m4a/.aac, <=5MB. Duration 2s-60s. Mutually exclusive with `audio_id`. |
| `face_choose[].sound_start_time` | `long` | Required |  | Audio crop start time in ms. Cropped audio must be >=2s. |
| `face_choose[].sound_end_time` | `long` | Required |  | Audio crop end time in ms. Must not exceed original duration. |
| `face_choose[].sound_insert_time` | `long` | Required |  | Time to insert audio in video (ms). Must overlap with face's lip-sync interval for >=2s. Must be within video duration. |
| `face_choose[].sound_volume` | `float` | Optional | `1` | Inserted audio volume. Range: [0, 2] |
| `face_choose[].original_audio_volume` | `float` | Optional | `1` | Original video volume. Range: [0, 2]. No effect if source video is silent. |
| `watermark_info` | `object` | Optional |  | Watermark config. `{ "enabled": boolean }` |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user. |
| `callback_url` | `string` | Optional |  | Callback URL for task status changes |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_info": { "external_task_id": "string" },
    "task_status": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/videos/advanced-lip-sync/{task_id}`

Returns video result with original video info (`parent_video`) and generated lip-synced video.

### Query Task (List)

**GET** `/v1/videos/advanced-lip-sync`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.

## Callback Protocol

POST notifications on task status changes when callback_url is configured. Generated assets cleared after 30 days.
