import { useEffect, useState } from "react"
import { ArrowUpIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return

    const onScroll = () => {
      setVisible(main.scrollTop > 400)
    }

    main.addEventListener("scroll", onScroll, { passive: true })
    return () => main.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <Button
      size="icon"
      variant="outline"
      className="fixed right-6 bottom-6 z-50 size-10 rounded-full shadow-md transition-opacity duration-200"
      onClick={() => {
        document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" })
      }}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="size-4" />
    </Button>
  )
}
