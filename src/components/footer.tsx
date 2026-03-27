import { Link, useRouterState } from "@tanstack/react-router"
import { SITE_NAME } from "@/lib/constants"

const links = [
  { title: "Home", to: "/" },
  { title: "Blog", to: "/blog" },
]

export default function FooterSection() {
  const currentPath = useRouterState().location.pathname

  return (
    <footer className="border-t bg-background mt-12 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="order-last block text-center text-sm text-muted-foreground md:order-first">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <nav className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-muted-foreground duration-150 hover:text-primary"
                {...((link.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.to)) && {
                  "aria-current": "page" as const,
                })}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
