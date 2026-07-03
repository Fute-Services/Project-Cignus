import { Asset } from 'expo-asset';

const vrPanoramas: Record<string, number> = {
  dropoff: require('../../assets/vr/dropoff.webp'),
  dropoff_left: require('../../assets/vr/dropoff-left.webp'),
  dropoff_right: require('../../assets/vr/dropoff-right.webp'),
  reception: require('../../assets/vr/reception.webp'),
  cafeteria: require('../../assets/vr/cafeteria.webp'),
  liftlobby: require('../../assets/vr/liftlobby.webp'),
  top: require('../../assets/vr/top.webp'),
};

// In release builds Asset.uri is an android resource path the WebView cannot
// read (dev builds masked this because the uri is a Metro http URL). The
// panoramas must first be copied to the app's cache directory via
// downloadAsync(), then referenced through localUri. The copy happens once;
// _layout.tsx warms it in the background at startup so the VR screen opens
// instantly.
let vrUris: Record<string, string> | null = null;
let inflight: Promise<Record<string, string>> | null = null;

export function getCachedVrUris(): Record<string, string> | null {
  return vrUris;
}

export function loadVrUris(): Promise<Record<string, string>> {
  if (vrUris) return Promise.resolve(vrUris);
  if (inflight) return inflight;
  inflight = Promise.all(
    Object.entries(vrPanoramas).map(async ([key, mod]) => {
      const asset = Asset.fromModule(mod);
      await asset.downloadAsync();
      return [key, asset.localUri ?? asset.uri] as const;
    }),
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
