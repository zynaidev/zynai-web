// Event names and parameters. Decided in docs/ellenorzes/00-README.md (D1).
// Never rename after launch: GA4 key events and Ads conversions depend on
// these exact strings. Never add personal data (name, email, phone,
// message, booking title) to any parameter.
// Do NOT use form_submit or form_start: GA4 enhanced measurement uses them.

export const TRACK_EVENTS = [
  'generate_lead',
  'pilot_application',
  'booking_complete',
  'phone_click',
  'email_click',
] as const

export type TrackEvent = (typeof TRACK_EVENTS)[number]

type CoversEveryEvent<T extends Record<TrackEvent, object>> = T

export type TrackEventParams = CoversEveryEvent<{
  generate_lead: { lead_type: 'contact_form' }
  pilot_application: Record<string, never>
  booking_complete: Record<string, never>
  phone_click: Record<string, never>
  email_click: Record<string, never>
}>
