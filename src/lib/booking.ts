const CAL_BOOKING_URL = 'https://cal.com/myhorizon/consultation'

function isAllowedBookingUrl(value: string) {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      (url.hostname === 'calendar.google.com' ||
        url.hostname === 'calendar.app.google' ||
        url.hostname === 'cal.com')
    )
  } catch {
    return false
  }
}

const configuredUrl = (import.meta.env.VITE_GOOGLE_APPOINTMENT_SCHEDULE_URL || '').trim()

export const BOOKING_URL = isAllowedBookingUrl(configuredUrl)
  ? configuredUrl
  : CAL_BOOKING_URL

export const USES_GOOGLE_APPOINTMENTS =
  BOOKING_URL.includes('calendar.google.com') || BOOKING_URL.includes('calendar.app.google')

export const CAL_EMBED_LINK = 'myhorizon/consultation'
