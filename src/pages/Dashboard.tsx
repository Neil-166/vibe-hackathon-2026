import { motion } from 'framer-motion'
import { Github, Linkedin, Check, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { StreakCard } from '../components/StreakCard'
import { Heatmap } from '../components/Heatmap'
import { TodayChallenge } from '../components/TodayChallenge'
import { AchievementSection } from '../components/AchievementSection'
import { ProgressBar } from '../components/ui/ProgressBar'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useApp } from '../context/AppContext'

function ProofStatusRow({ icon, label, done }: { icon: 'github' | 'linkedin'; label: string; done: boolean }) {
  const Icon = icon === 'github' ? Github : Linkedin
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2.5">
      <span className={`grid h-8 w-8 place-items-center rounded-lg ${done ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/[0.06] text-smoke'}`}>
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="flex-1 text-sm font-semibold text-white">{label}</span>
      {done ? (
        <span className="inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-[0.12em] text-emerald-400">
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> Proof in
        </span>
      ) : (
        <span className="text-2xs font-bold uppercase tracking-[0.12em] text-ash">Pending</span>
      )}
    </div>
  )
}

export function Dashboard() {
  const { student, greeting, initials, displayName, progressCompleted, progressPct, todayProofs, streak, resetDemo } = useApp()

  const day = student.currentDay
  const githubDone = Boolean(todayProofs.github)
  const linkedinDone = Boolean(todayProofs.linkedin)

  const hero = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-start justify-between gap-4"
    >
      <div className="min-w-0">
        <h1 className="truncate font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-white">{greeting}</h1>
        <p className="mt-0.5 truncate text-sm font-medium text-smoke">{student.track}</p>
        <div className="mt-2.5 inline-flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-orange-soft">DAY {day}</span>
          <span className="text-2xl font-extrabold tracking-tight text-ash">/ {student.totalDays}</span>
          {streak.todayPending && (
            <span className="inline-flex items-center gap-1 rounded-full border border-orange/30 bg-orange/10 px-2 py-0.5 text-2xs font-bold uppercase tracking-[0.12em] text-orange-soft">
              <Clock className="h-3 w-3" aria-hidden /> In progress
            </span>
          )}
        </div>
      </div>
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-graphite font-display text-sm font-extrabold text-white shadow-[0_0_0_4px_rgba(255,90,0,0.12)]"
        aria-label={`Profile avatar for ${displayName}`}
      >
        {initials}
      </div>
    </motion.div>
  )

  const progressCard = (
    <section aria-label="Overall progress" className="card p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">60 day journey</p>
        <span className="font-display text-sm font-extrabold text-orange-soft">{progressPct}%</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-white">{progressCompleted}</span>
        <span className="text-sm font-semibold text-smoke">/ {student.totalDays} days</span>
      </div>
      <div className="mt-3">
        <ProgressBar value={progressPct} />
      </div>
      <p className="mt-2.5 text-xs font-medium text-ash">
        {student.totalDays - progressCompleted} days remaining · consistency compounds.
      </p>
    </section>
  )

  const proofStatus = (
    <section aria-label="Proof of work status">
      <SectionHeader
        eyebrow="Proof of work"
        title="Your evidence"
        action={
          <Link to={`/day/${day}`} className="text-xs font-bold text-orange-soft hover:underline">
            Manage
          </Link>
        }
      />
      <div className="space-y-2">
        <ProofStatusRow icon="github" label="GitHub commit" done={githubDone} />
        <ProofStatusRow icon="linkedin" label="LinkedIn post" done={linkedinDone} />
      </div>
    </section>
  )

  return (
    <div className="px-5 pt-4 md:pt-8">
      <div className="mb-6 flex items-center justify-between">
        <Logo />
        <span className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">60-day challenge</span>
      </div>

      <div className="space-y-5">
        {hero}

        <StreakCard />

        <div className="md:grid md:grid-cols-[1fr_340px] md:items-start md:gap-5">
          <div className="space-y-5">
            <Heatmap />
            <TodayChallenge />
            <div className="md:hidden">{proofStatus}</div>
          </div>
          <div className="mt-5 space-y-5 md:mt-0">
            <div className="md:hidden">{progressCard}</div>
            <div className="hidden md:block">{progressCard}</div>
            <div className="hidden md:block">{proofStatus}</div>
            <AchievementSection />
          </div>
        </div>
      </div>

      <footer className="mt-8 flex items-center justify-between border-t border-line/60 pt-4 pb-1">
        <p className="text-xs text-ash">
          Build every day. Show your work. <span className="text-white/70">Become undeniable.</span>
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset the demo to Day 12, in progress?')) resetDemo()
          }}
          className="text-xs font-semibold text-ash transition-colors hover:text-orange-soft"
        >
          Reset demo
        </button>
      </footer>
    </div>
  )
}
