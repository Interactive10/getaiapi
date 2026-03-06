---
name: replicate-fofr-become-image
description: >
  Use this skill for the Replicate Become Image model (fofr/become-image). Use the Become Image model via Replicate API.
---

# Become Image

**Model:** `fofr/become-image`
**Source:** https://replicate.com/fofr/become-image
**Version:** `8d0b076a2aff3904dfcec3253c778e0310a68f78483c4699c7fd800f3051d2b3`

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

const output = await replicate.run("fofr/become-image", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/become-image",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/become-image/predictions \
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
| `image` | string (URL) | No |  | An image of a person to be converted |
| `image_to_become` | string (URL) | No |  | Any image to convert the person to |
| `prompt` | string | No | `"a person"` |  |
| `negative_prompt` | string | No | `""` | Things you do not want in the image |
| `number_of_images` | integer | No | `2` | Number of images to generate |
| `denoising_strength` | float | No | `1` | How much of the original image of the person to keep. 1 is the complete destruction of the original image, 0 is the o... |
| `prompt_strength` | float | No | `2` | Strength of the prompt. This is the CFG scale, higher numbers lead to stronger prompt, lower numbers will keep more o... |
| `control_depth_strength` | float | No | `0.8` | Strength of depth controlnet. The bigger this is, the more controlnet affects the output. |
| `instant_id_strength` | float | No | `1` | How strong the InstantID will be. |
| `image_to_become_strength` | float | No | `0.75` | How strong the style will be applied |
| `image_to_become_noise` | float | No | `0.3` | How much noise to add to the style image before processing. An alternative way of controlling stength. |
| `seed` | integer | No |  | Fix the random seed for reproducibility |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/become-image",
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

- Model page: https://replicate.com/fofr/become-image
- API page: https://replicate.com/fofr/become-image/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
