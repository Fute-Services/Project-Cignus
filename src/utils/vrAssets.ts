import { Asset } from 'expo-asset';
import { requireNativeModule } from 'expo-modules-core';
import * as FileSystem from 'expo-file-system/legacy';

// expo-asset's JS marks embedded Android images as already "downloaded" and
// leaves only a bare resource name (e.g. 'assets_vr_dropoff') that no file
// API accepts, so Asset.downloadAsync() never copies them. The ExpoAsset
// native module handles all source forms (bare resource name, android_res
// path, http/file URL) and copies them to a real cache file — call it
// directly.
const ExpoAssetNative = requireNativeModule('ExpoAsset');

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

async function toDataUri(mod: number): Promise<string> {
  const asset = Asset.fromModule(mod);
  let src: string;
  try {
    src = String(await ExpoAssetNative.downloadAsync(asset.uri, asset.hash, asset.type ?? 'webp'));
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
