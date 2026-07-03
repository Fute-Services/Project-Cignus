# Asset Analysis — Cignus (Expo SDK 54, offline tablet app)

_Generated 2026-07-03. Read-only analysis. No files were modified to produce this report._

This app is a fully-offline, landscape tablet showcase for the Cignus real-estate
project. Every image, video and PDF is bundled into the binary and loaded via
`require()` / `import` (Metro static assets) — there is **no** network fetching,
CDN, or streaming. That architecture is correct and must stay; the problem is
purely **how much** is bundled and **how** it is encoded.

---

## 1. Totals

| Asset type | Count | Total size |
|---|---:|---:|
| Videos (`.mp4`) | 23 | **454.0 MB** |
| Images (`.png`) | 97 | 232.0 MB |
| Images (`.jpg`) | 8 | 59.8 MB |
| PDFs (`.pdf`) | 8 | 23.5 MB |
| Images (`.jpeg`) | 12 | 11.5 MB |
| Images (`.webp`) | 8 | 9.2 MB |
| Icons (`.svg`) | 9 | < 0.1 MB |
| **Total `assets/`** | **169** | **790.1 MB** |

- **Images total:** 125 files, **312.5 MB** (png + jpg + jpeg + webp)
- **Videos total:** 23 files, **454.0 MB**
- **PDFs total:** 8 files, **23.5 MB**
- **3D models:** **0**. The "VR" experience is **360° equirectangular panorama
  images** (`assets/vr/*.webp`) rendered by Pannellum inside a WebView — not glb/gltf/obj
  meshes. There are no true 3D model files to optimize.
- **Source code (`src/`):** 1.8 MB, of which `src/data/pdfjs_assets.ts` is **1.33 MB**
  (an inlined base64 copy of the PDF.js library, bundled for offline PDF rendering).

The total install footprint is dominated by video (57%) and PNG images (29%).

---

## 2. `assets/` size by folder

| Folder | Files | Size | Notes |
|---|---:|---:|---|
| `vedio/` | 2 | 266.9 MB | Drone shot 151 MB + walkthrough 115 MB |
| `Location/` | 21 | 149.3 MB | ~15 short metro/road video clips (many unused duplicates) |
| `Gallery/` | 16 | 132.7 MB | Huge photographic PNGs (14–24 MB each) |
| `vr/` | 21 | 69.0 MB | 360° panoramas — `.webp` in use, `.jpg` originals left behind |
| `Home/` | 26 | 58.5 MB | `day_bg.png` 23 MB (unused), videos, logos |
| `Project_Details/` | 13 | 31.6 MB | Backgrounds + `animated_Video.mp4` |
| `Overview/` | 5 | 25.8 MB | `overview.png` 12.9 MB + `overview.mp4` |
| `Broucher/` | 2 | 19.9 MB | Brochure PDFs (one unused) |
| `Circulation/` | 1 | 16.6 MB | Site-plan circulation video |
| `intial/` | 15 | 5.2 MB | Intro dashboard cards + sector PDFs |
| `Project_info/` | 7 | 3.9 MB | Duplicated project-info images |
| `UnitPlan/` | 16 | 9.4 MB | Floor plans (only 5 of 16 imported) |
| `images/` | 20 | 1.3 MB | App icons + **Expo template leftovers** |

---

## 3. Largest assets (top 20)

| Size | File | Status |
|---:|---|---|
| 151.4 MB | `vedio/cignus_drone_shot_home_page_v1 (1080p).mp4` | **used** (droneview) |
| 115.5 MB | `vedio/POWAI_walkthrough.mp4` | **used** (walkthrough) |
| 24.6 MB | `Gallery/Amenities View.png` | **used** (gallery) — recompress candidate |
| 23.7 MB | `Gallery/Aerial View.png` | **used** (gallery) — recompress candidate |
| 23.7 MB | `Home/day_bg.png` | **UNUSED** (duplicate of Aerial View.png) |
| 22.7 MB | `Gallery/Night Aerial View.png` | **UNUSED** (replaced by .jpeg) |
| 19.3 MB | `Home/construction_progress.mp4` | **used** (construction) |
| 17.6 MB | `Location/hiranandani.mp4` | **UNUSED** |
| 17.6 MB | `Gallery/Facade View.png` | **used** (gallery) — recompress candidate |
| 17.4 MB | `Broucher/Cignus Tower 2 1.pdf` | **used** (brochure) |
| 16.6 MB | `Circulation/Powai-Site-plan Circulation.mp4` | **used** (circulation) |
| 14.5 MB | `Gallery/Elevation With LakeView.png` | **used** (gallery) — recompress candidate |
| 12.9 MB | `Overview/overview.png` | **used** (overview) — recompress candidate |
| 12.9 MB | `Gallery/Night Aerial View1.png` | **UNUSED** (replaced by .jpeg) |
| 12.8 MB | `Location/Transport.mp4` | **used** (location) |
| 11.6 MB | `Overview/overview.mp4` | **used** (overview) |
| 11.3 MB | `Project_Details/animated_Video.mp4` | **used** (vertical-transport, sustain) |
| 10.1 MB | `Gallery/Amenities View 3.png` | **UNUSED** |
| 10.1 MB | `vr/Cafeteria1.jpg` | **UNUSED** (replaced by cafeteria.webp) |
| 9.8 MB | `Location/Neighbourhood-network-roads.png` | **UNUSED** |

