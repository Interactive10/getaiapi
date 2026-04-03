---
name: kling-video-effects
description: >
  Use this skill for the Kling AI Video Effects API. Apply special video effects to images, including single-image effects (219+ types) and dual-character effects (10 types).
---

# Kling Video Effects

Apply special video effects to images. Supports 219+ single-image effect scenes and 10 dual-character effect scenes, producing short animated videos from still images.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/videos/effects`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `effect_scene` | `string` | Required |  | Scene name. See full enum list below. |
| `input` | `object` | Required |  | Task input. Fields vary by scene type. |
| `input.image` | `string` | Optional |  | Reference image for single-image effects. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. When using Base64, do NOT add prefix. |
| `input.images` | `array` | Optional |  | Reference images for dual-character effects. Array length must be 2. First image = left side, second = right side. Same format requirements as `image`. |
| `callback_url` | `string` | Optional |  | Callback URL for task status changes |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user. |

#### Effect Scene Types

**Single-image effects (219 types):** `flash_drive`, `shush_my_dreams`, `advent_of_flora`, `raid_check`, `fortune_in_motion`, `chinese_trend`, `sedan_chair_dance`, `skyfall`, `good_luck_dance`, `laicai_dance`, `yangge_dance`, `color_mixing`, `palm_sized_figure`, `lantern_festival_cuju`, `unique_firework`, `unique_spring_couplets`, `horse_mask`, `fortune_knocks_cartoon`, `tangyuan_to_animal`, `hot_feet_dance`, `swag_dance`, `pigeon_dance`, `bloodline_dance`, `chanel_dance`, `cute_dance`, `love_theme_song`, `pumpitup_dance`, `city_to_village`, `fortune_god_transform`, `new_year_feast`, `ring_in_new`, `horse_year_firework`, `pet_vlogger`, `crystal_horse`, `lateral_shift_transition`, `drunk_dance`, `drunk_dance_pet`, `daoma_dance`, `bouncy_dance`, `smooth_sailing_dance`, `new_year_greeting`, `lion_dance`, `prosperity`, `great_success`, `golden_horse_fortune`, `red_packet_box`, `lucky_horse_year`, `lucky_red_packet`, `lucky_money_come`, `lion_dance_pet`, `dumpling_making_pet`, `fish_making_pet`, `pet_red_packet`, `lantern_glow`, `expression_challenge`, `overdrive`, `heart_gesture_dance`, `poping`, `martial_arts`, `running`, `nezha`, `motorcycle_dance`, `subject_3_dance`, `ghost_step_dance`, `phantom_jewel`, `zoom_out`, `dollar_rain_pro`, `pet_bee_pro`, `countdown_teleport`, `santa_random_surprise`, `magic_match_tree`, `bullet_time_360`, `happy_birthday`, `birthday_star`, `thumbs_up_pro`, `tiger_hug_pro`, `pet_lion_pro`, `surprise_bouquet`, `bouquet_drop`, `3d_cartoon_1_pro`, `firework_2026`, `glamour_photo_shoot`, `box_of_joy`, `first_toast_of_the_year`, `my_santa_pic`, `santa_gift`, `steampunk_christmas`, `snowglobe`, `christmas_photo_shoot`, `ornament_crash`, `santa_express`, `instant_christmas`, `particle_santa_surround`, `coronation_of_frost`, `building_sweater`, `spark_in_the_snow`, `scarlet_and_snow`, `cozy_toon_wrap`, `bullet_time_lite`, `magic_cloak`, `balloon_parade`, `jumping_ginger_joy`, `bullet_time`, `c4d_cartoon_pro`, `pure_white_wings`, `black_wings`, `golden_wing`, `pink_pink_wings`, `venomous_spider`, `throne_of_king`, `luminous_elf`, `woodland_elf`, `japanese_anime_1`, `american_comics`, `guardian_spirit`, `swish_swish`, `snowboarding`, `witch_transform`, `vampire_transform`, `pumpkin_head_transform`, `demon_transform`, `mummy_transform`, `zombie_transform`, `cute_pumpkin_transform`, `cute_ghost_transform`, `knock_knock_halloween`, `halloween_escape`, `baseball`, `inner_voice`, `a_list_look`, `memory_alive`, `trampoline`, `trampoline_night`, `pucker_up`, `guess_what`, `feed_mooncake`, `rampage_ape`, `flyer`, `dishwasher`, `pet_chinese_opera`, `magic_fireball`, `gallery_ring`, `pet_moto_rider`, `muscle_pet`, `squeeze_scream`, `pet_delivery`, `running_man`, `disappear`, `mythic_style`, `steampunk`, `3d_cartoon_2`, `eagle_snatch`, `hug_from_past`, `firework`, `media_interview`, `pet_chef`, `santa_gifts`, `santa_hug`, `heart_gesture_1`, `pet_wizard`, `smoke_smoke`, `instant_kid`, `dollar_rain`, `cry_cry`, `building_collapse`, `gun_shot`, `mushroom`, `double_gun`, `pet_warrior`, `lightning_power`, `jesus_hug`, `shark_alert`, `long_hair`, `lie_flat`, `polar_bear_hug`, `brown_bear_hug`, `jazz_jazz`, `office_escape_plow`, `fly_fly`, `watermelon_bomb`, `pet_dance`, `boss_coming`, `wool_curly`, `pet_bee`, `marry_me`, `swing_swing`, `day_to_night`, `piggy_morph`, `wig_out`, `car_explosion`, `ski_ski`, `siblings`, `construction_worker`, `let's_ride`, `snatched`, `magic_broom`, `felt_felt`, `jumpdrop`, `surfsurf`, `fairy_wing`, `angel_wing`, `dark_wing`, `skateskate`, `plushcut`, `jelly_press`, `jelly_slice`, `jelly_squish`, `jelly_jiggle`, `pixelpixel`, `yearbook`, `instant_film`, `anime_figure`, `rocketrocket`, `bloombloom`, `dizzydizzy`, `fuzzyfuzzy`, `squish`, `expansion`, `emoji`

**Dual-character effects (10 types):** `french_elegance`, `finger_swipe`, `smooth_transition`, `kiss_pro`, `snow_night_kiss`, `eternal_kiss`, `cheers_2026`, `fight_pro`, `hug_pro`, `heart_gesture_pro`

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "string",
    "task_info": { "external_task_id": "string" },
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/videos/effects/{task_id}`

Returns video result with `videos[].id`, `videos[].url`, `videos[].watermark_url`.

### Query Task (List)

**GET** `/v1/videos/effects`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.

## Callback Protocol

POST notifications on task status changes when callback_url is configured. Generated assets cleared after 30 days.
