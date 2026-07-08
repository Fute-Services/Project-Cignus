# Cignus App — Smoothness & Stability Journey

*A self-reflection on how the app went from "crashes on the second screen" to
"flat memory after an hour of use" — what was broken, what was done, what was
learned. (2026-07-03 → 2026-07-04, builds 6 → 18)*

---

## Where we started

The symptoms, as reported and reproduced:

- APK from CI **crashed on launch** ("this app has some error").
- **Location screen crashed the moment it opened** on device.
- **Multiple fast taps on any button crashed the app.**
- **No video played anywhere** in release builds — every screen showed
  placeholders or black.
- **VR 360 tour never appeared** — stuck on its cover image forever.
- Connectivity / Airport videos **loaded slowly** when they loaded at all.
- The longer you used the app, the heavier and more fragile it got.

Every one of these had a distinct root cause. None of them were guesses —
each was reproduced on an emulator with the real release APK, diagnosed from
logs, fixed, and re-verified.

---

## The root causes, in the order they were found

### 1. The videos in every APK were fake (Git LFS pointers)

`.gitattributes` routed `*.mp4` through Git LFS, but CI checked out without
LFS. Result: every released APK contained **132-byte text files** where the
videos should have been. The app wasn't "failing to play videos" — there were
no videos. Players erroring on pointer text also fed the instability.

**Fix:** 21 small videos converted to regular git blobs. The two files above
GitHub's 100 MB limit (walkthrough, drone shot) stay in LFS, and the build
workflow downloads the real files from the `video-assets` release before
building. Verified by listing the APK contents: 12 real videos, 151 MB and
115 MB included, zero pointer-sized entries.

### 2. A single unused package crashed every launch

`@expo/ui` — imported nowhere in the code — had resolved to an experimental
canary version incompatible with SDK 54. Its native module threw
`NoClassDefFoundError` during startup registration. Removed; crash gone.

### 3. Location screen: five video players at once (OOM #1)

`location.tsx` created **five ExoPlayer instances on mount**, one per
connectivity/airport video. Their playback buffers alone exhausted the app's
~200 MB Java heap. Reproduced exactly: `OutOfMemoryError` on
`ExoPlayer:Playback` the moment the screen opened.

**Fix:** two lightweight players, both preloading while the user is still on
the map tabs — Connectivity and Airport start instantly, and switching within
the four connectivity videos swaps the source on one player. Forward buffer
capped at 5 seconds. Memory cost is a fraction of the old design.

### 4. Navigation stacked screens forever (OOM #2)

Every nav tap used `router.push`, and later `navigate` — either way, visited
screens **stayed mounted in the stack**, each keeping its video players
alive. Reproduced: the third video screen in a row killed the app with the
same `OutOfMemoryError`. This was also the "multiple clicks crash": each
double-tap stacked another full copy of a screen with all its players.

**Fix:** a single `safeNavigate()` helper used by every button —
debounces taps (700 ms) and uses `router.replace`, so the previous screen
unmounts and releases its players immediately. This app never uses the back
stack (every screen has explicit back buttons), so replace is safe. Combined
with `android:largeHeap` (512 MB instead of 200 MB), memory now stays flat:
measured 386 → 392 → 395 MB across three full rounds of video screens, then
*down* to 369 MB — no growth, no leak.

### 5. VR was broken in every release build that ever existed

The subtlest one. Three layers deep:

