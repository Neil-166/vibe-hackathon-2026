import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AnimatedNumber } from './ui/AnimatedNumber'

/**
 * Full-screen reward state shown right after a challenge completes —
 * inspired by the reference's black canvas + large orange streak shape.
 */
export function CompletionOverlay({ day }: { day: number }) {
  const navigate = useNavigate()

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Day ${day} complete`}
      data-testid="completion-overlay"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Orange streak shape — the brand's energy line */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-[-18%] w-full"
        viewBox="0 0 390 260"
        fill="none"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <path
          d="M-40 210 C 90 120, 180 250, 300 150 S 470 60, 520 90"
          stroke="#FF5A00"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.16"
        />
        <path
          d="M-40 210 C 90 120, 180 250, 300 150 S 470 60, 520 90"
          stroke="#FF5A00"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
        className="relative grid h-24 w-24 place-items-center rounded-[1.75rem] bg-orange shadow-glow-orange"
      >
        <Flame className="h-12 w-12 animate-streak-drift text-ink" strokeWidth={2.4} fill="currentColor" aria-hidden />
        <span className="absolute inset-0 rounded-[1.75rem] bg-orange/40 blur-xl" aria-hidden />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="relative mt-6 text-2xs font-bold uppercase tracking-[0.3em] text-orange-soft"
      >
        Nice work!
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="relative mt-2 font-display text-4xl font-extrabold leading-none tracking-tight text-white"
      >
        DAY {day} COMPLETE
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative mt-3 text-base font-medium text-smoke"
      >
        Your streak continues. 🔥
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="relative mt-8 flex items-baseline gap-2"
      >
        <AnimatedNumber value={day} className="font-display text-5xl font-extrabold tracking-tight text-white" />
        <span className="text-lg font-bold text-ash">/ 60 DAYS</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative mt-2 text-sm font-medium text-ash"
      >
        {day + 1 < 60 ? `Day ${day + 1} is unlocked. Keep the chain alive.` : 'The 60-day journey is complete. Unbelievable.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05 }}
        className="relative mt-8 w-full max-w-[260px]"
      >
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full rounded-xl bg-orange text-base font-bold text-white shadow-glow-orange-sm transition-transform duration-150 active:scale-[0.98] hover:bg-orange-soft"
          style={{ height: '3.25rem' }}
        >
          Back to Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}
