import { AlertTriangle, Clock, DollarSign } from "lucide-react"

export function ProblemSection() {
  return (
    <section id="problema" className="scroll-mt-24 py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">
            Bienvenido a la nueva era comercial: <span className="text-primary">la era de los agentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            El problema no es tu marketing, es tu tiempo desperdiciado en leads que no califican.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">¿Te ha pasado?</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 text-center group hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h4 className="text-lg font-bold mb-4 min-h-[3.5rem] flex items-center justify-center">
              ¿Tu equipo comercial pierde horas respondiendo a curiosos que nunca compran?
            </h4>
            <div className="mb-6 h-48 overflow-hidden rounded-lg bg-muted">
              <img
                src="/frustrated-sales-team-wasting-time-on-unqualified-.jpg"
                alt="Equipo comercial frustrado perdiendo tiempo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Con tu agente de IA esos curiosos se filtran automáticamente y solo llegan a tu agenda clientes con
              intención real de compra.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center group hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-8 w-8 text-destructive" />
            </div>
            <h4 className="text-lg font-bold mb-4 min-h-[3.5rem] flex items-center justify-center">
              ¿Llegan leads a medianoche y nadie los atiende hasta el día siguiente?
            </h4>
            <div className="mb-6 h-48 overflow-hidden rounded-lg bg-muted">
              <img
                src="/nighttime-business-missed-opportunities--clock-sho.jpg"
                alt="Oportunidades perdidas en la noche"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu Agente IA atiende 24/7, responde al instante y agenda visitas incluso mientras duermes.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center group hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="h-8 w-8 text-destructive" />
            </div>
            <h4 className="text-lg font-bold mb-4 min-h-[3.5rem] flex items-center justify-center">
              ¿Sientes que inviertes en publicidad pero no se refleja en cierres reales?
            </h4>
            <div className="mb-6 h-48 overflow-hidden rounded-lg bg-muted">
              <img
                src="/wasted-marketing-budget-with-low-conversion-rates-.jpg"
                alt="Inversión en marketing sin resultados"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Con tu agente IA, cada lead de tus campañas es calificado y solo recibes prospectos listos para avanzar.
              Así tu inversión en marketing se convierte en ventas reales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
