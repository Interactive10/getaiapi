# Lessons Learned

Record of mistakes and the rules created to prevent them from recurring.

<!-- Add lessons below as they occur -->

## 2026-03-09: Don't act without being asked

**Mistake**: User gave feedback/vented frustration. Instead of listening, I immediately ran tests and burned tokens on commands nobody asked for.

**Rule**: When the user gives feedback or expresses frustration, STOP and LISTEN. Do not run tools, do not "check what's broken", do not try to fix things proactively. Wait for explicit instructions.

## 2026-03-09: Don't change approach without permission

**Mistake**: User asked for a fallback approach on Replicate 404s. After implementing it, I independently decided to rewrite it to a completely different approach ("always use version-based") without being asked, breaking tests in the process.

**Rule**: Once an approach is agreed on and implemented, do NOT change it to a different approach unless the user explicitly asks. If you see a potential improvement, suggest it — don't just do it.

## 2026-03-11: Recurring registry bugs — be proactive, not reactive

**Mistake**: User has reported the same class of bugs repeatedly across sessions:

1. Duplicate entries across providers that should be merged
2. Wrong categories (e.g., text-to-video for models that take video+image input)
3. Wrong modality inputs (e.g., `[text]` for models that require video/image)
4. Missing category templates causing 422 errors at runtime
5. Categories in registry that don't exist in code (video-to-video had 96 entries but no template)

**Rule**: BEFORE any publish or after any registry change, run the validation checklist (see tasks/registry-qa.md). Don't wait for the user to discover these bugs.

## 2026-03-11: Sloppy git staging

**Mistake**: Used `git add` carelessly, accidentally including unrelated files (scripts/shared.ts, scripts/catalog.ts) in commits. Had to undo and redo commits twice.

**Rule**: Always use `git diff --name-only` after staging and BEFORE committing to verify exactly which files are included. Never rely on `git add <file>` alone — always verify.

## 2026-03-11: NEVER commit or mention committing

**Mistake**: Kept asking "want me to commit?" and suggesting commits after every change without being asked.

**Rule**: NEVER commit unless the user explicitly says "commit". NEVER ask about committing or suggest it. The user will tell you when. This is P1.

## 2026-03-11: generate-registry.ts overwrites manual fixes

**Mistake**: Ran `scripts/generate-registry.ts` to test it works, which regenerated `registry.json` from skills, overwriting all manual category/modality/merge fixes. Had to redo all fixes a second time.

**Rule**: NEVER run `generate-registry.ts` after making manual registry fixes unless you re-apply fixes afterward. The script generates from SKILL.md files and does not preserve manual overrides (merges, category corrections, modality fixes). If you must run it, diff the output against the previous version and re-apply any manual fixes.

## 2026-03-13: Never use names as absolute indicators

**Mistake**: When auditing skills for input/output modality, used parameter names (e.g. `image_url`, `video_url`) to determine what a skill accepts/produces. Names are unreliable — parameters can have generic names like `url`, `source`, `elements` that don't reveal modality.

**Rule**: NEVER use names (file names, parameter names, variable names, skill IDs) as the absolute or sole source of truth for determining what something is or does. Names are hints at best. Always read the actual content, schema, types, or documentation to determine ground truth.

## 2026-03-13: Don't suggest shortcuts for thorough work

**Mistake**: User asked to audit skills 5 at a time, reading each file carefully. After 20, suggested writing a script to speed things up — undermining the whole point of doing it carefully and thoroughly.

**Rule**: When the user asks for a methodical, thorough process, do it. Don't suggest automating or shortcutting it. The reason they want it done manually is precisely because scripts already failed. Just do the work.

## 2026-03-13: Don't fix discovered issues without asking

**Mistake**: When asked to do a task, discovered a related issue and jumped ahead to fix it without informing the user or asking for input.

**Rule**: When you discover an issue while working on a task, STOP and report it to the user. Do NOT fix it on your own. Describe what you found and ask for input on how to proceed. The user decides what gets fixed and when.

## 2026-03-16: Phantom params from copy-paste templates

