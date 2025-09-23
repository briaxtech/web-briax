import { Button } from "@/components/ui/button"
import { Shield, ArrowRight } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section id="garantia" className="scroll-mt-24 py-20 bg-gradient-to-r from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="h-12 w-12 text-primary" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Si no tienes tu <span className="text-primary">AGENTE IA</span> funcionando en los primeros 14 días
            </h2>

            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Te devolvemos el 100% de tu dinero</h3>
              <p className="text-lg text-muted-foreground">
                Confiamos tanto en la calidad de nuestro servicio que te damos una garantía total.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-xl font-semibold">
                <span className="text-primary">Riesgo cero.</span> Resultados garantizados.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button size="lg" className="text-lg px-8 py-6 group" asChild>
              <a href="https://calendly.com/brian-niwoyda/30min" target="_blank" rel="noopener noreferrer">
                CREA TU EQUIPO COMERCIAL AHORA SIN RIESGOS
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">Agenda llamada AHORA</p>
          </div>

          <div className="mt-12">
            <img
              src="/100--money-back-guarantee-badge-with-shield-and-ch.jpg"
              alt="Garantía de devolución del 100%"
              className="mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
