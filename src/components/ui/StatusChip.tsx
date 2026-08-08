import type { ReactNode } from 'react'

type Tone = 'orange' | 'green' | 'gray' | 'red' | 'blue'

const TONES: Record<Tone, string> = {
  orange: 'bg-orange/15 text-orange-soft border-orange/25',
  green: 'bg-emerald-500/12 text-emerald-400 border-emerald-500/25',
  gray: 'bg-white/[0.06] text-smoke border-line',
  red: 'bg-red-500/12 text-red-400 border-red-500/25',
  blue: 'bg-sky-500/12 text-sky-300 border-sky-500/25',
}

interface StatusChipProps {
  children: ReactNode
  tone?: Tone
  className?: string
  dot?: boolean
}

export function StatusChip({ children, tone = 'gray', className = '', dot = false }: StatusChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-2xs font-bold uppercase tracking-[0.14em] ${TONES[tone]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  )
}
