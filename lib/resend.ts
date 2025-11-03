import { Resend } from "resend"

const apiKey = process.env.RESEND

if (!apiKey) {
  throw new Error("Missing RESEND environment variable")
}

export const resend = new Resend(apiKey)

export const FUUNEL_LABEL = "[FUUNEL]"
