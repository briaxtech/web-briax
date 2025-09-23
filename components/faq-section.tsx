import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Preguntas frecuentes</h2>
            <p className="text-xl text-muted-foreground">
              ¿Aún estas dudando? Respondemos tus preguntas frecuentes aquí
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 mb-12">
            <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                ¿Esto reemplaza a mis vendedores?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                No, tu agente IA complementa a tu equipo. Se encarga de la calificación inicial y agenda solo clientes
                listos para comprar, permitiendo que tus vendedores se enfoquen en cerrar ventas en lugar de perder
                tiempo con curiosos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                ¿Necesito cambiar mi CRM o WhatsApp?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                No necesitas cambiar nada. Nuestro agente IA se integra con tus herramientas actuales: WhatsApp
                Business, tu CRM existente, y cualquier plataforma que ya uses. La implementación es transparente para
                ti y tus clientes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                ¿Y si mis clientes notan que es un robot?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                Nuestro agente IA está entrenado con tu estilo de comunicación y conocimiento específico de tu negocio.
                La mayoría de clientes no notan la diferencia, y cuando lo hacen, valoran la respuesta inmediata y
                profesional que reciben 24/7.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                ¿Cuánto tiempo lleva implementarlo?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                La implementación completa toma entre 7-14 días. Esto incluye la configuración personalizada,
                integración con tus canales, entrenamiento del agente con tu información específica y pruebas
                exhaustivas antes del lanzamiento.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center space-y-4">
            <Button size="lg" className="text-lg px-8 py-6 group" asChild>
              <a href="https://calendly.com/brian-niwoyda/30min" target="_blank" rel="noopener noreferrer">
                CREA TU EQUIPO AHORA
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">AGENDAR LLAMADA CON nosotros</p>
          </div>
        </div>
      </div>
    </section>
  )
}
