---
name: kling-multi-elements-video
description: >
  Use this skill for the Kling AI Multi-Elements Video Editing API. Replace or remove elements within existing videos using interactive point-based selection and mask tracking.
---

# Kling Multi-Elements Video Editing

Replace or remove elements within existing videos. This is a multi-step interactive workflow: initialize a video, select areas by clicking points on frames, preview selections with masks, then create the final editing task.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Step 1: Initialize Video

**POST** `/v1/videos/multi-elements/init-selection`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `video_id` | `string` | Optional |  | Kling AI generated video ID. Only videos within 30 days. Duration: 2-5s or 7-10s. Mutually exclusive with `video_url`. |
| `video_url` | `string` | Optional |  | Upload video URL. Formats: .mp4/.mov. Duration: 2-5s or 7-10s. Resolution: 720px-2160px. Frame rate: 24/30/60fps. Mutually exclusive with `video_id`. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "status": 0,
    "session_id": "string",
    "final_unit_deduction": "string",
    "fps": 30.0,
    "original_duration": 1000,
    "width": 720,
    "height": 1280,
    "total_frame": 300,
    "normalized_video": "url"
  }
}
```

### Step 2: Add Selection Area

**POST** `/v1/videos/multi-elements/add-selection`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `session_id` | `string` | Required |  | Session ID from initialization |
| `frame_index` | `int` | Required |  | Frame number. Max 10 frames can be marked. Only 1 frame at a time. |
| `points` | `array` | Required |  | Click coordinates. Values [0, 1] as percentages. [0, 0] = top-left. Max 10 points per frame. |
| `points[].x` | `float` | Required |  | X coordinate [0-1] |
| `points[].y` | `float` | Required |  | Y coordinate [0-1] |

#### Response

Returns RLE mask data (`rle_mask`) and PNG mask (`png_mask`) for each detected object.

### Step 3: Delete Selection Area

**POST** `/v1/videos/multi-elements/delete-selection`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `session_id` | `string` | Required |  | Session ID |
| `frame_index` | `int` | Required |  | Frame number |
| `points` | `array` | Required |  | Coordinates to delete. Must exactly match add-selection coordinates. |
| `points[].x` | `float` | Required |  | X coordinate [0-1] |
| `points[].y` | `float` | Required |  | Y coordinate [0-1] |

### Step 4: Clear All Selections

**POST** `/v1/videos/multi-elements/clear-selection`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `session_id` | `string` | Required |  | Session ID |

### Step 5: Preview Selection

**POST** `/v1/videos/multi-elements/preview-selection`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `session_id` | `string` | Required |  | Session ID |

#### Response

Returns `video` (video with mask overlay), `video_cover` (cover image), and `tracking_output` (per-frame mask results).

### Step 6: Create Editing Task

**POST** `/v1/videos/multi-elements`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v1-6` | Model name. Enum: `kling-v1-6` |
| `session_id` | `string` | Required |  | Session ID from initialization, unchanged during editing operations |
| `edit_mode` | `string` | Required |  | Operation type. Enum: `addition`, `swap`, `removal` |
| `image_list` | `array` | Optional |  | Cropped reference images. Required for `addition` (1–2 images) and `swap` (exactly 1 image). Not needed for `removal`. Format: `[{ "image": "url_or_base64" }]`. Formats: .jpg/.jpeg/.png. Size: ≤10MB. Dimensions: ≥300px. Aspect ratio: 1:2.5 to 2.5:1. |
| `image_list[].image` | `string` | Required (if image_list provided) |  | Image URL or Base64 string (raw, no `data:` prefix) |
| `prompt` | `string` | Required |  | Positive prompt. Use `<<<video_1>>>` and `<<<image_1>>>` to reference inputs. Max 2,500 characters. |
| `negative_prompt` | `string` | Optional |  | Negative prompt. Max 2,500 characters. |
| `mode` | `string` | Optional | `std` | Video generation mode. Enum: `std` (standard, cost-effective), `pro` (high-quality, enhanced rendering) |
| `duration` | `string` | Optional | `5` | Video duration in seconds. Enum: `5`, `10`. For 5s: input must be 2-5s. For 10s: input must be 7-10s. |
| `watermark_info` | `object` | Optional |  | Watermark config. Format: `{ "enabled": boolean }` |
| `callback_url` | `string` | Optional |  | Callback URL for task status notifications |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user. |

#### edit_mode reference

| Mode | image_list | Description |
|------|-----------|-------------|
| `addition` | Required, 1–2 images | Add an element from reference images into the video |
| `swap` | Required, exactly 1 image | Replace an element in the video with one from the reference image |
| `removal` | Not required | Remove a selected element from the video |

#### Prompt templates

**addition:** `Using the context of <<<video_1>>>, seamlessly add [element] from <<<image_1>>>`

**swap:** `swap [element] from <<<image_1>>> for [element] from <<<video_1>>>`

**removal:** `Delete [element] from <<<video_1>>>`

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

`task_status` enum: `submitted`, `processing`, `succeed`, `failed`

### Query Task (Single)

**GET** `/v1/videos/multi-elements/{task_id}`

### Query Task (List)

**GET** `/v1/videos/multi-elements`

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
