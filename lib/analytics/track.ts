import type { TrackEvent, TrackEventParams } from './events'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** The only place that writes events to window.dataLayer. No-op on the server. */
export function track<E extends TrackEvent>(
  event: E,
  params: TrackEventParams[E],
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
