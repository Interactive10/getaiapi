---
name: replicate-lucataco-animate-diff
description: >
  Use this skill for the Replicate Animate Diff model (lucataco/animate-diff). Use the Animate Diff model via Replicate API.
---

# Animate Diff

**Model:** `lucataco/animate-diff`
**Source:** https://replicate.com/lucataco/animate-diff
**Version:** `beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f`

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

const output = await replicate.run("lucataco/animate-diff", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/animate-diff",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/animate-diff/predictions \
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
| `motion_module` | enum: `mm_sd_v14`, `mm_sd_v15`, `mm_sd_v15_v2` | No | `"mm_sd_v14"` | Select a Motion Model |
| `path` | enum: `toonyou_beta3.safetensors`, `lyriel_v16.safetensors`, `rcnzCartoon3d_v10.safetensors`, `majicmixRealistic_v5Preview.safetensors`, `realisticVisionV40_v20Novae.safetensors` | No | `"toonyou_beta3.safetensors"` | Select a Module |
| `prompt` | string | No | `"masterpiece, best quality, 1girl, solo, cherry blossoms, hanami, pink flower, white flower, spring season, wisteria, petals, flower, plum blossoms, outdoors, falling petals, white hair, black eyes"` | Input prompt |
| `n_prompt` | string | No | `""` | Negative prompt |
| `steps` | integer | No | `25` | Number of inference steps |
| `guidance_scale` | float | No | `7.5` | guidance scale |
| `seed` | integer | No |  | Seed (0 = random, maximum: 2147483647) |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/animate-diff",
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

- Model page: https://replicate.com/lucataco/animate-diff
- API page: https://replicate.com/lucataco/animate-diff/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
