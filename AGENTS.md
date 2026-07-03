
# Expo version

This project runs Expo SDK 54 (see `expo` in package.json). Read the exact
versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any
code — API behavior differs across SDK versions, and docs for the wrong
version will lead to subtly incorrect code.

# Before any release or CI/build/deploy work

Read PREFLIGHT.md and run its checks first — every check there maps to a
real production failure (documented in SMOOTHNESS-REPORT.md). The
non-negotiable rules:

- Navigation from buttons only via `safeNavigate()` (src/utils/safeNavigate.ts),
  never raw `router.push`/`navigate` — raw pushes stacked screens and their
  video players until the app OOM-crashed.
- Max 1-2 `useVideoPlayer` per screen, with small `bufferOptions`.
- Never feed `Asset.uri`/`localUri` into a WebView; use the
  src/utils/vrAssets.ts pattern (native ExpoAsset download → base64 data URI).
- `.gitattributes` LFS rules stay limited to the two >100 MB videos; new big
  videos go to the `video-assets` GitHub release + workflow download step.
- Asset filenames: lowercase kebab-case only (Linux CI is case-sensitive).
- Do not remove: plugins/with-png-crunch-disabled.js, plugins/with-large-heap.js,
  the `package-lock.json` line in .easignore, or the workflow's disk-space
  and video-fetch steps.
- A green CI build only proves compilation. Before calling a build good,
  inspect the APK (`unzip -l` — video entries must be MBs, not ~132-byte LFS
  pointers) and run the release-APK gauntlet from PREFLIGHT.md section C.
- Regenerate package-lock.json with `npx npm@10 install --package-lock-only`
  (Windows npm 11 prunes Linux-only entries and breaks EAS).
