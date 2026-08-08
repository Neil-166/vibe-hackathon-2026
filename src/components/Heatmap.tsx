import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { dayState } from '../lib/streak'
import type { DayState } from '../lib/streak'

interface CellInfo {
  day: number
  state: DayState
}

const LEGEND: { state: DayState; label: string }[] = [
  { state: 'completed', label: 'Fired' },
  { state: 'today', label: 'Today' },
  { state: 'missed', label: 'Missed' },
  { state: 'future', label: 'Up next' },
]

export function Heatmap() {
  const { student } = useApp()
  const [selected, setSelected] = useState<CellInfo | null>(null)

  const days = useMemo(
    () =>
      Array.from({ length: student.totalDays }, (_, i) => {
        const day = i + 1
        return { day, state: dayState(day, student) }
      }),
    [student],
  )

  const info = selected ? days.find((d) => d.day === selected.day) : null

  return (
    <section aria-label="60-day activity heatmap" className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">Activity</p>
          <h3 className="font-display text-base font-extrabold tracking-tight text-white">60-day journey</h3>
        </div>
        <div className="flex items-center gap-3">
          {LEGEND.map((l) => (
            <span key={l.state} className="flex items-center gap-1.5 text-2xs font-medium text-ash">
              <span
                className={`h-2.5 w-2.5 rounded-[4px] ${
                  l.state === 'completed'
                    ? 'bg-orange'
                    : l.state === 'today'
                      ? 'border border-orange bg-orange/20'
                      : l.state === 'missed'
                        ? 'bg-line'
                        : 'bg-white/[0.06]'
                }`}
                aria-hidden
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5" role="grid">
        {days.map(({ day, state }, i) => {
          const isCompleted = state === 'completed'
          const isToday = state === 'today'
          const isMissed = state === 'missed'
          const isFuture = state === 'future'

          return (
            <motion.button
              key={day}
              type="button"
              role="gridcell"
              disabled={isFuture}
              aria-label={
                isCompleted
                  ? `Day ${day} — completed`
                  : isToday
                    ? `Day ${day} — today's challenge`
                    : isMissed
                      ? `Day ${day} — missed`
                      : `Day ${day} — upcoming`
              }
              onClick={() => setSelected(isFuture ? null : { day, state })}
              className={`relative flex aspect-square items-center justify-center rounded-[8px] text-[10px] font-bold transition-transform duration-150 ${
                isFuture ? 'text-ash/60' : 'cursor-pointer active:scale-90'
              } ${
                isCompleted
                  ? 'bg-orange text-ink shadow-[0_0_12px_rgba(255,90,0,0.35)] hover:brightness-110'
                  : isToday
                    ? 'border border-orange bg-orange/15 text-orange-soft pulse-ring'
                    : isMissed
                      ? 'bg-line text-ash line-through'
                      : 'bg-white/[0.05]'
              }`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(0.05 * (i % 10), 0.45), duration: 0.25, ease: 'backOut' }}
              whileTap={{ scale: 0.9 }}
            >
              {isCompleted ? (
                <Flame className="h-3.5 w-3.5 animate-flame" strokeWidth={2.6} fill="currentColor" aria-hidden />
              ) : (
                <span className="tabular-nums">{day}</span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {info && (
          <motion.div
            key={`${info.day}-${info.state}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-ink/60 px-3 py-2.5">
              <p className="text-sm text-smoke">
                <span className="font-display font-extrabold text-white">Day {info.day}</span>
                {' — '}
                {info.state === 'completed' && <span className="text-orange-soft">Completed</span>}
                {info.state === 'today' && <span className="text-orange-soft">Today's challenge</span>}
                {info.state === 'missed' && <span className="text-red-400">Missed</span>}
              </p>
              {info.state === 'today' && (
                <Link
                  to={`/day/${student.currentDay}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-orange-soft hover:underline"
                >
                  Open <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
