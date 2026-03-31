import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"
import { getRequest } from "@tanstack/react-start/server"
import { contactFormSchema } from "./contact-schema"

export type { ContactFormData } from "./contact-schema"

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count += 1
  return true
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown"

    if (!checkRateLimit(ip)) {
      throw new Error("Too many requests. Please try again later.")
    }

    const origin = request.headers.get("origin")
    const host = request.headers.get("host")
    if (origin && host && !origin.includes(host)) {
      throw new Error("Invalid request origin")
    }

    const contactEmail = process.env.CONTACT_EMAIL
    if (!contactEmail) {
      throw new Error("Contact email is not configured")
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const safeName = escapeHtml(data.name)
    const safeEmail = escapeHtml(data.email)
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />")

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: data.email,
      subject: `Contact from ${safeName}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    if (error) {
      throw new Error("Failed to send message. Please try again later.")
    }

    return { success: true }
  })
