import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter } from "lucide-react"

export function TeamSection() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Equipo con trayectoria</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Unimos experiencia, complejidad y velocidad en una sola empresa: BrIAx
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">TN</span>
            </div>

            <h3 className="text-xl font-bold mb-2">TU NOMBRE</h3>
            <Badge variant="secondary" className="mb-4">
              Director Marketing
            </Badge>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Estratega en marketing digital y publicidad de alto rendimiento. Diseña las campañas y embudos que
              impulsan a nuestros Agentes IA para generar más prospectos calificados, reducir costos y aumentar
              conversiones en cualquier sector.
            </p>

            <div className="flex justify-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Linkedin className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">NE</span>
            </div>

            <h3 className="text-xl font-bold mb-2">NOMBRE DE CUALQUIER OTRA PERSONA DE TU EQUIPO</h3>
            <Badge variant="secondary" className="mb-4">
              Director de Operaciones
            </Badge>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Desarrollador de software especializado en Inteligencia Artificial. Lidera la implementación de nuestros
              Agentes IA para que empiecen a vender, agendar y atender en tiempo récord, totalmente integrados a tu
              negocio.
            </p>

            <div className="flex justify-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Linkedin className="h-4 w-4" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
