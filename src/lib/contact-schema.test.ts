import { describe, it, expect } from "vitest"
import { contactFormSchema } from "./contact-schema"

describe("contactFormSchema", () => {
  it("accepts valid contact data", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello there!",
    })
    expect(result.success).toBe(true)
  })

  it("rejects empty name", () => {
    const result = contactFormSchema.safeParse({
      name: "",
      email: "jane@example.com",
      message: "Hello",
    })
    expect(result.success).toBe(false)
  })

  it("rejects whitespace-only name", () => {
    const result = contactFormSchema.safeParse({
      name: "   ",
      email: "jane@example.com",
      message: "Hello",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid email format", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane",
      email: "not-an-email",
      message: "Hello",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty email", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane",
      email: "",
      message: "Hello",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty message", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      message: "",
    })
    expect(result.success).toBe(false)
  })

  it("rejects name over 200 characters", () => {
    const result = contactFormSchema.safeParse({
      name: "a".repeat(201),
      email: "jane@example.com",
      message: "Hello",
    })
    expect(result.success).toBe(false)
  })

  it("rejects message over 5000 characters", () => {
    const result = contactFormSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      message: "a".repeat(5001),
    })
    expect(result.success).toBe(false)
  })

  it("trims whitespace from all fields", () => {
    const result = contactFormSchema.safeParse({
      name: "  Jane  ",
      email: "  jane@example.com  ",
      message: "  Hello  ",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe("Jane")
      expect(result.data.email).toBe("jane@example.com")
      expect(result.data.message).toBe("Hello")
    }
  })
})
