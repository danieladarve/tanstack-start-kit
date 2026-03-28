import { createFileRoute } from "@tanstack/react-router"
import Faq from "@/components/faq.tsx"
import ToolsIWorkWith from "@/components/tools-i-work-with.tsx"
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants"
import ContentSection from "@/components/content-section.tsx"
import ContactSection from "@/components/contact-section.tsx"
import { SparkleIcon, VideoConferenceIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button.tsx"

const HOME_DESCRIPTION =
  "An opinionated TanStack Start starter with shadcn/ui, Tailwind CSS 4, and a working contact form powered by Resend."

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: SITE_NAME },
      { name: "description", content: HOME_DESCRIPTION },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems
            .filter(
              (faq): faq is { question: string; answer: string } =>
                typeof faq.answer === "string"
            )
            .map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
        }),
      },
    ],
  }),
})

const faqItems = [
  {
    question: "What is TanStack Start Kit?",
    answer:
      "An opinionated full-stack starter built on TanStack Start with shadcn/ui components, Tailwind CSS 4, and a working contact form powered by Resend. It gives you a production-ready foundation so you can ship features immediately.",
  },
  {
    question: "What tech stack does it use?",
    answer:
      "TanStack Start v1 with React 19, TanStack Router for type-safe file-based routing, Tailwind CSS 4 with CSS-first configuration, shadcn/ui components built on Radix UI, and Resend for transactional email.",
  },
  {
    question: "How do I customise it?",
    answer:
      "Update src/lib/constants.ts with your site name, URL, and social links. Swap the color theme in src/styles.css. Add new routes under src/routes/. The shadcn CLI (npx shadcn@latest add) lets you add more components as needed.",
  },
  {
    question: "How does the contact form work?",
    answer:
      "The form uses @tanstack/react-form for client-side validation and a TanStack Start server function that sends email via the Resend API. Set your RESEND_API_KEY and CONTACT_EMAIL in .env to get it working.",
  },
  {
    question: "Where can I deploy it?",
    answer:
      "Anywhere that supports Node.js SSR: Vercel, Netlify, Cloudflare, or a plain Node server. TanStack Start uses Nitro under the hood, so you can switch presets in vite.config.ts.",
  },
  {
    question: "Is it production-ready?",
    answer:
      "Yes. It includes SSR, SEO meta tags, structured data, a responsive sidebar layout, dark mode, and form validation. Add your content and deploy.",
  },
]

function HomePage() {
  return (
    <div className="flex max-w-7xl flex-col gap-20">
      <section className="flex flex-wrap justify-center">
        <div className="flex flex-wrap justify-center gap-4 text-center">
          <div className="flex w-fit w-full items-center justify-center gap-2 rounded-md py-0.5 pr-3 pl-1 transition-colors duration-150 hover:bg-foreground/5">
            <div
              aria-hidden
              className="relative flex size-5 items-center justify-center rounded border border-background bg-linear-to-b from-primary to-foreground shadow-md ring-1 shadow-black/20 ring-black/10 dark:inset-shadow-2xs"
            >
              <div className="absolute inset-x-0 inset-y-1.5 border-y border-dotted border-white/25"></div>
              <div className="absolute inset-x-1.5 inset-y-0 border-x border-dotted border-white/25"></div>
              <SparkleIcon className="size-3 fill-white stroke-white drop-shadow" />
            </div>
            <span className="font-medium">
              Ship faster with TanStack Start
            </span>
          </div>
          <div className="mt-6 flex max-w-4xl flex-wrap justify-center">
            <h1 className="mb-6 max-w-6xl text-3xl font-medium tracking-tighter text-foreground sm:text-4xl lg:text-5xl">
              The opinionated TanStack Start starter you've been looking for.
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80 lg:text-xl">
              Full-stack React with shadcn/ui, Tailwind CSS 4, SSR, type-safe
              routing, and a working contact form. Clone it, customise it, ship
              it.
            </p>
          </div>
          <span className="mt-2 w-full text-sm text-muted-foreground">
            Built with TanStack Start v1, React 19, and Tailwind CSS 4.
          </span>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="px-6 text-base">
            <a href="#contact">
              <VideoConferenceIcon />
              Get in Touch
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-6 text-base"
          >
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </section>
      <section>
        <ContentSection />
      </section>
      <section>
        <ToolsIWorkWith />
      </section>
      <section>
        <Faq items={faqItems} />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  )
}

