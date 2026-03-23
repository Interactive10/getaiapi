---
name: fal-ai-sonauto-v2-text-to-music
description: >
  Use this skill for the fal.ai Sonauto V2 model (sonauto/v2/text-to-music). Create full songs in any style
---

# Sonauto V2

Create full songs in any style

**Endpoint:** `sonauto/v2/text-to-music`
**Source:** https://fal.ai/models/sonauto/v2/text-to-music/api

---

## Quick Start

### 1. Install the Client

```bash
npm install --save @fal-ai/client
```

### 2. Set Your API Key

```bash
export FAL_KEY="YOUR_API_KEY"
```

### 3. Submit a Request

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("sonauto/v2/text-to-music", {
  input: {
        "prompt": "your prompt here"
      },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((l) => l.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

---

## Authentication

Set the `FAL_KEY` environment variable, or configure in code:

```javascript
import { fal } from "@fal-ai/client";
fal.config({ credentials: "YOUR_FAL_KEY" });
```

> **Important:** When running client-side, use a server-side proxy to protect your API key.

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prompt` | string | null | No |  | A description of the track you want to generate. This prompt will be used to automatically generate the tags and lyri... |
| `lyrics_prompt` | string | null | No |  | The lyrics sung in the generated song. An empty string will generate an instrumental track. |
| `tags` | list<string> | null | No |  | Tags/styles of the music to generate. You can view a list of all available tags at https://sonauto.ai/tag-explorer. |
| `prompt_strength` | float | No | `2` | Controls how strongly your prompt influences the output. Greater values adhere more to the prompt but sound less natu... |
| `output_bit_rate` | enum: `128`, `192`, `256`, `320` | null | No |  | The bit rate to use for mp3 and m4a formats. Not available for other formats. |
| `num_songs` | integer | No | `1` | Generating 2 songs costs 1.5x the price of generating 1 song. Also, note that using the same seed may not result in i... |
| `output_format` | enum: `flac`, `mp3`, `wav`, `ogg`, `m4a` | No | `"wav"` |  |
| `bpm` | integer | string | null | No | `"auto"` | The beats per minute of the song. This can be set to an integer or the literal string "auto" to pick a suitable bpm b... |
| `balance_strength` | float | No | `0.7` | Greater means more natural vocals. Lower means sharper instrumentals. We recommend 0.7. |
| `seed` | integer | null | No |  | The seed to use for generation. Will pick a random seed if not provided. Repeating a request with identical parameter... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `tags` | list<string> | null | The style tags used for generation. |
| `seed` | integer | The seed used for generation. This can be used to generate an identical song by passing the same parameters with this... |
| `lyrics` | string | null | The lyrics used for generation. |
| `audio` | list<File> | The generated audio files. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("sonauto/v2/text-to-music", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("sonauto/v2/text-to-music", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("sonauto/v2/text-to-music", {
  requestId: "<request_id>",
});
console.log(result.data);
```

---

## Tips

- Use `fal.subscribe` for quick scripts; use queue API for production workloads.
- Set `webhookUrl` on queue submit to get notified when processing completes.
- File inputs accept URLs, Base64 data URIs, or uploaded files via `fal.storage.upload(file)`.

## References

- API page: https://fal.ai/models/sonauto/v2/text-to-music/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=sonauto/v2/text-to-music
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
