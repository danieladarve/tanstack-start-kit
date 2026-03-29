import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { getAllPosts, type PostMeta } from "@/lib/posts"
import { Button } from "@/components/ui/button.tsx"
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils.ts"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import PostTags from "@/components/post-tags.tsx"

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 3

export const Route = createFileRoute("/blog/")({
  component: PostsPage,
  head: () => ({
    meta: [
      { title: `Blog — ${SITE_NAME}` },
      {
        name: "description",
        content:
          "Articles about software engineering, TypeScript, React, and modern web development.",
      },
      { property: "og:title", content: `Blog — ${SITE_NAME}` },
      {
        property: "og:description",
        content:
          "Articles about software engineering, TypeScript, React, and modern web development.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
})

function PostAuthorActions({
  post,
  className,
}: React.ComponentProps<"div"> & { post: PostMeta }) {
  return (
    <div
      className={cn(
        className,
        "grid grid-cols-[1fr_auto] items-end gap-2 self-end pt-4"
      )}
    >
      <div className="space-y-2">
        <span className="line-clamp-1 text-sm text-muted-foreground select-none">
          {SITE_NAME}
        </span>
      </div>
      <div className="flex h-6 items-center">
        <Button
          className="cursor-pointer"
          variant="ghost"
          aria-label={`Read ${post.title}`}
          size="sm"
          asChild
        >
          <Link to="/blog/$slug" params={{ slug: post.slug }}>
            Read <CaretRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function PostsPage() {
  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 2)
  const olderPosts = posts.slice(2)

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const visibleOlderPosts = olderPosts.slice(0, visibleCount)
  const hasMore = visibleCount < olderPosts.length

  return (
    <div className="flex flex-col gap-8">
      <h1 className="container text-3xl font-bold lg:text-4xl">
        <span className="text-muted-foreground">Blog.</span>
        <br />
        <span className="font-semibold">Latest insights &amp; updates</span>
      </h1>
      <div className="mt-8 flex flex-col gap-6">
        <div className="max-w-7xl">
          {latestPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative -mx-6 mb-5 gap-2 border-b px-6 last:border-b-0 sm:grid sm:grid-cols-4"
            >
              {post.image && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="relative mb-3 aspect-3/2 overflow-hidden sm:aspect-square"
                >
                  <img
                    alt={post.title}
                    className="h-full w-full rounded-sm object-cover"
                    src={post.image}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Link>
              )}
              <div className={cn("flex flex-col gap-3 px-0 py-3 pb-6 md:px-4 lg:px-6", post.image ? "col-span-3" : "col-span-4")}>
                <time className="text-sm text-muted-foreground">
                  {post.date}
                </time>
                <h3 className="text-2xl font-semibold hover:underline lg:text-3xl">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h3>
                <div className="max-w-lg pt-2">
                  <p className="text-md text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <PostTags tags={post.tags} />
                  <PostAuthorActions className="w-full" post={post} />
                </div>
              </div>
            </article>
          ))}
        </div>
        {olderPosts.length > 0 && (
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-px -inset-y-6 border-x"
            ></div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -inset-y-6 left-1/2 w-2 -translate-x-1.5 border-x max-sm:hidden lg:left-1/3 lg:-translate-x-1.5"
            ></div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -inset-y-6 right-1/3 ml-auto w-2 translate-x-1.5 border-x max-lg:hidden"
            ></div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-6 inset-y-0 border-y"
            ></div>
            <div className="grid gap-x-2 sm:grid-cols-2 lg:grid-cols-3">
              {visibleOlderPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative row-span-2 grid grid-rows-subgrid gap-4 border-b p-6 duration-200"
                >
                  <div className="space-y-3">
                    <time className="block text-sm text-muted-foreground">
                      {post.date}
                    </time>
                    <h3 className="text-lg font-semibold text-foreground hover:underline">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{post.description}</p>
                  </div>
                  <div>
                    <PostAuthorActions post={post} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
      {hasMore && (
        <div className="mx-auto mt-6 max-w-5xl px-6 text-center">
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
          >
            Load more <CaretDownIcon />
          </Button>
        </div>
      )}
    </div>
  )
}
