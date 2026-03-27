import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { HouseIcon } from "@phosphor-icons/react"

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
      <span className="text-8xl font-bold tracking-tighter text-muted-foreground/30">
        404
      </span>
      <h1 className="text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg" className="mt-2">
        <Link to="/">
          <HouseIcon className="size-4" />
          Back to home
        </Link>
      </Button>
    </div>
  )
}
