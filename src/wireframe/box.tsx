import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useFidelity, type FidelityLevel } from './fidelity'

/**
 * A wireframe-only bordered surface (device chrome, sketch frames) with no shadcn equivalent.
 * Border width/color follow the fidelity dial. For real UI surfaces prefer shadcn <Card>.
 */
export function WBox({
  as: Tag = 'div',
  children,
  fidelity,
  className,
  ...rest
}: {
  as?: ElementType
  children?: ReactNode
  fidelity?: FidelityLevel
  className?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>) {
  useFidelity(fidelity)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  return (
    <Tag
      className={cn('bg-background', className)}
      style={{ borderStyle: 'solid', borderColor: 'var(--wf-edge)', borderWidth: 'var(--wf-stroke)', borderRadius: 'var(--radius)' }}
      {...scope}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Image / logo / avatar placeholder. No real icons, ever.
 *  - low / mid → a bordered box crossed with an X (rough).
 *  - high      → a solid gray field (like a real image placeholder), rounded.
 */
export function XImage({
  fidelity,
  className,
}: {
  fidelity?: FidelityLevel
  className?: string
}) {
  const level = useFidelity(fidelity)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  const filled = level === 'high'
  return (
    <div
      className={cn('relative aspect-square w-full', filled ? 'bg-[var(--wf-fill)]' : 'bg-background', className)}
      style={{
        borderStyle: 'solid',
        borderColor: 'var(--wf-edge)',
        borderWidth: filled ? 0 : 'var(--wf-stroke)',
        borderRadius: 'var(--radius)',
      }}
      {...scope}
    >
      {!filled && (
        <svg
          className="absolute inset-0 h-full w-full text-[var(--wf-edge)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
        </svg>
      )}
    </div>
  )
}
