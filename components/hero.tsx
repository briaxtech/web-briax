import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Mic, Target } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-3 md:px-4 max-w-7xl">
        <div className="flex justify-center mb-6 md:mb-8 lg:mb-12">
          <img
            src="/briax-logo.png"
            alt="BrIAx - Agentes IA Comerciales"
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                <span className="text-foreground">Tu agente de voz IA</span>{" "}
                <span className="text-primary">conversa y vende</span>{" "}
                <span className="text-foreground">sin ampliar tu equipo</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-muted-foreground text-pretty leading-relaxed">
                Entregamos un asistente de voz que atiende 24/7, responde dudas y agenda reuniones con leads listos para comprar.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <Button
                size="lg"
                className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 group w-full sm:w-auto"
                asChild
              >
                <a href="https://calendly.com/brian-niwoyda/30min" target="_blank" rel="noopener noreferrer">
                  Quiero agendar llamada
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
                Para lanzar mi agente de voz que venda por mi
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-2 md:pt-4">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium">Voz natural en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium">Atiende 24/7 por voz</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium">Convierte llamadas en ventas</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
              <img
                src="/ai-agents-working-commercial-interfaces.png"
                alt="Agente de voz IA gestionando conversaciones comerciales"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 bg-card border border-border rounded-lg md:rounded-xl p-2 md:p-4 shadow-lg">
              <div className="text-lg md:text-2xl font-bold text-primary">+65%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Citas confirmadas</div>
            </div>

            <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-card border border-border rounded-lg md:rounded-xl p-2 md:p-4 shadow-lg">
              <div className="text-lg md:text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs md:text-sm text-muted-foreground">Disponible por voz</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
