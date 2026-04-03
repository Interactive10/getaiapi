---
name: kling-element
description: >
  Use this skill for the Kling AI Element Library API. Create, query, and manage custom elements (characters, objects) from images or videos for use in generation tasks.
---

# Kling Element Library

Create, query, and manage custom elements (characters, objects) from images or videos. Elements can be referenced in image and video generation tasks. Supports image-based and video-based element customization with optional voice binding and tagging.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Element

**POST** `/v1/general/advanced-custom-elements`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `element_name` | `string` | Required |  | Element name. Max 20 characters. |
| `element_description` | `string` | Required |  | Element description. Max 100 characters. |
| `reference_type` | `string` | Required |  | Reference method. Enum: `video_refer` (video character elements), `image_refer` (multi-image elements). |
| `element_image_list` | `object` | Optional |  | Image references. Required when `reference_type` is `image_refer`. |
| `element_image_list.frontal_image` | `string` | Required |  | Front reference image URL or Base64. At least one required. |
| `element_image_list.refer_images` | `array` | Optional |  | Additional reference images (1-3). Different angles or close-ups. |
| `element_image_list.refer_images[].image_url` | `string` | Required |  | Image URL |
| `element_video_list` | `object` | Optional |  | Video references. Required when `reference_type` is `video_refer`. |
| `element_video_list.refer_videos` | `array` | Required |  | Reference videos. Max 1 video. |
| `element_video_list.refer_videos[].video_url` | `string` | Required |  | Video URL. Formats: .mp4/.mov. Duration 3s-8s, 1080P, ratio 16:9 or 9:16. Size <=200MB. |
| `element_voice_id` | `string` | Optional |  | Voice ID to bind to element. Obtained via voice API. |
| `tag_list` | `array` | Optional |  | Tags for the element. Tag IDs: `o_101` (Hottest), `o_102` (Character), `o_103` (Animal), `o_104` (Item), `o_105` (Costume), `o_106` (Scene), `o_107` (Effect), `o_108` (Others). |
| `tag_list[].tag_id` | `string` | Required |  | Tag ID |
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

### Query Custom Element (Single)

**GET** `/v1/general/advanced-custom-elements/{task_id}`

Returns element details including `element_id`, `element_name`, `element_description`, `reference_type`, image/video lists, voice info, tags, `owned_by`, and `status`.

### Query Custom Element (List)

**GET** `/v1/general/advanced-custom-elements`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

### Query Preset Elements (List)

**GET** `/v1/general/advanced-presets-elements`

Returns official preset elements from the Kling element library.

### Delete Custom Element

**POST** `/v1/general/delete-elements`

#### Request Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `element_id` | `string` | Required | ID of the element to delete. Only custom elements can be deleted. |

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.

## Callback Protocol

POST notifications on task status changes when callback_url is configured.
