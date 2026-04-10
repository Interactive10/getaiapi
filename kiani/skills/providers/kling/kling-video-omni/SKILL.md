---
name: kling-video-omni
description: >
  Use this skill for the Kling AI Omni-Video API. Generate videos using multi-modal prompts combining text, images, elements, and reference videos with support for video editing, multi-shot storyboards, and first/end frame control.
---

# Kling Omni-Video

Generate videos using multi-modal prompts combining text, images, elements, and reference videos. Supports video editing (base reference), video style/camera reference (feature reference), multi-shot storyboards, first/end frame control, and sound generation.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/omni-video`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-video-o1` | Model Name. Enum: `kling-video-o1`, `kling-v3-omni` |
| `multi_shot` | `boolean` | Optional | `false` | Generate multi-shot video. When true: prompt is invalid, start/end frames not supported. |
| `shot_type` | `string` | Optional |  | Storyboard method. Enum: `customize`, `intelligence`. Required when multi_shot is true. |
| `prompt` | `string` | Optional |  | Text prompt. Max 2500 characters. Use `<<<image_1>>>`, `<<<element_1>>>`, `<<<video_1>>>`, `<<<voice_1>>>` to reference assets. `<<<voice_N>>>` follows the same sequence as `voice_list`; use simple grammar (e.g. `The man <<<voice_1>>> said, "Hello."`). When `voice_list` is provided and a voice is referenced, billed as "with voice generation". Required when multi_shot is false or shot_type is intelligence. |
| `multi_prompt` | `array` | Optional |  | Storyboard prompts. Up to 6 storyboards. Required when multi_shot is true and shot_type is customize. |
| `multi_prompt[].index` | `int` | Required |  | Shot sequence number |
| `multi_prompt[].prompt` | `string` | Required |  | Prompt (max 512 chars) |
| `multi_prompt[].duration` | `string` | Required |  | Duration in seconds |
| `image_list` | `array` | Optional |  | Reference images. Can serve as element/scene/style references or as first/end frames. Formats: .jpg/.jpeg/.png, <=10MB, min 300px. With reference video: sum of images+elements <=4. Without: <=7. |
| `image_list[].image_url` | `string` | Required |  | Image URL or Base64 |
| `image_list[].type` | `string` | Optional |  | Frame type. Enum: `first_frame`, `end_frame`. Only set when using as start/end frame. |
| `voice_list` | `array` | Optional |  | Reference voices. Up to 2. When used, `sound` must be `on`. Reference in prompt via `<<<voice_1>>>`, `<<<voice_2>>>` (same sequence as array). Task billed as "with voice generation" when prompt references a voice. |
| `voice_list[].voice_id` | `string` | Required |  | Voice ID |
| `element_list` | `array` | Optional |  | Reference elements. Max 3 with first frame; kling-v3-omni supports 3 with start+end frames. With reference video: sum of images+elements <=4. Without: <=7. |
| `element_list[].element_id` | `long` | Required |  | Element ID |
| `video_list` | `array` | Optional |  | Reference videos. Max 1 video. Formats: MP4/MOV, >=3s, 720px-2160px, 24-60fps, <=200MB. When present, sound parameter can only be `off`. |
| `video_list[].video_url` | `string` | Required |  | Video URL |
| `video_list[].refer_type` | `string` | Optional | `base` | Reference type. Enum: `feature` (reference video style/camera/content), `base` (video to edit) |
| `video_list[].keep_original_sound` | `string` | Optional |  | Keep original sound. Enum: `yes`, `no` |
| `sound` | `string` | Optional | `off` | Generate sound. Enum: `on`, `off` |
| `mode` | `string` | Optional | `pro` | Video mode. Enum: `std`, `pro` |
| `aspect_ratio` | `string` | Optional |  | Aspect ratio. Enum: `16:9`, `9:16`, `1:1`. Required when not using first-frame or video editing. |
| `duration` | `string` | Optional | `5` | Duration in seconds. Enum: `3`-`15`. Invalid when using video editing (output matches input video duration). |
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

**GET** `/v1/videos/omni-video/{task_id}`

Returns video result with `videos[].id`, `videos[].url`, `videos[].watermark_url`, `videos[].duration`.

### Query Task (List)

**GET** `/v1/videos/omni-video`

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
