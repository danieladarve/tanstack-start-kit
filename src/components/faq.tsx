import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion.tsx"
import * as React from "react"
import { cn } from "@/lib/utils.ts"

const Faq = ({
  items,
  className,
}: React.ComponentProps<"div"> & {
  items: { question: string; answer: React.ReactNode }[]
}) => {
  return (
    <div className={cn(className, "flex items-center justify-center")}>
      <div className="flex flex-col items-start gap-x-12 gap-y-6 md:flex-row">
        <h2 className="text-4xl leading-[1.15]! tracking-[-0.035em] lg:text-4xl">
          Frequently Asked <br /> Questions
        </h2>

        <Accordion className="max-w-xl" defaultValue="question-0" type="single">
          {items.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="cursor-pointer text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Faq
