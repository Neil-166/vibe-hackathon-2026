import { motion } from 'framer-motion'
import {
  ArrowRight,
  Flame,
  Github,
  Linkedin,
  Target,
  Upload,
  Terminal,
  Hammer,
  TrendingUp,
  Briefcase,
  CalendarDays,
  FolderGit2,
  Trophy,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { MILESTONES } from '../data/mock'

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-2xs font-bold uppercase tracking-[0.26em] text-orange-soft">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight text-white">{children}</h2>
  )
}

const STEPS = [
  { icon: Hammer, title: 'Build', desc: 'Ship something real, every single day.', tone: 'text-white' },
  { icon: Github, title: 'Commit to GitHub', desc: 'Your contribution graph becomes your proof.', tone: 'text-emerald-400' },
  { icon: Linkedin, title: 'Post on LinkedIn', desc: 'Document the build in public, like a developer.', tone: 'text-sky-400' },
  { icon: Upload, title: 'Submit proof', desc: 'Upload both proofs to lock the day in.', tone: 'text-orange-soft' },
  { icon: Flame, title: 'Keep your streak', desc: "Don't break the chain. Repeat for 60 days.", tone: 'text-orange-soft' },
]

const WHY = [
  { icon: TrendingUp, title: 'GitHub activity', desc: 'A contribution graph with 60 straight days.' },
  { icon: FolderGit2, title: 'Real projects', desc: '60 builds you can actually show off.' },
  { icon: CalendarDays, title: 'Public learning history', desc: 'A visible record of showing up.' },
  { icon: Linkedin, title: 'LinkedIn visibility', desc: 'Recruiters see consistency in the feed.' },
  { icon: Briefcase, title: 'Portfolio evidence', desc: 'Proof you build — not just course certificates.' },
]

const LEAGUE_CARDS = [
  { name: 'Bronze', streak: 10, cls: 'text-bronze-soft border-bronze/30 bg-bronze/[0.08]' },
  { name: 'Silver', streak: 25, cls: 'text-silver-soft border-silver/30 bg-silver/[0.07]' },
  { name: 'Gold', streak: 50, cls: 'text-gold-soft border-gold/30 bg-gold/[0.08]' },
  { name: 'Diamond', streak: 60, cls: 'text-diamond border-diamond/30 bg-diamond/[0.06]' },
]

