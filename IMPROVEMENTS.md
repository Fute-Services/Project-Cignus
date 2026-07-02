# Cignus — Plan to Make the App Ready for Many Users

Audit date: 2026-07-02. Landscape real-estate showcase/kiosk app (Expo SDK 57, React Native 0.86).

**Constraint honored throughout: image/video quality is never reduced with lossy compression.**
Any size work uses lossless methods or removes unused files only.

Legend — Effort: S (<1h) · M (half day) · L (1–2 days). Priority: P0 (blocker) → P2 (polish).

---

## ✅ Already done
- [x] **Global crash safety net** — `src/components/ErrorBoundary.tsx` added and wired into
      `src/app/_layout.tsx`. A crash in any screen now shows a "Try again" recovery card instead
      of white-screening the kiosk in front of a client. No visual/behavior change in normal use.
      Typecheck passing.

---

## P0 — Real blockers for wide use

### 1. Crash & error reporting  ·  Effort: M  ·  Quality impact: none
Today, if the app crashes on a deployed device you have **zero visibility**. Only `console.error`.
- Add `@sentry/react-native` (Expo-supported via config plugin).
- Forward errors from the `componentDidCatch` hook already present in `ErrorBoundary.tsx:28`.
- Needs: a free Sentry account + DSN.
- **Benefit:** you learn about field failures instead of hearing "it froze" from a salesperson.

### 2. App download size  ·  Effort: M–L  ·  Quality impact: none (lossless/removal only)
Real bundled payload ≈ **269 MB** (not 480 MB — 210 MB on disk is unused/orphaned).
- **2a. Remove ~210 MB orphaned assets (S).** Many PNG/MP4 files are on disk + in git but not
  referenced anywhere (team already replaced them with `.jpeg`). No user sees them. Deleting
  changes nothing visible. See `scripts/find-unused-assets` approach below.
- **2b. Lossless WebP for large PNGs (M).** Pixel-for-pixel identical to the PNG, ~20–25% smaller.
  Guaranteed no quality loss. Candidates: `Overview/overview.png` (12.9MB),
  `Project_Details/Amenities cover page updated image (1).png` (10.1MB), `Location/img location.png` (8.5MB).
- **2c. Video (needs decision, L).** `Home/construction_progress.mp4` is **89 MB** — the single
  biggest download. Options: re-encode to a lower bitrate (some quality tradeoff — your call), or
  stream from a CDN (breaks pure-offline kiosk model). Left untouched pending your decision.
- **2d. Git history cleanup (M).** The 210 MB of removed assets stays in git history; use
  `git filter-repo` to purge so clones/EAS uploads shrink. Do after 2a.

### 3. Broken video reference  ·  Effort: S  ·  Quality impact: none
`assets/Home/drone_view.mp4` and `assets/video/POWAI_walkthrough.mp4` are `require()`d in code but
**gitignored / missing on disk**. On a clean build these screens break. Either commit the files
(with Git LFS given size) or remove the references. Files: `droneview.tsx`, `walkthrough.tsx`.

---

## P1 — Reliability & correctness across devices

### 4. Media loading & error states  ·  Effort: M  ·  Quality impact: none
No screen shows a spinner or fallback while big videos/panoramas load — users see a black box.
- Add an `ActivityIndicator` + fallback image to every `VideoView` and the pannellum `WebView`.
- Replace the **fake `setTimeout` load-gating** with real player-status listeners:
  `initial2.tsx:30` (500ms), `index.tsx:166` (1200ms), `unitplan/[id].tsx:54` (2000ms),
  `overview.tsx:74` (2000ms), `project-info.tsx:32`, `specification.tsx:37`.
  On slow devices the placeholder currently disappears before the video is ready → black flash.

### 5. Broken font  ·  Effort: S  ·  Quality impact: improves (matches design intent)
`initial2.tsx:160` uses `fontFamily: 'Outfit'` (should be `Outfit_400Regular` etc.) and
`initial2.tsx:169` uses `fontFamily: 'Poppins'` — **Poppins is never loaded**. The hero title
silently falls back to the system font. Fix the family names (and load Poppins if that's the intent).
*Note: this changes the title's appearance toward the intended design — confirm before applying.*

### 6. Responsive scaling  ·  Effort: L  ·  Quality impact: none
Layouts use hardcoded pixels (`top: 24`, `fontSize: 24`, `width: 120`) with no scaling, so they
drift across tablet sizes/densities. Introduce a scale helper based on `useWindowDimensions` and
migrate screens. Also: `initial2.tsx:106` reads `Dimensions.get('window')` once at module load
(won't update) and never uses the result.

### 7. Android PDF viewing  ·  Effort: M  ·  Quality impact: none
`index.tsx:317` and `brochure.tsx:46` show "Android does not support inline PDF viewing" and defer
to `expo-sharing`; on a locked-down kiosk with no external viewer, brochures may be unviewable.
Consider bundling a JS PDF renderer (e.g. `react-native-pdf` or a pdf.js WebView) for Android.

---

## P2 — Polish & release hygiene

### 8. Accessibility  ·  Effort: M  ·  Quality impact: none (invisible)
**Zero** `accessibilityLabel`/`accessibilityRole` in the app. All buttons are icon-only. Required
for app-store accessibility review and screen-reader users. Add labels to interactive elements.

### 9. Release configuration  ·  Effort: S
- **Mismatched bundle IDs:** iOS `com.gautam-jha.cignus` vs Android `com.gautamjha.cignus`
  (`app.json`). Standardize to one org identifier before release.
- Define a `versionCode`/`buildNumber` bump strategy for updates.

### 10. Code cleanup  ·  Effort: S  ·  Quality impact: none
- `src/data/FloorData.ts` — **2,492 of 4,764 lines are commented-out dead code** (a full duplicate
  data block). Remove it; the file is parsed on every bundle.
- Duplicate near-identical images both bundled: `Project_Details/building-image.png` (3.3MB) and
  the typo'd `buiding-image.png` (2.6MB) are both `require()`d — verify which is real.
- Replace blocking `alert()` calls (`brochure.tsx:55`, `index.tsx:326`) with branded UI.
- Add memoization to `.map()` render loops (`index.tsx`, `unitplan/[id].tsx`) — inline closures
  recreated every render.

---

## Suggested order
1. **Invisible reliability** (no visual change): #1 Sentry, #4 loading states, #8 accessibility, #3 broken video ref.
2. **Zero-quality-loss size wins:** #2a remove orphaned, #2b lossless WebP, #10 dead code.
3. **Decisions needed:** #2c video, #5 font, #9 bundle IDs.
4. **Larger refactor:** #6 responsive scaling, #7 Android PDF.

Fastest path to "usable by many people" = finish group 1 (all quality-safe, no visual change).
