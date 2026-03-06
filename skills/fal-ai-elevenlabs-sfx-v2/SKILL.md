---
name: fal-elevenlabs-sfx-v2
description: Generate sound effects using the fal.ai ElevenLabs Sound Effects V2 API. Use when the user wants to create, generate, or produce sound effects, audio SFX, or ambient sounds from text descriptions. Triggers include any mention of 'sound effect', 'SFX', 'generate audio', 'sound design', or requests to turn text into sound/audio. JS only.
---

# fal.ai ElevenLabs Sound Effects V2

Generate sound effects from text descriptions using the fal.ai hosted ElevenLabs Sound Effects V2 model.

**Endpoint**: `fal-ai/elevenlabs/sound-effects/v2`

## Setup

Install the fal.ai client:

```bash
npm install --save @fal-ai/client
```

Set your API key as an environment variable:

```bash
export FAL_KEY="YOUR_API_KEY"
```

Or configure it in code:

```js
import { fal } from '@fal-ai/client';

fal.config({
  credentials: 'YOUR_FAL_KEY'
});
```

> **Security**: Never expose `FAL_KEY` in client-side code. Use a server-side proxy for browser/mobile apps. See https://docs.fal.ai/model-endpoints/server-side

## Basic Usage — Subscribe (Recommended)

`fal.subscribe` handles queue submission, polling, and result retrieval automatically.

```js
import { fal } from '@fal-ai/client';

const result = await fal.subscribe('fal-ai/elevenlabs/sound-effects/v2', {
  input: {
    text: 'Spacious braam suitable for high-impact movie trailer moments'
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === 'IN_PROGRESS') {
      update.logs.map(log => log.message).forEach(console.log);
    }
  },
});

// result.data.audio.url → URL of the generated audio file
console.log(result.data.audio.url);
```

## Streaming

Stream results in real-time:

```js
import { fal } from '@fal-ai/client';

const stream = await fal.stream('fal-ai/elevenlabs/sound-effects/v2', {
  input: {
    text: 'Thunder rolling across a mountain valley'
  }
});

for await (const event of stream) {
  console.log(event);
}

const result = await stream.done();
console.log(result.audio.url);
```

## Queue API (Manual Control)

For long-running requests or webhook-based workflows:

```js
import { fal } from '@fal-ai/client';

// 1. Submit
const { request_id } = await fal.queue.submit('fal-ai/elevenlabs/sound-effects/v2', {
  input: {
    text: 'Glass shattering on a marble floor'
  },
  webhookUrl: 'https://your-server.com/webhook' // optional
});

// 2. Check status
const status = await fal.queue.status('fal-ai/elevenlabs/sound-effects/v2', {
  requestId: request_id,
  logs: true,
});

// 3. Get result
const result = await fal.queue.result('fal-ai/elevenlabs/sound-effects/v2', {
  requestId: request_id
});
console.log(result.data.audio.url);
```

## Input Schema

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | `string` | **Yes** | — | Text describing the sound effect to generate |
| `duration_seconds` | `float` | No | auto | Duration in seconds (0.5–22). If omitted, optimal duration is determined from the prompt |
| `prompt_influence` | `float` | No | `0.3` | How closely to follow the prompt (0–1). Higher = less variation |
| `output_format` | `string` | No | `"mp3_44100_128"` | Output audio format (see formats below) |
| `loop` | `boolean` | No | `false` | Whether to create a seamlessly looping sound effect |

### Output Formats

Format string pattern: `codec_sampleRate_bitrate`

**MP3**: `mp3_22050_32`, `mp3_44100_32`, `mp3_44100_64`, `mp3_44100_96`, `mp3_44100_128`, `mp3_44100_192`
**PCM (WAV)**: `pcm_8000`, `pcm_16000`, `pcm_22050`, `pcm_24000`, `pcm_44100`, `pcm_48000`
**μ-law**: `ulaw_8000`
**A-law**: `alaw_8000`
**Opus**: `opus_48000_32`, `opus_48000_64`, `opus_48000_96`, `opus_48000_128`, `opus_48000_192`

## Output Schema

```json
{
  "audio": {
    "url": "https://v3.fal.media/files/.../sound_effect.mp3",
    "content_type": "audio/mpeg",
    "file_name": "sound_effect.mp3",
    "file_size": 123456
  }
}
```

