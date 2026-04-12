---
name: kling-image-to-video
description: >
  Use this skill for the Kling AI Image to Video API. Generate videos from reference images with first/end frame control, motion brush, camera control, multi-shot storyboards, and element/voice references.
---

# Kling Image to Video

Generate videos from reference images with support for first/end frame control, motion brush (static and dynamic masks), camera control, multi-shot storyboards, element references, and voice references.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/image2video`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v1` | Model Name. Enum: `kling-v1`, `kling-v1-5`, `kling-v1-6`, `kling-v2-master`, `kling-v2-1`, `kling-v2-1-master`, `kling-v2-5-turbo`, `kling-v2-6`, `kling-v3` |
| `image` | `string` | Optional |  | Reference image (first frame). Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. At least one of `image` or `image_tail` must be provided. When using Base64, do NOT add prefix. |
| `image_tail` | `string` | Optional |  | End frame control image. Same format requirements as `image`. Mutually exclusive with `dynamic_masks`/`static_mask` and `camera_control`. |
| `multi_shot` | `boolean` | Optional | `false` | Whether to generate multi-shot video. When true: prompt is invalid, first/end frame not supported. |
| `shot_type` | `string` | Optional |  | Storyboard method. Enum: `customize`, `intelligence`. Required when multi_shot is true. |
| `prompt` | `string` | Optional |  | Positive text prompt. Max 2500 chars. Use `<<<voice_1>>>` to specify voice. Required when multi_shot is false or shot_type is intelligence. |
| `multi_prompt` | `array` | Optional |  | Storyboard prompts. Up to 6 storyboards. Required when multi_shot is true and shot_type is customize. |
| `multi_prompt[].index` | `int` | Required |  | Shot sequence number |
| `multi_prompt[].prompt` | `string` | Required |  | Prompt for this shot (max 512 chars) |
| `multi_prompt[].duration` | `string` | Required |  | Duration in seconds |
| `negative_prompt` | `string` | Optional |  | Negative text prompt. Max 2500 chars. |
| `element_list` | `array` | Optional |  | Reference element list. Max 3 elements. Mutually exclusive with voice_list. |
| `element_list[].element_id` | `long` | Required |  | Element ID from element library |
| `voice_list` | `array` | Optional |  | Voice references. Max 2 voices. Mutually exclusive with element_list. |
| `voice_list[].voice_id` | `string` | Required |  | Voice ID (from custom voices API or system presets) |
| `sound` | `string` | Optional | `off` | Generate sound. Enum: `on`, `off` |
| `cfg_scale` | `float` | Optional | `0.5` | Prompt reference strength. Range: [0, 1]. Not supported by kling-v2.x models. |
| `mode` | `string` | Optional | `std` | Video mode. Enum: `std` (standard), `pro` (professional/high quality) |
| `static_mask` | `string` | Optional |  | Static brush mask area. Supports Base64 or URL. Must match input image aspect ratio. |
| `dynamic_masks` | `array` | Optional |  | Dynamic brush configs. Up to 6 groups. |
| `dynamic_masks[].mask` | `string` | Required |  | Dynamic brush mask image. Must match input image aspect ratio. |
| `dynamic_masks[].trajectories` | `array` | Required |  | Motion trajectory coordinates. For 5s video, max 77 points, min 2. Origin: bottom-left of image. |
| `dynamic_masks[].trajectories[].x` | `int` | Required |  | X coordinate (pixels from bottom-left) |
| `dynamic_masks[].trajectories[].y` | `int` | Required |  | Y coordinate (pixels from bottom-left) |
| `camera_control` | `object` | Optional |  | Camera movement control |
| `camera_control.type` | `string` | Required |  | Enum: `simple`, `down_back`, `forward_up`, `right_turn_forward`, `left_turn_forward` |
| `camera_control.config` | `object` | Optional |  | Required when type is `simple`. Only one param can be non-zero. |
| `camera_control.config.horizontal` | `float` | Optional |  | X-axis translation. Range: [-10, 10] |
| `camera_control.config.vertical` | `float` | Optional |  | Y-axis translation. Range: [-10, 10] |
| `camera_control.config.pan` | `float` | Optional |  | Y-axis rotation. Range: [-10, 10] |
| `camera_control.config.tilt` | `float` | Optional |  | X-axis rotation. Range: [-10, 10] |
| `camera_control.config.roll` | `float` | Optional |  | Z-axis rotation. Range: [-10, 10] |
| `camera_control.config.zoom` | `float` | Optional |  | Focal length change. Range: [-10, 10] |
| `duration` | `string` | Optional | `5` | Video duration in seconds. Enum: `3`-`15` |
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

**GET** `/v1/videos/image2video/{task_id}`

Returns task status and result with video URLs, watermark URLs, and duration.

### Query Task (List)

**GET** `/v1/videos/image2video`

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
