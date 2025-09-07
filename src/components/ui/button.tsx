import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-800 via-slate-700 to-indigo-800 text-white hover:from-slate-700 hover:via-slate-600 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(30,41,59,0.6)]",
        destructive: "bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white hover:from-red-700 hover:via-red-600 hover:to-red-500 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(30,41,59,0.6)]",
        outline: "border border-slate-600 bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-indigo-900/50 text-white hover:from-slate-800/70 hover:via-slate-700/70 hover:to-indigo-800/70 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(30,41,59,0.5)]",
        secondary: "bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-white hover:from-slate-600 hover:via-slate-500 hover:to-slate-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(30,41,59,0.6)]",
        ghost: "hover:bg-slate-800/50 hover:text-white transition-colors hover:shadow-[0_4px_20px_rgba(30,41,59,0.4)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
