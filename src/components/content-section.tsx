import {
  CpuIcon,
  LightningIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils.ts"

export default function ContentSection({
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("", props.className)}>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-4xl">
          Everything you need to ship fast.
        </h2>
        <div className="relative">
          <div className="relative z-10 space-y-4 md:w-1/2">
            <p>
              Stop wasting time on boilerplate decisions. This starter gives you
              a{" "}
              <span className="font-medium">
                production-ready foundation
              </span>{" "}
              so you can focus on building features from day one.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LightningIcon className="size-4" />
                  <h3 className="text-sm font-medium">Type-safe routing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  TanStack Router with file-based routes, search param
                  validation, and full TypeScript inference.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CpuIcon className="size-4" />
                  <h3 className="text-sm font-medium">Server functions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full-stack with createServerFn. Call server code from your
                  components with zero API boilerplate.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RocketLaunchIcon className="size-4" />
                  <h3 className="text-sm font-medium">SSR out of the box</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Server-side rendering with client hydration. Deploy to Vercel,
                  Netlify, Cloudflare, or any Node server.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="size-4" />
                  <h3 className="text-sm font-medium">Beautiful UI</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  shadcn/ui components with Tailwind CSS 4, dark mode, and
                  responsive sidebar layout included.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 h-fit md:absolute md:inset-x-0 md:-inset-y-12 md:mt-0 md:mask-l-from-35% md:mask-l-to-55%">
            <div className="relative rounded-2xl border border-dotted border-border/50 p-2">
              <img
                src="/images/charts.webp"
                className="hidden rounded-[12px] dark:block"
                alt="Platform architecture and performance metrics"
                width={1207}
                height={929}
              />
              <img
                src="/images/charts-light.webp"
                className="rounded-[12px] shadow dark:hidden"
                alt="Platform architecture and performance metrics"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
