"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function BenefitsSection() {
  const router = useRouter()

  const handleGoToForm = () => {
    router.push("/formulario")
  }

  return (
    <section id="beneficios" className="scroll-mt-24 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Agenda una llamada con nuestro equipo</h2>
          <h3 className="text-2xl font-bold mb-8">Es para ti si eres...</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-8 text-center group hover:shadow-lg transition-all">
            <img
              src="/luxury-real-estate-owner-tired-of-dealing-with-unq.jpg"
              alt="Dueno de inmobiliaria de lujo"
              className="w-full rounded-lg mb-6"
            />
            <h4 className="text-xl font-bold mb-4">Dueno de inmobiliaria de lujo</h4>
            <p className="text-muted-foreground">cansado de responder a curiosos</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center group hover:shadow-lg transition-all">
            <img
              src="/independent-real-estate-agent-wanting-premium-clie.jpg"
              alt="Agente independiente"
              className="w-full rounded-lg mb-6"
            />
            <h4 className="text-xl font-bold mb-4">Agente independiente</h4>
            <p className="text-muted-foreground">que quiere clientes premium listos para cerrar</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center group hover:shadow-lg transition-all">
            <img
              src="/sales-manager-seeking-results-without-hiring-more-.jpg"
              alt="Gerente de ventas"
              className="w-full rounded-lg mb-6"
            />
            <h4 className="text-xl font-bold mb-4">Gerente de ventas</h4>
            <p className="text-muted-foreground">que busca resultados sin contratar mas personal</p>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 group w-full sm:w-auto max-w-sm sm:max-w-none"
            onClick={handleGoToForm}
          >
            AGENDAR LLAMADA AHORA MISMO
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

