import { DotLoader } from '@/components/dot-loader'
import { InContext } from '@/components/showcase/in-context'
import { PatternTable } from '@/components/showcase/pattern-table'
import { SizeLadder } from '@/components/showcase/size-ladder'
import { Usage } from '@/components/showcase/usage'

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-20 px-6 py-16 sm:py-24">
        <header className="flex flex-col gap-6">
          <p className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <DotLoader size={12} pattern="sparkle" />
            dot loaders / 4×4 · 3×3
          </p>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              Dot-matrix loaders for the small end of the scale.
            </h1>
            <p className="max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
              Eight choreographies tuned for 24, 20, 16 and 12 pixel slots. Each one is a single
              CSS keyframe applied to every dot, with per-dot delays doing the arrangement — so a
              loader is a few hundred bytes of SVG, runs on the compositor, and needs no client
              JavaScript.
            </p>
          </div>
        </header>

        <SizeLadder />
        <PatternTable />
        <InContext />
        <Usage />
      </div>
    </main>
  )
}
