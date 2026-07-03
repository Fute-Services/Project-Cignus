import type { Href, Router } from 'expo-router';

let lastNavAt = 0;

// Rapid double-taps on nav buttons used to stack the same route repeatedly.
// Screens like Location create five video players per instance, so a few
// stacked copies exhaust the device's hardware video decoders and crash the
// app. Debounce taps and use navigate() (which re-focuses an existing route
// instead of pushing a duplicate).
export function safeNavigate(router: Router, path: Href) {
  const now = Date.now();
  if (now - lastNavAt < 700) return;
  lastNavAt = now;
  router.navigate(path);
}
