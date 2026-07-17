#!/usr/bin/env bash
# powai-walkthrough.mp4 and cignus-drone-shot-home-page-v1-1080p.mp4 exceed
# GitHub's 100 MB blob limit and live in Git LFS. Hosts that checkout the
# repo without LFS support (e.g. Vercel by default) end up with 132-byte
# pointer files instead of real video, so walkthrough/droneview show nothing.
# Fetch the real files from the video-assets GitHub release instead.
set -euo pipefail

VIDEO_DIR="apps/mobile/assets/video"
BASE_URL="https://github.com/Fute-Services/Project-Cignus/releases/download/video-assets"
# Real LFS pointer files are ~130 bytes; anything under this is a pointer, not video.
POINTER_MAX_BYTES=1000

fetch_if_pointer() {
  local file="$1"
  local path="$VIDEO_DIR/$file"
  local size
  size=$(stat -c%s "$path" 2>/dev/null || stat -f%z "$path" 2>/dev/null || echo 0)

  if [ "$size" -gt "$POINTER_MAX_BYTES" ]; then
    echo "$file already present ($size bytes), skipping fetch."
    return
  fi

  echo "Fetching $file from video-assets release..."
  curl -fL "$BASE_URL/$file" -o "$path"
}

fetch_if_pointer "powai-walkthrough.mp4"
fetch_if_pointer "cignus-drone-shot-home-page-v1-1080p.mp4"
