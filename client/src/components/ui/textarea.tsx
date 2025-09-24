import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:px-3 md:py-2.5 touch-manipulation resize-none",
        className
      )}
      ref={ref}
      style={{
        WebkitFontSmoothing: 'antialiased',
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'text',
        userSelect: 'text',
        touchAction: 'manipulation',
        ...props.style
      }}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
