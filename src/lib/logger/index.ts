type EventPayload = Record<string, string | number | boolean | undefined>;

export function logEvent(event: string, payload?: EventPayload) {
  if (process.env.NODE_ENV !== "test") {
    console.info(`[analytics] ${event}`, payload ?? {});
  }
}
