import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface ProgressBarProps {
  /** 0–100 */
  value: number
  className?: string
  barClassName?: string
  trackClassName?: string
  style?: CSSProperties
  animate?: boolean
}

export function ProgressBar({
  value,
  className = '',
  barClassName = '',
  trackClassName = '',
  style,
  animate = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const fill = (
    <motion.div
      className={`h-full rounded-full bg-gradient-to-r from-orange-deep via-orange to-orange-soft ${barClassName}`}
      style={style}
      initial={animate ? { width: 0 } : false}
      animate={{ width: `${clamped}%` }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      aria-hidden
    />
  )
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08] ${trackClassName} ${className}`}
    >
      {fill}
    </div>
  )
}
