import { Card } from "@/components/ui/card"
import { Building2, Home, ShoppingBag, Stethoscope } from "lucide-react"

export function TargetBusinesses() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ideal para clínicas, consultorios, inmobiliarias y e-commerce
        </h2>
        <p className="text-xl text-primary font-semibold mb-12">
          El negocio que responde primero es el que se queda con la venta.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">Clínicas</h3>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">Consultorios</h3>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Home className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">Inmobiliarias</h3>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">E-commerce</h3>
          </Card>
        </div>
      </div>
    </section>
  )
}
