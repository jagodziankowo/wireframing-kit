import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useFidelity, type FidelityLevel } from './fidelity'

const edge = {
  borderStyle: 'solid',
  borderColor: 'var(--wf-edge)',
  borderWidth: 'var(--wf-stroke)',
} as const

/** Browser-window chrome around a desktop screen. Border/radius follow the fidelity dial. */
export function DesktopFrame({
  children,
  fidelity,
  className,
}: {
  children?: ReactNode
  fidelity?: FidelityLevel
  className?: string
}) {
  useFidelity(fidelity)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  return (
    <div
      className={cn('w-full overflow-hidden bg-background', className)}
      style={{ ...edge, borderRadius: 'var(--radius)' }}
      {...scope}
    >
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{ borderBottom: 'var(--wf-stroke) solid var(--wf-edge)' }}
      >
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full" style={{ background: 'var(--wf-bar)' }} />
          <span className="size-3 rounded-full" style={{ background: 'var(--wf-bar)' }} />
          <span className="size-3 rounded-full" style={{ background: 'var(--wf-bar)' }} />
        </div>
        <div className="ml-2 h-6 flex-1" style={{ background: 'var(--wf-bar)', borderRadius: 'var(--radius)' }} />
      </div>
      {children}
    </div>
  )
}

/** Phone shell around a mobile screen. The device stays rounded at every fidelity. */
export function MobileFrame({
  children,
  fidelity,
  width = 390,
  className,
}: {
  children?: ReactNode
  fidelity?: FidelityLevel
  width?: number
  className?: string
}) {
  useFidelity(fidelity)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  return (
    <div
      className={cn('mx-auto overflow-hidden bg-background', className)}
      style={{ ...edge, width, borderRadius: '2rem' }}
      {...scope}
    >
      {/* status bar + notch */}
      <div className="flex items-center justify-between px-6 py-2">
        <span className="h-2.5 w-10 rounded-full" style={{ background: 'var(--wf-bar)' }} />
        <span className="h-5 w-24 rounded-full" style={{ background: 'var(--wf-bar)' }} />
        <span className="h-2.5 w-8 rounded-full" style={{ background: 'var(--wf-bar)' }} />
      </div>
      {children}
      {/* home indicator */}
      <div className="flex justify-center py-2.5">
        <span className="h-1 w-28 rounded-full" style={{ background: 'var(--wf-bar)' }} />
      </div>
    </div>
  )
}

/** Simple responsive grid (bento). Spacing from the shadcn scale. */
export function Grid({
  cols = 3,
  children,
  className,
}: {
  cols?: 1 | 2 | 3 | 4
  children?: ReactNode
  className?: string
}) {
  const colClass =
    cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : cols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'
  return <div className={cn('grid gap-6', colClass, className)}>{children}</div>
}
