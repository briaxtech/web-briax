import { NextResponse } from "next/server"
import { z } from "zod"

import { FUUNEL_LABEL, resend } from "@/lib/resend"
import { getSellerBySlug } from "@/lib/sellers"
import type { SellerConfig } from "@/lib/sellers"

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

const payloadSchema = leadSchema.extend({
  seller_slug: z
    .string()
    .trim()
    .min(1, "Seller slug invalido")
    .max(64, "Seller slug demasiado largo")
    .optional(),
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

const getArgentinaAddress = () => process.env.RESEND_NOTIFICATION_TO_AR?.trim()

const getToAddress = ({ seller, countryCode }: { seller?: SellerConfig | null; countryCode?: string }) => {
  const sellerEmail = seller?.notificationEmail?.trim()
  if (sellerEmail) {
    return sellerEmail
  }

  if (countryCode === "AR") {
    const argentinaAddress = getArgentinaAddress()
    if (argentinaAddress) {
      return argentinaAddress
    }
  }

  return process.env.RESEND_NOTIFICATION_TO?.trim() || "briaxtech@gmail.com"
}

const getCountryCode = (request: Request) => {
  const headerCountry =
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? request.headers.get("x-country")

  return headerCountry?.trim().toUpperCase()
}

const formatSellerDisplay = (seller: SellerConfig | null, sellerSlug: string | null) => {
  if (seller) {
    return seller.name
  }

  if (!sellerSlug) {
    return "Equipo general"
  }

  return sellerSlug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

const renderHtmlEmail = (
  lead: z.infer<typeof leadSchema>,
  submittedAt: string,
  isHighPriority: boolean,
  sellerDisplay: string,
) => {
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

  const sellerRow = `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#111;">Vendedor asignado</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#1f2933;">${escapeHtml(sellerDisplay)}</td>
      </tr>`

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;color:#111;margin-bottom:4px;">${FUUNEL_LABEL} Nueva solicitud de demo</h1>
      <p style="margin:0 0 16px;color:#4b5563;">Recibiste una nueva solicitud desde el formulario de FUUNEL${
        isHighPriority ? " <strong style='color:#7c3aed;'>(Lead prioritario)</strong>" : ""
      }.</p>
      <table style="width:100%;border-collapse:collapse;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <tbody>
          ${rows}
          ${sellerRow}
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

const renderTextEmail = (
  lead: z.infer<typeof leadSchema>,
  submittedAt: string,
  isHighPriority: boolean,
  sellerDisplay: string,
) => {
  const header = `${FUUNEL_LABEL} Nueva solicitud de demo${isHighPriority ? " (Prioridad alta)" : ""}`

  const body = Object.entries(leadFieldLabels)
    .map(([field, label]) => {
      const rawValue = lead[field as keyof typeof lead] || ""
      return `${label}: ${rawValue || "—"}`
    })
    .join("\n")

  return `${header}

${body}

Vendedor asignado: ${sellerDisplay}
Prioridad: ${isHighPriority ? "Alta" : "Regular"}
Fecha de envío: ${submittedAt}
`
}

export async function POST(request: Request) {
  try {
    const payload = payloadSchema.parse(await request.json())
    const { seller_slug: sellerSlugValue, ...lead } = payload
    const sellerSlug = sellerSlugValue ? sellerSlugValue.toLowerCase() : null
    const seller = sellerSlug ? getSellerBySlug(sellerSlug) : null
    const sellerDisplay = formatSellerDisplay(seller, sellerSlug)
    const sellerTagValue = seller?.slug ?? sellerSlug ?? "general"

    const submittedAt = new Date().toISOString()
    const isHighPriority =
      lead.decision_timeline === "inmediato" || lead.budget_for_solution === ">20000"
    const displayName = sanitizeHeaderValue(lead.name)

    const from = getFromAddress()
    const countryCode = getCountryCode(request)
    const toAddress = getToAddress({ seller, countryCode })
    const subjectSellerSuffix = sellerTagValue !== "general" ? ` [${sellerDisplay}]` : ""
    const subject = `${FUUNEL_LABEL}${subjectSellerSuffix} Nueva solicitud de ${displayName}`

    const { error } = await resend.emails.send({
      from,
      to: [toAddress],
      replyTo: lead.email,
      subject,
      html: renderHtmlEmail(lead, submittedAt, isHighPriority, sellerDisplay),
      text: renderTextEmail(lead, submittedAt, isHighPriority, sellerDisplay),
      tags: [
        { name: "workspace", value: "fuunel" },
        { name: "priority", value: isHighPriority ? "high" : "normal" },
        { name: "seller", value: sellerTagValue },
      ],
    })

    if (error) {
      console.error("Error enviando email con Resend:", { error, sellerSlug, toAddress, countryCode })
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