The `audio` object is a `File` with:
- `url` (string, required) — download URL for the generated audio
- `content_type` (string) — MIME type
- `file_name` (string) — filename
- `file_size` (integer) — size in bytes

## File Uploads

If you need to upload reference files:

```js
import { fal } from '@fal-ai/client';

const file = new File([buffer], 'reference.wav', { type: 'audio/wav' });
const url = await fal.storage.upload(file);
// Use the returned URL in your request inputs
```

You can also pass:
- **Hosted URLs** — any publicly accessible URL
- **Base64 Data URIs** — convenient but slower for large files

## Full Example with All Options

```js
import { fal } from '@fal-ai/client';

const result = await fal.subscribe('fal-ai/elevenlabs/sound-effects/v2', {
  input: {
    text: 'Gentle rain on a tin roof with distant thunder',
    duration_seconds: 10,
    prompt_influence: 0.5,
    output_format: 'mp3_44100_192',
    loop: true
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === 'IN_PROGRESS') {
      update.logs.map(log => log.message).forEach(console.log);
    }
  },
});

console.log(result.data.audio.url);
```

## Tips for Good Results

- **Be descriptive**: "Heavy wooden door creaking open slowly in a stone castle hallway" works better than "door opening"
- **Specify materials and environments**: Include surface types, room acoustics, weather conditions
- **Use `prompt_influence`**: Lower values (0.1–0.3) give creative variation; higher values (0.7–1.0) stick closely to your description
- **Duration**: Let the API auto-determine duration unless you need a specific length; forced durations may cut off or pad unnaturally
- **Looping**: Enable `loop: true` for ambient backgrounds, game environments, or music beds
- **Format choice**: Use `mp3_44100_128` for general use, `pcm_48000` for production/editing, `opus_48000_64` for web streaming


---
name: fal-elevenlabs-text-to-dialogue
description: Generate multi-speaker dialogue audio using ElevenLabs Eleven v3 via the fal.ai API. Use when the user wants to create dialogue, conversations, podcasts, audiobook scenes, or multi-character audio content. Supports audio tags for emotion, pacing, sound effects, and accents. Produces MP3 audio files.
---

# fal.ai ElevenLabs Text to Dialogue (Eleven v3)

Generate realistic multi-speaker audio dialogues using ElevenLabs' Eleven v3 model via fal.ai's inference API.

**Endpoint**: `fal-ai/elevenlabs/text-to-dialogue/eleven-v3`

## Quick Start

### 1. Install

```bash
npm install @fal-ai/client
```

### 2. Set API Key

```bash
export FAL_KEY="YOUR_FAL_API_KEY"
```

Or configure in code:

```javascript
import { fal } from "@fal-ai/client";
fal.config({ credentials: "YOUR_FAL_KEY" });
```

### 3. Generate Dialogue

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
  input: {
    inputs: [
      {
        text: "Welcome to the show! We have a fantastic guest tonight.",
        voice: "Aria"
      },
      {
        text: "[excited] Thank you so much for having me! I've been looking forward to this.",
        voice: "Brian"
      }
    ]
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});