**Mistake**: pixverse-swap had `prompt`, `guidance`, `steps`, and `safety` in its param_map — none of which exist on the actual model. They were copied from a generic template without verifying against the real schema.

**Rule**: When adding or auditing a model's param_map, ALWAYS verify every param against the actual SKILL.md schema. Remove any params that don't exist on the model. Generic templates are starting points, not final truth.

## 2026-03-16: Track unique unified param names for future unification

**Mistake**: New unified param names (`mode`, `keyframe`) were introduced for pixverse-swap without documenting them, making it hard to connect the dots when other models need similar params later.

**Rule**: When introducing a unified param name that currently maps to only one model, document it here so future work can find and reuse or consolidate these names. Current unique unified params:
- `mode` → pixverse-swap (`mode` = person/object/background swap mode), kling-video-v3-pro-motion-control/replicate (`mode` = std/pro quality mode)
- `keyframe` → pixverse-swap (`keyframe_id` = frame ID for face/object mapping)
- `keep_audio` → pixverse-swap (`original_sound_switch`), wan-v2.2-14b-animate-replace/replicate (`merge_audio`), also used across kling-video models (`keep_audio`, `keep_original_sound`) — ready for cross-model unification.
- `shift` → wan-v2.2-14b-animate-replace/fal-ai (`shift` = classifier shift value 1.0-10.0)
- `video_write_mode` → wan-v2.2-14b-animate-replace/fal-ai (`video_write_mode` = fast/balanced/small)
- `video_quality` → wan-v2.2-14b-animate-replace/fal-ai (`video_quality` = low/medium/high/maximum)
- `turbo` → wan-v2.2-14b-animate-replace: fal-ai (`use_turbo`), replicate (`go_fast`) — cross-provider unification already done.
- `output_safety` → wan-v2.2-14b-animate-replace/fal-ai (`enable_output_safety_checker` = post-generation safety check)
- `return_frames_zip` → wan-v2.2-14b-animate-replace/fal-ai (`return_frames_zip` = also return frame archive)
- `character_orientation` → kling-video-v3-pro-motion-control: fal-ai + replicate (`character_orientation` = image/video orientation matching)
- `elements` → kling-video-v3-pro-motion-control/fal-ai (`elements` = facial consistency binding elements)
- `safety_tolerance` → nano-banana-2/fal-ai (`safety_tolerance` = 1-6 content moderation level)
- `web_search` → nano-banana-2: fal-ai (`enable_web_search`), replicate (`google_search`) — cross-provider unification done.
- `image_search` → nano-banana-2/replicate (`image_search` = Google Image Search grounding)
- `thinking_level` → nano-banana-2/fal-ai (`thinking_level` = minimal/high model thinking)
- `aspect_ratio` → nano-banana-2: fal-ai + replicate (`aspect_ratio`) — direct passthrough on both.
- `voice_id` → pixverse-lipsync/fal-ai (`voice_id` = TTS voice selection, 15 options)
- `text` → pixverse-lipsync/fal-ai (`text` = TTS text content when no audio provided)

## 2026-03-16: Multi-provider unified naming — audit results and known gaps

**Context**: Audited all 86 multi-provider models. 80/86 have perfectly matching unified keys across providers. The convention is working well.

**Known gaps to fix when capacity allows**:
1. **5 LLM models** (claude-haiku-4-5, claude-opus-4-6, deepseek-v3, gpt-4o, gpt-4o-mini) — Replicate has empty `{}` param_maps while OpenRouter has `prompt`. Needs investigation into how replicate text-generation is handled.
2. **Replicate `safety` semantics** — 346 models use `disable_safety_checker` (correct, mapper inverts), but 36 models use `enable_safety_checker` which would get double-inverted. Needs audit.
3. **Replicate `strength` overloading** — maps to `strength`, `prompt_strength`, or `scale` depending on model type. Consider splitting into `strength` (editing) vs `upscale_factor` (upscaling) in future.

**Rule**: When adding a new multi-provider model, always ensure the same set of unified keys appears on every provider entry. If a param only exists on one provider, that's fine — just don't put phantom params on the provider that doesn't support it. Same concept, same unified key, different provider values.
