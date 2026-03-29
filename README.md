# TanStack Start Kit

An opinionated full-stack starter built on [TanStack Start](https://tanstack.com/start) with React 19, shadcn/ui, Tailwind CSS 4, a file-based markdown blog, and a working contact form powered by Resend.

## Tech Stack

- **TanStack Start v1** — SSR, file-based routing, server functions
- **React 19** + **TanStack Router** — type-safe routing with search param validation
- **Tailwind CSS 4** — CSS-first configuration with OKLCH color tokens
- **shadcn/ui** — Radix UI primitives styled with Tailwind
- **Resend** — transactional email for the contact form
- **Nitro** — server runtime (deploy to Vercel, Netlify, Cloudflare, or Node)

## Getting Started

```bash
pnpm install
cp .env.example .env   # configure your environment variables
pnpm dev               # http://localhost:3000
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SITE_URL` | Public site URL (used for SEO meta tags) |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |

## Project Structure

```
src/
├── components/        # UI components (layout, sections, shadcn/ui)
├── content/posts/     # Markdown blog posts with frontmatter
├── hooks/             # Custom React hooks
├── lib/               # Utilities, constants, server functions, post loader
├── routes/            # TanStack Router file-based routes
│   ├── __root.tsx     # Root layout with sidebar, SEO, JSON-LD
│   ├── index.tsx      # Homepage (hero, features, tools, FAQ, contact)
│   ├── blog.tsx       # Blog layout
│   ├── blog.index.tsx # Blog listing
│   └── blog.$slug.tsx # Individual blog post
└── styles.css         # Tailwind 4 theme and design tokens
```

## Adding Blog Posts

Create a `.md` file in `src/content/posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
description: "A short description."
date: "2026-04-01"
image: ""
tags: ["React", "Tutorial"]
---

Your markdown content here.
```

## Build & Deploy

```bash
pnpm build     # production build
pnpm preview   # preview locally
```

For Vercel deployment, push to GitHub and connect the repo in the Vercel dashboard. Set your environment variables in the project settings.

## License

MIT
