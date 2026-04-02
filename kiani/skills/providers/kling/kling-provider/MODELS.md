---
name: kling-provider-models
description: >
  Complete reference for all Kling AI model versions, capabilities, and supported features.
  Use when deciding which model_name to use, what modes/durations are supported, or understanding
  version differences. Covers video models (v1 through v3, Omni, O1) and image models.
---

# Kling Provider — Models & Capabilities

## Video Models

### kling-v3 (Latest)

- **Duration:** 3-15s (any integer)
- **Modes:** std, pro
- **Resolution:** std=720p, pro=1080p
- **Frame Rate:** 24fps
- **Key features:**
  - Single-shot and multi-shot (up to 6 storyboards)
  - Start & end frame support
  - Element control (video character + multi-image elements)
  - Motion control (motion brush)
  - Voice control in prompt (via `<<<voice_1>>>` syntax) — coming
- **Endpoints:** text2video, image2video

### kling-v3-omni (Unified)

- **Duration:** 3-15s
- **Modes:** std, pro
- **Key features:**
  - Everything in v3, plus unified prompt-based element references
  - Use `<<<element_1>>>`, `<<<image_1>>>`, `<<<video_1>>>` in prompts
  - Reference video support (3-10s only)
- **Endpoints:** text2video, image2video (same endpoints, different model_name)

### kling-video-o1 (Reasoning)

- **Duration:** 5s, 10s only
- **Modes:** std, pro
- **Key features:**
  - Enhanced reasoning for complex prompts
  - Element control (multi-image elements)
  - Video reference support
  - No voice control
- **Endpoints:** text2video, image2video

### kling-v2-6

- **Duration:** 5s, 10s (std), 3-15s (pro with motion control)
- **Modes:** std, pro
- **Resolution:** std=720p, pro=1080p
- **Key features:**
  - Sound generation (pro mode only)
  - Voice control (pro mode only)
  - Motion control (std 3-15s, pro 3-15s)
  - Start & end frame (pro, no audio)
  - std mode: no audio support

### kling-v2-5-turbo

- **Duration:** 5s, 10s
- **Modes:** std, pro
- **Resolution:** 1080p
- **Key features:**
  - Faster generation (turbo)
  - Start & end frame (pro)

### kling-v2-1

- **Duration:** 5s, 10s
- **Modes:** std, pro
- **Resolution:** std=720p, pro=1080p
- **Frame Rate:** 24fps
- **Key features:**
  - Image-to-video only (no text-to-video)
  - Start & end frame (pro)

### kling-v2-master / kling-v2-1-master

- **Duration:** 5s, 10s
- **Resolution:** 720p (v2), 1080p (v2-1)
- **Mode:** single (no std/pro split)
- **Key features:**
  - Higher quality, single mode
  - Text-to-video and image-to-video

### kling-v1-6

- **Duration:** 5s, 10s
- **Modes:** std, pro
- **Resolution:** std=720p, pro=1080p
- **Frame Rate:** 30fps
- **Key features:**
  - Multi-image to video
  - Multi-elements support
  - Video extension

### kling-v1-5

- **Duration:** 5s, 10s
- **Modes:** std, pro
- **Key features:**
  - Image-to-video only
  - Camera control (simple, pro only)
  - Motion brush (pro only)
  - End frame support (pro)
  - Video extension

### kling-v1

- **Duration:** 5s, 10s
- **Modes:** std, pro
- **Resolution:** 720p
- **Frame Rate:** 30fps
- **Key features:**
  - Text-to-video and image-to-video
  - Camera control (std 5s only)
  - Motion brush (std/pro 5s)
  - Video extension
  - Video effects (hug, kiss, heart gesture)

---

## Image Models

### kling-v3

- **Resolution:** 1K, 2K (custom aspect ratio)
- **Key features:**
  - Text to image
  - Image to image (single)
  - Element control (multi-image elements)
  - Custom aspect ratio only (no intelligent)

### kling-v3-omni

- **Resolution:** 1K, 2K, 4K
- **Key features:**
  - Text to image, image to image
  - Series-image generation (character-consistent sequences)
  - Element control
  - Intelligent aspect ratio support

