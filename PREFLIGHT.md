# Pre-Flight Checklist & AI Prompt — Cignus

*Run these checks BEFORE shipping a build. Every check exists because its
absence once cost hours (see SMOOTHNESS-REPORT.md). Paste the prompt at the
bottom into any AI assistant to run the whole audit.*

---

## A. Repo health (2 minutes, before every release)

```bash
# 1. No LFS pointers hiding where real files should be
#    (broken videos shipped in builds 1-9 because of this)
git ls-files assets | grep -E "\.(mp4|webp|png|jpe?g|pdf)$" | while read f; do
  sz=$(git cat-file -s ":$f"); [ "$sz" -lt 1000 ] && echo "POINTER: $f ($sz bytes)"
done
# Expected: ONLY the two known LFS files (assets/video/powai-walkthrough.mp4,
# assets/video/cignus-drone-shot-home-page-v1-1080p.mp4). Anything else = stop.

# 2. Lockfile works on LINUX npm, not just Windows
#    (Windows npm 11 prunes @emnapi/* entries; EAS then fails "not in sync")
npx npm@10 ci --dry-run --ignore-scripts   # must print no "Missing ... from lock file"

# 3. No canary/experimental dependency versions
grep -c "canary" package-lock.json         # expected: 0
npx expo install --check                   # expected: "Dependencies are up to date"

# 4. Every asset referenced in code exists on disk (case-sensitively)
grep -rEoh "assets/[A-Za-z0-9_ .&()@/-]+\.[a-z0-9]+" src app.json | sort -u \
  | while read r; do [ -f "$r" ] || echo "MISSING: $r"; done
```

## B. APK inspection (after every CI build, before telling anyone it works)

```bash
# A green build only means it COMPILED. Build-9 was green and 100% broken.
unzip -l app-release.apk | grep -i "\.mp4"   # every video must be MBs, not ~132 bytes
unzip -l app-release.apk | awk '$1<1000 && /\.(mp4|webp|jpe?g|pdf)$/'  # expected: empty
```

## C. Runtime gauntlet (on the real release APK, emulator or device — never dev mode)

Dev mode hid the two worst bugs in this app's history (VR asset resolution,
LFS pointers). The release APK is the only build that tells the truth.

1. Install fresh (`adb uninstall` first), launch, `adb logcat -c` before.
2. Open **every** screen once. Watch `adb logcat | grep -E "FATAL|ReactNativeJS"`.
3. **Location:** all 4 tabs; switch all 4 connectivity videos.
4. **VR:** panorama must actually render (not the cover image); switch 2+ scenes.
5. **Marathon:** walkthrough → droneview → construction → circulation × 3 rounds.
   Memory must stay flat: `adb shell dumpsys meminfo com.gautamjha.cignus | grep "TOTAL PSS"`
   before and after — growth beyond ~10% = a screen is leaking players.
6. **Spam:** 10+ rapid taps on nav buttons — process must survive (`adb shell pidof`).
7. Zero `FATAL EXCEPTION` in the full-session logcat.

## D. Code rules that keep it smooth (enforce in review)

- **Navigation only via `safeNavigate()`** (`src/utils/safeNavigate.ts`) —
  never raw `router.push`/`navigate` from buttons. It debounces and uses
  `replace` so screens release their video players. Raw push once caused
  OOM crashes after three screens.
- **Max 1–2 `useVideoPlayer` per screen**, small `bufferOptions`. Five
  players on Location once ate the entire Java heap on open.
- **Never feed `Asset.uri`/`localUri` to a WebView** — in release builds it
  can be a bare resource name (`assets_vr_dropoff`). Use the pattern in
  `src/utils/vrAssets.ts` (native ExpoAsset.downloadAsync → base64 data URI).
  Do not "simplify" it back.
- **Keep `.gitattributes` limited to the two >100 MB videos.** New videos
  ≥100 MB go into the `video-assets` GitHub release + a workflow download
  step, NOT into git or blanket LFS rules.
- **Asset filenames: lowercase kebab-case, no spaces/brackets** — Linux CI is
  case-sensitive even though Windows isn't.
- **One person per working copy.** Concurrent edits in this folder corrupted
  an EAS archive and deleted files mid-task once.
- Don't remove: `plugins/with-png-crunch-disabled.js` (AAPT2 timeout),
  `plugins/with-large-heap.js` (OOM headroom), `.easignore`'s
  `package-lock.json` line (Windows npm bug), the workflow's disk-space and
  video-fetch steps.

---

## The copy-paste AI prompt

> You are auditing the Cignus Expo app (SDK 54, Windows dev machines, GitHub
> Actions → release APK on GitHub Releases, EAS as backup) BEFORE a release.
> Read PREFLIGHT.md and SMOOTHNESS-REPORT.md first, then:
>
> 1. Run every command in PREFLIGHT.md section A and report each result as
>    PASS/FAIL with the actual output. Stop and fix before proceeding if any
>    FAIL.
> 2. If a CI build exists, download the APK and run section B. Confirm every
>    video entry is megabytes, not bytes.
> 3. Install the release APK on an emulator and execute the full section C
>    gauntlet: every screen, Location tabs + video switches, VR panorama
>    render + scene switch, the 3-round video-screen marathon with before/
>    after memory readings, and the rapid-tap spam test. Capture screenshots
>    as evidence and count FATAL exceptions (must be 0).
> 4. Grep the diff since the last release for violations of section D rules:
>    raw `router.push|navigate` outside safeNavigate.ts, more than 2
>    `useVideoPlayer` in one file, `Asset.fromModule(...).uri` fed to any
>    WebView, new files >90 MB in git, uppercase/spaces in asset filenames,
>    and any change to the protected plugins/config listed in D.
> 5. Deliver a verdict: SHIP or DO-NOT-SHIP, with a table of every check,
>    its result, and evidence. Do not declare success from a green CI build
>    alone — a compiled app is not a working app.

---

*Created 2026-07-04 after the 18-build stabilization effort. If a check here
feels paranoid, its origin story is in SMOOTHNESS-REPORT.md.*
