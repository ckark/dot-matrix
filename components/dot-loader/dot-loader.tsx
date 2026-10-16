import type { CSSProperties, SVGProps } from 'react'

import { cn } from '@/lib/utils'

import styles from './dot-loader.module.css'
import { PATTERNS, type DotPattern } from './patterns'

export type DotLoaderSize = 12 | 16 | 20 | 24
export type DotGrid = 3 | 4

/** Each grid cell is 4 viewBox units; the dot fills 62.5% of the cell. */
const CELL = 4
const RADIUS = 1.25

export function gridForSize(size: number): DotGrid {
  return size >= 20 ? 4 : 3
}

/** Rendered dot diameter and gap in CSS px, for documentation and specimen labels. */
export function dotMetrics(size: number, grid: DotGrid = gridForSize(size)) {
  const scale = size / (grid * CELL)
  return {
    dot: RADIUS * 2 * scale,
    gap: (CELL - RADIUS * 2) * scale,
  }
}

export interface DotLoaderProps
  extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Rendered size in px. 24 and 20 use a 4×4 grid; 16 and 12 use 3×3. */
  size?: DotLoaderSize | number
  pattern?: DotPattern
  /** Override the grid chosen from `size`. */
  grid?: DotGrid
  /** Playback multiplier: 2 is twice as fast. */
  speed?: number
  /** Opacity of a resting dot, 0–1. */
  minOpacity?: number
  /** Accessible status text. */
  label?: string
}

export function DotLoader({
  size = 16,
  pattern = 'pulse',
  grid,
  speed = 1,
  minOpacity = 0.2,
  label = 'Loading',
  className,
  style,
  ...props
}: DotLoaderProps) {
  const n = grid ?? gridForSize(size)
  const def = PATTERNS[pattern]
  const duration = def.duration / speed
  const box = n * CELL

  const dots: { key: string; cx: number; cy: number; phase: number | null }[] = []
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      dots.push({
        key: `${r}-${c}`,
        cx: c * CELL + CELL / 2,
        cy: r * CELL + CELL / 2,
        phase: def.phase(r, c, n),
      })
    }
  }

  const vars = {
    '--dot-duration': `${Math.round(duration)}ms`,
    '--dot-min': minOpacity,
  } as CSSProperties

  return (
    <svg
      role="status"
      aria-label={label}
      viewBox={`0 0 ${box} ${box}`}
      className={cn(styles.root, className)}
      // Inline width/height so container rules like `[&_svg]:size-4` cannot resize the loader.
      style={{ width: size, height: size, ...vars, ...style }}
      data-pattern={pattern}
      data-grid={n}
      {...props}
    >
      {dots.map(({ key, cx, cy, phase }) => (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={RADIUS}
          className={cn(
            styles.dot,
            phase === null ? styles.static : styles[def.keyframe],
          )}
          style={
            phase === null
              ? undefined
              : { animationDelay: `${Math.round((phase - 1) * duration)}ms` }
          }
        />
      ))}
    </svg>
  )
}
