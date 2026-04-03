---
name: kling-voice-clone
description: >
  Use this skill for the Kling AI Custom Voice (Voice Clone) API. Create, query, and manage custom voice clones from audio or video sources.
---

# Kling Custom Voice (Voice Clone)

Create custom voice clones from audio files or video references. Manage voice library with create, query, list, and delete operations. Custom voices can be used in video generation with voice references and lip-sync tasks.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Custom Voice

**POST** `/v1/general/custom-voices`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `voice_name` | `string` | Required |  | Voice name. Max 20 characters. |
| `voice_url` | `string` | Optional |  | URL of voice data file. Supports .mp3/.wav audio and .mp4/.mov video. Voice must be clean, single voice, 5-30 seconds. |
| `video_id` | `string` | Optional |  | Generated video ID for audio source. Only supports: V2.6 videos with sound=on, Avatar API videos, Lip-Sync API videos. Voice must be clean, single voice, 5-30 seconds. |
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

### Query Custom Voice (Single)

**GET** `/v1/general/custom-voices/{task_id}`

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
      "voices": [
        {
          "voice_id": "string",
          "voice_name": "string",
          "trial_url": "string",
          "owned_by": "kling"
        }
      ]
    },
    "final_unit_deduction": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Custom Voice (List)

**GET** `/v1/general/custom-voices`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 1000] |

### Query Preset Voices (List)

**GET** `/v1/general/presets-voices`

Returns official preset voices from the Kling voice library.

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 1000] |

### Delete Custom Voice

**POST** `/v1/general/delete-voices`

#### Request Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `voice_id` | `string` | Required | ID of the voice to delete. Only custom voices can be deleted. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "string"
  }
}
```

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.

## Callback Protocol

POST notifications on task status changes when callback_url is configured.