export function Landing() {
  return (
    <div className="px-5 pt-5">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Logo />
        <Link
          to="/dashboard"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-orange px-4 text-sm font-bold text-white shadow-glow-orange-sm transition-transform duration-150 active:scale-95 hover:bg-orange-soft"
        >
          Start <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </header>

      {/* Hero */}
      <section className="relative mt-12 overflow-hidden md:mt-20">
        {/* decorative streak line */}
        <svg
          className="pointer-events-none absolute -right-16 top-4 w-64 text-orange/20 md:w-96"
          viewBox="0 0 260 90"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 78 C 70 40, 120 88, 190 44 S 260 16, 256 8"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.05 }}
          className="text-2xs font-bold uppercase tracking-[0.3em] text-orange-soft"
        >
          60 days. One commitment.
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.12 }}
          className="mt-3 font-display text-hero font-extrabold tracking-tight text-white"
        >
          Build every day.
          <br />
          <span className="bg-gradient-to-r from-orange-soft to-orange bg-clip-text text-transparent">Become undeniable.</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          className="mt-4 max-w-md text-base leading-relaxed text-smoke"
        >
          Build something every day for 60 days, document your progress, and turn your consistency into a public portfolio recruiters can’t ignore.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.28 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/dashboard"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-orange px-6 text-base font-bold text-white shadow-glow-orange-sm transition-transform duration-150 active:scale-[0.98] hover:bg-orange-soft"
          >
            Start the 60-Day Challenge <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.04] px-6 text-base font-semibold text-white transition-colors hover:bg-white/[0.09]"
          >
            See how it works
          </a>
        </motion.div>

        {/* Streak preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.42 }}
          className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-graphite px-4 py-3"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange shadow-glow-orange-sm">
            <Flame className="h-5 w-5 animate-streak-drift text-ink" fill="currentColor" aria-hidden />
          </span>
          <div>
            <p className="font-display text-sm font-extrabold tracking-tight text-white">
              12-day streak, alive.
            </p>
            <p className="text-2xs font-medium text-ash">This could be you — starting today.</p>
          </div>
          <div className="ml-2 hidden gap-1 sm:flex" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <Flame key={i} className="h-4 w-4 text-orange" fill="currentColor" strokeWidth={2.4} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Statement */}
      <section className="mt-16 md:mt-24">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, ease: easeOut }}
          className="text-balance font-display text-[1.45rem] font-extrabold leading-snug tracking-tight text-white"
        >
          Every day, you build.
          <br />
          Every day, you commit.
          <br />
          <span className="text-orange-soft">Every day, you show the world.</span>
        </motion.p>
      </section>

      {/* 60-day journey */}
      <section className="mt-14 md:mt-20" aria-label="The 60-day journey">
        <SectionEyebrow>The road</SectionEyebrow>
        <SectionTitle>Your 60-day journey</SectionTitle>
        <p className="mt-2 text-sm text-smoke">Five milestones. One chain. Each one a notch in your public proof.</p>

        <div className="no-scrollbar -mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-2">
          {MILESTONES.map((m, i) => (
            <div key={m.day} className="relative min-w-[150px] shrink-0">
              {i < MILESTONES.length - 1 && (
                <div className="absolute -right-3 top-7 h-px w-6 bg-gradient-to-r from-orange/70 to-transparent" aria-hidden />
              )}
              <div
                className={`rounded-2xl border border-line bg-graphite px-4 py-4 ${
                  m.day === 60 ? 'border-gold/40 bg-gold/[0.06]' : m.day === 10 ? 'border-orange/30 bg-orange/[0.05]' : ''
                }`}
              >
                <p className="font-display text-2xl font-extrabold tracking-tight text-white">{m.label}</p>
                <p className="mt-1 text-2xs font-bold uppercase tracking-[0.16em] text-ash">{m.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-4 mt-14 md:mt-20" aria-label="How it works">
        <SectionEyebrow>How it works</SectionEyebrow>
        <SectionTitle>The proof-of-work loop</SectionTitle>

        <div className="relative mt-6">
          <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-orange/60 via-line to-transparent" aria-hidden />
          <div className="space-y-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: 'easeOut' }}
                  className="relative flex items-center gap-4"
                >
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-ink">
                    <Icon className={`h-5 w-5 ${s.tone}`} aria-hidden />
                  </span>
                  <div className="min-w-0 rounded-xl border border-line bg-graphite px-4 py-3">
                    <p className="font-display text-sm font-extrabold tracking-tight text-white">{s.title}</p>
                    <p className="mt-0.5 text-xs text-smoke">{s.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why 60 days */}
      <section className="mt-14 md:mt-20" aria-label="Why 60 days">
        <SectionEyebrow>Why 60 days</SectionEyebrow>
        <SectionTitle>Consistency creates evidence</SectionTitle>
        <p className="mt-2 text-sm text-smoke">
          60 days of showing up turns into a recruiter-readable record that a course certificate never can.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {WHY.map((w) => {
            const Icon = w.icon
            return (
              <div key={w.title} className="rounded-2xl border border-line bg-graphite p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange/12 text-orange-soft">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <p className="mt-3 font-display text-sm font-extrabold tracking-tight text-white">{w.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-smoke">{w.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Proof */}
      <section className="mt-14 md:mt-20" aria-label="Your work becomes your proof">
        <SectionEyebrow>Public by design</SectionEyebrow>
        <SectionTitle>Your work becomes your proof</SectionTitle>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-graphite p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/12 text-emerald-400">
              <Github className="h-5 w-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-extrabold text-white">GitHub</p>
              <p className="text-xs text-smoke">60 green squares. Your consistency, timestamped.</p>
            </div>
            <TrendingUp className="h-5 w-5 text-ash" aria-hidden />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-graphite p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/12 text-sky-400">
              <Linkedin className="h-5 w-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-extrabold text-white">LinkedIn</p>
              <p className="text-xs text-smoke">60 posts documenting real, shipped work.</p>
            </div>
            <Target className="h-5 w-5 text-ash" aria-hidden />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-orange/25 bg-orange/[0.05] p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange text-ink">
              <Terminal className="h-5 w-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-extrabold text-white">A portfolio that builds itself</p>
              <p className="text-xs text-smoke">60 projects. One undeniable public record.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-orange-soft" aria-hidden />
          </div>
        </div>
      </section>

      {/* Leagues */}
      <section className="mt-14 md:mt-20" aria-label="Streaks and achievements">
        <SectionEyebrow>Stay motivated</SectionEyebrow>
        <SectionTitle>Streaks become leagues</SectionTitle>
        <p className="mt-2 text-sm text-smoke">Every milestone unlocks a league. Consistency compounds.</p>

        <div className="no-scrollbar -mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-2">
          {LEAGUE_CARDS.map((l) => (
            <div key={l.name} className={`flex min-w-[132px] shrink-0 flex-col rounded-2xl border p-4 ${l.cls}`}>
              <Trophy className="h-6 w-6" aria-hidden />
              <p className="mt-3 font-display text-lg font-extrabold tracking-tight">{l.name}</p>
              <p className="text-2xs font-bold uppercase tracking-[0.14em] opacity-70">{l.streak}-day streak</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mt-14 overflow-hidden rounded-2xl border border-orange/30 bg-gradient-to-b from-graphite to-ink p-6 text-center md:mt-20 md:p-10">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-orange/20 blur-3xl" aria-hidden />
        <div className="relative">
          <Flame className="mx-auto h-8 w-8 animate-streak-drift text-orange" fill="currentColor" aria-hidden />
          <h3 className="mt-4 text-balance font-display text-[1.7rem] font-extrabold leading-tight tracking-tight text-white">
            Your 60 days start today.
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-smoke">
            Build once, every day, for two months. Walk away with a GitHub history, a LinkedIn record, and a portfolio — or don’t show up tomorrow. Your call.
          </p>
          <Link
            to="/dashboard"
            className="mx-auto mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-orange px-8 text-base font-bold text-white shadow-glow-orange-sm transition-transform duration-150 active:scale-[0.98] hover:bg-orange-soft"
          >
            Start the 60-Day Challenge <ChevronRight className="h-5 w-5" aria-hidden />
          </Link>
          <p className="mt-3 text-2xs font-medium uppercase tracking-[0.18em] text-ash">Free for students · No experience needed</p>
        </div>
      </section>

      <footer className="mt-10 flex flex-col items-center gap-2 border-t border-line/60 py-6 text-center">
        <Logo wordmark markSize={26} />
        <p className="text-xs text-ash">© 2026 ABTalks · Build every day. Show your work. Become undeniable.</p>
      </footer>
    </div>
  )
}
