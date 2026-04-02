---
name: replicate-zsxkib-instant-id
description: >
  Use this skill for the Replicate Instant Id model (zsxkib/instant-id). Use the Instant Id model via Replicate API.
---

# Instant Id

**Model:** `zsxkib/instant-id`
**Source:** https://replicate.com/zsxkib/instant-id
**Version:** `2e4785a4d80dadf580077b2244c8d7c05d8e3faac04a04c02d8e099dd2876789`

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

const output = await replicate.run("zsxkib/instant-id", {
  input: {
        "image": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/instant-id",
    input={
        "image": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/instant-id/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image": "https://example.com/input.png"}}'
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
| `image` | string (URL) | **Yes** |  | Input face image |
| `pose_image` | string (URL) | No |  | (Optional) reference pose image |
| `prompt` | string | No | `"a person"` | Input prompt |
| `negative_prompt` | string | No | `""` | Input Negative Prompt |
| `sdxl_weights` | enum (17 values) | No | `"stable-diffusion-xl-base-1.0"` | Pick which base weights you want to use |
| `face_detection_input_width` | integer | No | `640` | Width of the input image for face detection |
| `face_detection_input_height` | integer | No | `640` | Height of the input image for face detection |
| `scheduler` | enum: `DEISMultistepScheduler`, `HeunDiscreteScheduler`, `EulerDiscreteScheduler`, `DPMSolverMultistepScheduler`, `DPMSolverMultistepScheduler-Karras`, `DPMSolverMultistepScheduler-Karras-SDE` | No | `"EulerDiscreteScheduler"` | Scheduler |
| `num_inference_steps` | integer | No | `30` | Number of denoising steps |
| `guidance_scale` | float | No | `7.5` | Scale for classifier-free guidance |
| `ip_adapter_scale` | float | No | `0.8` | Scale for image adapter strength (for detail) |
| `controlnet_conditioning_scale` | float | No | `0.8` | Scale for IdentityNet strength (for fidelity) |
| `enable_pose_controlnet` | boolean | No | `true` | Enable Openpose ControlNet, overrides strength if set to false |
| `pose_strength` | float | No | `0.4` | Openpose ControlNet strength, effective only if `enable_pose_controlnet` is true |
| `enable_canny_controlnet` | boolean | No | `false` | Enable Canny ControlNet, overrides strength if set to false |
| `canny_strength` | float | No | `0.3` | Canny ControlNet strength, effective only if `enable_canny_controlnet` is true |
| `enable_depth_controlnet` | boolean | No | `false` | Enable Depth ControlNet, overrides strength if set to false |
| `depth_strength` | float | No | `0.5` | Depth ControlNet strength, effective only if `enable_depth_controlnet` is true |
| `enable_lcm` | boolean | No | `false` | Enable Fast Inference with LCM (Latent Consistency Models) - speeds up inference steps, trade-off is the quality of t... |
| `lcm_num_inference_steps` | integer | No | `5` | Only used when `enable_lcm` is set to True, Number of denoising steps when using LCM |
| `lcm_guidance_scale` | float | No | `1.5` | Only used when `enable_lcm` is set to True, Scale for classifier-free guidance when using LCM |
| `enhance_nonface_region` | boolean | No | `true` | Enhance non-face region |
| `output_format` | enum: `webp`, `jpg`, `png` | No | `"webp"` | Format of the output images |
| `output_quality` | integer | No | `80` | Quality of the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. |
| `seed` | integer | No |  | Random seed. Leave blank to randomize the seed |
| `num_outputs` | integer | No | `1` | Number of images to output |
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
  model: "zsxkib/instant-id",
  input: {
        "image": "https://example.com/input.png"
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

- Model page: https://replicate.com/zsxkib/instant-id
- API page: https://replicate.com/zsxkib/instant-id/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
