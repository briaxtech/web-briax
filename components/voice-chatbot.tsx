"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, PhoneCall, Mic, MicOff, X } from "lucide-react"

export function VoiceChatbot() {
  const [isActive, setIsActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [inCall, setInCall] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="elevenlabs"]')

    if (!existingScript) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
      script.async = true
      script.type = "text/javascript"

      script.onload = () => {
        console.log("[v0] ElevenLabs script loaded successfully")
        setIsScriptLoaded(true)
      }

      script.onerror = (error) => {
        console.error("[v0] Error loading ElevenLabs script:", error)
      }

      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    } else {
      setIsScriptLoaded(true)
    }
  }, [])

  const startCall = () => {
    console.log("[v0] Starting ElevenLabs ConvAI call")
    setIsConnecting(true)

    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <elevenlabs-convai 
          agent-id="agent_8101k1zxg6xsepdah05pwq04ksx2"
          style="width: 100%; height: 100%; border: none; border-radius: 8px;">
        </elevenlabs-convai>
      `

      setTimeout(() => {
        setInCall(true)
        setIsListening(true)
        setIsConnecting(false)
        console.log("[v0] ElevenLabs ConvAI widget loaded")
      }, 1500)
    }
  }

  const leaveCall = () => {
    console.log("[v0] Ending ElevenLabs ConvAI call")
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }
    setInCall(false)
    setIsListening(false)
    setIsConnecting(false)
  }

  const toggleChatbot = () => {
    if (!isActive) {
      setIsActive(true)
    } else {
      setIsActive(false)
      leaveCall()
    }
  }

  return (
    <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 z-50">
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-2 md:mb-3 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-gray-200/50 overflow-hidden max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
          >
            <div className="px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="flex items-center gap-2 md:gap-3">
                <motion.div
                  animate={{ rotate: isListening ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isListening ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-[10px] md:text-xs font-bold">IA</span>
                </motion.div>
                <div className="flex items-center gap-1 md:gap-2 min-w-0">
                  <motion.div
                    animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 1, repeat: isListening ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    {isListening ? (
                      <Mic className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    ) : (
                      <MicOff className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    )}
                  </motion.div>
                  <span className="text-white font-medium text-[11px] md:text-xs lg:text-sm truncate">
                    {inCall
                      ? isListening
                        ? "BrIAx te escucha..."
                        : "Conectado con BrIAx"
                      : isConnecting
                        ? "Conectando..."
                        : "Listo para conectar"}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setIsActive(false)}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="p-2 md:p-3">
              <div
                ref={containerRef}
                className="w-full min-h-[200px] md:min-h-[250px] bg-gray-100 rounded-lg flex items-center justify-center"
              >
                {!inCall && !isConnecting && (
                  <div className="text-center text-gray-500 text-sm">
                    <Phone className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    Haz clic para hablar con BrIAx
                  </div>
                )}
                {isConnecting && (
                  <div className="text-center text-gray-500 text-sm">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    Conectando con BrIAx...
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-2 mt-2">
                {inCall ? (
                  <Button onClick={leaveCall} size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <PhoneCall className="h-3 w-3 mr-1" />
                    Terminar llamada
                  </Button>
                ) : (
                  <Button
                    onClick={startCall}
                    disabled={isConnecting || !isScriptLoaded}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white disabled:opacity-50"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    {!isScriptLoaded ? "Cargando..." : isConnecting ? "Conectando..." : "Hablar con BrIAx"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
        <Button
          onClick={toggleChatbot}
          size="lg"
          className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 shadow-xl md:shadow-2xl transition-all duration-300 ${
            isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          }`}
        >
          <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isActive ? (
              <PhoneCall className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
            ) : (
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {!isActive && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 lg:-top-2 lg:-right-2 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"
        />
      )}
    </div>
  )
}
