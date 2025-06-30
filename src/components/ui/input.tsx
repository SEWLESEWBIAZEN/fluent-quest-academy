import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input",
          "bg-white dark:bg-[#0e0e10]",           // default background
          "focus:bg-transparent active:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent", // transparent on focus
          "px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />



    )
  }
)
Input.displayName = "Input"

export { Input }
