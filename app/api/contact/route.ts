import { NextResponse } from "next/server"
import { z } from "zod"

import { FUUNEL_LABEL, resend } from "@/lib/resend"

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const sanitizeHeaderValue = (value: string) => value.replace(/[\r\n]+/g, " ").trim()

const leadSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z.string().trim().email("Correo electronico invalido"),
  phone: z
    .string()
    .optional()
    .transform((value) => (value ?? "").trim()),
  company: z.string().trim().min(1, "La empresa es obligatoria"),
  current_sales_automation: z.string().trim().min(1, "Selecciona una opcion"),
  which_tool: z
    .string()
    .optional()
    .transform((value) => (value ?? "").trim()),
  monthly_leads: z.string().trim().min(1, "Selecciona una opcion"),
  pain_point: z.string().trim().min(1, "Cuéntanos tu desafío principal"),
  decision_timeline: z.string().trim().min(1, "Selecciona una opcion"),
  budget_for_solution: z.string().trim().min(1, "Selecciona una opcion"),
  preferred_contact_method: z.string().trim().min(1, "Selecciona una opcion"),
  how_found: z
    .string()
    .optional()
    .transform((value) => (value ?? "").trim()),
})

const leadFieldLabels: Record<keyof z.infer<typeof leadSchema>, string> = {
  name: "Nombre",
  email: "Email",
  phone: "Telefono",
  company: "Empresa",
  current_sales_automation: "Automatizacion actual",
  which_tool: "Herramienta actual",
  monthly_leads: "Leads mensuales",
  pain_point: "Punto de dolor",
  decision_timeline: "Timeline decision",
  budget_for_solution: "Presupuesto",
  preferred_contact_method: "Contacto preferido",
  how_found: "Como nos conocio",
}

const getFromAddress = () => {
  const value = process.env.RESEND_FROM_EMAIL?.trim()
  if (!value) {
    throw new Error(
      "Missing RESEND_FROM_EMAIL environment variable. Configure it with a verified sender address in Resend.",
    )
  }
  return value
}

const getToAddress = () => process.env.RESEND_NOTIFICATION_TO?.trim() || "briaxtech@gmail.com"

const renderHtmlEmail = (lead: z.infer<typeof leadSchema>, submittedAt: string, isHighPriority: boolean) => {
  const rows = Object.entries(leadFieldLabels)
    .map(([field, label]) => {
      const rawValue = lead[field as keyof typeof lead] || ""
      const value = rawValue ? escapeHtml(rawValue) : "—"
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#111;">${label}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#1f2933;">${value || "—"}</td>
      </tr>`
    })
    .join("")

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;color:#111;margin-bottom:4px;">${FUUNEL_LABEL} Nueva solicitud de demo</h1>
      <p style="margin:0 0 16px;color:#4b5563;">Recibiste una nueva solicitud desde el formulario de FUUNEL${
        isHighPriority ? " <strong style='color:#7c3aed;'>(Lead prioritario)</strong>" : ""
      }.</p>
      <table style="width:100%;border-collapse:collapse;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <tbody>
          ${rows}
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#111;">Prioridad</td>
            <td style="padding:8px 12px;color:${isHighPriority ? "#7c3aed" : "#1f2933"};">${
              isHighPriority ? "Alta" : "Regular"
            }</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#111;">Fecha de envio</td>
            <td style="padding:8px 12px;color:#1f2933;">${submittedAt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

const renderTextEmail = (lead: z.infer<typeof leadSchema>, submittedAt: string, isHighPriority: boolean) => {
  const header = `${FUUNEL_LABEL} Nueva solicitud de demo${isHighPriority ? " (Prioridad alta)" : ""}`

  const body = Object.entries(leadFieldLabels)
    .map(([field, label]) => {
      const rawValue = lead[field as keyof typeof lead] || ""
      return `${label}: ${rawValue || "—"}`
    })
    .join("\n")

  return `${header}

${body}

Prioridad: ${isHighPriority ? "Alta" : "Regular"}
Fecha de envío: ${submittedAt}
`
}

export async function POST(request: Request) {
  try {
    const payload = leadSchema.parse(await request.json())

    const submittedAt = new Date().toISOString()
    const isHighPriority =
      payload.decision_timeline === "inmediato" || payload.budget_for_solution === ">20000"
    const displayName = sanitizeHeaderValue(payload.name)

    const from = getFromAddress()

    const { error } = await resend.emails.send({
      from,
      to: [getToAddress()],
      replyTo: payload.email,
      subject: `${FUUNEL_LABEL} Nueva solicitud de ${displayName}`,
      html: renderHtmlEmail(payload, submittedAt, isHighPriority),
      text: renderTextEmail(payload, submittedAt, isHighPriority),
      tags: [
        { name: "workspace", value: "fuunel" },
        { name: "priority", value: isHighPriority ? "high" : "normal" },
      ],
    })

    if (error) {
      console.error("Error enviando email con Resend:", error)
      return NextResponse.json(
        { error: "No pudimos enviar el email. Intenta nuevamente en unos segundos." },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Datos invalidos",
          details: error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    console.error("Error inesperado procesando la solicitud:", error)
    return NextResponse.json(
      { error: "Ocurrio un error inesperado al procesar tu solicitud." },
      { status: 500 },
    )
  }
}
