import { describe, it, expect } from "vitest"
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "./posts"

describe("getAllPosts", () => {
  it("returns an array of posts", () => {
    const posts = getAllPosts()
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it("returns posts sorted by date descending", () => {
    const posts = getAllPosts()
    for (let i = 0; i < posts.length - 1; i++) {
      const current = posts[i]
      const next = posts[i + 1]
      expect(current).toBeDefined()
      expect(next).toBeDefined()
    }
  })

  it("each post has required fields", () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(typeof post.description).toBe("string")
      expect(typeof post.date).toBe("string")
      expect(Array.isArray(post.tags)).toBe(true)
    }
  })
})

describe("getPostBySlug", () => {
  it("returns a post for a valid slug", () => {
    const posts = getAllPosts()
    const firstPost = posts[0]
    expect(firstPost).toBeDefined()

    const post = getPostBySlug(firstPost!.slug)
    expect(post).toBeDefined()
    expect(post!.slug).toBe(firstPost!.slug)
    expect(post!.content).toBeTruthy()
  })

  it("returns undefined for a non-existent slug", () => {
    const post = getPostBySlug("this-slug-does-not-exist-12345")
    expect(post).toBeUndefined()
  })

  it("returns post with content field", () => {
    const posts = getAllPosts()
    const firstPost = posts[0]
    expect(firstPost).toBeDefined()

    const post = getPostBySlug(firstPost!.slug)
    expect(post).toBeDefined()
    expect(typeof post!.content).toBe("string")
    expect(post!.content.length).toBeGreaterThan(0)
  })
})

describe("getAdjacentPosts", () => {
  it("returns prev and next for a middle post", () => {
    const posts = getAllPosts()
    if (posts.length < 3) return

    const middlePost = posts[1]
    expect(middlePost).toBeDefined()

    const adjacent = getAdjacentPosts(middlePost!.slug)
    expect(adjacent.prev).not.toBeNull()
    expect(adjacent.next).not.toBeNull()
  })

  it("returns null prev for the first post", () => {
    const posts = getAllPosts()
    const firstPost = posts[0]
    expect(firstPost).toBeDefined()

    const adjacent = getAdjacentPosts(firstPost!.slug)
    expect(adjacent.prev).toBeNull()
  })

  it("returns null next for the last post", () => {
    const posts = getAllPosts()
    const lastPost = posts[posts.length - 1]
    expect(lastPost).toBeDefined()

    const adjacent = getAdjacentPosts(lastPost!.slug)
    expect(adjacent.next).toBeNull()
  })

  it("returns both null for a non-existent slug", () => {
    const adjacent = getAdjacentPosts("does-not-exist")
    expect(adjacent.prev).toBeNull()
    expect(adjacent.next).toBeNull()
  })
})
