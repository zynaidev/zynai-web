// Consent Mode v2 helpers. The default (everything denied) is set by the
// inline script from consentDefaultScript() in the root layout <head>,
// before GTM loads. The banner calls saveConsent() with the visitor's choice.

import './track'

export const CONSENT_STORAGE_KEY = 'zynai_consent_v1'

export type ConsentChoice = 'granted' | 'denied'

export const OPEN_CONSENT_EVENT = 'zynai:consent-open'

/** The stored choice, or null if none (or if storage is blocked). */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

/** Stores the choice and sends a consent update. Denial also sends an update. */
export function saveConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch (err) {
    // Storage blocked (private mode): the update below still applies to
    // this page view, the banner just returns on the next load.
    console.warn('Consent could not be stored:', err instanceof Error ? err.name : err)
  }
  window.gtag?.('consent', 'update', {
    ad_storage: choice,
    analytics_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  })
}

/** Reopens the consent banner (used by the footer link). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

/**
 * Body of the inline <head> script. It must run before GTM.
 * Keep gtag pushing `arguments`: GTM ignores consent commands pushed as arrays.
 */
export function consentDefaultScript(): string {
  const key = JSON.stringify(CONSENT_STORAGE_KEY)
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var c = localStorage.getItem(${key});
  if (c === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted', analytics_storage: 'granted',
      ad_user_data: 'granted', ad_personalization: 'granted'
    });
  }
} catch (e) { /* storage blocked (private mode): defaults stay denied */ }`
}
