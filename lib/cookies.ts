export const THANK_YOU_ACCESS_COOKIE = "briax_thank_you_access"
export const THANK_YOU_ACCESS_MAX_AGE = 60 * 60 // 1 hour

export const VOICE_AGENT_USAGE_COOKIE = "briax_voice_agent_uses"
export const VOICE_AGENT_MAX_USES = 3
export const VOICE_AGENT_USAGE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function setClientCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return

  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:"
  const secureAttribute = isSecure ? "; Secure" : ""
  document.cookie = `${name}=${value}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secureAttribute}`
}

export function getClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const cookies = document.cookie ? document.cookie.split("; ") : []
  const target = cookies.find((cookie) => cookie.startsWith(`${name}=`))
  return target ? decodeURIComponent(target.split("=").slice(1).join("=")) : null
}
