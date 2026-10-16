import { DotLoader, PATTERN_LIST, type DotLoaderSize, type PatternDef } from '@/components/dot-loader'

const SIZES: DotLoaderSize[] = [24, 20, 16, 12]

function PatternRow({ def }: { def: PatternDef }) {
  return (
    <li className="grid grid-cols-1 gap-6 border-t border-border py-6 md:grid-cols-[12rem_1fr_auto] md:items-center">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{def.label}</h3>
        <p className="text-sm text-muted-foreground text-pretty">{def.description}</p>
        <p className="font-mono text-sm text-muted-foreground">
          {def.keyframe} · {def.duration}ms
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-8">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <div className="flex h-8 items-center">
              <DotLoader size={size} pattern={def.name} />
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              {size}
              <span className="text-border"> / </span>
              {size >= 20 ? '4×4' : '3×3'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 rounded-md border border-border bg-muted/40 px-4 py-3">
        <DotLoader size={48} grid={4} pattern={def.name} label={`${def.label} enlarged, 4 by 4`} />
        <DotLoader size={36} grid={3} pattern={def.name} label={`${def.label} enlarged, 3 by 3`} />
      </div>
    </li>
  )
}

export function PatternTable() {
  return (
    <section aria-labelledby="patterns" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 id="patterns" className="text-lg font-medium">
          Eight choreographies
        </h2>
        <p className="max-w-prose text-sm text-muted-foreground text-pretty">
          Every pattern is one keyframe applied to all dots, with a per-dot delay deciding the
          order. The boxed pair on the right is the same pattern enlarged so you can read the
          motion.
        </p>
      </div>

      <ul className="border-b border-border">
        {PATTERN_LIST.map((def) => (
          <PatternRow key={def.name} def={def} />
        ))}
      </ul>
    </section>
  )
}
