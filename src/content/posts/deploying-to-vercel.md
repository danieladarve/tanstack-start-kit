---
title: "Deploying TanStack Start to Vercel"
description: "A step-by-step guide to deploying your TanStack Start application to Vercel with environment variables and SSR."
date: "2026-03-07"
image: ""
tags: ["Deployment", "Vercel", "DevOps"]
---

# Deploying TanStack Start to Vercel

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus neque. Nunc dignissim risus id metus.

## Prerequisites

Cras ornare tristique elit. Vivamus vestibulum ntulla nec ante. Praesent placerat risus quis eros. Fusce pellentesque suscipit nibh. Integer vitae libero ac risus egestas placerat.

- A Vercel account
- A GitHub repository with your TanStack Start project
- Environment variables configured

## Configuring for Vercel

Vestibulum commodo felis quis tortor. Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla. Donec quis dui at dolor tempor interdum.

```typescript
// vite.config.ts
import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"

export default defineConfig({
  plugins: [tanstackStart()],
})
```

Vivamus molestie gravida turpis. Fusce lobortis lorem eu sapien. Nullam tristique diam non turpis. Cras placerat accumsan nulla. Nullam rutrum.

## Setting Environment Variables

Nam vestibulum accumsan nisl. Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL`
4. Deploy

## Build and Deploy

Nunc porta vulputate tellus. Nunc rutrum turpis sed pede. Sed bibendum. Aliquam posuere. Nunc aliquet, augue nec adipiscing interdum, lacus tellus malesuada massa, quis varius mi purus non odio.

```bash
# Build locally to verify
pnpm build

# Push to GitHub — Vercel auto-deploys
git push origin main
```

## Custom Domain

Pellentesque condimentum, magna ut suscipit hendrerit, ipsum augue ornare nulla, non luctus diam neque sit amet urna. Curabitur vulputate vestibulum lorem. Fusce sagittis, libero non molestie mollis, magna orci ullamcorper dolor, at vulputate neque nulla lacinia eros.

## Monitoring and Logs

Sed convallis magna eu sem. Cras pede libero, dapibus nec, pretium sit amet, tempor quis, urna. Etiam sed nunc non eros venenatis lacinia. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui.

## Conclusion

Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci.
