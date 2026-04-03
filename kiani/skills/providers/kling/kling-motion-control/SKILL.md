---
name: kling-motion-control
description: >
  Use this skill for the Kling AI Motion Control API. Generate videos where character actions follow a reference motion video while appearance follows a reference image.
---

# Kling Motion Control

Generate videos where character actions follow a reference motion video while the character's appearance, background, and other elements follow a reference image. Supports element references and original sound preservation.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/motion-control`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v2-6` | Model Name. Enum: `kling-v2-6`, `kling-v3` |
| `prompt` | `string` | Optional |  | Text prompt for scene elements, camera effects, etc. Max 2500 characters. |
| `image_url` | `string` | Required |  | Reference image for character appearance and background. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, 300px-65536px, ratio 1:2.5~2.5:1. Character should show clear upper body or full body. |
| `video_url` | `string` | Required |  | Reference motion video. Formats: .mp4/.mov, <=100MB, 340px-3850px. Min 3 seconds. Max depends on character_orientation: `video`=30s, `image`=10s. Character should show clear body with limbs and head visible. |
| `element_list` | `array` | Optional |  | Reference element list. Currently only one element supported. |
| `element_list[].element_id` | `long` | Required |  | Element ID from element library |
| `keep_original_sound` | `string` | Optional | `yes` | Keep original video sound. Enum: `yes`, `no` |
| `character_orientation` | `string` | Required |  | Character orientation source. Enum: `image` (match image orientation, video <=10s), `video` (match video orientation, video <=30s). When referencing elements, only `video` is currently supported. |
| `mode` | `string` | Required |  | Video mode. Enum: `std` (standard), `pro` (professional/high quality) |
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
    "task_info": { "external_task_id": "string" },
    "task_status": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/videos/motion-control/{task_id}`

Returns video result with `videos[].id`, `videos[].url`, `videos[].watermark_url`, `videos[].duration`.

### Query Task (List)

**GET** `/v1/videos/motion-control`

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
