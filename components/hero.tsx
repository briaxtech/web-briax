"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Mic, Target } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-16 md:pt-20 lg:pt-24 pb-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-5" />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex justify-center lg:mb-10">
          <img src="/briax-logo.png" alt="BrIAx - Agentes IA Comerciales" className="h-16 w-auto sm:h-20 lg:h-24" />
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                <span className="text-foreground">Tu agente de voz IA</span>{" "}
                <span className="text-primary">conversa y vende</span>{" "}
                <span className="text-foreground">sin ampliar tu equipo</span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
                Entregamos un asistente de voz que atiende 24/7, responde dudas y agenda reuniones con leads listos para comprar.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button size="lg" className="group px-6 py-4 text-base sm:px-8 sm:py-5 sm:text-lg" asChild>
                <Link href="/formulario" className="inline-flex items-center gap-2">
                  Quiero agendar llamada
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground sm:text-sm">Para lanzar mi agente de voz que venda por mi</p>
            </div>

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                <span className="text-xs font-medium sm:text-sm">Voz natural en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                <span className="text-xs font-medium sm:text-sm">Atiende 24/7 por voz</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                <span className="text-xs font-medium sm:text-sm">Convierte llamadas en ventas</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-xl lg:mx-0">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/ai-agents-working-commercial-interfaces.png"
                alt="Agente de voz IA gestionando conversaciones comerciales"
                className="h-auto w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card p-4 text-left shadow-lg sm:block">
              <div className="text-xl font-bold text-primary">+65%</div>
              <div className="text-sm text-muted-foreground">Citas confirmadas</div>
            </div>

            <div className="absolute -top-4 -right-4 hidden rounded-xl border border-border bg-card p-4 text-left shadow-lg sm:block">
              <div className="text-xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Disponible por voz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
