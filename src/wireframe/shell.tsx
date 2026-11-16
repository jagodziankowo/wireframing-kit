import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Heading, Label } from './text'
import { XImage } from './box'
import { useFidelity, type FidelityLevel } from './fidelity'

/**
 * Dashboard shell: left sidebar (brand + nav) + topbar (title + actions) + content slot.
 * Built on shadcn Button/Separator; chrome strokes follow the fidelity dial.
 */
export function DashboardShell({
  brand = 'Brand',
  nav = [],
  active = 0,
  title,
  actions,
  children,
  fidelity,
  className,
}: {
  brand?: string
  nav?: string[]
  active?: number
  title?: string
  actions?: ReactNode
  children?: ReactNode
  fidelity?: FidelityLevel
  className?: string
}) {
  useFidelity(fidelity)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  return (
    <div className={cn('flex min-h-[32rem] bg-background', className)} {...scope}>
      {/* sidebar */}
      <aside
        className="flex w-56 shrink-0 flex-col gap-2 p-3"
        style={{ borderRight: 'var(--wf-stroke) solid var(--wf-edge)' }}
      >
        <div className="flex items-center gap-2 px-2 py-2">
          <XImage className="size-7" />
          <Label>{brand}</Label>
        </div>
        <Separator />
        <nav className="flex flex-col gap-1">
          {nav.map((item, i) => (
            <Button key={i} variant={i === active ? 'secondary' : 'ghost'} className="w-full justify-start">
              <Label className={i === active ? '' : 'text-muted-foreground'}>{item}</Label>
            </Button>
          ))}
        </nav>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex items-center gap-3 px-6 py-3"
          style={{ borderBottom: 'var(--wf-stroke) solid var(--wf-edge)' }}
        >
          {title ? <Heading level={3}>{title}</Heading> : <Label lines={1} className="w-32" />}
          <div className="ml-auto flex items-center gap-3">
            {actions ?? (
              <>
                <span className="h-8 w-28" style={{ background: 'var(--wf-bar)', borderRadius: 'var(--radius)' }} />
                <span className="size-8 rounded-full" style={{ background: 'var(--wf-bar)' }} />
              </>
            )}
          </div>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
