"use client"

import { useEffect } from "react"
import type { DetailedHTMLProps, HTMLAttributes } from "react"
import Script from "next/script"

const ELEVENLABS_AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "agent_6301k5yme1dgf81ae2yf1esmnqnv"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id"?: string
      }
    }
  }
}

export function ElevenLabsVoiceAgent() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID) {
      console.warn(
        "NEXT_PUBLIC_ELEVENLABS_AGENT_ID no esta definida. Se usara el ID por defecto. Configura la variable de entorno para produccion.",
      )
    }
  }, [])

  return (
    <>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" async />
      <div className="fixed bottom-4 right-4 z-50" suppressHydrationWarning>
        <elevenlabs-convai agent-id={ELEVENLABS_AGENT_ID} />
      </div>
    </>
  )
}
