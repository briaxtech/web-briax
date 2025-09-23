export function ProcessSection() {
  return (
    <section id="proceso" className="scroll-mt-24 py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">¿Cómo funciona?</h2>
          <p className="text-xl text-muted-foreground">Te explico lo simple que es y te va a volar la cabeza...</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Configuramos tu agente de IA</h3>
              <p className="text-muted-foreground mb-6">
                Lo adaptamos a tu negocio, propiedades y estilo de comunicación.
              </p>
              <img
                src="/ai-configuration-interface-showing-business-custom.jpg"
                alt="Configuración del agente IA"
                className="w-full rounded-lg"
              />
            </div>
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Integramos tus canales</h3>
              <p className="text-muted-foreground mb-6">WhatsApp, Instagram, Facebook, Web.</p>
              <img
                src="/social-media-integration-showing-whatsapp-instagra.jpg"
                alt="Integración de canales"
                className="w-full rounded-lg"
              />
            </div>
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-4">Empieza a vender más</h3>
            <p className="text-muted-foreground mb-6">
              Tu agente filtra leads y te agenda solo prospectos calificados.
            </p>
            <img
              src="/sales-growth-chart-showing-increased-revenue-and-q.jpg"
              alt="Crecimiento en ventas"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
