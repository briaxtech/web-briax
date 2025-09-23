import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function DemoSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Esto es lo que te llevarás</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img
              src="/ai-agent-demo-video-thumbnail-showing-whatsapp-con.jpg"
              alt="Demo del agente IA en acción"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Play className="mr-2 h-6 w-6" />
                Ver Demo
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Atiende consultas al instante</h3>
              <p className="text-muted-foreground">en WhatsApp, web y redes sociales</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Califica presupuestos</h3>
              <p className="text-muted-foreground">y descarta a los curiosos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Agenda solo clientes reales</h3>
              <p className="text-muted-foreground">en tu calendario</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
