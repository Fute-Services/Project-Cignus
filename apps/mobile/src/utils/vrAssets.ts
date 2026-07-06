import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
import { requireNativeModule } from 'expo-modules-core';
import * as FileSystem from 'expo-file-system/legacy';

// expo-asset's JS marks embedded Android images as already "downloaded" and
// leaves only a bare resource name (e.g. 'assets_vr_dropoff') that no file
// API accepts, so Asset.downloadAsync() never copies them. The ExpoAsset
// native module handles all source forms (bare resource name, android_res
// path, http/file URL) and copies them to a real cache file — call it
// directly. This module doesn't exist on web, so this must be lazy, not a
// module-level call — evaluating it at import time crashes the whole app.
let ExpoAssetNative: { downloadAsync: (uri: string, hash: string | null, type: string) => Promise<string> } | null =
  null;
function getExpoAssetNative() {
  if (Platform.OS === 'web') return null;
  if (!ExpoAssetNative) ExpoAssetNative = requireNativeModule('ExpoAsset');
  return ExpoAssetNative;
}

const vrPanoramas: Record<string, number> = {
  dropoff: require('../../assets/vr/dropoff.webp'),
  dropoff_left: require('../../assets/vr/dropoff-left.webp'),
  dropoff_right: require('../../assets/vr/dropoff-right.webp'),
  reception: require('../../assets/vr/reception.webp'),
  cafeteria: require('../../assets/vr/cafeteria.webp'),
  liftlobby: require('../../assets/vr/liftlobby.webp'),
  top: require('../../assets/vr/top.webp'),
};

// The WebView cannot reliably read the panorama images from disk in release
// builds (file:// image loads are subject to WebView file-access and CORS
// rules that differ across Android versions and broke the 360 tour), so the
// images are inlined as base64 data URIs — those need no file access at all.
// _layout.tsx warms this in the background at startup so the VR screen opens
// instantly.
let vrUris: Record<string, string> | null = null;
let inflight: Promise<Record<string, string>> | null = null;

function resolveWebUri(mod: unknown): string {
  // On web, require()'ing an image resolves directly to a {uri, width,
  // height} object (or a bare string for non-image assets) — not a module
  // id — so read the uri straight off it instead of going through
  // Asset.fromModule, which expects a native-style numeric module id.
  if (typeof mod === 'string') return mod;
  if (mod && typeof mod === 'object' && 'uri' in mod) return String((mod as { uri: unknown }).uri);
  return String(mod);
}

async function toDataUriWeb(mod: number): Promise<string> {
  // The already-resolved bundler-served static URL — no native cache-copy
  // step is needed on web, just fetch + encode.
  const response = await fetch(resolveWebUri(mod));
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function toDataUri(mod: number): Promise<string> {
  if (Platform.OS === 'web') return toDataUriWeb(mod);

  const asset = Asset.fromModule(mod);
  let src: string;
  try {
    const native = getExpoAssetNative();
    if (!native) throw new Error('ExpoAsset native module unavailable');
    src = String(await native.downloadAsync(asset.uri, asset.hash, asset.type ?? 'webp'));
  } catch {
    await asset.downloadAsync();
    src = asset.localUri ?? asset.uri;
  }
  const base64 = await FileSystem.readAsStringAsync(src, { encoding: 'base64' });
  return `data:image/webp;base64,${base64}`;
}

export function getCachedVrUris(): Record<string, string> | null {
  return vrUris;
}

export function loadVrUris(): Promise<Record<string, string>> {
  if (vrUris) return Promise.resolve(vrUris);
  if (inflight) return inflight;
  inflight = Promise.all(
    Object.entries(vrPanoramas).map(async ([key, mod]) => [key, await toDataUri(mod)] as const),
  ).then(
    (entries) => {
      vrUris = Object.fromEntries(entries);
      inflight = null;
      return vrUris;
    },
    (e) => {
      inflight = null;
      throw e;
    },
  );
  return inflight;
}
