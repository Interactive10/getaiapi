# Tasks

## Current
<!-- No active tasks — all 30 tasks complete -->

## Upcoming
<!-- No upcoming tasks — project complete -->

---

## Done

### PHASE 0: FOUNDATION (COMPLETED)

## task-1: Project Bootstrap
**Status:** done
**Results:** package.json, tsconfig.json, vitest.config.ts, tsup.config.ts created. npm run build and npm test pass. Zero runtime deps.

## task-2: Type Definitions
**Status:** done
**Results:** src/types.ts (all interfaces), src/errors.ts (6 error classes), exported from src/index.ts. Build clean.

## task-3: Skill Cataloger Script
**Status:** done
**Results:** scripts/catalog.ts parses all 1,952 skills (2 skipped). 16 categories detected. 22 cross-provider duplicates found. Output: registry/catalog.json.

## task-4: Registry Generator Script
**Status:** done
**Results:** scripts/generate-registry.ts produces registry.json (1,929 models, 2,524 aliases, 22 multi-provider). Output: registry/registry.json + categories.json.

## task-5: Auth Manager
**Status:** done
**Results:** src/auth.ts with AuthManager class. 7 unit tests passing.

## task-6: fal-ai Provider Adapter
**Status:** done
**Results:** src/adapters/base.ts + src/adapters/fal-ai.ts using native fetch. submitAndPoll with adaptive polling. 10 unit tests passing.

## task-7: Text-to-Image Category Template
**Status:** done
**Results:** src/categories/text-to-image.ts with 10 param mappings. src/categories/index.ts with getCategoryTemplate(). Build clean.

## task-8: Input/Output Mapper
**Status:** done
**Results:** src/mapper.ts with mapInput() and mapOutput(). Handles flip_boolean, parse_size transforms. 21 unit tests passing.

## task-9: Model Resolver
**Status:** done
**Results:** src/resolver.ts with 4-step resolution (exact, alias, normalized, normalized alias). Suggestions on no match. 15 unit tests passing.

## task-10: Gateway Orchestration
**Status:** done
**Results:** src/gateway.ts with full pipeline (resolve -> auth -> map -> submit -> poll -> output). 8 integration tests passing.

## task-11: Public API & Exports
**Status:** done
**Results:** src/index.ts exports generate, listModels, getModel + all types/errors. src/discovery.ts with filtering. Build clean.

## task-12: End-to-End Integration Test
**Status:** done
**Results:** 73 tests passing, 1 skipped (live E2E). tsc --noEmit clean. Phase 0 acceptance gate PASSED.

### PHASE 1: MULTI-PROVIDER (COMPLETED)

## task-13: Replicate Provider Adapter
**Status:** done
**Results:** src/adapters/replicate.ts with submit/poll/parseOutput. Content-type inference from URL extension. 13 unit tests. Registered in gateway.

## task-14: WaveSpeed Provider Adapter
**Status:** done
**Results:** src/adapters/wavespeed.ts with v3 API, data-nested response handling. 13 unit tests. Registered in gateway.

## task-15: Provider Routing
**Status:** done
**Results:** Gateway selects first available provider per binding order. 9 integration tests for all key combinations.

## task-16: Cross-Provider Registry Verification
**Status:** done
**Results:** Registry verified: all 3 providers present, 22 cross-provider models, correct grouping. 9 integration tests.

## task-17: Phase 1 Acceptance Tests
**Status:** done
**Results:** 117 tests passing. All providers working. Phase 1 gate PASSED.

### PHASE 2: EXPAND MODALITIES (COMPLETED)

## task-18: image-edit Category
**Status:** done
**Results:** src/categories/image-edit.ts with image+prompt input mappings.

## task-19: text-to-video Category
**Status:** done
**Results:** src/categories/text-to-video.ts with 5-min timeout, video output paths.

## task-20: image-to-video Category
**Status:** done
**Results:** src/categories/image-to-video.ts with image input + video output.

## task-21: upscale-image Category
**Status:** done
**Results:** src/categories/upscale-image.ts with strength/scale mapping.

## task-22: text-to-audio Category
**Status:** done
**Results:** src/categories/text-to-audio.ts with prompt->text mapping for TTS.

## task-23: audio-to-text Category
**Status:** done
**Results:** src/categories/audio-to-text.ts with audio input, text output.

## task-24: remove-background Category
**Status:** done
**Results:** src/categories/remove-background.ts with image input.

## task-25: Remaining Categories
**Status:** done
**Results:** 8 more templates: image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation, training. All 16 categories covered.

## task-26: Phase 2 Acceptance Tests
**Status:** done
**Results:** 186 tests passing. 69 category template tests. All 16 categories registered. Phase 2 gate PASSED.

### PHASE 3: POLISH (COMPLETED)

## task-27: README & Documentation
**Status:** done
**Results:** Full README.md with quick start, examples, API reference, category table, provider table, error handling docs.

## task-28: Error Handling & Retry Logic
**Status:** done
**Results:** src/retry.ts with withRetry() wrapper. Exponential backoff, jitter, rate limit handling. 9 unit tests. Integrated into gateway.

## task-29: CLI Tool
**Status:** done
**Results:** src/cli.ts with generate/list/info commands using node:util parseArgs. Zero deps. bin field in package.json.

## task-30: npm Publish Preparation
**Status:** done
**Results:** package.json complete (license, keywords, engines, repository). LICENSE file. .npmignore. npm pack: 15 files, 104.9 kB. Ready to publish.

## Bugs
<!-- Bug reports go here -->
