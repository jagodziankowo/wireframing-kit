import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { useFidelity, type FidelityLevel } from './fidelity'
import { Heading, Label, Text } from './text'

/*
 * Data-viz placeholders. Every chart renders a recognizable GREY SILHOUETTE, never real
 * data — no numbers, legends or axis labels unless a label is passed (same text model as
 * the rest of the kit). Shape hints (`bars`, `points`, `slices`) steer the silhouette but
 * stay grey/unlabeled. These are drawn marks (like XImage): fidelity may change stroke
 * width, fill/stroke color, gridlines and radius — nothing else. Layout/spacing stays with
 * the parent (Card/Grid), so the HARD RULE (no bespoke fonts/padding/margins) holds.
 *
 * Fidelity drives chart detail:
 *   low  → rough shape, thick strokes, NO gridlines/ticks
 *   mid  → cleaner, horizontal gridlines
 *   high → gridlines + x-axis ticks, thinnest strokes, rounded
 */

/** Grayscale series ramp — an even light→dark progression so slices read as one system. */
const PALETTE = [
  'oklch(0.90 0 0)',
  'oklch(0.80 0 0)',
  'oklch(0.70 0 0)',
  'oklch(0.60 0 0)',
  'oklch(0.50 0 0)',
]

/** Main silhouette stroke width (px, non-scaling) per fidelity. */
function strokeFor(level: FidelityLevel): number {
  return level === 'low' ? 2.5 : level === 'mid' ? 1.75 : 1.25
}

/**
 * Outline treatment for FILLED chart elements (bars, slices, progress, gauge):
 *   low  → dark, thick outline on every element (blocky wireframe)
 *   mid  → no outline, flat grey fills
 *   high → thin, light hairline — slightly more resolved
 * (`--wf-edge` is already dark at low / light at high, so the color tracks for free.)
 */
function elemEdge(level: FidelityLevel): { stroke: string; strokeWidth: number } {
  if (level === 'mid') return { stroke: 'none', strokeWidth: 0 }
  return { stroke: 'var(--wf-edge)', strokeWidth: level === 'low' ? 2.5 : 1 }
}

type ChartProps = {
  fidelity?: FidelityLevel
  className?: string
}

/**
 * Shared responsive SVG surface. Fills its parent; caller sets the height (e.g. `h-48`).
 * `fit` keeps the aspect ratio and centers (round charts: pie/donut/gauge). Default stretches
 * to fill the box (bars/lines, where horizontal stretch is wanted).
 */
function Surface({
  children,
  viewBox = '0 0 100 100',
  fit = false,
  fidelity,
  className,
}: {
  children: ReactNode
  viewBox?: string
  fit?: boolean
  fidelity?: FidelityLevel
  className?: string
}) {
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  return (
    <div className={cn('h-full w-full', className)} {...scope}>
      <svg
        viewBox={viewBox}
        preserveAspectRatio={fit ? 'xMidYMid meet' : 'none'}
        className="block h-full w-full overflow-visible"
      >
        {children}
      </svg>
    </div>
  )
}

/** Horizontal gridlines (mid/high) — the "chart detail" that appears as fidelity rises. */
function Gridlines({ level, top = 8, bottom = 96 }: { level: FidelityLevel; top?: number; bottom?: number }) {
  if (level === 'low') return null
  const ys = [top, top + (bottom - top) / 3, top + (2 * (bottom - top)) / 3, bottom]
  return (
    <g>
      {ys.map((y, i) => (
        <line
          key={i}
          x1={0}
          y1={y}
          x2={100}
          y2={y}
          stroke="var(--wf-edge)"
          strokeWidth={0.75}
          vectorEffect="non-scaling-stroke"
          opacity={0.5}
        />
      ))}
    </g>
  )
}

/* ------------------------------- Bar chart ------------------------------- */

