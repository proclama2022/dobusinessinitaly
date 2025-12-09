import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium touch-manipulation ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-sm hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/85",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        link: "text-primary underline-offset-4 hover:underline active:no-underline",
        
        // Italian Design System Variants - Updated to Base Palette
        luxury: "bg-navy text-white font-[Montserrat] font-bold uppercase text-xs border-b-2 border-italian-green hover:bg-navy-light shadow-sm hover:shadow-md",
        editorial: "bg-transparent border border-neutral-300 text-neutral-800 hover:border-navy hover:bg-neutral-50 font-[Lora] rounded-none uppercase tracking-widest text-[10px]",
        italian: "bg-italian-green text-white font-[Montserrat] font-bold tracking-wider uppercase text-xs shadow-sm hover:bg-italian-green-dark hover:shadow-md",
        "outline-italian": "bg-transparent text-italian-green border border-italian-green hover:bg-italian-green hover:text-white font-[Montserrat] font-semibold tracking-wider uppercase text-xs",
        architectural: "bg-navy text-white font-[Montserrat] rounded-none border-l-4 border-italian-red hover:bg-navy-light hover:pl-6 transition-all",
      },
      size: {
        default: "h-9 px-6 py-2 min-h-[36px] min-w-[36px]",
        sm: "h-8 px-4 py-1.5 min-h-[32px] min-w-[32px] text-[10px]",
        lg: "h-10 px-8 py-2.5 min-h-[40px] min-w-[40px]",
        icon: "h-9 w-9 min-h-[36px] min-w-[36px]",
        xl: "h-12 px-10 py-3 min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'auto',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'manipulation',
          ...props.style
        }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
