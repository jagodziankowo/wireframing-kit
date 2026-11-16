import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { CaretDown, CaretLeft, CaretRight } from '@/components/ui/glyph'
import { Label, Lines } from './text'
import { useFidelity, type FidelityLevel } from './fidelity'

export type Column = { header: string; width?: string }

/**
 * Wireframe data table on shadcn <Table>. Headers reveal by fidelity; body cells are line-bars
 * (we never invent data). Sort carets appear at high. Optional selection column + pagination footer.
 */
export function DataTable({
  columns,
  rows = 6,
  selectable = false,
  dense = false,
  pagination = true,
  fidelity,
  className,
}: {
  columns: (string | Column)[]
  rows?: number
  selectable?: boolean
  dense?: boolean
  pagination?: boolean
  fidelity?: FidelityLevel
  className?: string
}) {
  const level = useFidelity(fidelity)
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  const cols = columns.map((c) => (typeof c === 'string' ? { header: c } : c))
  const pad = dense ? 'py-1.5' : 'py-3'

  return (
    <div className={className} {...scope}>
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className={cn('w-10', pad)}>
                <Checkbox />
              </TableHead>
            )}
            {cols.map((c, i) => (
              <TableHead key={i} className={pad} style={{ width: c.width }}>
                <span className="flex items-center gap-1">
                  <Label fidelity={fidelity}>{c.header}</Label>
                  {level === 'high' && <CaretDown className="size-3 shrink-0 text-muted-foreground" />}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, r) => (
            <TableRow key={r}>
              {selectable && (
                <TableCell className={pad}>
                  <Checkbox />
                </TableCell>
              )}
              {cols.map((_, c) => (
                <TableCell key={c} className={pad}>
                  <span className={cn('block', c === 0 ? 'w-3/4' : 'w-1/2')}>
                    <Lines count={1} heightEm={0.7} />
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex items-center justify-between px-2 py-3">
          <Label fidelity={fidelity} className="text-muted-foreground font-normal">
            1–{rows} of 128
          </Label>
          <div className="flex gap-2">
            <Button variant="outline" size="icon-sm">
              <CaretLeft />
            </Button>
            <Button variant="outline" size="icon-sm">
              <CaretRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
