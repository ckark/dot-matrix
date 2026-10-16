import { Check } from 'lucide-react'

import { DotLoader } from '@/components/dot-loader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const JOBS = [
  { name: 'web · deploy-prod', state: 'Building' },
  { name: 'api · migrate', state: 'Queued' },
  { name: 'docs · preview', state: 'Done' },
]

function ContextPanel({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        tone,
        'flex flex-col gap-6 rounded-lg border border-border bg-background p-6 text-foreground',
      )}
    >
      <p className="font-mono text-sm text-muted-foreground">
        {tone === 'light' ? 'light surface' : 'dark surface'}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button disabled className="disabled:opacity-100">
          <DotLoader size={16} pattern="orbit" />
          Saving changes
        </Button>
        <Button variant="outline" size="sm" disabled className="disabled:opacity-100">
          <DotLoader size={12} pattern="pulse" />
          Running checks
        </Button>
      </div>

      <label className="flex h-9 items-center gap-3 rounded-lg border border-input bg-background px-3 text-sm">
        <span className="sr-only">Search</span>
        <input
          readOnly
          value="react server components"
          className="min-w-0 flex-1 bg-transparent outline-none"
        />
        <DotLoader size={16} pattern="scan" className="text-muted-foreground" />
      </label>

      <ul className="flex flex-col divide-y divide-border rounded-lg border border-border text-sm">
        {JOBS.map((job) => (
          <li key={job.name} className="flex items-center justify-between gap-4 px-3 py-2">
            <span className="font-mono">{job.name}</span>
            <span className="flex items-center gap-2 text-muted-foreground">
              {job.state === 'Done' ? (
                <Check className="size-3" aria-hidden="true" />
              ) : (
                <DotLoader size={12} pattern={job.state === 'Building' ? 'rain' : 'sparkle'} />
              )}
              {job.state}
            </span>
          </li>
        ))}
      </ul>

      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <DotLoader size={12} pattern="wave" />
        Syncing 3 files to workspace
      </p>

      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-8">
        <DotLoader size={24} pattern="bloom" />
        <span className="text-sm text-muted-foreground">Fetching results</span>
      </div>
    </div>
  )
}

export function InContext() {
  return (
    <section aria-labelledby="context" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 id="context" className="text-lg font-medium">
          In context
        </h2>
        <p className="max-w-prose text-sm text-muted-foreground text-pretty">
          The loader inherits <code className="font-mono">currentColor</code>, so it picks up the
          text color of whatever it sits inside — a primary button, a muted caption, or an
          inverted surface.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ContextPanel tone="light" />
        <ContextPanel tone="dark" />
      </div>
    </section>
  )
}
