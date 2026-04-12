---
name: kling-reference-to-video
description: >
  Use this skill for the Kling AI Multi-Image to Video API. Generate videos from multiple reference images with subject consistency across frames.
---

# Kling Multi-Image to Video (Reference to Video)

Generate videos from multiple reference images with subject consistency. Upload up to 4 pre-cropped subject images with text prompts to create videos.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/multi-image2video`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v1-6` | Model Name. Enum: `kling-v1-6` |
| `image_list` | `array` | Required |  | Reference images. Max 4 images. Upload pre-cropped images (no API-side cropping). |
| `image_list[].image` | `string` | Required |  | Image URL or Base64. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. When using Base64, do NOT add prefix. |
| `prompt` | `string` | Required |  | Positive text prompt. Max 2500 characters. |
| `negative_prompt` | `string` | Optional |  | Negative text prompt. Max 2500 characters. |
| `mode` | `string` | Optional | `std` | Video mode. Enum: `std` (standard), `pro` (professional) |
| `duration` | `string` | Optional | `5` | Video duration in seconds. Enum: `5`, `10` |
| `aspect_ratio` | `string` | Optional | `16:9` | Aspect ratio. Enum: `16:9`, `9:16`, `1:1` |
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
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/videos/multi-image2video/{task_id}`

Returns video result with `videos[].id`, `videos[].url`, `videos[].watermark_url`, `videos[].duration`.

### Query Task (List)

**GET** `/v1/videos/multi-image2video`

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
