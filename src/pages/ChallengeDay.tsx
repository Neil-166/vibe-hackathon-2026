import { AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles, Lock, Check, Flame } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getChallenge } from '../data/mock'
import { ProofUpload } from '../components/ProofUpload'
import { ChallengeChecklist } from '../components/ChallengeChecklist'
import { CompletionOverlay } from '../components/CompletionOverlay'
import { StatusChip } from '../components/ui/StatusChip'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'

function Bullet({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${
          accent ? 'bg-orange/15 text-orange-soft' : 'bg-white/[0.06] text-smoke'
        }`}
        aria-hidden
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <span className="text-sm leading-relaxed text-white/90">{children}</span>
    </li>
  )
}

/** Summary view for non-current days (completed / missed / upcoming). */
function DaySummary({ day, completed, missed }: { day: number; completed: boolean; missed: boolean }) {
  const challenge = getChallenge(day)
  return (
    <div className="px-5 pt-4">
      <BackLink />
      <div className="card mt-4 flex flex-col items-center gap-3 p-8 text-center">
        {completed ? (
          <>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <Check className="h-7 w-7" strokeWidth={2.6} aria-hidden />
            </span>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">Day {day} complete</h1>
            <p className="text-sm text-smoke">{challenge.title}</p>
            <p className="text-sm font-semibold text-emerald-400">Banked. Your streak continues.</p>
          </>
        ) : missed ? (
          <>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-500/15 text-red-400">
              <Lock className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">Day {day} was missed</h1>
            <p className="text-sm text-smoke">
              One missed day doesn’t erase your progress. Jump back in today.
            </p>
            <Link
              to={`/day/${day + 1}`}
              className="mt-2 inline-flex h-12 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white shadow-glow-orange-sm"
            >
              <Flame className="h-4 w-4" fill="currentColor" aria-hidden /> Go to today’s challenge
            </Link>
          </>
        ) : (
          <>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.06] text-ash">
              <Lock className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">Day {day} isn’t available yet</h1>
            <p className="text-sm text-smoke">Complete each day to unlock the next one. Consistency compounds.</p>
          </>
        )}
      </div>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      to="/dashboard"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-smoke transition-colors hover:text-white"
      aria-label="Back to dashboard"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden /> Back
    </Link>
  )
}

export function ChallengeDay() {
  const { day: dayParam } = useParams<{ day: string }>()
  const { student, todayProofs, streak, completeChallenge } = useApp()
  const day = Number(dayParam ?? student.currentDay) || student.currentDay
  const challenge = getChallenge(day)

  const isCurrent = day === student.currentDay
  const completed = student.completedDays.includes(day)
  const missed = student.missedDays.includes(day)

  if (!isCurrent) {
    return <DaySummary day={day} completed={completed} missed={missed} />
  }

  const githubDone = Boolean(todayProofs.github)
  const linkedinDone = Boolean(todayProofs.linkedin)
  const bothProofs = githubDone && linkedinDone

  const handleComplete = () => {
    if (bothProofs) completeChallenge()
  }

  const status = completed ? 'complete' : missed ? 'missed' : 'in-progress'

  return (
    <div className="px-5 pt-4">
      <BackLink />

      <header className="mt-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xs font-bold uppercase tracking-[0.24em] text-ash">60-day challenge</p>
          {status === 'complete' && (
            <StatusChip tone="green" dot>
              Complete
            </StatusChip>
          )}
          {status === 'missed' && (
            <StatusChip tone="red" dot>
              Missed
            </StatusChip>
          )}
          {status === 'in-progress' && (
            <StatusChip tone="orange" dot>
              In progress
            </StatusChip>
          )}
        </div>

        <h1 className="mt-2 font-display text-3xl font-extrabold leading-none tracking-tight text-white">
          DAY {day}
          <span className="text-ash"> / 60</span>
        </h1>

        <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight tracking-tight text-white">{challenge.title}</h2>
        <p className="mt-1.5 text-sm font-medium text-smoke">{challenge.tagline}</p>
      </header>

      {/* Brief */}
      <section aria-label="Today's brief" className="card mt-5 overflow-hidden">
        <div className="p-4">
          <h3 className="flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.2em] text-orange-soft">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Today’s goal
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/90">{challenge.goal}</p>
        </div>
        <div className="border-t border-line p-4">
          <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">What to build</h3>
          <ul className="mt-3 space-y-2.5">
            {challenge.requirements.map((r) => (
              <Bullet key={r} accent>
                {r}
              </Bullet>
            ))}
          </ul>
        </div>
        <div className="border-t border-line p-4">
          <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">Bonus</h3>
          <ul className="mt-3 space-y-2.5">
            {challenge.bonus.map((b) => (
              <Bullet key={b}>{b}</Bullet>
            ))}
          </ul>
          <p className="mt-3 text-2xs font-medium text-ash">Bonus items are optional — they make your build stand out to recruiters.</p>
        </div>
      </section>

      <div className="mt-5">
        <ChallengeChecklist day={day} />
      </div>

      {/* Proof of work */}
      <section aria-label="Proof of work" className="mt-6">
        <SectionHeader
          eyebrow="Final checkpoint"
          title="Proof of work"
          action={
            <span className="text-2xs font-bold uppercase tracking-[0.14em] text-ash">
              {githubDone && linkedinDone ? '2/2 done' : `${(githubDone ? 1 : 0) + (linkedinDone ? 1 : 0)}/2 done`}
            </span>
          }
        />
        <p className="-mt-1 mb-3 text-sm text-smoke">Upload both to finish today. Your GitHub and LinkedIn become your proof.</p>
        <div className="space-y-3">
          <ProofUpload type="github" />
          <ProofUpload type="linkedin" />
        </div>
      </section>

      {/* Complete day */}
      <div className="mt-6">
        <div className="card border-orange/25 bg-orange/[0.06] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-sm font-extrabold tracking-tight text-white">Ready to lock it in?</p>
              <p className="mt-0.5 text-xs text-smoke">
                {bothProofs
                  ? 'Both proofs uploaded — finishing Day ' + day + '.'
                  : 'Upload both proofs to complete Day ' + day + '.'}
              </p>
            </div>
            <Button size="md" data-testid="complete-day" onClick={handleComplete} disabled={!bothProofs} className="px-5">
              Complete Day
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ash">
        <Flame className="h-3.5 w-3.5 text-orange" fill="currentColor" aria-hidden />
        {streak.todayAlive ? 'Your streak is alive today.' : 'Keep showing up.'}
      </p>

      <AnimatePresence>{completed && <CompletionOverlay day={day} />}</AnimatePresence>
    </div>
  )
}