1. In release builds, `expo-asset` marks embedded images as already
   "downloaded" and leaves only a **bare Android resource name**
   (`assets_vr_dropoff`) — not a path any file API accepts. So
   `Asset.downloadAsync()` silently did nothing, and the WebView was handed
   names it could never load. Dev builds masked this completely (assets come
   from Metro's HTTP server there), which is why it "worked on the dev
   machine" forever.
2. Even with real paths, `file://` image loading inside an Android WebView is
   unreliable across versions (file-access rules, CORS on `file://`).
3. Nothing surfaced the failure — the screen just sat on its cover image.

**Fix:** call the `ExpoAsset` **native module directly** (it does know how to
copy a bare resource name to a real cache file), then inline the panoramas
into the WebView HTML as **base64 data URIs** — zero file access at runtime.
Added error piping from the WebView to native logs and an 8-second fail-safe
so a silent failure can never blank the screen again. Panoramas also warm in
the background at app startup, so the VR screen opens instantly.

### 6. CI itself kept sabotaging the app

Not app code, but it shaped everything above:

- Runner **disk full** killed builds (fixed: free ~20 GB of preinstalled
  toolchains) — and the missing-log corpse of that failure is what the
  GitHub UI showed as *"data parsing error"*.
- Deleted `package-lock.json` broke `setup-node` (fixed: restore + keep it).
- Windows npm 11 **prunes Linux-only lockfile entries** (`@emnapi/*`),
  breaking `npm ci` on every Linux worker — the team's chronic EAS failure.
  Fixed by regenerating with npm 10 and excluding the lockfile from EAS
  uploads via `.easignore`.
- AAPT2 **timed out crunching 10–25 MB PNGs** on 2-core runners (fixed:
  `android.enablePngCrunchInReleaseBuilds=false` via a config plugin so both
  GitHub Actions and EAS get it).
- Debug APKs (`assembleDebug`) can't run standalone at all — switched to
  `assembleRelease`, published to GitHub Releases (the ~570 MB APK would blow
  the 500 MB Actions artifact quota).

---

## Why it feels smooth now — the three principles

1. **Nothing accumulates.** Screens die when you leave them; players are
   released; memory is flat over an hour of use. Smoothness is mostly the
   *absence* of background weight.
2. **Nothing loads twice or too late.** The next thing the user is likely to
   tap (connectivity video, airport video, VR panoramas) is already warm
   before they tap it. The fade animations cover the last few hundred
   milliseconds.
3. **Nothing can stampede.** Debounced navigation means a nervous double-tap
   costs nothing. One tap, one screen, always.

---

## How it was verified (not assumed)

Full gauntlet on the final APK (build-18), driven on a Pixel Tablet emulator
with the actual release binary, screenshots at every step:

| Test | Result |
|---|---|
| Cold start → intro → home | pass |
| Location: all 4 tabs, video switching | pass, videos play |
| VR: 360 render + scene switching | pass (first time ever) |
| Marathon: all video screens × 3 rounds | pass, memory flat |
| 40+ rapid taps across every navbar | pass, zero crashes |
| Entire session | one process, **0 fatal exceptions** |

The same gauntlet is what *found* the last two OOM bugs — testing on the real
release APK, not in dev mode, was the single highest-value habit of this
whole effort.

---

## Self-reflection: what I'd take away

**What went well**

- **Reproduce before fixing.** Every crash was reproduced on the emulator
  with the real APK before touching code. No fix shipped on a hunch, and
  each fix was re-verified against the exact failure it addressed.
- **Read the actual logs, not the summary.** "Data parsing error" was a UI
  artifact; the real story was in run annotations, logcat, and expo-asset's
  source code. The VR root cause was only findable by reading
  `Asset.js` and `AssetModule.kt` line by line.
- **Fix classes of problems, not instances.** `safeNavigate()` fixed every
  button in the app at once; the config plugins fix both CI systems at once.

**What I'd do differently**

- **Test the release build much earlier.** Dev mode hid the two worst bugs
  (VR asset resolution, LFS pointers) for the project's entire life. A
  ten-minute emulator check of the first CI APK would have surfaced both
  months of pain earlier.
- **Distrust green builds.** Build 9 was "successful" and completely broken
  (pointer videos). Success means it compiled, not that it works — artifact
  inspection (unzip the APK, check file sizes) is cheap and catches what CI
  can't.
- **Watch for the second worker.** Files changed and vanished mid-task
  because two people were editing the same working copy simultaneously. Much
  of one evening's confusion traced back to that. One working copy per
  person, always.
- **Fewer, bigger iterations.** Eighteen builds at ~28 minutes each is a lot
  of waiting. Batching verified fixes (as in builds 13 → 17 → 18) was far
  more efficient than one-fix-one-build.

**What's still on the table (future wins)**

- **Asset compression** is the biggest remaining lever: 24 MB PNGs and a
  151 MB video could shrink 60-80% with no visible quality loss, cutting the
  APK from ~570 MB to ~200 MB and speeding every decode. Deliberately not
  done — content was to stay byte-identical.
- The old-machine decoder warm-up (~1 s on first Connectivity open) could be
  hidden entirely by starting playback muted-offscreen a screen earlier.
- `expo-video`'s `replaceAsync` warning suggests migrating the remaining
  `replace` calls when convenient.

---

*Written after builds 6–18, 2026-07-04. Every claim in this document
corresponds to a commit on `main` and a verifiable emulator test.*

