"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function VoiceChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "assistant-welcome",
      role: "assistant",
      content: "Hola, soy BrIAx. Deja tu mensaje y te muestro como guiaria a tus leads.",
    },
  ])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pendingReplyRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (pendingReplyRef.current) {
        clearTimeout(pendingReplyRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const element = scrollContainerRef.current
    if (!element) return
    element.scrollTo({ top: element.scrollHeight, behavior: "smooth" })
  }, [messages, isOpen])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isSending) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    }
    const placeholderId = `assistant-${Date.now()}`

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: placeholderId,
        role: "assistant",
        content: "BrIAx esta preparando una respuesta...",
      },
    ])
    setInputValue("")
    setIsSending(true)

    const simulatedReply = "Aqui iria la respuesta de tu agente. Integra tu API en sendMessage para completar el flujo."

    if (pendingReplyRef.current) {
      clearTimeout(pendingReplyRef.current)
    }

    pendingReplyRef.current = setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                content: simulatedReply,
              }
            : message,
        ),
      )
      setIsSending(false)
    }, 800)
  }

  return (
    <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-2 md:mb-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border border-border/60 shadow-xl md:shadow-2xl rounded-2xl w-[320px] sm:w-[360px] md:w-[380px]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground rounded-t-2xl">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">BrIAx - Chat IA</p>
                  <p className="text-xs text-white/80">Listo para conversar</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                onClick={handleToggle}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="px-4 pb-4 pt-3 space-y-3">
              <div ref={scrollContainerRef} className="max-h-[320px] overflow-y-auto pr-1">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm shadow-sm max-w-[85%] ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-muted-foreground rounded-bl-sm"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                {isSending && (
                  <div className="flex justify-start pt-1">
                    <div className="bg-muted/80 text-muted-foreground rounded-2xl rounded-bl-sm px-4 py-3 text-sm shadow-sm">
                      BrIAx esta pensando...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <Textarea
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  rows={3}
                  className="min-h-[96px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">
                    Enter para enviar | Shift + Enter para salto de linea
                  </p>
                  <Button type="submit" size="sm" disabled={!inputValue.trim() || isSending}>
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 text-xs text-muted-foreground px-3 py-2">
                Conecta tu endpoint de IA en `sendMessage` para usar respuestas reales.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleToggle}
          size="lg"
          className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shadow-xl transition-all duration-300 ${
            isOpen
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground hover:from-primary/90 hover:to-primary"
          }`}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  )
}
