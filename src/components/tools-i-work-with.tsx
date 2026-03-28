import { Gemini } from "@/components/ui/svgs/gemini"
import { cn } from "@/lib/utils"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { AmazonQ } from "@/components/ui/svgs/amazon-q.tsx"
import { ClerkIconLight } from "@/components/ui/svgs/clerk-icon-light.tsx"
import { Coinbase } from "@/components/ui/svgs/coinbase.tsx"
import { FirebaseStudio } from "@/components/ui/svgs/firebase-studio.tsx"
import { GithubLight } from "@/components/ui/svgs/github_light.tsx"
import { GrokLight } from "@/components/ui/svgs/grok-light.tsx"
import { Javascript } from "@/components/ui/svgs/javascript.tsx"
import { Laravel } from "@/components/ui/svgs/laravel.tsx"
import { Manus } from "@/components/ui/svgs/manus.tsx"
import { Matic } from "@/components/ui/svgs/matic.tsx"
import { Midjourney } from "@/components/ui/svgs/midjourney.tsx"
import { MistralAiLogo } from "@/components/ui/svgs/mistral-ai_logo.tsx"
import { NextjsIconDark } from "@/components/ui/svgs/nextjs_icon_dark.tsx"
import { NvidiaIconLight } from "@/components/ui/svgs/nvidia-icon-light.tsx"
import { OllamaLight } from "@/components/ui/svgs/ollama_light.tsx"
import { Openclaw } from "@/components/ui/svgs/openclaw.tsx"
import { Shopify } from "@/components/ui/svgs/shopify.tsx"
import { Tanstack } from "@/components/ui/svgs/tanstack.tsx"
import { TensorflowIconLight } from "@/components/ui/svgs/tensorflow-icon-light.tsx"
import { Twilio } from "@/components/ui/svgs/twilio.tsx"
import { Typescript } from "@/components/ui/svgs/typescript.tsx"
import { ClaudeCode } from "@/components/ui/svgs/claude-code.tsx"

export default function ToolsIWorkWith({
  ...props
}: React.ComponentProps<"section">) {
  return (
    <div className={cn(props.className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
          <h2 className="text-3xl font-medium text-balance md:text-4xl">
            Built with the best tools.
          </h2>
          <p className="text-muted-foreground">
            TanStack Start, React 19, Tailwind CSS 4, shadcn/ui, and more.
            Everything you need for modern full-stack development.
          </p>
        </div>
        <div className="group relative mx-auto mt-6 max-w-88 items-center justify-between space-y-6 bg-muted/25 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] sm:max-w-md">
          <div
            role="presentation"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
          ></div>
          <div>
            <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
              <IntegrationCard>
                <AmazonQ />
              </IntegrationCard>
              <IntegrationCard>
                <ClerkIconLight />
              </IntegrationCard>
              <IntegrationCard>
                <Coinbase />
              </IntegrationCard>
              <IntegrationCard>
                <Gemini />
              </IntegrationCard>
              <IntegrationCard>
                <Openclaw />
              </IntegrationCard>
              <IntegrationCard>
                <Shopify />
              </IntegrationCard>
              <IntegrationCard>
                <Tanstack />
              </IntegrationCard>
            </InfiniteSlider>
          </div>

          <div>
            <InfiniteSlider gap={24} speed={20} speedOnHover={10} reverse>
              <IntegrationCard>
                <FirebaseStudio />
              </IntegrationCard>
              <IntegrationCard>
                <TensorflowIconLight />
              </IntegrationCard>
              <IntegrationCard>
                <GithubLight />
              </IntegrationCard>
              <IntegrationCard>
                <GrokLight />
              </IntegrationCard>
              <IntegrationCard>
                <Twilio />
              </IntegrationCard>
              <IntegrationCard>
                <Javascript />
              </IntegrationCard>
              <IntegrationCard>
                <Laravel />
              </IntegrationCard>
              <IntegrationCard>
                <Manus />
              </IntegrationCard>
            </InfiniteSlider>
          </div>
          <div>
            <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
              <IntegrationCard>
                <Matic />
              </IntegrationCard>
              <IntegrationCard>
                <Midjourney />
              </IntegrationCard>
              <IntegrationCard>
                <MistralAiLogo />
              </IntegrationCard>
              <IntegrationCard>
                <NextjsIconDark />
              </IntegrationCard>
              <IntegrationCard>
                <NvidiaIconLight />
              </IntegrationCard>
              <IntegrationCard>
                <Typescript />
              </IntegrationCard>
              <IntegrationCard>
                <OllamaLight />
              </IntegrationCard>
            </InfiniteSlider>
          </div>
          <div className="absolute inset-0 m-auto flex size-fit justify-center gap-2">
            <IntegrationCard
              className="shadow-black-950/10 size-16 bg-white/25 shadow-xl backdrop-blur-md backdrop-grayscale dark:border-white/10 dark:shadow-white/15"
              isCenter={true}
            >
              <ClaudeCode />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </div>
  )
}

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode
  className?: string
  isCenter?: boolean
}) => {
  return (
    <div
      className={cn(
        "relative z-20 flex size-12 rounded-full border bg-background",
        className
      )}
    >
      <div className={cn("m-auto size-fit *:size-5", isCenter && "*:size-8")}>
        {children}
      </div>
    </div>
  )
}
