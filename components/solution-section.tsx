"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function SolutionSection() {
  const router = useRouter()

  const handleGoToForm = () => {
    router.push("/formulario")
  }

  return (
    <section id="solucion" className="scroll-mt-24 py-20 bg-gradient-to-r from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">
            <span className="text-primary">Conviertes tus campanas en ventas de lujo</span> sin ampliar tu equipo ni perder tiempo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            En BrIAx creamos tu agente IA Comercial
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Asi es como quedaria...</h3>
              <p className="text-lg text-muted-foreground">Este es un ejemplo de como seria tu agente</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">100% agente, sin mover un dedo</h4>
                  <p className="text-muted-foreground">Completamente automatizado</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Atiende consultas al instante en WhatsApp, web y redes sociales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Califica presupuestos y descarta a los curiosos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Agenda solo clientes reales en tu calendario</span>
                </div>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
              <p className="text-lg font-semibold text-center">
                Si contratarias mas personal, gastarias al menos: <span className="text-2xl text-destructive font-bold">5.000 </span>
              </p>
            </div>

            <Button
                size="lg"
                className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 group w-full sm:w-auto"
                onClick={handleGoToForm}
              >
              QUIERO AGENDAR UNA LLAMADA
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <img
              src="/ai-sales-agent-clone-working-24-7--futuristic-holo.jpg"
              alt="Agente IA trabajando 24/7"
              className="w-full rounded-2xl shadow-2xl"
            />

            {/* Floating elements */}
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              IA Activa 24/7
            </div>

            <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
              <div className="text-sm text-muted-foreground">Leads calificados hoy</div>
              <div className="text-2xl font-bold text-primary">+47</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
