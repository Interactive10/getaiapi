---
name: replicate-fermatresearch-magic-image-refiner
description: >
  Use this skill for the Replicate Magic Image Refiner model (fermatresearch/magic-image-refiner). Use the Magic Image Refiner model via Replicate API.
---

# Magic Image Refiner

**Model:** `fermatresearch/magic-image-refiner`
**Source:** https://replicate.com/fermatresearch/magic-image-refiner
**Version:** `507ddf6f977a7e30e46c0daefd30de7d563c72322f9e4cf7cbac52ef0f667b13`

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

const output = await replicate.run("fermatresearch/magic-image-refiner", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fermatresearch/magic-image-refiner",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fermatresearch/magic-image-refiner/predictions \
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
| `prompt` | string | No |  | Prompt for the model |
| `image` | string (URL) | No |  | Image to refine |
| `mask` | string (URL) | No |  | When provided, refines some section of the image. Must be the same size as the image |
| `resolution` | enum: `original`, `1024`, `2048` | No | `"original"` | Image resolution |
| `resemblance` | float | No | `0.75` | Conditioning scale for controlnet |
| `creativity` | float | No | `0.25` | Denoising strength. 1 means total destruction of the original image |
| `hdr` | float | No | `0` | HDR improvement over the original image |
| `scheduler` | enum: `DDIM`, `DPMSolverMultistep`, `K_EULER_ANCESTRAL`, `K_EULER` | No | `"DDIM"` | Choose a scheduler. |
| `steps` | integer | No | `20` | Steps |
| `guidance_scale` | float | No | `7` | Scale for classifier-free guidance |
| `seed` | integer | No |  | Seed |
| `negative_prompt` | string | No | `"teeth, tooth, open mouth, longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, mutant"` | Negative prompt |
| `guess_mode` | boolean | No | `false` | In this mode, the ControlNet encoder will try best to recognize the content of the input image even if you remove all... |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fermatresearch/magic-image-refiner",
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

- Model page: https://replicate.com/fermatresearch/magic-image-refiner
- API page: https://replicate.com/fermatresearch/magic-image-refiner/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
