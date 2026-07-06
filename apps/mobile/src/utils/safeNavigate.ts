import type { Href, Router } from 'expo-router';

let lastNavAt = 0;

// Debounce rapid double-taps, and use replace() so the previous screen
// unmounts and releases its video players immediately. With push/navigate
// every visited screen stayed mounted in the stack, so their ExoPlayer
// buffers accumulated over a session until the Java heap overflowed
// (reproduced: OOM on the third video screen in a row). The app never uses
// the back stack — every screen has explicit back buttons — so replace is
// safe here.
export function safeNavigate(router: Router, path: Href) {
  const now = Date.now();
  if (now - lastNavAt < 700) return;
  lastNavAt = now;
  router.replace(path);
}
