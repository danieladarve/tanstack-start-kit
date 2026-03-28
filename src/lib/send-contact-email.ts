import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: ContactFormData) => {
    if (!data.name?.trim()) throw new Error("Name is required")
    if (!data.email?.trim()) throw new Error("Email is required")
    if (!data.message?.trim()) throw new Error("Message is required")
    return data
  })
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "hello@example.com",
      replyTo: data.email,
      subject: `Contact from ${data.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br />")}</p>
      `,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  })
