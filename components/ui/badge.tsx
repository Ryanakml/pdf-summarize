import * as React from "react"
import { cn } from "@/lib/utils"

export function Badge({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-400 text-sm font-medium text-purple-600 bg-purple-50 transition-colors duration-300 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}