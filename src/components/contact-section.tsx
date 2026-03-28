import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { sendContactEmail } from "@/lib/send-contact-email"
import type { ContactFormData } from "@/lib/send-contact-email"

export default function ContactSection() {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    } satisfies ContactFormData,
    onSubmit: async ({ value }) => {
      try {
        setSubmitState("idle")
        await sendContactEmail({ data: value as ContactFormData })
        setSubmitState("success")
        form.reset()
      } catch (err) {
        setSubmitState("error")
        setErrorMessage(
          err instanceof Error ? err.message : "Something went wrong"
        )
      }
    },
  })

  return (
    <div className="">
      <h2 className="container text-3xl font-bold lg:text-4xl">
        <span className="text-muted-foreground">Get in Touch.</span>
        <br />
        <span className="block max-w-3xl font-semibold">
          Have a question or want to work together? Send a message.
        </span>
      </h2>
      <div className="max-w-4xl px-4 lg:px-0">
        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="grid grid-cols-2 lg:col-span-2 lg:block lg:space-y-12">
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <p className="text-muted-foreground">
                  Whether you have a question about this starter kit, want to
                  report an issue, or just want to say hello — drop a message
                  and you'll hear back soon.
                </p>
              </div>
            </div>
          </div>

          <form
            className="@container lg:col-span-3"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <Card className="p-8 sm:p-12">
              <h3 className="text-xl font-semibold">Send a message</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Include as much detail as you'd like.
              </p>

              <div className="mt-8 space-y-4 *:space-y-3 **:[&>label]:block">
                <div>
                  <form.Field
                    name="name"
                    validators={{
                      onSubmit: ({ value }) =>
                        !value.trim() ? "Name is required" : undefined,
                    }}
                  >
                    {(field) => (
                      <>
                        <Label className="space-y-2" htmlFor="name">
                          Full name
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                <div>
                  <form.Field
                    name="email"
                    validators={{
                      onSubmit: ({ value }) =>
                        !value.trim() ? "Email is required" : undefined,
                    }}
                  >
                    {(field) => (
                      <>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                <div>
                  <form.Field
                    name="message"
                    validators={{
                      onSubmit: ({ value }) =>
                        !value.trim() ? "Message is required" : undefined,
                    }}
                  >
                    {(field) => (
                      <>
                        <Label htmlFor="msg">Message</Label>
                        <Textarea
                          id="msg"
                          rows={3}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>

                {submitState === "success" && (
                  <p className="text-sm font-medium text-primary">
                    Thank you! Your message has been sent.
                  </p>
                )}
                {submitState === "error" && (
                  <p className="text-sm font-medium text-destructive">
                    {errorMessage}
                  </p>
                )}

                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) => (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Submit"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
