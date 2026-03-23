---
name: replicate-openai-gpt-image-1.5
description: >
  Use this skill for the Replicate Gpt Image 1.5 model (openai/gpt-image-1.5). Use the Gpt Image 1.5 model via Replicate API.
---

# Gpt Image 1.5

**Model:** `openai/gpt-image-1.5`
**Source:** https://replicate.com/openai/gpt-image-1.5
**Version:** `118f53498ea7319519229b2d5bd0d4a69e3d77eb60d6292d5db38125534dc1ca`

---

## Quick Start

### 1. Install the Client

```bash
npm install replicate
```

### 2. Set Your API Token

```bash
export REPLICATE_API_TOKEN="YOUR_API_TOKEN"
```

### 3. Run the Model

```javascript
import Replicate from "replicate";

const replicate = new Replicate();

const output = await replicate.run("openai/gpt-image-1.5", {
  input: {
        "prompt": "your prompt here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/gpt-image-1.5",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/gpt-image-1.5/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here"}}'
```

---

## Authentication

Set the `REPLICATE_API_TOKEN` environment variable, or pass directly:

```javascript
const replicate = new Replicate({ auth: "YOUR_API_TOKEN" });
```

```python
import replicate
client = replicate.Client(api_token="YOUR_API_TOKEN")
```

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `prompt` | string | **Yes** |  | A text description of the desired image |
| `openai_api_key` | string | No |  | Your OpenAI API key (optional - uses proxy if not provided) |
| `aspect_ratio` | enum: `1:1`, `3:2`, `2:3` | No | `"1:1"` | The aspect ratio of the generated image |
| `input_fidelity` | enum: `low`, `high` | No | `"low"` | Control how much effort the model will exert to match the style and features, especially facial features, of input im... |
| `input_images` | list<> | No |  | A list of images to use as input for the generation |
| `number_of_images` | integer | No | `1` | Number of images to generate (1-10) |
| `quality` | enum: `low`, `medium`, `high`, `auto` | No | `"auto"` | The quality of the generated image |
| `background` | enum: `auto`, `transparent`, `opaque` | No | `"auto"` | Set whether the background is transparent or opaque or choose automatically |
| `output_compression` | integer | No | `90` | Compression level (0-100%) |
| `output_format` | enum: `png`, `jpeg`, `webp` | No | `"webp"` | Output format |
| `moderation` | enum: `auto`, `low` | No | `"auto"` | Content moderation level |
| `user_id` | string | No |  | An optional unique identifier representing your end-user. This helps OpenAI monitor and detect abuse. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/gpt-image-1.5",
  input: {
        "prompt": "your prompt here"
    },
  webhook: "https://optional.webhook.url/for/results",
  webhook_events_filter: ["completed"],
});
console.log(prediction.id);
```

### Get Prediction Status

```javascript
const prediction = await replicate.predictions.get("<prediction_id>");
console.log(prediction.status); // starting, processing, succeeded, failed, canceled
console.log(prediction.output);
```

### Cancel Prediction

```javascript
await replicate.predictions.cancel("<prediction_id>");
```

---

## Tips

- `replicate.run()` is the simplest way — it polls until the prediction completes.
- Use `replicate.predictions.create()` + webhooks for production workloads.
- File inputs accept URLs or base64-encoded data URIs.
- Use `replicate.stream()` for models that support streaming output.

## References

- Model page: https://replicate.com/openai/gpt-image-1.5
- API page: https://replicate.com/openai/gpt-image-1.5/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
