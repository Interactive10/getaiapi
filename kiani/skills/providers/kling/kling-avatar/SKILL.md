---
name: kling-avatar
description: >
  Use this skill for the Kling AI Avatar API. Generate talking avatar videos from a reference image and audio input with configurable actions and emotions.
---

# Kling Avatar

Generate talking avatar videos from a reference image and audio. The avatar's lip movements sync to the audio while actions, emotions, and camera movements can be controlled via text prompts.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/avatar/image2video`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `image` | `string` | Required |  | Avatar reference image. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. |
| `audio_id` | `string` | Optional |  | Audio ID from TTS API. Duration 2-300 seconds, within last 30 days. Mutually exclusive with `sound_file`. |
| `sound_file` | `string` | Optional |  | Sound file (Base64 or URL). Formats: .mp3/.wav/.m4a/.aac, <=5MB. Duration 2-300 seconds. Mutually exclusive with `audio_id`. |
| `prompt` | `string` | Optional |  | Text prompt for avatar actions, emotions, and camera movements. Max 2500 characters. |
| `mode` | `string` | Optional | `std` | Video mode. Enum: `std` (standard, cost-effective), `pro` (professional, higher quality) |
| `watermark_info` | `object` | Optional |  | Watermark config. `{ "enabled": boolean }` |
| `callback_url` | `string` | Optional |  | Callback URL for task status changes |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "string",
    "task_info": { "external_task_id": "string" },
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/videos/avatar/image2video/{task_id}`

Returns video result with `videos[].id`, `videos[].url`, `videos[].watermark_url`, `videos[].duration`.

### Query Task (List)

**GET** `/v1/videos/avatar/image2video`

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
