# Wireframe Kit

A React component kit for building **grayscale wireframes** of dashboards and app screens at
three fidelities — **low / mid / high** — from a single dial. It's built on real
[shadcn/ui](https://ui.shadcn.com) components, so "high fidelity" *is* the real UI; lower
fidelities simplify downward from the same primitives rather than being separate mockups.

### Core ideas

- **One fidelity dial.** `<Fidelity level="low | mid | high">` sets the whole subtree; any
  element can override it with a `fidelity` prop (nearest wins).
- **Tier-based text reveal.** Headings, labels and body text turn into real text or
  placeholder bars depending on the level — `low` = all bars, `mid` = headers/labels real,
  `high` = everything real.
- **Grayscale only, no icons.** Icon slots use drawn glyphs, charts are grey silhouettes.
- **No bespoke styling.** All type and spacing come from the shadcn preset. Fidelity only
  changes stroke width, outline/fill color, shadows, corner radius and text-vs-bars.

---

## Quick start

```bash
npm install
npm run dev        # dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck (tsc -b) + production build → dist/
npm run preview    # serve the production build
npm run lint       # oxlint
```

The dev server opens a **playground** with a fidelity toggle (top-right) and a view switcher:
**Showcase · Contact · Dashboard (Analytics) · Sales · Charts · Controls**. The **Showcase**
view (default) is a presentation gallery of every component, grouped by category — the best
place to see the whole kit react to the fidelity dial at once.

---

## Using the kit

Wrap a screen in `<Fidelity>` and compose from the `@/wireframe` barrel:

```tsx
import { Fidelity, Heading, Text, StatTile, BarChart } from '@/wireframe'

export function Overview() {
  return (
    <Fidelity level="mid">
      <Heading level={2}>Overview</Heading>
      <Text lines={2} />
      <StatTile label="Revenue" value="$42.8k" />
      <BarChart bars={[4, 7, 5, 8, 6]} />
    </Fidelity>
  )
}
```

Override the dial on a single element:

```tsx
<BarChart bars={[3, 5, 2]} fidelity="high" />
```

### How each fidelity looks

| Level    | Text                               | Elements / outlines                      | Corners |
| -------- | ---------------------------------- | ---------------------------------------- | ------- |
| **low**  | everything as placeholder bars     | thick **dark outlines** on every element | square  |
| **mid**  | headers + labels real, body = bars | clean grey fills, **no** outlines        | square  |
| **high** | all real text                      | thin **light hairlines** + subtle polish | rounded |

---

## What's in the kit

Everything lives in [`src/wireframe/`](src/wireframe) and exports through `@/wireframe`:

- **Text & layout** — `Heading`, `Label`, `Text`, `Lines`; `DesktopFrame`, `MobileFrame`,
  `Grid`; `DashboardShell` (sidebar + topbar + content).
- **Forms & pickers** — `Field`, `DatePicker`, `Combobox`, plus the shadcn Input / Select /
  Checkbox / Radio / Switch / Slider / Badge / Avatar.
- **Tables** — `DataTable` (fidelity-aware headers, line-bar cells, selection, pagination).
- **Data viz** — `BarChart`, `LineChart`, `AreaChart`, `PieChart`, `DonutChart`, `Sparkline`,
  `Progress`, `Gauge`, `StatTile` — all grey silhouettes; shape hints like `bars={[…]}`,
  `points={[…]}`, `slices={[…]}`.
- **Overlays** — `Menu` (dropdown), `Modal` (dialog), `Tip` (tooltip).

---

## Tech stack

Vite + React + TypeScript + Tailwind v4, with shadcn/ui on the **radix base** (preset
`bIkeynQ`: neutral palette, zero radius, Inter). Grayscale design tokens and the fidelity CSS
variables live in [`src/index.css`](src/index.css); the kit simplifies real shadcn components
by keying CSS on `[data-fidelity]` + each component's `[data-slot]`.

---

## Project docs

- [`SCOPE.md`](SCOPE.md) — full spec and rationale
- [`TASKS.md`](TASKS.md) — build checklist
- [`HANDOFF.md`](HANDOFF.md) — current state, decisions and gotchas

---

## Screenshots

_To add later — drop PNGs in `docs/images/` and embed them here (e.g. the Charts or Sales view
at low / mid / high)._
