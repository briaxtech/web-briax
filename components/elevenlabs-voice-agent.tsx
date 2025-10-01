"use client"

import type { DetailedHTMLProps, HTMLAttributes } from "react"
import Script from "next/script"

const GO_HIGH_LEVEL_AGENT_ID = "agent_8101k1zxg6xsepdah05pwq04ksx2"

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
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50" suppressHydrationWarning>
        <elevenlabs-convai agent-id={GO_HIGH_LEVEL_AGENT_ID}></elevenlabs-convai>
      </div>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  )
}
