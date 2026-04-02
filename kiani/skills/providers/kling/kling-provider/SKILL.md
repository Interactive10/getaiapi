---
name: kling-provider
description: >
  Master index for all Kling AI provider skills. Use this to find the right sub-skill when implementing
  the direct Kling provider for getaiapi. Covers setup, adapter implementation, auth, registry entries,
  models/capabilities, and param mapping.
---

# Kling AI Provider — Skill Index

## Sub-Skills

| Skill | File | When to use |
|-------|------|-------------|
| **Setup & Integration** | [SETUP.md](SETUP.md) | Adding Kling as a provider to getaiapi — types, auth, adapter registration, env vars |
| **Adapter Implementation** | [ADAPTER.md](ADAPTER.md) | Writing `src/adapters/kling.ts` — JWT auth, submit/poll/parseOutput, error handling |
| **Models & Capabilities** | [MODELS.md](MODELS.md) | Which models exist, what they support, version differences, mode/duration matrix |
| **Registry & Param Map** | [REGISTRY.md](REGISTRY.md) | Adding Kling provider bindings to registry.json — param_map, output_map, endpoint paths |

## Quick Reference

- **API Domain:** `https://api-singapore.klingai.com`
- **Auth:** JWT (HS256) with Access Key + Secret Key
- **Env Vars:** `KLING_ACCESS_KEY` + `KLING_SECRET_KEY`
- **Pattern:** Async — POST create → GET poll → result in `task_result`
- **Statuses:** `submitted` → `processing` → `succeed` / `failed`
- **Result expiry:** 30 days

## API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/videos/text2video` | POST / GET | Text to video |
| `/v1/videos/image2video` | POST / GET | Image to video, reference, motion control, elements |
| `/v1/videos/video-extend` | POST / GET | Extend video |
| `/v1/videos/lip-sync` | POST / GET | Lip sync |
| `/v1/videos/avatar` | POST / GET | Digital avatar |
| `/v1/videos/effects` | POST / GET | Video effects |
| `/v1/images/generations` | POST / GET | Image generation (text + image to image) |
| `/v1/images/image-expansion` | POST / GET | Extend/outpaint image |
| `/v1/images/ai-multi-shot` | POST / GET | Multi-shot series |
| `/v1/images/kolors-virtual-try-on` | POST / GET | Virtual try-on |
| `/v1/images/image-recognize` | POST / GET | Image understanding |
| `/v1/audios/generation` | POST / GET | Text to audio |
| `/v1/audios/video2audio` | POST / GET | Video to audio |
| `/v1/audios/tts` | POST / GET | Text to speech |
| `/v1/audios/voice-clone` | POST / GET | Voice cloning |
| `/v1/elements` | POST / GET / DELETE | Element management |
