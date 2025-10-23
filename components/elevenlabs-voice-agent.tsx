"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type DetailedHTMLProps, type HTMLAttributes } from "react"
import Script from "next/script"
import { ArrowDownRight } from "lucide-react"

import {
  VOICE_AGENT_MAX_USES,
  VOICE_AGENT_USAGE_COOKIE,
  VOICE_AGENT_USAGE_MAX_AGE,
  getClientCookie,
  setClientCookie,
} from "@/lib/cookies"

const GO_HIGH_LEVEL_AGENT_ID = "agent_6301k5yme1dgf81ae2yf1esmnqnv"
const LIMIT_REACHED_MESSAGE = `Has alcanzado el limite de ${VOICE_AGENT_MAX_USES} usos del chat de voz. Si necesitas mas ayuda, contacta a nuestro equipo.`
const LIMIT_WARNING_MESSAGE = "Te queda 1 ultimo intento para usar el chat de voz. Despues quedara bloqueado."

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id"?: string
      }
    }
  }
}

function parseUsage(value: string | null): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function extractRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input
  }

  if (input instanceof URL) {
    return input.toString()
  }

  if (typeof Request !== "undefined" && input instanceof Request) {
    return input.url
  }

  if (typeof input === "object" && input !== null && "url" in input) {
    // @ts-expect-error - fallback for objects mimicking the Request interface
    return String(input.url)
  }

  return ""
}

function isConversationStartRequest(url: string) {
  if (!url) return false
  const normalized = url.toLowerCase()
  return (
    normalized.includes("/v1/convai/conversation/token") ||
    normalized.includes("/v1/convai/conversation/start") ||
    normalized.includes("/v1/convai/conversation/session")
  )
}

