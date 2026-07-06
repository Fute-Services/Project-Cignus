// Crash reporting hook for ErrorBoundary. No reporting service is wired up
// yet — reportError() is a no-op beyond the console logging already done at
// each call site. Swap in a real service (e.g. Sentry) here when ready.
export function reportError(_error: Error, _context?: Record<string, unknown>) {
  // Intentionally empty until a crash-reporting service is configured.
}
