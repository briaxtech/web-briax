"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "lucide-react"

export function ConfirmationHero() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Llamada <span className="text-primary">CONFIRMADA</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Gracias por reservar tu espacio. En la fecha y hora elegida vas a hablar con alguien de nuestro equipo
          comercial.
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Primero en responder, primero en vender.</h2>
          <p className="text-sm text-muted-foreground">Powered by ElevenLabs Conversational AI</p>
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          onClick={() => window.open("https://calendly.com/brian-niwoyda/30min", "_blank")}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Ver mi cita programada
        </Button>
      </div>
    </section>
  )
}
