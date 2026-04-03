---
name: kling-text-to-video
description: >
  Use this skill for the Kling AI Text to Video API. Generate videos from text prompts with camera control, multi-shot storyboards, and sound generation support.
---

# Kling Text to Video

Generate videos from text prompts with support for camera control, multi-shot storyboards, and simultaneous sound generation.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/text2video`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v1` | Model Name. Enum: `kling-v1`, `kling-v1-6`, `kling-v2-master`, `kling-v2-1-master`, `kling-v2-5-turbo`, `kling-v2-6`, `kling-v3` |
| `multi_shot` | `boolean` | Optional | `false` | Whether to generate multi-shot video. When true: prompt is invalid, first/end frame not supported. When false: shot_type and multi_prompt are invalid. |
| `shot_type` | `string` | Optional |  | Storyboard method. Enum: `customize`, `intelligence`. Required when multi_shot is true. |
| `prompt` | `string` | Optional |  | Positive text prompt. Cannot exceed 2500 characters. Use `<<<voice_1>>>` to specify voice (matching voice_list order). Required when multi_shot is false or shot_type is intelligence. |
| `multi_prompt` | `array` | Optional |  | Storyboard prompts. Up to 6 storyboards, min 1. Max 512 chars per storyboard. Sum of durations must equal total duration. Required when multi_shot is true and shot_type is customize. |
| `multi_prompt[].index` | `int` | Required |  | Shot sequence number |
| `multi_prompt[].prompt` | `string` | Required |  | Prompt for this storyboard |
| `multi_prompt[].duration` | `string` | Required |  | Duration of this storyboard in seconds |
| `negative_prompt` | `string` | Optional |  | Negative text prompt. Cannot exceed 2500 characters. |
| `sound` | `string` | Optional | `off` | Generate sound with video. Enum: `on`, `off` |
| `cfg_scale` | `float` | Optional | `0.5` | Generation freedom. Range: [0, 1]. Higher = less freedom. kling-v2.x models do not support this. |
| `mode` | `string` | Optional | `std` | Video generation mode. Enum: `std` (standard, cost-effective), `pro` (expert/high quality) |
| `camera_control` | `object` | Optional |  | Camera movement control |
| `camera_control.type` | `string` | Optional |  | Camera type. Enum: `simple`, `down_back`, `forward_up`, `right_turn_forward`, `left_turn_forward` |
| `camera_control.config` | `object` | Optional |  | Camera config (required when type is `simple`). Only one parameter can be non-zero. |
| `camera_control.config.horizontal` | `float` | Optional |  | X-axis translation. Range: [-10, 10]. Negative=left, Positive=right |
| `camera_control.config.vertical` | `float` | Optional |  | Y-axis translation. Range: [-10, 10]. Negative=down, Positive=up |
| `camera_control.config.pan` | `float` | Optional |  | Y-axis rotation. Range: [-10, 10]. Negative=left, Positive=right |
| `camera_control.config.tilt` | `float` | Optional |  | X-axis rotation. Range: [-10, 10]. Negative=down, Positive=up |
| `camera_control.config.roll` | `float` | Optional |  | Z-axis rotation. Range: [-10, 10]. Negative=counterclockwise, Positive=clockwise |
| `camera_control.config.zoom` | `float` | Optional |  | Focal length change. Range: [-10, 10]. Negative=longer focal/narrower FOV, Positive=shorter focal/wider FOV |
| `aspect_ratio` | `string` | Optional | `16:9` | Video aspect ratio. Enum: `16:9`, `9:16`, `1:1` |
| `duration` | `string` | Optional | `5` | Video length in seconds. Enum: `3`-`15` |
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

**GET** `/v1/videos/text2video/{task_id}`

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `task_id` | `string` | Optional | Task ID. Choose either task_id or external_task_id. |
| `external_task_id` | `string` | Optional | Custom task ID. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "string",
    "task_status_msg": "string",
    "task_info": { "external_task_id": "string" },
    "task_result": {
      "videos": [
        {
          "id": "string",
          "url": "string",
          "watermark_url": "string",
          "duration": "string"
        }
      ]
    },
    "watermark_info": { "enabled": true },
    "final_unit_deduction": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (List)

**GET** `/v1/videos/text2video`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

---

## Authentication

All requests require a JWT token in the `Authorization` header as a Bearer token. Generate the JWT using your access key (AK) and secret key (SK) with HS256 algorithm. Token validity: 30 minutes.

## Callback Protocol

When `callback_url` is configured, the server sends POST notifications on task status changes. Generated assets are cleared after 30 days.
