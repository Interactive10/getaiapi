---
name: replicate-comfyui-any-comfyui-workflow
description: >
  Use this skill for the Replicate Any Comfyui Workflow model (comfyui/any-comfyui-workflow). Use the Any Comfyui Workflow model via Replicate API.
---

# Any Comfyui Workflow

**Model:** `comfyui/any-comfyui-workflow`
**Source:** https://replicate.com/comfyui/any-comfyui-workflow
**Version:** `16d0a881fbfc066f0471a3519a347db456fe8cbcbd53abb435a50a74efaeb427`

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

const output = await replicate.run("comfyui/any-comfyui-workflow", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("comfyui/any-comfyui-workflow",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/comfyui/any-comfyui-workflow/predictions \
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
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `input_file` | string (URL) | No |  | Input image, video, tar or zip file. Read guidance on workflows and input files here: https://github.com/replicate/co... |
| `workflow_json` | string | No | `""` | Your ComfyUI workflow as JSON string or URL. You must use the API version of your workflow. Get it from ComfyUI using... |
| `output_quality` | integer | No | `95` | Quality of the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. |
| `randomise_seeds` | boolean | No | `true` | Automatically randomise seeds (seed, noise_seed, rand_seed) |
| `force_reset_cache` | boolean | No | `false` | Force reset the ComfyUI cache before running the workflow. Useful for debugging. |
| `return_temp_files` | boolean | No | `false` | Return any temporary files, such as preprocessed controlnet images. Useful for debugging. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "comfyui/any-comfyui-workflow",
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

- Model page: https://replicate.com/comfyui/any-comfyui-workflow
- API page: https://replicate.com/comfyui/any-comfyui-workflow/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
