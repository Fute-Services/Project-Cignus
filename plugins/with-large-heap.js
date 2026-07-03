const { withAndroidManifest } = require('expo/config-plugins');

// The app bundles ~570 MB of media and plays several videos; the default
// ~200 MB Java heap left no headroom (Location screen used to OOM).
module.exports = function withLargeHeap(config) {
  return withAndroidManifest(config, (c) => {
    c.modResults.manifest.application[0].$['android:largeHeap'] = 'true';
    return c;
  });
};
