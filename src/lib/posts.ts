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

function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, string | string[]> = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()

    const arrayMatch = value.match(/^\[(.+)]$/)
    if (arrayMatch) {
      data[key] = arrayMatch[1]
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    } else {
      data[key] = value.replace(/^["']|["']$/g, "")
    }
  }

  return { data, content: match[2] }
}

function formatDate(raw: string): string {
  const parsed = new Date(raw)
  if (isNaN(parsed.getTime())) return raw
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function parsePost(filePath: string, raw: string): Post & { rawDate: string } {
  const { data, content } = parseFrontmatter(raw)
  const slug = filePath.replace("/src/content/posts/", "").replace(".md", "")
  const rawDate = (data.date as string) ?? ""

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: formatDate(rawDate),
    rawDate,
    image: (data.image as string) ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
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
