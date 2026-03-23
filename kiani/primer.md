# Session Primer — 2026-03-18

## What Was Done

### 1. Location Angle Image Upload (staged, not committed)
- New API: `src/app/[locale]/api/locations/[id]/upload-image/route.ts` — multipart form, validates type/size, uploads to R2, updates visualReference.angles
- Updated `LocationAngleGrid.tsx` AngleCard — added `onUpload`, `isBusy`, hidden file input, `handleUpload`
- Added `location: 'locations'` to `ENTITY_TYPE_PREFIX` in `Storage.ts`
- Added i18n keys (`upload`, `upload_failed`) in en.json + fr.json

### 2. Video Retry/Timeout Bug Investigation & Fix (unstaged)
- **Root cause found:** Vercel Pro kills serverless functions at 300s. Kling takes 6+ min. Cron blocks on `generate()`, gets killed, job orphaned, retried 3x = $3 burned per video.
- **Interim fixes applied:**
  - `VideoGeneration.ts`: timeout 600s → 1200s (band-aid until Task 90)
  - `JobProcessor.ts`: `isRetryableError()` rewritten — only retries on explicit provider input rejections (allowlist), everything else fails permanently
  - `JobProcessor.ts`: `STALE_THRESHOLD_MS` 10min → 25min (temporary, revert in Task 90)
  - `process-jobs/route.ts`: added `export const maxDuration = 300`
- **Lesson 9 updated**, **Lesson 18 added** in `tasks/lessons.md`

### 3. Task 90 — Async Job Processing (Submit + Poll Across Cron Cycles)
- Created comprehensive task covering all 12 provider-calling job types
- Documents how getaiapi `submit()` / `poll()` works (alpha.4)
- Blocker resolved: getaiapi@1.0.0-alpha.4 installed with `submit`, `poll`, `submitAndPoll` exports
- Architecture: submit in cron cycle 1, poll in cycle 2+, never block

## Current State
- Branch: `main`
- **Staged:** Location upload feature (7 files)
- **Unstaged:** Video timeout fixes + getaiapi upgrade + Task 90 (6 files + 1 untracked)
- Nothing committed or pushed yet

## Key Decisions
- Retry logic flipped from blocklist (non-retryable) to allowlist (only provider rejections retryable)
- All 12 external-provider job types will convert to async submit/poll (Task 90)
- Exceptions: `storyboard_video` (FFmpeg local), LLM/OpenRouter calls (fast, synchronous, not queued)
- getaiapi upgraded from alpha.3 → alpha.4

## Golden rule
- Before starting anything always read context fully and make sure to 100% follow instruction.
