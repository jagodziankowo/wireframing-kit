import type { ComponentProps } from "react"
import { cn } from "cn"

/*
 * Minimal drawn affordance marks for form controls (dropdown caret, checkbox check,
 * calendar nav, dialog close). These are authored shapes, NOT an icon library — the kit
 * ships no real icons. Kept tiny and functional so controls stay legible in wireframes.
 */

function Svg({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-4", className)}
      {...props}
    />
  )
}

export const Check = (p: ComponentProps<"svg">) => (
  <Svg {...p} className={cn("size-3.5", p.className)}>
    <path d="M3.5 8.5l3 3 6-6.5" />
  </Svg>
)
export const CaretDown = (p: ComponentProps<"svg">) => (
  <Svg {...p}>
    <path d="M4 6l4 4 4-4" />
  </Svg>
)
export const CaretUp = (p: ComponentProps<"svg">) => (
  <Svg {...p}>
    <path d="M4 10l4-4 4 4" />
  </Svg>
)
export const CaretLeft = (p: ComponentProps<"svg">) => (
  <Svg {...p}>
    <path d="M10 4l-4 4 4 4" />
  </Svg>
)
export const CaretRight = (p: ComponentProps<"svg">) => (
  <Svg {...p}>
    <path d="M6 4l4 4-4 4" />
  </Svg>
)
export const Close = (p: ComponentProps<"svg">) => (
  <Svg {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </Svg>
)
