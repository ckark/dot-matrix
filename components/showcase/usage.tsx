const SNIPPET = `import { DotLoader } from '@/components/dot-loader'

<DotLoader size={24} pattern="orbit" />                 // 4×4
<DotLoader size={12} pattern="pulse" />                 // 3×3
<DotLoader size={16} grid={4} pattern="spiral" />       // force a grid
<DotLoader size={16} speed={1.5} minOpacity={0.1} />    // tune motion
<DotLoader size={12} className="text-muted-foreground" label="Syncing" />`

const PROPS: { name: string; type: string; note: string }[] = [
  { name: 'size', type: '12 | 16 | 20 | 24 | number', note: 'Rendered px. Any number works; the four stops are tuned.' },
  { name: 'pattern', type: 'DotPattern', note: 'pulse · orbit · spiral · wave · scan · rain · sparkle · bloom' },
  { name: 'grid', type: '3 | 4', note: 'Defaults to 4 at ≥20px, otherwise 3.' },
  { name: 'speed', type: 'number', note: 'Playback multiplier. Default 1.' },
  { name: 'minOpacity', type: 'number', note: 'Resting dot opacity. Default 0.2.' },
  { name: 'label', type: 'string', note: 'aria-label on the role="status" element. Default "Loading".' },
]

export function Usage() {
  return (
    <section aria-labelledby="usage" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 id="usage" className="text-lg font-medium">
          Usage
        </h2>
        <p className="max-w-prose text-sm text-muted-foreground text-pretty">
          One server-safe component, no client JavaScript. Only <code className="font-mono">opacity</code>{' '}
          and <code className="font-mono">transform</code> animate, and{' '}
          <code className="font-mono">prefers-reduced-motion</code> collapses every pattern to a
          slow uniform breathe.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed">
          <code>{SNIPPET}</code>
        </pre>

        <dl className="flex flex-col divide-y divide-border rounded-lg border border-border text-sm">
          {PROPS.map((prop) => (
            <div key={prop.name} className="flex flex-col gap-1 px-4 py-3">
              <dt className="flex flex-wrap items-baseline gap-x-3 font-mono">
                <span>{prop.name}</span>
                <span className="text-muted-foreground">{prop.type}</span>
              </dt>
              <dd className="text-muted-foreground text-pretty">{prop.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
