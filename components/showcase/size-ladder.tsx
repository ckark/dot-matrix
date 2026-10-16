import { DotLoader, dotMetrics, gridForSize, type DotLoaderSize } from '@/components/dot-loader'

const STEPS: { size: DotLoaderSize; sample: string; className: string; use: string }[] = [
  { size: 24, sample: 'Section heading', className: 'text-2xl font-medium tracking-tight', use: 'Empty states, page headings' },
  { size: 20, sample: 'Card title', className: 'text-xl font-medium tracking-tight', use: 'Cards, dialog titles' },
  { size: 16, sample: 'Body and buttons', className: 'text-base', use: 'Buttons, inputs, body copy' },
  { size: 12, sample: 'Caption or table cell', className: 'text-sm text-muted-foreground', use: 'Captions, badges, dense rows' },
]

export function SizeLadder() {
  return (
    <section aria-labelledby="sizes" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 id="sizes" className="text-lg font-medium">
          Four sizes, two grids
        </h2>
        <p className="max-w-prose text-sm text-muted-foreground text-pretty">
          Each step is paired with the type size it sits beside. The grid is chosen from the size:
          24 and 20 get a 4×4 matrix, 16 and 12 drop to 3×3 so dots stay at least 2.5px.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ size, sample, className, use }) => {
          const grid = gridForSize(size)
          const { dot, gap } = dotMetrics(size, grid)
          return (
            <li key={size} className="flex flex-col gap-6 bg-background p-6">
              <div className="flex items-center gap-3">
                <DotLoader size={size} pattern="orbit" />
                <span className={className}>{sample}</span>
              </div>
              <dl className="flex flex-col gap-1 font-mono text-sm text-muted-foreground">
                <div className="flex justify-between gap-4">
                  <dt>size</dt>
                  <dd className="text-foreground">{size}px</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>grid</dt>
                  <dd className="text-foreground">
                    {grid}×{grid}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>dot / gap</dt>
                  <dd className="text-foreground">
                    {dot.toFixed(2)} / {gap.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <p className="text-sm text-muted-foreground">{use}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
