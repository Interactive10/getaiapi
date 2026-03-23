---
name: fal-ai-bria-replace-background
description: >
  Use this skill for the fal.ai Replace Background model (bria/replace-background). Creates enriched product shots by placing them in various environments using textual descriptions.
---

# Replace Background

Creates enriched product shots by placing them in various environments using textual descriptions.

**Endpoint:** `bria/replace-background`
**Source:** https://fal.ai/models/bria/replace-background/api

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

const result = await fal.subscribe("bria/replace-background", {
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
| `prompt` | string | null | No |  | Prompt for background replacement. |
| `steps_num` | integer | No | `30` | Number of inference steps. |
| `sync_mode` | boolean | No | `false` | If true, returns the image directly in the response (increases latency). |
| `seed` | integer | No | `4925634` | Random seed for reproducibility. |
| `negative_prompt` | string | No | `""` | Negative prompt for background replacement. |
| `image_url` | string | null | No | `"https://v3b.fal.media/files/b/0a8bea8c/Mztgx0NG3HPdby-4iPqwH_a_coffee_machine_standing_in_the_kitchen.png"` | Reference image (file or URL). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<object> | Generated images. |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bria/replace-background", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bria/replace-background", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bria/replace-background", {
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

- API page: https://fal.ai/models/bria/replace-background/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bria/replace-background
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