// result.data.audio.url → URL of the generated MP3 file
console.log(result.data.audio.url);
```

---

## Input Schema

### Required

| Field | Type | Description |
|-------|------|-------------|
| `inputs` | `DialogueBlock[]` | **Required.** Array of dialogue turns, each with `text` and `voice`. |

#### DialogueBlock

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | **Required.** The dialogue text. Supports inline audio tags (see below). |
| `voice` | `string` | **Required.** Voice name (e.g. `"Aria"`) or ElevenLabs voice ID. |

### Optional

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `stability` | `float` | — | Voice stability (0–1). Lower = more emotional range. Higher = more monotone. |
| `use_speaker_boost` | `boolean` | — | Boosts similarity to original speaker voice. Increases latency slightly. |
| `pronunciation_dictionary_locators` | `PronunciationDictionaryLocator[]` | `[]` | Up to 3 pronunciation dictionaries (each with `pronunciation_dictionary_id` and optional `version_id`). |
| `seed` | `integer` | — | Random seed for reproducible output. |

### Full Input Example

```javascript
{
  inputs: [
    {
      text: "[applause] Thank you all for coming tonight! Today we have a very special guest.",
      voice: "Aria"
    },
    {
      text: "[gulps] ... [strong canadian accent] [excited] Hello everyone! Thank you for having me!",
      voice: "Charlotte"
    },
    {
      text: "[laughs] Great to have you. So tell us, what's the big news?",
      voice: "Brian"
    }
  ],
  stability: 0.5,
  seed: 42
}
```

---

## Output Schema

| Field | Type | Description |
|-------|------|-------------|
| `audio` | `File` | The generated audio file. Contains `url` (string), optional `content_type`, `file_name`, `file_size`. |
| `seed` | `integer` | The seed used for generation (for reproducibility). |

### Output Example

```json
{
  "audio": {
    "url": "https://v3.fal.media/files/zebra/XFeGS8Fq-q1eAPG2sSAo__output.mp3"
  },
  "seed": 42
}
```

---

## Audio Tags (Eleven v3 Feature)

Eleven v3 supports inline **audio tags** in square brackets within the `text` field. These control emotion, delivery, sound effects, accents, and pacing without being spoken aloud.

### Emotion & Delivery
- `[excited]`, `[sad]`, `[angry]`, `[tired]`, `[sarcastic]`, `[scared]`
- `[whispers]`, `[shouting]`, `[dramatic tone]`
- `[laughs]`, `[sighs]`, `[gasps]`, `[gulps]`, `[cries]`

### Sound Effects
- `[applause]`, `[gunshot]`, `[explosion]`, `[clapping]`
- `[thunder]`, `[wind]`, `[rain]`

### Accents & Character Direction
- `[French accent]`, `[strong canadian accent]`, `[pirate voice]`
- `[robotic voice]`, `[old man voice]`

### Pacing & Narrative
- `[pause]`, `[awe]`, `[interrupting]`, `[overlapping]`
- `...` (ellipsis for natural pauses)

### Combining Tags
Multiple tags can be combined in a single turn:

```
"[whispers] Something's coming… [sighs] I can feel it."
"[strong canadian accent] [excited] Hello everyone!"
```

> **Note**: Audio tags are voice and context dependent. Some tags work better with certain voices. Experiment with different combinations. Eleven v3 requires more prompt engineering than previous models but produces significantly more expressive results.

---

## Common Default Voices

These are ElevenLabs default/premade voices available by name. You can also use any ElevenLabs `voice_id` string.

| Voice | Gender | Accent | Best For |
|-------|--------|--------|----------|
| `Aria` | Female | American | Social media, expressive content |
| `Rachel` | Female | American | General purpose (default for TTS) |
| `Charlotte` | Female | Swedish | Characters, seductive tones |
| `Brian` | Male | American | Deep narration |
| `Daniel` | Male | British | Authoritative, news |
| `Callum` | Male | Transatlantic | Intense characters |
| `Charlie` | Male | Australian | Natural, conversational |
| `Chris` | Male | American | Casual, conversational |
| `Eric` | Male | American | Friendly, conversational |
| `Bill` | Male | American | Trustworthy narration |
| `George` | Male | British | Warm narration |
| `Jessica` | Female | American | Playful |
| `Laura` | Female | American | Quirky |
| `Liam` | Male | — | Warm, energetic youth |
| `Lily` | Female | British | Warm narration |
| `Sarah` | Female | American | Soft, news |

> **Tip**: You can also pass an ElevenLabs `voice_id` (e.g. `"21m00Tcm4TlvDq8ikWAM"`) instead of a name. Use the ElevenLabs voices API to list all available voices including community and cloned voices.

---

## Streaming

The model supports streaming for real-time audio delivery:

```javascript
import { fal } from "@fal-ai/client";

const stream = await fal.stream("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
  input: {
    inputs: [
      { text: "Have you heard the news?", voice: "Aria" },
      { text: "[excited] Yes! Tell me everything!", voice: "Charlotte" }
    ]
  }
});

for await (const event of stream) {
  console.log(event);
}

