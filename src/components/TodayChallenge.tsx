import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getChallenge } from '../data/mock'
import { StatusChip } from './ui/StatusChip'

export function TodayChallenge() {
  const { student } = useApp()
  const day = student.currentDay
  const challenge = getChallenge(day)
  const completed = student.completedDays.includes(day)
  const missed = student.missedDays.includes(day)

  return (
    <section aria-label="Today's challenge" className="relative overflow-hidden rounded-2xl border border-orange/30 bg-graphite p-5">
      {/* orange accent glow */}
      <div className="pointer-events-none absolute -left-10 -bottom-12 h-40 w-40 rounded-full bg-orange/15 blur-3xl" aria-hidden />
      {/* gradient hairline on top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/70 to-transparent" aria-hidden />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xs font-bold uppercase tracking-[0.24em] text-orange-soft">{missed ? 'Missed' : 'Today'}</p>
          {completed ? (
            <StatusChip tone="green" dot>
              Complete
            </StatusChip>
          ) : missed ? (
            <StatusChip tone="red" dot>
              Missed
            </StatusChip>
          ) : (
            <StatusChip tone="orange" dot>
              In progress
            </StatusChip>
          )}
        </div>

        <p className="mt-1.5 font-display text-2xl font-extrabold leading-none tracking-tight text-white">
          DAY {day}
          <span className="text-ash"> / 60</span>
        </p>

        <h3 className="mt-3 font-display text-xl font-extrabold leading-snug tracking-tight text-white">{challenge.title}</h3>

        <p className="mt-2 text-sm font-medium text-smoke">
          Build it. Commit it. Show it.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {completed ? (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/20">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              Nice work — day banked
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-soft">
              <Flame className="h-4 w-4" fill="currentColor" aria-hidden />
              {missed ? 'Get back on it today' : 'Your next challenge is waiting'}
            </span>
          )}
          <Link
            to={`/day/${day}`}
            data-testid="open-challenge"
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-orange px-4 text-sm font-bold text-white shadow-glow-orange-sm transition-transform duration-150 active:scale-95 hover:bg-orange-soft"
            aria-label={`Open Day ${day} challenge`}
          >
            Open <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
