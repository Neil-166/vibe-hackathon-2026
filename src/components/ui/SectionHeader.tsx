import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  action?: ReactNode
}

export function SectionHeader({ eyebrow, title, action }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">{eyebrow}</p>
        )}
        <h2 className="mt-0.5 font-display text-lg font-extrabold tracking-tight text-white">{title}</h2>
      </div>
      {action}
    </div>
  )
}
