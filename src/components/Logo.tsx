interface LogoProps {
  /** Show the wordmark next to the mark */
  wordmark?: boolean
  markSize?: number
  className?: string
}

const FLAME =
  'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z'

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <rect width="32" height="32" rx="9" fill="#171717" stroke="#2A2A2A" />
      <path d={FLAME} fill="#FF5A00" transform="translate(3 2.5) scale(1.15)" />
    </svg>
  )
}

export function Logo({ wordmark = true, markSize = 30, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoMark size={markSize} />
      {wordmark && (
        <span className="font-display text-[1.3rem] font-extrabold tracking-tight leading-none text-white">
          AB<span className="text-orange">Talks</span>
        </span>
      )}
    </span>
  )
}
