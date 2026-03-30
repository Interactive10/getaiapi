---
name: replicate-tencentarc-photomaker-style
description: >
  Use this skill for the Replicate Photomaker Style model (tencentarc/photomaker-style). Use the Photomaker Style model via Replicate API.
---

# Photomaker Style

**Model:** `tencentarc/photomaker-style`
**Source:** https://replicate.com/tencentarc/photomaker-style
**Version:** `467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769`

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

const output = await replicate.run("tencentarc/photomaker-style", {
  input: {
        "input_image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("tencentarc/photomaker-style",
    input={
        "input_image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/tencentarc/photomaker-style/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input_image": "https://example.com/input.png"}}'
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
| `input_image` | string (URL) | **Yes** |  | The input image, for example a photo of your face. |
| `input_image2` | string (URL) | No |  | Additional input image (optional) |
| `input_image3` | string (URL) | No |  | Additional input image (optional) |
| `input_image4` | string (URL) | No |  | Additional input image (optional) |
| `prompt` | string | No | `"A photo of a person img"` | Prompt. Example: 'a photo of a man/woman img'. The phrase 'img' is the trigger word. |
| `style_name` | enum (11 values) | No | `"(No style)"` | Style template. The style template will add a style-specific prompt and negative prompt to the user's prompt. |
| `negative_prompt` | string | No | `"nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"` | Negative Prompt. The negative prompt should NOT contain the trigger word. |
| `num_steps` | integer | No | `20` | Number of sample steps |
| `style_strength_ratio` | float | No | `20` | Style strength (%) |
| `num_outputs` | integer | No | `1` | Number of output images |
| `guidance_scale` | float | No | `5` | Guidance scale. A guidance scale of 1 corresponds to doing no classifier free guidance. |
| `seed` | integer | No |  | Seed. Leave blank to use a random number |
| `disable_safety_checker` | boolean | No | `false` | Disable safety checker for generated images. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "tencentarc/photomaker-style",
  input: {
        "input_image": "https://example.com/input.png"
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

- Model page: https://replicate.com/tencentarc/photomaker-style
- API page: https://replicate.com/tencentarc/photomaker-style/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
