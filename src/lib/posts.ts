import matter from "gray-matter"

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  image: string
  tags: ReadonlyArray<string>
}

export type Post = PostMeta & {
  rawDate: string
  content: string
}

const postFiles = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  eager: true,
  import: "default",
}) as Record<string, string>

function formatDate(raw: string): string {
  const parsed = new Date(raw)
  if (isNaN(parsed.getTime())) return raw
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function parsePost(filePath: string, raw: string): Post {
  const { data, content } = matter(raw)
  const slug = filePath.replace("/src/content/posts/", "").replace(".md", "")
  const rawDate = typeof data.date === "string" ? data.date : ""

  const tags: ReadonlyArray<string> = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : []

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    date: formatDate(rawDate),
    rawDate,
    image: typeof data.image === "string" ? data.image : "",
    tags,
    content,
  }
}

const allPostsCache: ReadonlyArray<PostMeta> = Object.entries(postFiles)
  .map(([path, raw]) => {
    const { slug, title, description, date, image, tags, rawDate } = parsePost(
      path,
      raw
    )
    return { slug, title, description, date, image, tags, rawDate }
  })
  .sort((a, b) => (a.rawDate > b.rawDate ? -1 : 1))
  .map(({ rawDate: _, ...post }) => post)

export function getAllPosts(): ReadonlyArray<PostMeta> {
  return allPostsCache
}

export function getPostBySlug(slug: string): Post | undefined {
  const entry = Object.entries(postFiles).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  )
  if (!entry) return undefined
  return parsePost(entry[0], entry[1])
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null
  next: PostMeta | null
} {
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}
