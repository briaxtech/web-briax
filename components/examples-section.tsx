import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"

export function ExamplesSection() {
  return (
    <section id="casos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ejemplos reales de lo que hará tu agente IA</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Cada negocio es distinto, pero el objetivo es el mismo: atender rápido, filtrar curiosos y entregarte
            clientes listos para comprar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative">
              <img
                src="/luxury-real-estate-ai-agent-conversation-showing-p.jpg"
                alt="Agente IA para inmobiliaria"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Ver Demo
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Inmobiliaria</h3>
              <p className="text-muted-foreground">
                Califica presupuesto, ubicación preferida y agenda visitas solo con clientes serios.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative">
              <img
                src="/e-commerce-ai-agent-handling-customer-inquiries-an.jpg"
                alt="Agente IA para e-commerce"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Ver Demo
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">E-commerce</h3>
              <p className="text-muted-foreground">
                Responde dudas de productos, procesa pedidos y recupera carritos abandonados.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative">
              <img
                src="/medical-clinic-ai-agent-scheduling-appointments-an.jpg"
                alt="Agente IA para clínica"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Ver Demo
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Clínica</h3>
              <p className="text-muted-foreground">
                Agenda citas, confirma tratamientos y gestiona consultas médicas básicas.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6 group mb-4">
            QUIERO MI AGENTE AHORA MISMO
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground">AGENDAR LLAMADA CON UN ASESOR</p>
        </div>
      </div>
    </section>
  )
}
