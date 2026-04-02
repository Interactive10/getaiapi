---
name: fal-ai-beatoven-sound-effect-generation
description: >
  Use this skill for the fal.ai Sound Effect Generation model (beatoven/sound-effect-generation). Create professional-grade sound effects from animal and vehicle to nature, sci-fi, and otherworldly sounds. Perfect for films, games, and digital content.
---

# Sound Effect Generation

Create professional-grade sound effects from animal and vehicle to nature, sci-fi, and otherworldly sounds. Perfect for films, games, and digital content.

**Endpoint:** `beatoven/sound-effect-generation`
**Source:** https://fal.ai/models/beatoven/sound-effect-generation/api

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

const result = await fal.subscribe("beatoven/sound-effect-generation", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Describe the sound effect you want to generate |
| `duration` | float | No | `5` | Length of the generated sound effect in seconds |
| `refinement` | integer | No | `40` | Refinement level - Higher values may improve quality but take longer |
| `seed` | integer | null | No |  | Random seed for reproducible results - leave empty for random generation |
| `negative_prompt` | string | No | `""` | Describe the types of sounds you don't want to generate in the output, avoid double-negatives, compare with positive ... |
| `creativity` | float | No | `16` | Creativity level - higher values allow more creative interpretation of the prompt |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The processed prompt used for generation |
| `metadata` | Metadata | Generation metadata including duration, sample rate, and parameters |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("beatoven/sound-effect-generation", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("beatoven/sound-effect-generation", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("beatoven/sound-effect-generation", {
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

- API page: https://fal.ai/models/beatoven/sound-effect-generation/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=beatoven/sound-effect-generation
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