const result = await stream.done();
console.log(result.data.audio.url);
```

---

## Queue API (Long-Running Requests)

For production use or when you want webhook-based delivery:

### Submit

```javascript
const { request_id } = await fal.queue.submit("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
  input: {
    inputs: [
      { text: "Welcome to our podcast.", voice: "Brian" },
      { text: "Thanks for having me!", voice: "Aria" }
    ]
  },
  webhookUrl: "https://your-server.com/webhook"
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
  requestId: request_id,
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
  requestId: request_id,
});
console.log(result.data.audio.url);
```

---

## File Upload

If you need to upload reference audio files for other ElevenLabs endpoints:

```javascript
import { fal } from "@fal-ai/client";
import fs from "fs";

const file = new File([fs.readFileSync("./audio.mp3")], "audio.mp3", { type: "audio/mpeg" });
const url = await fal.storage.upload(file);
// Use `url` in subsequent API calls
```

---

## Downloading the Generated Audio

```javascript
import fs from "fs";

const result = await fal.subscribe("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
  input: {
    inputs: [
      { text: "Hello there!", voice: "Aria" },
      { text: "Hey! Great to see you.", voice: "Brian" }
    ]
  }
});

// Download the audio file
const response = await fetch(result.data.audio.url);
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync("dialogue.mp3", buffer);
console.log("Saved to dialogue.mp3");
```

---

## Error Handling

```javascript
try {
  const result = await fal.subscribe("fal-ai/elevenlabs/text-to-dialogue/eleven-v3", {
    input: {
      inputs: [
        { text: "Test dialogue", voice: "Aria" },
        { text: "Response here", voice: "Brian" }
      ]
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });
  console.log(result.data.audio.url);
} catch (error) {
  console.error("Generation failed:", error.message);
  if (error.status) console.error("Status:", error.status);
  if (error.body) console.error("Details:", error.body);
}
```

---

## Best Practices

1. **Keep dialogue turns focused.** Each `DialogueBlock` should be one speaker's turn. The model handles transitions, overlaps, and interruptions automatically.

2. **Use audio tags liberally.** Eleven v3 is designed for expressive control. Tags like `[excited]`, `[whispers]`, `[laughs]` significantly improve output quality.

3. **Match voices to characters.** Choose voices that fit the character's personality. Use distinct voices for each speaker to create clear differentiation.

4. **Use `seed` for reproducibility.** When iterating on a dialogue, set a `seed` value to get consistent results while tweaking text and tags.

5. **Lower `stability` for emotional range.** If the output sounds too flat, reduce the `stability` value to allow more expressiveness.

6. **Use ellipsis for natural pauses.** Insert `...` in text to create natural breathing pauses between phrases.

7. **Combine tags for nuance.** Stack multiple tags like `[strong british accent] [sarcastic]` for layered character direction.

8. **Character limit.** Eleven v3 has a 3,000 character limit per request. For longer dialogues, split into multiple requests.

9. **Server-side only for API keys.** Never expose your `FAL_KEY` in client-side code. Use a server-side proxy for browser/mobile apps.

10. **Alpha model note.** Eleven v3 is currently in alpha. It is not recommended for real-time/agent applications. Generate multiple takes and select the best one for production content.

---

## Related fal.ai ElevenLabs Endpoints

| Endpoint | Description |
|----------|-------------|
| `fal-ai/elevenlabs` | Single-speaker Text to Speech (v2) |
| `fal-ai/elevenlabs/text-to-dialogue/eleven-v3` | Multi-speaker dialogue (this skill) |
| `fal-ai/elevenlabs/speech-to-text` | Speech to text transcription |
| `fal-ai/elevenlabs/voice-changer` | Change voice in existing audio |
| `fal-ai/elevenlabs/sound-effects` | Generate sound effects from text |
| `fal-ai/elevenlabs/voice-isolator` | Isolate voice from background noise |
| `fal-ai/elevenlabs/voice-clone` | Clone a voice from audio samples |
| `fal-ai/elevenlabs/voice-design` | Design a voice from a text prompt |

---

## Reference Links

- **API page**: https://fal.ai/models/fal-ai/elevenlabs/text-to-dialogue/eleven-v3/api
- **Playground**: https://fal.ai/models/fal-ai/elevenlabs/text-to-dialogue/eleven-v3/playground
- **fal.ai docs**: https://docs.fal.ai
- **ElevenLabs v3 blog**: https://elevenlabs.io/blog/eleven-v3
- **Audio tags guide**: https://elevenlabs.io/blog/v3-audiotags
- **ElevenLabs models**: https://elevenlabs.io/docs/models
