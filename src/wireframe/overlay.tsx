import type { ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Label, Lines } from './text'
import { revealsText, useFidelity, type FidelityLevel } from './fidelity'

/*
 * Overlay wrappers (T9). These compose the real shadcn Dialog / DropdownMenu / Tooltip and
 * keep the kit's conventions:
 *  - Portaled content renders OUTSIDE the [data-fidelity] wrapper, so each stamps its own
 *    `data-fidelity` on the content element (same mitigation as DatePicker/Combobox).
 *  - Text follows the reveal model (real at mid/high, bars at low) via the kit primitives.
 */

type MenuEntry = string | { label: string } | 'separator'

/** Dropdown menu: a trigger (e.g. a Button) + a list of items. `'separator'` draws a divider. */
export function Menu({
  trigger,
  items,
  label,
  align = 'end',
  fidelity,
  className,
}: {
  trigger: ReactNode
  items: MenuEntry[]
  label?: string
  align?: 'start' | 'center' | 'end'
  fidelity?: FidelityLevel
  className?: string
}) {
  const f = useFidelity(fidelity)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent data-fidelity={f} align={align} className={className ?? 'w-auto min-w-44'}>
        {label && (
          <>
            <DropdownMenuLabel>
              <Label fidelity={fidelity} className="text-muted-foreground font-medium">
                {label}
              </Label>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {items.map((it, i) =>
          it === 'separator' ? (
            <DropdownMenuSeparator key={i} />
          ) : (
            <DropdownMenuItem key={i}>
              <Label fidelity={fidelity} className="font-normal">
                {typeof it === 'string' ? it : it.label}
              </Label>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Modal dialog: trigger + title/description header, body `children`, optional footer. */
export function Modal({
  trigger,
  title,
  description,
  children,
  footer,
  fidelity,
  className,
}: {
  trigger: ReactNode
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  fidelity?: FidelityLevel
  className?: string
}) {
  const f = useFidelity(fidelity)
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent data-fidelity={f} className={className}>
        <DialogHeader>
          {/* asChild keeps radix's a11y id on a single heading element while we control reveal */}
          <DialogTitle asChild>
            <h2 className="font-heading leading-none font-medium">
              {revealsText('header', f) ? title : <Lines count={1} heightEm={0.74} className="w-40" />}
            </h2>
          </DialogTitle>
          {description && (
            <DialogDescription asChild>
              <p className="text-sm text-muted-foreground">
                {revealsText('secondary', f) ? description : <Lines count={2} heightEm={0.56} />}
              </p>
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

/** Tooltip: wraps its own provider so a single trigger works anywhere. */
export function Tip({
  label,
  children,
  side = 'top',
  fidelity,
}: {
  label: string
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  fidelity?: FidelityLevel
}) {
  const f = useFidelity(fidelity)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent data-fidelity={f} side={side}>
          <Label fidelity={fidelity} className="text-background font-normal">
            {label}
          </Label>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
