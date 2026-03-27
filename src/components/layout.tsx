import * as React from "react"
import { Link, Outlet, useRouterState } from "@tanstack/react-router"
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  HouseIcon,
  ArticleIcon,
  type Icon,
  VideoConferenceIcon,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button.tsx"
import { BackToTop } from "@/components/back-to-top"
import FooterSection from "@/components/footer"

const navItems: ReadonlyArray<{
  to: string
  label: string
  icon: Icon
}> = [
  { to: "/", label: "Home", icon: HouseIcon },
  { to: "/blog", label: "Blog", icon: ArticleIcon },
]

const socialLinks = [
  {
    href: "https://github.com/yourname",
    label: "GitHub",
    icon: GithubLogoIcon,
  },
  {
    href: "https://www.linkedin.com/in/yourname/",
    label: "LinkedIn",
    icon: LinkedinLogoIcon,
  },
  { href: "https://x.com/yourhandle", label: "X", icon: XLogoIcon },
] as const

export function Layout() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "280px",
          } as React.CSSProperties
        }
      >
        <AppSidebar currentPath={currentPath} />
        <SidebarInset>
          <header className="sticky top-0 z-50 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
          </header>
          <main className="relative z-0 flex flex-1 flex-col gap-4 overflow-y-auto p-6">
            <Outlet />
            <FooterSection />
            <BackToTop />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

function AppSidebar({ currentPath }: { currentPath: string }) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      {/* Icon strip sidebar */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <>
                  <Link to="/">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg border bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
                      SK
                    </div>
                  </Link>
                </>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      tooltip={{ children: item.label, hidden: false }}
                      isActive={
                        item.to === "/"
                          ? currentPath === "/"
                          : currentPath.startsWith(item.to)
                      }
                      className="px-2.5 md:px-2"
                    >
                      <Link to={item.to}>
                        <item.icon weight="duotone" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {socialLinks.map((link) => (
              <SidebarMenuItem key={link.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: link.label, hidden: false }}
                  className="px-2.5 md:px-2"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon weight="duotone" />
                    <span>{link.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Expanded detail sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-2 px-0 pb-0">
          <div className="px-4 text-base font-medium text-foreground">
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate text-lg font-bold">
                TanStack Start Kit
              </span>
              <span className="pb-1 text-xs leading-3">Starter Template</span>
            </div>
          </div>
          <Separator className="w-full" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0 pt-0">
            <SidebarGroupContent className="pt-0">
              <div className="border-b px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  An opinionated full-stack starter with shadcn/ui, Tailwind CSS
                  4, SSR, and a working contact form.
                </p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t">
          <div className="flex justify-around gap-2 text-base font-medium text-foreground">
            <Button size="lg" asChild>
              <a href="#contact">
                <VideoConferenceIcon />
                Get in touch
              </a>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  )
}
