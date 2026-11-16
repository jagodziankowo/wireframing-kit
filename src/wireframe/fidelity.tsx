import { createContext, useContext, type ReactNode } from 'react'

/** The single dial. low = roughest (all lines, thick borders) → high = most resolved (all real text, thin borders). */
export type FidelityLevel = 'low' | 'mid' | 'high'

/** Importance tier of a text element — decides when it "lights up" as real text. */
export type Tier = 'header' | 'important' | 'secondary'

export const FIDELITY_LEVELS: FidelityLevel[] = ['low', 'mid', 'high']

const FidelityContext = createContext<FidelityLevel>('mid')

/** Returns the effective fidelity: a per-element override wins over the nearest provider. */
export function useFidelity(override?: FidelityLevel): FidelityLevel {
  const ctx = useContext(FidelityContext)
  return override ?? ctx
}

/**
 * Tier-based text reveal:
 *  - low  → everything is lines (even headers)
 *  - mid  → headers + important render as real text; secondary stays lines
 *  - high → all real text
 */
export function revealsText(tier: Tier, level: FidelityLevel): boolean {
  if (level === 'high') return true
  if (level === 'low') return false
  return tier !== 'secondary'
}

/**
 * Sets the fidelity for its subtree: provides context (for text-reveal logic) and stamps
 * `data-fidelity` (for the CSS-variable-driven strokes/bars). Nest it to override a region.
 */
export function Fidelity({
  level,
  children,
  className,
}: {
  level: FidelityLevel
  children: ReactNode
  className?: string
}) {
  return (
    <FidelityContext.Provider value={level}>
      <div data-fidelity={level} className={className}>
        {children}
      </div>
    </FidelityContext.Provider>
  )
}
