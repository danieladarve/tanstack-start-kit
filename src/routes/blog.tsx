import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/blog")({ component: PostsLayout })

function PostsLayout() {
  return <Outlet />
}
