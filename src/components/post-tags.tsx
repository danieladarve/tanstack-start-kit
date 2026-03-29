import { Button } from "@/components/ui/button.tsx"
import type { PostMeta } from "@/lib/posts.ts"
import { cn } from "@/lib/utils.ts"

function PostTags({
  tags,
  className
}: React.ComponentProps<"div"> & { tags: PostMeta["tags"] }) {
  return (
    <div className={cn("mt-5 flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Button key={tag} variant="outline" size="sm">
          {tag}
        </Button>
      ))}
    </div>
  )
}

export default PostTags
