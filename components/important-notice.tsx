import { AlertTriangle, MessageCircle, Eye, HelpCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ImportantNotice() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <Card className="p-8 border-l-4 border-l-yellow-500">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-4">⚠️ Importante</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Esta no es una llamada técnica ni con programadores. Es una conversación enfocada en entender tu
                negocio, tus procesos comerciales y mostrarte cómo los Agentes IA ya están ayudando a empresas como la
                tuya a vender más y ahorrar miles de euros al año.
              </p>

              <h4 className="text-lg font-semibold mb-4">En la llamada vas a poder...</h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Contarnos tu situación actual y tus objetivos de ventas.</p>
                </div>

                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    Ver ejemplos reales de cómo un Agente IA atiende clientes y cierra oportunidades.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Resolver tus dudas sobre inversión y tiempos</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
