import { createFileRoute, Link, type ErrorComponentProps } from "@tanstack/react-router"
import Markdown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import { getPostBySlug, getAdjacentPosts } from "@/lib/posts"
import { ArrowLeftIcon, ArrowRightIcon, WarningIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import { Separator } from "@/components/ui/separator.tsx"
import PostTags from "@/components/post-tags.tsx"

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) {
      throw new Error("Post not found")
    }
    const adjacent = getAdjacentPosts(params.slug)
    return { post, adjacent }
  },
  errorComponent: PostError,
  head: ({ loaderData }) => {
    const post = loaderData?.post
    if (!post) return {}
    return {
      meta: [
        { title: `${post.title} — ${SITE_NAME}` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        ...(post.image
          ? [{ property: "og:image", content: post.image }]
          : []),
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: SITE_NAME,
              url: SITE_URL,
            },
            publisher: {
              "@type": "Person",
              name: SITE_NAME,
            },
            datePublished: post.rawDate,
            dateModified: post.rawDate,
            keywords: post.tags.join(", "),
          }),
        },
      ],
    }
  },
  component: PostPage,
})

function PostPage() {
  const { post, adjacent } = Route.useLoaderData()

  return (
    <article className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon size={14} />
          Back to blog
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <time className="text-sm text-muted-foreground">{post.date}</time>
      </div>
      {post.image && (
        <div className="relative overflow-hidden rounded-md border">
          <img
            alt=""
            className="aspect-video w-full object-cover"
            src={post.image}
          />
        </div>
      )}
      <PostTags className="mt-0" tags={post.tags} />
      <Separator className="mb-6" />
      <div className="prose mb-12 max-w-none prose-neutral prose-pre:overflow-x-auto dark:prose-invert">
        <Markdown rehypePlugins={[rehypeSanitize]}>{post.content}</Markdown>
      </div>
      {(adjacent.prev || adjacent.next) && (
        <>
          <Separator />
          <nav className="grid grid-cols-2 gap-4 pb-12">
            {adjacent.prev ? (
              <Link
                to="/blog/$slug"
                params={{ slug: adjacent.prev.slug }}
                className="group flex flex-col gap-1 rounded-md p-3 transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeftIcon size={12} />
                  Previous
                </span>
                <span className="text-sm font-medium group-hover:text-primary">
                  {adjacent.prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {adjacent.next ? (
              <Link
                to="/blog/$slug"
                params={{ slug: adjacent.next.slug }}
                className="group flex flex-col items-end gap-1 rounded-md p-3 text-right transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  Next
                  <ArrowRightIcon size={12} />
                </span>
                <span className="text-sm font-medium group-hover:text-primary">
                  {adjacent.next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </>
      )}
    </article>
  )
}

function PostError({ error }: ErrorComponentProps) {
  const isNotFound =
    error instanceof Error && error.message === "Post not found"

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
      <WarningIcon className="size-12 text-muted-foreground/40" />
      <h1 className="text-2xl font-semibold tracking-tight">
        {isNotFound ? "Post not found" : "Something went wrong"}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {isNotFound
          ? "The blog post you're looking for doesn't exist or has been removed."
          : "An error occurred while loading this post. Please try again."}
      </p>
      <Button asChild size="lg" className="mt-2">
        <Link to="/blog">
          <ArrowLeftIcon className="size-4" />
          Back to blog
        </Link>
      </Button>
    </div>
  )
}
