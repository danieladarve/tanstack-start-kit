import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getAllPosts } from "@/lib/posts"
import { SITE_URL } from "@/lib/constants"

const generateSitemap = createServerFn({ method: "GET" }).handler(async () => {
  const posts = getAllPosts()

  const staticPages = [
    { loc: SITE_URL, priority: "1.0" },
    { loc: `${SITE_URL}/blog`, priority: "0.8" },
  ]

  const postPages = posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    priority: "0.6",
  }))

  const urls = [...staticPages, ...postPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
})

export const Route = createFileRoute("/sitemap.xml")({
  loader: () => generateSitemap(),
})
