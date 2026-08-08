import { motion } from 'framer-motion'
import { Check, Lock, Flame, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { SectionHeader } from './ui/SectionHeader'
import type { AchievementStatus } from '../context/AppContext'

const LEAGUE_STYLE: Record<string, { text: string; ring: string; chip: string }> = {
  Bronze: {
    text: 'text-bronze-soft',
    ring: 'border-bronze/40',
    chip: 'bg-bronze/15 text-bronze-soft border-bronze/30',
  },
  Silver: {
    text: 'text-silver-soft',
    ring: 'border-silver/30',
    chip: 'bg-silver/10 text-silver-soft border-silver/30',
  },
  Gold: {
    text: 'text-gold-soft',
    ring: 'border-gold/40',
    chip: 'bg-gold/15 text-gold-soft border-gold/30',
  },
  Diamond: {
    text: 'text-diamond',
    ring: 'border-diamond/40',
    chip: 'bg-diamond/10 text-diamond border-diamond/30',
  },
}

const NEUTRAL = { text: 'text-white', ring: 'border-line', chip: 'bg-white/[0.06] text-smoke border-line' }

function LeagueChip({ name }: { name: string | null }) {
  const style = name ? LEAGUE_STYLE[name] ?? NEUTRAL : NEUTRAL
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-2xs font-bold uppercase tracking-[0.14em] ${style.chip}`}>
      {name ?? 'Milestone'}
    </span>
  )
}

function AchievementRow({ a }: { a: AchievementStatus }) {
  const style = a.league ? LEAGUE_STYLE[a.league] ?? NEUTRAL : NEUTRAL
  const unlocked = a.unlocked

  return (
    <motion.div
      layout
      className={`relative flex items-center gap-3 overflow-hidden rounded-xl border p-3 transition-colors duration-200 ${
        unlocked ? `${style.ring} bg-white/[0.03]` : 'border-line bg-white/[0.02]'
      } ${unlocked ? '' : 'opacity-80'}`}
    >
      {unlocked && (
        <div className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-orange/15 blur-2xl" aria-hidden />
      )}
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
          unlocked ? 'bg-orange text-ink shadow-glow-orange-sm' : 'bg-white/[0.06] text-ash'
        }`}
        aria-hidden
      >
        {unlocked ? (
          <Flame className="h-5 w-5 animate-flame" strokeWidth={2.6} fill="currentColor" />
        ) : (
          <Lock className="h-[18px] w-[18px]" strokeWidth={2.2} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`font-display text-[13px] font-extrabold tracking-tight ${unlocked ? 'text-white' : 'text-smoke'}`}>
          {a.title}
        </p>
        <div className="mt-1">
          <LeagueChip name={a.league} />
        </div>
      </div>

      <div className="shrink-0 text-right">
        {unlocked ? (
          <span className={`inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-[0.14em] ${style.text}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> Unlocked
          </span>
        ) : (
          <span className="text-2xs font-bold uppercase tracking-[0.12em] text-ash">
            {a.daysToGo} day{a.daysToGo === 1 ? '' : 's'} to go
          </span>
        )}
      </div>
    </motion.div>
  )
}

export function AchievementSection() {
  const { achievements, league, student } = useApp()
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const anyUnlocked = unlockedCount > 0

  return (
    <section aria-label="Achievements and leagues">
      <SectionHeader
        eyebrow="Rewards"
        title="Achievements"
        action={
          <span className="text-2xs font-bold uppercase tracking-[0.14em] text-ash">
            {unlockedCount}/{achievements.length} unlocked
          </span>
        }
      />

      <div className="space-y-2.5">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3, ease: 'easeOut' }}
          >
            <AchievementRow a={a} />
          </motion.div>
        ))}
      </div>

      {/* League banner */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-ink/50 px-4 py-3">
        <div>
          <p className="text-2xs font-bold uppercase tracking-[0.2em] text-ash">Current league</p>
          <p className="mt-0.5 font-display text-base font-extrabold tracking-tight text-white">
            {league ?? 'Rookie'}
            <span className="text-ash"> · Day {student.currentDay} of 60</span>
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex h-9 items-center gap-1 rounded-lg bg-white/[0.06] px-3 text-xs font-bold text-smoke transition-colors hover:text-white"
          aria-label="View challenge progress"
        >
          Track <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {!anyUnlocked && (
        <p className="mt-3 text-center text-sm text-smoke">
          Complete your first milestone to unlock your first badge. 🔥
        </p>
      )}
    </section>
  )
}
