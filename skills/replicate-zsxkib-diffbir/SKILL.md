---
name: replicate-zsxkib-diffbir
description: >
  Use this skill for the Replicate Diffbir model (zsxkib/diffbir). Use the Diffbir model via Replicate API.
---

# Diffbir

**Model:** `zsxkib/diffbir`
**Source:** https://replicate.com/zsxkib/diffbir
**Version:** `51ed1464d8bbbaca811153b051d3b09ab42f0bdeb85804ae26ba323d7a66a4ac`

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

const output = await replicate.run("zsxkib/diffbir", {
  input: {
        "input": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/diffbir",
    input={
        "input": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/diffbir/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input": "your value here"}}'
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
| `input` | string (URL) | **Yes** |  | Path to the input image you want to enhance. |
| `upscaling_model_type` | enum: `faces`, `general_scenes` | No | `"general_scenes"` | Choose the type of model best suited for the primary content of the image: 'faces' for portraits and 'general_scenes'... |
| `restoration_model_type` | enum: `faces`, `general_scenes` | No | `"general_scenes"` | Select the restoration model that aligns with the content of your image. This model is responsible for image restorat... |
| `reload_restoration_model` | boolean | No | `false` | Reload the image restoration model (SwinIR) if set to True. This can be useful if you've updated or changed the under... |
| `steps` | integer | No | `50` | The number of enhancement iterations to perform. More steps might result in a clearer image but can also introduce ar... |
| `super_resolution_factor` | integer | No | `4` | Factor by which the input image resolution should be increased. For instance, a factor of 4 will make the resolution ... |
| `repeat_times` | integer | No | `1` | Number of times the enhancement process is repeated by feeding the output back as input. This can refine the result b... |
| `disable_preprocess_model` | boolean | No | `false` | Disables the initial preprocessing step using SwinIR. Turn this off if your input image is already of high quality an... |
| `tiled` | boolean | No | `false` | Whether to use patch-based sampling. This can be useful for very large images to enhance them in smaller chunks rathe... |
| `tile_size` | integer | No | `512` | Size of each tile (or patch) when 'tiled' option is enabled. Determines how the image is divided during patch-based e... |
| `tile_stride` | integer | No | `256` | Distance between the start of each tile when the image is divided for patch-based enhancement. A smaller stride means... |
| `use_guidance` | boolean | No | `false` | Use latent image guidance for enhancement. This can help in achieving more accurate and contextually relevant enhance... |
| `guidance_scale` | float | No | `0` | For 'general_scenes': Scale factor for the guidance mechanism. Adjusts the influence of guidance on the enhancement p... |
| `guidance_time_start` | integer | No | `1001` | For 'general_scenes': Specifies when (at which step) the guidance mechanism starts influencing the enhancement. |
| `guidance_time_stop` | integer | No | `-1` | For 'general_scenes': Specifies when (at which step) the guidance mechanism stops influencing the enhancement. |
| `guidance_space` | enum: `rgb`, `latent` | No | `"latent"` | For 'general_scenes': Determines in which space (RGB or latent) the guidance operates. 'latent' can often provide mor... |
| `guidance_repeat` | integer | No | `5` | For 'general_scenes': Number of times the guidance process is repeated during enhancement. |
| `color_fix_type` | enum: `wavelet`, `adain`, `none` | No | `"wavelet"` | Method used for color correction post enhancement. 'wavelet' and 'adain' offer different styles of color correction, ... |
| `seed` | integer | No | `231` | Random seed to ensure reproducibility. Setting this ensures that multiple runs with the same input produce the same o... |
| `has_aligned` | boolean | No | `false` | For 'faces' mode: Indicates if the input images are already cropped and aligned to faces. If not, the model will atte... |
| `only_center_face` | boolean | No | `false` | For 'faces' mode: If multiple faces are detected, only enhance the center-most face in the image. |
| `face_detection_model` | enum: `retinaface_resnet50`, `retinaface_mobile0.25`, `YOLOv5l`, `YOLOv5n`, `dlib` | No | `"retinaface_resnet50"` | For 'faces' mode: Model used for detecting faces in the image. Choose based on accuracy and speed preferences. |
| `background_upsampler` | enum: `DiffBIR`, `RealESRGAN` | No | `"RealESRGAN"` | For 'faces' mode: Model used to upscale the background in images where the primary subject is a face. |
| `background_upsampler_tile` | integer | No | `400` | For 'faces' mode: Size of each tile used by the background upsampler when dividing the image into patches. |
| `background_upsampler_tile_stride` | integer | No | `400` | For 'faces' mode: Distance between the start of each tile when the background is divided for upscaling. A smaller str... |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/diffbir",
  input: {
        "input": "your value here"
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

- Model page: https://replicate.com/zsxkib/diffbir
- API page: https://replicate.com/zsxkib/diffbir/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
