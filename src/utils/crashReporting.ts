import * as Sentry from '@sentry/react-native';

// Crash reporting is opt-in via an EXPO_PUBLIC_SENTRY_DSN env var. With no DSN
// configured, this module never calls Sentry.init and reportError() is a no-op
// beyond the existing console logging already done at each call site — so the
// app's behavior is unchanged until a DSN is actually provided.
const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
let initialized = false;

if (dsn) {
  Sentry.init({ dsn });
  initialized = true;
}

export function reportError(error: Error, context?: Record<string, unknown>) {
  if (!initialized) return;
  Sentry.captureException(error, context ? { extra: context } : undefined);
}