export function ElevenLabsVoiceAgent() {
  const [usageCount, setUsageCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [helperMessage, setHelperMessage] = useState<string | null>(null)

  const usageRef = useRef(0)
  const blockedRef = useRef(false)
  const sessionStartedRef = useRef(false)

  const updateHelperByUsage = useCallback((usage: number) => {
    const remaining = Math.max(VOICE_AGENT_MAX_USES - usage, 0)

    if (remaining === 0) {
      setHelperMessage(LIMIT_REACHED_MESSAGE)
    } else if (remaining === 1) {
      setHelperMessage(LIMIT_WARNING_MESSAGE)
    } else {
      setHelperMessage(null)
    }
  }, [])

  const persistUsage = useCallback(
    (nextUsage: number) => {
      const sanitizedUsage = Math.max(0, Math.min(nextUsage, VOICE_AGENT_MAX_USES))
      usageRef.current = sanitizedUsage
      setUsageCount(sanitizedUsage)

      setClientCookie(VOICE_AGENT_USAGE_COOKIE, String(sanitizedUsage), VOICE_AGENT_USAGE_MAX_AGE)

      const reachedLimit = sanitizedUsage >= VOICE_AGENT_MAX_USES
      setIsBlocked(reachedLimit)
      blockedRef.current = reachedLimit

      updateHelperByUsage(sanitizedUsage)
    },
    [updateHelperByUsage],
  )

  useEffect(() => {
    const initialUsage = parseUsage(getClientCookie(VOICE_AGENT_USAGE_COOKIE))
    usageRef.current = initialUsage
    setUsageCount(initialUsage)

    const reachedLimit = initialUsage >= VOICE_AGENT_MAX_USES
    setIsBlocked(reachedLimit)
    blockedRef.current = reachedLimit

    updateHelperByUsage(initialUsage)
  }, [updateHelperByUsage])

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    const handleAgentExpansion = (event: Event) => {
      const customEvent = event as CustomEvent<{ action?: "expand" | "collapse" | "toggle" }>
      const action = customEvent.detail?.action

      if (action === "collapse" || action === "expand") {
        sessionStartedRef.current = false
      }
    }

    document.addEventListener("elevenlabs-agent:expand", handleAgentExpansion)

    return () => {
      document.removeEventListener("elevenlabs-agent:expand", handleAgentExpansion)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.fetch !== "function") {
      return
    }

    const globalWindow = window as typeof window & {
      __briaxVoiceAgentFetchPatched?: boolean
      __briaxVoiceAgentFetchOriginal?: typeof fetch
    }

    if (globalWindow.__briaxVoiceAgentFetchPatched) {
      return
    }

    const originalFetch = window.fetch.bind(window)
    globalWindow.__briaxVoiceAgentFetchPatched = true
    globalWindow.__briaxVoiceAgentFetchOriginal = originalFetch

    window.fetch = async (...args) => {
      const [input] = args
      const url = extractRequestUrl(input)

      if (isConversationStartRequest(url)) {
        if (blockedRef.current) {
          updateHelperByUsage(usageRef.current)
          throw new Error("Voice agent usage limit reached")
        }

        if (!sessionStartedRef.current) {
          persistUsage(usageRef.current + 1)
          sessionStartedRef.current = true
        }
      }

      return originalFetch(...args)
    }

    return () => {
      window.fetch = originalFetch
      globalWindow.__briaxVoiceAgentFetchPatched = false
      delete globalWindow.__briaxVoiceAgentFetchOriginal
    }
  }, [persistUsage, updateHelperByUsage])

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return
    }

    const mediaDevices = navigator.mediaDevices

    const currentGetUserMedia = mediaDevices.getUserMedia as typeof navigator.mediaDevices.getUserMedia & {
      __briaxVoiceAgentPatched?: boolean
      __briaxVoiceAgentOriginal?: typeof navigator.mediaDevices.getUserMedia
    }

    if (currentGetUserMedia.__briaxVoiceAgentPatched) {
      return
    }

    const originalGetUserMedia = mediaDevices.getUserMedia.bind(mediaDevices)

    const patchedGetUserMedia: typeof navigator.mediaDevices.getUserMedia = async (...args) => {
      const [constraints] = args
      const audioRequested =
        typeof constraints === "boolean"
          ? constraints
          : constraints && typeof constraints === "object"
            ? "audio" in constraints
              ? Boolean((constraints as MediaStreamConstraints).audio)
              : false
            : false

      if (audioRequested && !sessionStartedRef.current) {
        if (blockedRef.current) {
          updateHelperByUsage(usageRef.current)
          const errorMessage = LIMIT_REACHED_MESSAGE
          const error = typeof DOMException !== "undefined" ? new DOMException(errorMessage, "NotAllowedError") : new Error(errorMessage)
          return Promise.reject(error)
        }

        persistUsage(usageRef.current + 1)
        sessionStartedRef.current = true
      }

      try {
        return await originalGetUserMedia(...args)
      } catch (error) {
        if (audioRequested) {
          sessionStartedRef.current = false
        }
        throw error
      }
    }

    patchedGetUserMedia.__briaxVoiceAgentPatched = true
    patchedGetUserMedia.__briaxVoiceAgentOriginal = originalGetUserMedia
    mediaDevices.getUserMedia = patchedGetUserMedia

    return () => {
      if (mediaDevices.getUserMedia && (mediaDevices.getUserMedia as any).__briaxVoiceAgentOriginal) {
        mediaDevices.getUserMedia = (mediaDevices.getUserMedia as any).__briaxVoiceAgentOriginal
      } else {
        mediaDevices.getUserMedia = originalGetUserMedia
      }
    }
  }, [persistUsage, updateHelperByUsage])

  const remainingAttempts = useMemo(
    () => Math.max(VOICE_AGENT_MAX_USES - usageCount, 0),
    [usageCount],
  )

  const attemptsLabel = useMemo(() => {
    if (remainingAttempts === 0) {
      return "No te quedan intentos disponibles."
    }

    if (remainingAttempts === 1) {
      return "Te queda 1 intento disponible."
    }

    return `Te quedan ${remainingAttempts} de ${VOICE_AGENT_MAX_USES} intentos disponibles.`
  }, [remainingAttempts])

  const attemptsLabelClass = remainingAttempts === 0 ? "text-destructive font-semibold" : "text-muted-foreground"

  return (
    <>
      <div className="pointer-events-none fixed bottom-32 right-28 z-40 max-w-xs flex gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 text-left shadow-xl backdrop-blur-sm lg:right-36">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">Prueba nuestra demo!</p>
          <p className={`text-xs ${attemptsLabelClass}`}>{attemptsLabel}</p>
        </div>
        <ArrowDownRight className="h-8 w-8 text-primary animate-bounce" />
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex max-w-xs flex-col items-end gap-3" suppressHydrationWarning>
        {helperMessage ? (
          <div className="rounded-lg border border-border/70 bg-background/95 px-4 py-3 text-sm text-foreground shadow-lg backdrop-blur">
            {helperMessage}
          </div>
        ) : null}
        <elevenlabs-convai agent-id={GO_HIGH_LEVEL_AGENT_ID}></elevenlabs-convai>
      </div>

      {remainingAttempts === 1 ? (
        <span className="sr-only">Te queda una sola oportunidad para usar el chat de voz.</span>
      ) : null}

      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  )
}