---

## 4. Duplicate assets (byte-identical, same content hash)

| Size each | Copies |
|---:|---|
| 23.70 MB | `Gallery/Aerial View.png` **=** `Home/day_bg.png` |
| 12.92 MB | `Gallery/Night Aerial View1.png` **=** `Overview/overview.png` |
| 3.39 MB | `Project_Details/amenities_bg.png` **=** `Project_Details/amenities_bg (1).png` |
| 0.95 MB | `Project_info/ProjectInfoimage.png` **=** `ProjectInfoimage (1).png` |
| 0.94 MB | `intial/bg_img.png` **=** `Project_info/project_info_bg_img.png` |
| 0.01 MB | `Cignus-White-final4x 1.png` = `Overview/logo.png` = `Project_Details/logo.png` = `logo (1).png` |
| ~0 MB | `images/expo-logo.png` **=** `images/splash-icon.png` |

Byte-identical duplicates waste **~42 MB**. In every pair, at least one copy is
also unused (see §5), so de-duplication is covered by removing the unused set.

---

## 5. Unused assets (not referenced anywhere in `src/`, and not by native config)

Metro requires **static** `require()`/`import` paths, so name-based reference
detection is reliable — a bundled asset with no static reference is genuinely dead.

**~252 MB across ~74 files is unused.** These fall into clear groups:

### 5a. Superseded originals (kept after a prior conversion)
The prior optimization pass converted several huge originals to smaller `.jpeg`/`.webp`
but left the originals on disk:
- **VR panorama `.jpg` originals — 55 MB** (`vr/DropOff.jpg`, `Cafeteria1.jpg`,
  `Reception1.jpg`, `Liftlobby1.jpg`, `drop off left side1.jpg`, `drop off right side1.jpg`,
  `top1.jpg`). The app uses the `.webp` versions.
- **Gallery PNGs — 46 MB** (`Night Aerial View.png` 22.7, `Night Aerial View1.png` 12.9,
  `Amenities View 3.png` 10.1). Replaced by `.jpeg`.
- **`Home/day_bg.png` 23.7 MB** — duplicate of an in-use gallery image, not referenced.
- **`Location/Neighbourhood-network-roads.png` 9.8 MB, `Site-location.png` 7.6 MB.**

### 5b. Alternate / duplicate video takes
`Location/` holds many near-duplicate clips; the app references only one per subject:
- **UNUSED (~90 MB):** `hiranandani.mp4` (17.6), `SAKINAKA METRO (1).mp4` (7.9),
  `iit-bombay.mp4` (7.4), `AAREY METRO (1).mp4` (7.2), `Towards eastern & western
  expressway final (1).mp4` (7.3), `RAMBAUG METRO (1).mp4` (7.2), `RAMBAUG METRO (2).mp4`
  (6.7), `jvlr-metro.mp4` (5.5), `rambaugh metro.mp4` (3.7), `saki-naka-metro.mp4` (3.6),
  `L&T.mp4` (3.1).
- **In use:** the `(2)`/`(3)` variants + `Transport.mp4` referenced in `location.tsx`.

### 5c. Duplicate images
`amenities_bg (1).png` (3.4), `ProjectInfoimage (1).png` (0.95), `overview1.png` (0.78),
`project_details2.png` (1.86), `Projectinfo_CignusTower.png` (1.0), plus small logo dupes.

### 5d. Unused floor plans
Only 5 of 16 `UnitPlan/` images are imported by `FloorData.ts`. Unused: all of
`2-d-floorplans/{1st,2nd,3rd,4th,5th}_Floor.png`, `ground.png`, and the entire
`floorplans/` folder (5 files). ~3.5 MB.

