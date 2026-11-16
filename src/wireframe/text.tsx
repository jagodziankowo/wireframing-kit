import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { revealsText, useFidelity, type FidelityLevel } from './fidelity'

/**
 * Placeholder bars — the "line instead of text" mark. em-scaled so they match the
 * font-size of whatever text they stand in for (keeps layout stable across fidelity).
 */
export function Lines({
  count = 1,
  heightEm = 0.62,
  lastWidth = 0.62,
  className,
}: {
  count?: number
  heightEm?: number
  lastWidth?: number
  className?: string
}) {
  return (
    <span aria-hidden className={cn('flex w-full flex-col gap-[0.5em]', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block bg-[var(--wf-bar)]"
          style={{
            height: `${heightEm}em`,
            width: count > 1 && i === count - 1 ? `${lastWidth * 100}%` : '100%',
          }}
        />
      ))}
    </span>
  )
}

/** A single bar sized to stand in for a known string (used when a heading/label is hidden). */
function SizedBar({ text, heightEm }: { text: string; heightEm: number }) {
  const chars = Math.min(Math.max(text.trim().length, 3), 42)
  return (
    <span
      aria-hidden
      className="inline-block max-w-full align-middle bg-[var(--wf-bar)]"
      style={{ width: `${chars * 0.52}em`, height: `${heightEm}em` }}
    />
  )
}

type TextProps = {
  children?: ReactNode
  lines?: number
  fidelity?: FidelityLevel
  className?: string
}

const stringOf = (c: ReactNode): string | undefined => (typeof c === 'string' ? c : undefined)

/**
 * Header-tier heading — uses the preset's heading font + scale. Real text at mid/high; bar at low.
 * Typography/weights come from the preset, not bespoke values.
 */
export function Heading({
  children,
  level = 2,
  fidelity,
  lines,
  className,
}: TextProps & { level?: 1 | 2 | 3 }) {
  const f = useFidelity(fidelity)
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  const sizeClass = level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-base'
  // shadcn-only styling: font-heading + font-medium (as CardTitle), size from the type scale. No custom tracking.
  const base = cn('font-heading font-medium text-foreground', sizeClass, className)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  if (revealsText('header', f) && children) {
    return (
      <Tag className={base} {...scope}>
        {children}
      </Tag>
    )
  }
  const text = stringOf(children)
  return (
    <Tag className={base} {...scope}>
      {text && !lines ? <SizedBar text={text} heightEm={0.74} /> : <Lines count={lines ?? 1} heightEm={0.74} />}
    </Tag>
  )
}

/** Important-tier label — mirrors the preset's `Label` typography (`text-sm leading-none font-medium`). */
export function Label({ children, fidelity, lines, className }: TextProps) {
  const f = useFidelity(fidelity)
  const base = cn('text-sm leading-none font-medium text-foreground', className)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  if (revealsText('important', f) && children) {
    return (
      <span className={base} {...scope}>
        {children}
      </span>
    )
  }
  const text = stringOf(children)
  return (
    <span className={cn('inline-block', base)} {...scope}>
      {text && !lines ? <SizedBar text={text} heightEm={0.7} /> : <Lines count={lines ?? 1} heightEm={0.7} />}
    </span>
  )
}

/** Secondary-tier body text — matches the preset's muted body (`text-sm text-muted-foreground`). */
export function Text({ children, lines, fidelity, className }: TextProps) {
  const f = useFidelity(fidelity)
  // shadcn-only: matches CardDescription exactly. No custom leading.
  const base = cn('text-sm text-muted-foreground', className)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  if (revealsText('secondary', f) && children) {
    return (
      <p className={base} {...scope}>
        {children}
      </p>
    )
  }
  return (
    <span className={cn('block', className)} {...scope}>
      <Lines count={lines ?? 2} heightEm={0.56} />
    </span>
  )
}