export function BarChart({ bars, fidelity, className }: ChartProps & { bars?: number[] }) {
  const level = useFidelity(fidelity)
  const data = bars ?? [4, 7, 5, 8, 6, 9]
  const max = Math.max(...data, 1)
  const n = data.length
  const TOP = 8
  const BOTTOM = 96
  const gap = 100 / (n * 4)
  const bw = (100 - gap * (n + 1)) / n
  const edge = elemEdge(level)

  return (
    <Surface viewBox="0 0 100 100" fidelity={fidelity} className={className}>
      <Gridlines level={level} top={TOP} bottom={BOTTOM} />
      {data.map((v, i) => {
        const h = (v / max) * (BOTTOM - TOP)
        const x = gap + i * (bw + gap)
        return (
          <rect
            key={i}
            x={x}
            y={BOTTOM - h}
            width={bw}
            height={h}
            fill="var(--wf-bar)"
            stroke={edge.stroke}
            strokeWidth={edge.strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
      {/* baseline */}
      <line x1={0} y1={BOTTOM} x2={100} y2={BOTTOM} stroke="var(--wf-edge)" strokeWidth={strokeFor(level)} vectorEffect="non-scaling-stroke" />
      {/* x-axis ticks: high only */}
      {level === 'high' &&
        data.map((_, i) => {
          const cx = gap + i * (bw + gap) + bw / 2
          return <line key={i} x1={cx} y1={BOTTOM} x2={cx} y2={BOTTOM + 3} stroke="var(--wf-edge)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        })}
    </Surface>
  )
}

/* --------------------------- Line / Area chart --------------------------- */

export function LineChart({
  points,
  area = false,
  fidelity,
  className,
}: ChartProps & { points?: number[]; area?: boolean }) {
  const level = useFidelity(fidelity)
  const data = points ?? [3, 5, 4, 7, 6, 8, 7, 9]
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const TOP = 8
  const BOTTOM = 96
  const n = data.length
  const xy = data.map((v, i) => {
    const x = (i / (n - 1)) * 100
    const y = BOTTOM - ((v - min) / span) * (BOTTOM - TOP)
    return [x, y] as const
  })
  const line = xy.map(([x, y]) => `${x},${y}`).join(' ')
  const areaPath = `M0,${BOTTOM} L${xy.map(([x, y]) => `${x},${y}`).join(' L')} L100,${BOTTOM} Z`

  return (
    <Surface viewBox="0 0 100 100" fidelity={fidelity} className={className}>
      <Gridlines level={level} top={TOP} bottom={BOTTOM} />
      {area && <path d={areaPath} fill="var(--wf-bar)" opacity={level === 'low' ? 0.9 : 0.6} />}
      <polyline
        points={line}
        fill="none"
        stroke="var(--wf-edge)"
        strokeWidth={strokeFor(level)}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <line x1={0} y1={BOTTOM} x2={100} y2={BOTTOM} stroke="var(--wf-edge)" strokeWidth={strokeFor(level)} vectorEffect="non-scaling-stroke" />
    </Surface>
  )
}

/** Area chart = line chart with the fill on. */
export function AreaChart(props: ChartProps & { points?: number[] }) {
  return <LineChart {...props} area />
}

/* ----------------------------- Pie / Donut ------------------------------ */

export function PieChart({
  slices,
  donut = false,
  fidelity,
  className,
}: ChartProps & { slices?: number[]; donut?: boolean }) {
  const level = useFidelity(fidelity)
  const data = slices ?? [5, 3, 2, 1.5]
  const total = data.reduce((a, b) => a + b, 0) || 1
  const cx = 50
  const cy = 50
  const r = 42
  const edge = elemEdge(level)

  // cumulative angles → wedge paths
  let acc = -Math.PI / 2
  const wedges = data.map((v, i) => {
    const start = acc
    const end = acc + (v / total) * Math.PI * 2
    acc = end
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const large = end - start > Math.PI ? 1 : 0
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`
    return { d, fill: PALETTE[i % PALETTE.length] }
  })

  return (
    <Surface viewBox="0 0 100 100" fit fidelity={fidelity} className={className}>
      {wedges.map((w, i) => (
        <path
          key={i}
          d={w.d}
          fill={w.fill}
          stroke={edge.stroke}
          strokeWidth={edge.strokeWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {donut && (
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.55}
          fill="var(--background)"
          stroke={edge.stroke}
          strokeWidth={edge.strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </Surface>
  )
}

/** Donut = pie with the hole punched out. */
export function DonutChart(props: ChartProps & { slices?: number[] }) {
  return <PieChart {...props} donut />
}

/* ------------------------------ Sparkline ------------------------------- */

/** Tiny inline trend line — no axes/gridlines ever. Caller sets height (e.g. `h-8`). */
export function Sparkline({ points, fidelity, className }: ChartProps & { points?: number[] }) {
  const level = useFidelity(fidelity)
  const data = points ?? [4, 6, 5, 7, 6, 8, 7, 9, 8]
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const n = data.length
  const line = data
    .map((v, i) => `${(i / (n - 1)) * 100},${98 - ((v - min) / span) * 92}`)
    .join(' ')
  return (
    <Surface viewBox="0 0 100 100" fidelity={fidelity} className={cn('h-8', className)}>
      <polyline
        points={line}
        fill="none"
        stroke="var(--wf-edge)"
        strokeWidth={strokeFor(level)}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </Surface>
  )
}

/* ------------------------------ Progress -------------------------------- */

/** Linear progress bar. `value` 0–100; grey fill. Stroke/radius follow fidelity. */
export function Progress({
  value = 60,
  fidelity,
  className,
}: ChartProps & { value?: number }) {
  const scope = fidelity ? { 'data-fidelity': fidelity } : {}
  const level = useFidelity(fidelity)
  const pct = Math.max(0, Math.min(100, value))
  const border =
    level === 'mid'
      ? { borderWidth: 0 }
      : { borderStyle: 'solid', borderColor: 'var(--wf-edge)', borderWidth: 'var(--wf-stroke)' }
  return (
    <div
      className={cn('h-2 w-full overflow-hidden bg-[var(--wf-bar)]', className)}
      style={{ ...border, borderRadius: 'var(--radius)' }}
      {...scope}
    >
      <div className="h-full bg-[oklch(0.55_0_0)]" style={{ width: `${pct}%` }} />
    </div>
  )
}

/* -------------------------------- Gauge --------------------------------- */

/** Semicircular gauge. `value` 0–100; grey value arc over a track. */
export function Gauge({ value = 65, fidelity, className }: ChartProps & { value?: number }) {
  const level = useFidelity(fidelity)
  const pct = Math.max(0, Math.min(100, value)) / 100
  const r = 40
  const cx = 50
  const cy = 50
  const track = `M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`
  const L = Math.PI * r
  const sw = level === 'low' ? 10 : level === 'mid' ? 8 : 6
  // low = dark value arc (bold element); mid/high = mid grey. Rounded caps add polish at high.
  const valueColor = level === 'low' ? 'var(--wf-edge)' : 'oklch(0.55 0 0)'
  const cap = level === 'high' ? 'round' : 'butt'
  return (
    <Surface viewBox="0 0 100 52" fit fidelity={fidelity} className={cn('h-20', className)}>
      {/* empty track = lightest grey; value arc reads darker over it */}
      <path d={track} fill="none" stroke="var(--wf-bar)" strokeWidth={sw} strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      <path
        d={track}
        fill="none"
        stroke={valueColor}
        strokeWidth={sw}
        strokeLinecap={cap}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={`${pct * L} ${L}`}
      />
    </Surface>
  )
}

/* ------------------------------ Stat tile ------------------------------- */

/**
 * KPI / stat tile: label + big number + optional sparkline / delta. The number follows the
 * text model (real at mid/high, bar at low). Pass `value`/`delta` strings or omit for bars.
 */
export function StatTile({
  label,
  value,
  delta,
  spark = true,
  fidelity,
  className,
}: ChartProps & {
  label?: string
  value?: string
  delta?: string
  spark?: boolean | number[]
}) {
  return (
    <Card size="sm" className={className}>
      <CardContent>
        <Label className="text-muted-foreground" fidelity={fidelity}>
          {label}
        </Label>
        <Heading level={2} fidelity={fidelity}>
          {value ?? '1,234'}
        </Heading>
        {delta !== undefined ? (
          <Text lines={1} fidelity={fidelity} className="w-16">
            {delta}
          </Text>
        ) : (
          spark === false && <Text lines={1} fidelity={fidelity} className="w-16" />
        )}
        {spark !== false && (
          <Sparkline
            fidelity={fidelity}
            points={Array.isArray(spark) ? spark : undefined}
            className="mt-1 h-8"
          />
        )}
      </CardContent>
    </Card>
  )
}
