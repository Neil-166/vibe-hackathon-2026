import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { LogoMark } from './Logo'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Branded 1.6s entrance — not a loading spinner.
 * Sequence: logo mark → orange streak draws → 60 DAYS → BUILD. COMMIT. SHOW UP.
 */
export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (reduced) {
      onDone()
      return
    }
    const t = window.setTimeout(() => setShow(false), 1650)
    return () => window.clearTimeout(t)
  }, [reduced, onDone])

  if (reduced) return null

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-8"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          aria-label="ABTalks loading"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <LogoMark size={54} />
          </motion.div>

          {/* Orange streak drawing across */}
          <svg className="mt-5 w-56" viewBox="0 0 220 12" fill="none" aria-hidden>
            <motion.path
              d="M4 6 C 60 -4, 140 16, 216 6"
              stroke="#FF5A00"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
            />
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.35, ease: EASE }}
            className="mt-4 font-display text-xl font-extrabold tracking-[0.3em] text-white"
          >
            60 DAYS
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.35, ease: EASE }}
            className="mt-2 text-2xs font-bold uppercase tracking-[0.4em] text-smoke"
          >
            Build. Commit. Show up.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
