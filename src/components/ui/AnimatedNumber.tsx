import { useEffect, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion'

/** Counts up/down to `value` with a springy ease. */
export function AnimatedNumber({ value, className = '' }: { value: number; className?: string }) {
  const mv = useMotionValue(value)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.7, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [value, mv])

  useMotionValueEvent(mv, 'change', (latest) => setDisplay(Math.round(latest)))

  return <span className={`tabular-nums ${className}`}>{display}</span>
}
