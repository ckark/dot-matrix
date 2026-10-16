export type DotPattern =
  | 'pulse'
  | 'orbit'
  | 'spiral'
  | 'wave'
  | 'scan'
  | 'rain'
  | 'sparkle'
  | 'bloom'

export type DotKeyframe = 'blink' | 'trail' | 'twinkle' | 'grow'

export interface PatternDef {
  name: DotPattern
  label: string
  description: string
  keyframe: DotKeyframe
  /** Full cycle length in ms at speed 1. */
  duration: number
  /**
   * Fraction of the cycle (0–1) at which this dot hits its "on" frame.
   * Return null for a dot that should sit static at the dim level.
   */
  phase: (row: number, col: number, n: number) => number | null
}

// Deterministic pseudo-random in [0, 1) so sparkle/rain look the same on every render.
function hash(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

// Clockwise index around the outer ring starting top-left; null for inner dots.
function perimeterIndex(r: number, c: number, n: number) {
  const edge = n - 1
  if (r === 0) return c
  if (c === edge) return edge + r
  if (r === edge) return 2 * edge + (edge - c)
  if (c === 0) return 3 * edge + (edge - r)
  return null
}

const spiralCache = new Map<number, number[][]>()

// Clockwise spiral from top-left inward, as an [row][col] -> order lookup.
function spiralOrder(n: number) {
  const cached = spiralCache.get(n)
  if (cached) return cached

  const map = Array.from({ length: n }, () => Array<number>(n).fill(0))
  let top = 0
  let bottom = n - 1
  let left = 0
  let right = n - 1
  let i = 0

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) map[top][c] = i++
    top++
    for (let r = top; r <= bottom; r++) map[r][right] = i++
    right--
    if (top <= bottom) {
      for (let c = right; c >= left; c--) map[bottom][c] = i++
      bottom--
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) map[r][left] = i++
      left++
    }
  }

  spiralCache.set(n, map)
  return map
}

export const PATTERNS: Record<DotPattern, PatternDef> = {
  pulse: {
    name: 'pulse',
    label: 'Pulse',
    description: 'A ripple that starts at the center and rolls outward.',
    keyframe: 'blink',
    duration: 1200,
    phase: (r, c, n) => {
      const mid = (n - 1) / 2
      const d = Math.hypot(r - mid, c - mid)
      const max = Math.hypot(mid, mid)
      return (d / max) * 0.45
    },
  },
  orbit: {
    name: 'orbit',
    label: 'Orbit',
    description: 'A comet chasing around the outer ring; the core stays dim.',
    keyframe: 'trail',
    duration: 1100,
    phase: (r, c, n) => {
      const idx = perimeterIndex(r, c, n)
      return idx === null ? null : idx / (4 * (n - 1))
    },
  },
  spiral: {
    name: 'spiral',
    label: 'Spiral',
    description: 'Lights every dot in a clockwise spiral that winds to the center.',
    keyframe: 'trail',
    duration: 1600,
    phase: (r, c, n) => spiralOrder(n)[r][c] / (n * n),
  },
  wave: {
    name: 'wave',
    label: 'Wave',
    description: 'A soft diagonal band sweeping from top-left to bottom-right.',
    keyframe: 'blink',
    duration: 1100,
    phase: (r, c, n) => ((r + c) / (2 * (n - 1))) * 0.5,
  },
  scan: {
    name: 'scan',
    label: 'Scan',
    description: 'A vertical bar that scans left to right, then resets.',
    keyframe: 'trail',
    duration: 1000,
    phase: (_r, c, n) => c / n,
  },
  rain: {
    name: 'rain',
    label: 'Rain',
    description: 'Short streaks falling down each column at offset timings.',
    keyframe: 'trail',
    duration: 1300,
    phase: (r, c, n) => {
      const columnOffset = (c * 0.618 + 0.13) % 1
      return (columnOffset + (r / n) * 0.4) % 1
    },
  },
  sparkle: {
    name: 'sparkle',
    label: 'Sparkle',
    description: 'Dots flash individually in a fixed pseudo-random order.',
    keyframe: 'twinkle',
    duration: 1800,
    phase: (r, c, n) => hash(r * n + c + 1),
  },
  bloom: {
    name: 'bloom',
    label: 'Bloom',
    description: 'Dots grow and brighten ring by ring, then settle back.',
    keyframe: 'grow',
    duration: 1400,
    phase: (r, c, n) => {
      const mid = (n - 1) / 2
      const ring = Math.max(Math.abs(r - mid), Math.abs(c - mid))
      return (ring / mid) * 0.35
    },
  },
}

export const PATTERN_LIST = Object.values(PATTERNS)
