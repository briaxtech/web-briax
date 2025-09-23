import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Header } from "@/components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "BrIAx - Agente de Ventas IA",
  description: "Vende mas sin ampliar tu equipo comercial con BrIAx, tu agente de ventas con inteligencia artificial",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head></head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Header />
        <Suspense fallback={null}>
          <main>{children}</main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