### 5e. Expo template leftovers (never part of this app)
`assets/back.png`, `images/react-logo@2x/@3x.png`, `images/tabIcons/*`,
`images/expo-logo.png`, `images/expo-badge*.png`, `images/tutorial-web.png`,
`intial/5.png`, `intial/Office_compressed.pdf`, `Broucher/Cignus Tower 2 11.pdf`.

### ⚠️ Excluded from "unused" — these ARE used by native config (`app.json`), keep them:
`images/icon.png`, `images/favicon.png`, `images/splash-icon.png`,
`images/android-icon-{background,foreground,monochrome}.png`, `assets/expo.icon/*`.
(A `src/`-only scan flags these as unreferenced, but the native build consumes them.)

---

## 6. Startup asset loading

Startup is already handled well (`src/app/_layout.tsx`):

- Native splash shown until fonts + a **tiny critical set** are ready.
- **Only 3 critical images** are `await`-preloaded before first paint:
  `intial/bg_img.png`, `cignus updated logo.png`, `K_Raheja_Corp 1.png` (~1 MB total).
- 1 background image (Amenities cover) is warmed **after** first paint, non-blocking.
- Screen assets are `require`d per-route and only decoded when that route mounts.
- Orientation is locked to landscape on boot.

**Assessment:** the app does **not** eagerly load the full library at startup — good.
No change needed here beyond keeping the critical set minimal. The startup risk is
not *count* of assets but the *decoded size* of the first heavy screen the user opens
(see §7).

---

## 7. Memory-heavy screens (decoded bitmap / texture pressure)

File size ≠ memory. A PNG decodes to uncompressed RGBA in RAM at
`width × height × 4 bytes`, regardless of file size. The heavy screens:

| Screen | Load | Risk |
|---|---|---|
| **Gallery** (`gallery.tsx`) | 4 full-res photographic PNGs (24 + 23 + 17 + 14 MB files) plus jpegs, all `require`d at module load | **Highest.** These decode to very large bitmaps; a prior OOM crash on the Home screen from a 13 MB PNG is documented in code (switched to JPEG). Gallery still ships the raw PNGs. |
| **Amenities** (`amenities.tsx`) | 7 equirectangular panoramas in a WebView + Pannellum WebGL textures + cover jpg | High — WebGL texture memory; panoramas are large webp. |
| **Overview** | `overview.png` 12.9 MB + `overview.mp4` | Medium-high. |
| **Location** | site image + up to 5 videos decoded on demand | Medium (videos are streamed by `expo-video`, not fully decoded to RAM). |
| **droneview / walkthrough** | single very large mp4 each | Handled by `expo-video` player, released on unmount. |

**Key point:** the Gallery PNGs are photographs stored as lossless PNG — the worst
possible format for photos. They inflate both **file size** and **decoded RAM**. The
codebase already proved the fix works: Home's `Night Aerial View` was converted PNG→JPEG
(13 MB → 1.1 MB) specifically to stop an OOM crash. Gallery has not yet had the same
treatment.

---

## 8. Summary of opportunity (no quality loss, no UI/logic change)

| Action | Approx. saving | Risk |
|---|---:|---|
| **Remove unused assets** (§5) | **~252 MB** | None — files are unreferenced; verified against `src/` + `app.json`. |
| **Recompress in-use photographic PNGs → high-quality JPEG/WebP at required resolution** (Gallery, Overview, Location) — same visible quality, big file + RAM cut | **~110–120 MB** | Low — same technique already used on Home; keep display resolution, use near-lossless quality. |
| **Re-encode the two oversized videos** to a sane bitrate at same resolution (optional) | up to ~150 MB | Medium — needs A/B check to confirm no visible quality loss. |

Removing unused assets alone takes the bundle from **790 MB → ~538 MB** with
**zero** functional or visual change. Recompressing in-use photos (same resolution,
visually lossless) can bring it under **~420 MB** and materially reduces Gallery/Overview
memory pressure and decode time.

**Tooling note:** no `ffmpeg`, `ImageMagick`, `cwebp`, or `sharp` is currently installed;
only Node. Image recompression would use the `sharp` npm package (prebuilt Windows
binaries, no system install). Video re-encode would need `ffmpeg`.

See `optimization-summary.md` for the exact plan and `performance-report.md` for
before/after measurements.
