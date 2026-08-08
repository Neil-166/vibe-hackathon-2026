import { motion } from 'framer-motion'
import { Flame, Snowflake } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { AnimatedNumber } from './ui/AnimatedNumber'
import { ProgressBar } from './ui/ProgressBar'

export function StreakCard() {
  const { streak, nextMilestone } = useApp()
  const frozen = streak.frozen
  const zero = streak.value === 0 && !frozen

  const supporting = frozen
    ? 'One missed day doesn’t erase your progress.'
    : zero
      ? 'Every streak starts with one day.'
      : 'Keep showing up.'

  return (
    <section aria-label="Current streak" className="relative overflow-hidden rounded-2xl border border-line bg-graphite p-5">
      {/* ambient orange glow behind the flame */}
      <div
        className={`pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
          frozen ? 'bg-white/[0.05] opacity-70' : 'bg-orange/25 opacity-100'
        }`}
        aria-hidden
      />

      <div className="relative flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-orange shadow-glow-orange-sm">
          {frozen ? (
            <Snowflake className="h-7 w-7 text-white" aria-hidden />
          ) : (
            <Flame className="h-7 w-7 animate-streak-drift text-ink" strokeWidth={2.6} fill="currentColor" aria-hidden />
          )}
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <AnimatedNumber
              value={streak.value}
              className="font-display text-6xl font-extrabold leading-none tracking-tightest text-white"
            />
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-smoke">
              Day <br /> streak
            </span>
          </div>
          <p className={`mt-1.5 text-sm font-medium ${frozen ? 'text-red-400' : 'text-smoke'}`}>{supporting}</p>
        </div>
      </div>

      {frozen && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5 text-sm text-red-200"
        >
          Your streak froze. Start today’s challenge and keep moving — one missed day doesn’t erase your progress.
        </motion.p>
      )}

      {nextMilestone && !frozen && (
        <div className="relative mt-5 border-t border-line pt-4">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">Next milestone</p>
              <p className="mt-0.5 font-display text-sm font-extrabold tracking-tight text-white">
                {nextMilestone.title}
                {nextMilestone.league && <span className="text-ash"> · {nextMilestone.league}</span>}
              </p>
            </div>
            <p className="text-sm font-bold text-orange-soft">{nextMilestone.daysToGo} day{nextMilestone.daysToGo === 1 ? '' : 's'} to go</p>
          </div>
          <ProgressBar value={nextMilestone.pct} />
        </div>
      )}

      {!nextMilestone && !frozen && (
        <div className="relative mt-5 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2.5 text-sm font-semibold text-gold-soft">
          🏆 Diamond league complete. You built for 60 days straight — undeniable.
        </div>
      )}
    </section>
  )
}