### kling-image-o1

- **Resolution:** 1K, 2K
- **Key features:**
  - Reasoning-enhanced image generation
  - Element control (multi-image elements)
  - Custom and intelligent aspect ratio

### kling-v2-1

- **Aspect Ratios:** 1:1, 16:9, 4:3, 3:2, 2:3, 3:4, 9:16, 21:9
- **Resolution:** 1K, 2K
- **Key features:**
  - Text to image, image to image
  - Subject reference, face reference
  - Multi-image to image
  - Restyle (inherits input resolution)

### kling-v2 / kling-v2-new

- **Aspect Ratios:** 1:1, 16:9, 4:3, 3:2, 2:3, 3:4, 9:16, 21:9
- **Resolution:** 1K, 2K
- **Key features:**
  - v2: Multi-image to image, restyle
  - v2-new: Restyle only (no text-to-image)

### kling-v1-5

- **Aspect Ratios:** All standard + 21:9
- **Resolution:** 1K
- **Key features:**
  - Subject and face reference
  - `image_reference` parameter: `"subject"` or `"face"`
  - `image_fidelity` and `human_fidelity` controls

### kling-v1

- **Aspect Ratios:** 1:1, 16:9, 4:3, 3:2, 2:3, 3:4, 9:16 (no 21:9)
- **Resolution:** 1K
- **Key features:**
  - Basic text-to-image and image-to-image

---

## Non-Model-Specific Features

These work across all model versions:

| Feature | Supported | Notes |
|---------|-----------|-------|
| **Avatar** | Yes | Single photo → digital human broadcast video |
| **Lip Sync** | Yes | Text or audio driven; works with any Kling video |
| **Video to Audio** | Yes | Add audio to any Kling-generated or uploaded video |
| **Text to Audio** | Yes | Generate sound effects/music from text prompts |
| **TTS** | Yes | Text to speech with multiple voices |
| **Voice Clone** | Yes | Create custom voices from audio samples |
| **Image Expansion** | Yes | Outpainting — extend image in any direction |
| **Virtual Try-On** | Yes | Kolors v1/v1.5 model, separate from kling-v* |
| **Image Recognize** | Yes | Image understanding / description |
| **Video Effects** | Yes | Hug, kiss, heart gesture (dual-character), aging, etc. |
| **Elements** | Yes | Reusable character/object references across tasks |

---

## Model Selection Guide

| Use Case | Recommended Model | Why |
|----------|-------------------|-----|
| **Best quality video** | `kling-v3` pro | Latest, 3-15s, multi-shot, elements |
| **Fast video** | `kling-v2-5-turbo` | Turbo speed, 1080p |
| **Video with sound** | `kling-v2-6` pro | Native sound generation |
| **Unified API** | `kling-v3-omni` | One model, prompt-based references |
| **Reasoning** | `kling-video-o1` / `kling-image-o1` | Complex prompts |
| **Best quality image** | `kling-v3` or `kling-v3-omni` | Up to 4K |
| **Image with face ref** | `kling-v2-1` | Subject + face reference |
| **Virtual try-on** | `kolors-virtual-try-on-v1-5` | Specialized model |

---

## Duration Support Matrix (Video)

| Model | 3s | 4s | 5s | 6s | 7s | 8s | 9s | 10s | 11-15s |
|-------|----|----|----|----|----|----|----|----|--------|
| kling-v3 | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro |
| kling-v3-omni | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro | std/pro |
| kling-video-o1 | - | - | std/pro | - | - | - | - | std/pro | - |
| kling-v2-6 | - | - | std/pro | - | - | - | - | std/pro | pro (motion only) |
| kling-v2-5-turbo | - | - | std/pro | - | - | - | - | std/pro | - |
| kling-v2-1 | - | - | std/pro | - | - | - | - | std/pro | - |
| kling-v1-6 | - | - | std/pro | - | - | - | - | std/pro | - |
| kling-v1 | - | - | std/pro | - | - | - | - | std/pro | - |
