"use client"

import Image from "next/image"
import { Calendar, CheckCircle2, ArrowDownRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ElevenLabsVoiceAgent } from "@/components/elevenlabs-voice-agent"

export function ThankYouPage() {
  const handleGoogleCalendar = () => {
    const title = encodeURIComponent("Llamada con Briax")
    const details = encodeURIComponent("Llamada agendada con el equipo de Briax")
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    newWindow?.focus()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-center px-4 md:px-6">
          <Image src="/briax-logo.png" alt="Briax" width={140} height={46} className="h-auto w-auto" priority />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="mb-4 text-center font-sans text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Tu llamada esta <span className="text-primary">confirmada!</span>
          </h1>

          <p className="mb-12 text-center text-lg text-muted-foreground md:text-xl">
            Estamos emocionados de conversar contigo.
          </p>

          <div className="mb-8 overflow-hidden rounded-3xl border border-border/50 shadow-lg">
            <div className="aspect-video w-full bg-muted">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Y_KSz98o7io?rel=0"
                title="Mensaje de agradecimiento Briax"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <Card className="mb-8 border-border/50 bg-card shadow-sm">
            <CardContent className="px-8 py-6 text-center md:px-10 md:py-8">
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground">
                Gracias por agendar tu llamada con nuestro equipo!
              </h2>
              <p className="text-balance text-lg leading-relaxed text-muted-foreground">
                Te pedimos que seas puntual y respetes el horario elegido, ya que valoramos el tiempo de ambas partes.
                Nos vemos pronto.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-center text-sm font-medium text-foreground">Guarda esta cita en tu calendario:</p>
            <div className="flex justify-center">
              <Button
                onClick={handleGoogleCalendar}
                size="lg"
                className="gap-2 bg-primary font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Calendar className="h-5 w-5" />
                Agregar a Google Calendar
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Recibiras un correo de confirmacion con todos los detalles de la llamada.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 bg-card/30 py-8">
        <div className="container mx-auto px-4 text-center md:px-6">
          <p className="text-sm text-muted-foreground">Copyright 2025 BrIAx Technologies</p>
        </div>
      </footer>
      <div className="pointer-events-none fixed bottom-32 right-28 z-40 max-w-xs flex gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 text-left shadow-xl sm:flex lg:right-36">
        <p className="text-sm font-semibold text-foreground">Prueba nuestra demo!</p>
        <ArrowDownRight className="ml-auto h-8 w-8 text-primary animate-bounce" />
      </div>
      <ElevenLabsVoiceAgent />
    </div>
  )
}
