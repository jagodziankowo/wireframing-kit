import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CaretDown } from '@/components/ui/glyph'
import { Label, Text } from './text'
import { useFidelity, type FidelityLevel } from './fidelity'

/** Form field: label + control + optional help/error line. Label/help follow the fidelity reveal. */
export function Field({
  label,
  help,
  error,
  children,
  fidelity,
  className,
}: {
  label?: string
  help?: string
  error?: string
  children?: ReactNode
  fidelity?: FidelityLevel
  className?: string
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      {label && <Label fidelity={fidelity}>{label}</Label>}
      {children}
      {error ? (
        <Text fidelity={fidelity} lines={1} className="text-foreground">
          {error}
        </Text>
      ) : help ? (
        <Text fidelity={fidelity} lines={1}>
          {help}
        </Text>
      ) : null}
    </div>
  )
}

/** Date field: an input-styled trigger that opens a calendar. Calendar icons are drawn (no icon lib). */
export function DatePicker({
  placeholder = 'Pick a date',
  fidelity,
  className,
}: {
  placeholder?: string
  fidelity?: FidelityLevel
  className?: string
}) {
  const f = useFidelity(fidelity)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-full justify-between font-normal', className)}>
          <Label fidelity={fidelity} className="font-normal text-muted-foreground">
            {placeholder}
          </Label>
          <CaretDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent data-fidelity={f} className="w-auto p-0">
        <Calendar mode="single" />
      </PopoverContent>
    </Popover>
  )
}

/** Searchable select (combobox): input-styled trigger → searchable list. */
export function Combobox({
  placeholder = 'Select…',
  options = [],
  fidelity,
  className,
}: {
  placeholder?: string
  options?: string[]
  fidelity?: FidelityLevel
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const f = useFidelity(fidelity)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-full justify-between font-normal', className)}>
          <Label fidelity={fidelity} className="font-normal text-muted-foreground">
            {placeholder}
          </Label>
          <CaretDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent data-fidelity={f} className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem key={o} value={o}>
                  {o}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
