import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ACHIEVEMENTS,
  DEFAULT_STUDENT,
  LEAGUES,
} from '../data/mock'
import type { DayProofs, ProofType, ProofsByDay } from '../data/mock'
import { computeStreak } from '../lib/streak'
import type { Student, StreakInfo } from '../lib/streak'

const STORAGE_KEY = 'abtalks:state:v1'

interface PersistedState {
  student: Student
  proofs: ProofsByDay
}

function loadPersisted(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { student: { ...DEFAULT_STUDENT, completedDays: [...DEFAULT_STUDENT.completedDays] }, proofs: {} }
    const parsed = JSON.parse(raw) as PersistedState
    const student: Student = {
      name: typeof parsed.student?.name === 'string' ? parsed.student.name : DEFAULT_STUDENT.name,
      track: typeof parsed.student?.track === 'string' ? parsed.student.track : DEFAULT_STUDENT.track,
      currentDay: typeof parsed.student?.currentDay === 'number' ? parsed.student.currentDay : DEFAULT_STUDENT.currentDay,
      totalDays: DEFAULT_STUDENT.totalDays,
      completedDays: Array.isArray(parsed.student?.completedDays) ? parsed.student.completedDays : [],
      missedDays: Array.isArray(parsed.student?.missedDays) ? parsed.student.missedDays : [],
    }
    return { student, proofs: parsed.proofs ?? {} }
  } catch {
    return { student: { ...DEFAULT_STUDENT, completedDays: [...DEFAULT_STUDENT.completedDays] }, proofs: {} }
  }
}

export interface AchievementStatus {
  id: string
  title: string
  league: string | null
  streak: number
  unlocked: boolean
  daysToGo: number
}

export interface NextMilestone {
  threshold: number
  title: string
  league: string | null
  daysToGo: number
  pct: number
}

export interface AppState {
  student: Student
  proofs: ProofsByDay
  todayProofs: DayProofs
  streak: StreakInfo
  /** Days banked this journey (completed + today if alive) for the progress bar */
  progressCompleted: number
  progressPct: number
  achievements: AchievementStatus[]
  league: string | null
  leagueStreak: number
  nextMilestone: NextMilestone | null
  hasNewChallenge: boolean
  displayName: string
  initials: string
  greeting: string
  completeChallenge: () => void
  uploadProof: (type: ProofType, fileName: string, size: number) => void
  removeProof: (type: ProofType) => void
  resetDemo: () => void
}

const AppContext = createContext<AppState | null>(null)

function greetingForHour(hour: number): string {
  if (hour < 5) return 'Good night'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => loadPersisted())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage full / blocked — app still works in-memory */
    }
  }, [state])

  useEffect(() => {
    setMounted(true)
  }, [])

  const student = state.student
  const streak = useMemo(() => computeStreak(student), [student])

  const todayProofs: DayProofs = state.proofs[student.currentDay] ?? {}

  const progressCompleted = useMemo(() => {
    const banked = student.completedDays.length
    // Today's in-progress (but not yet banked) day counts toward journey progress.
    return banked + (streak.todayAlive ? 1 : 0)
  }, [student.completedDays.length, streak.todayAlive])

  const progressPct = useMemo(() => {
    return Math.min(100, Math.round((progressCompleted / student.totalDays) * 100))
  }, [progressCompleted, student.totalDays])

  const achievements = useMemo<AchievementStatus[]>(
    () =>
      ACHIEVEMENTS.map((a) => {
        const unlocked = streak.value >= a.streak
        return {
          ...a,
          unlocked,
          daysToGo: Math.max(0, a.streak - streak.value),
        }
      }),
    [streak.value],
  )

  const { league, leagueStreak } = useMemo(() => {
    let league: string | null = null
    let leagueStreak = 0
    for (const l of LEAGUES) {
      if (streak.value >= l.streak) {
        league = l.name
        leagueStreak = l.streak
      }
    }
    return { league, leagueStreak }
  }, [streak.value])

  const nextMilestone = useMemo<NextMilestone | null>(() => {
    if (streak.value >= 60) return null
    const target = ACHIEVEMENTS.find((a) => streak.value < a.streak)
    if (!target) return null
    const daysToGo = Math.max(1, target.streak - streak.value)
    return {
      threshold: target.streak,
      title: target.title,
      league: target.league,
      daysToGo,
      pct: Math.min(100, Math.round((streak.value / target.streak) * 100)),
    }
  }, [streak.value])

  const hasNewChallenge = !student.completedDays.includes(student.currentDay) && !student.missedDays.includes(student.currentDay)

  const displayName = student.name.trim().length > 0 ? student.name.trim() : 'Builder'
  const initials = useMemo(() => {
    const parts = displayName.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase() || 'B'
  }, [displayName])

  const greeting = useMemo(
    () => `${greetingForHour(mounted ? new Date().getHours() : 20)}, ${displayName.split(' ')[0]}.`,
    [mounted, displayName],
  )

  const completeChallenge = () => {
    setState((prev) => {
      const cur = prev.student.currentDay
      const completedDays = prev.student.completedDays.includes(cur) ? prev.student.completedDays : [...prev.student.completedDays, cur]
      const missedDays = prev.student.missedDays.filter((d) => d !== cur)
      return {
        ...prev,
        student: { ...prev.student, completedDays, missedDays },
      }
    })
  }

  const uploadProof = (type: ProofType, fileName: string, size: number) => {
    setState((prev) => {
      const day = prev.student.currentDay
      const existing = prev.proofs[day] ?? {}
      return {
        ...prev,
        proofs: {
          ...prev.proofs,
          [day]: { ...existing, [type]: { fileName, size, uploadedAt: Date.now() } },
        },
      }
    })
  }

  const removeProof = (type: ProofType) => {
    setState((prev) => {
      const day = prev.student.currentDay
      const existing = prev.proofs[day] ?? {}
      const { [type]: _removed, ...rest } = existing
      void _removed
      return {
        ...prev,
        proofs: { ...prev.proofs, [day]: rest },
      }
    })
  }

  const resetDemo = () => {
    setState({
      student: { ...DEFAULT_STUDENT, completedDays: [...DEFAULT_STUDENT.completedDays] },
      proofs: {},
    })
  }

  const value: AppState = {
    student,
    proofs: state.proofs,
    todayProofs,
    streak,
    progressCompleted,
    progressPct,
    achievements,
    league,
    leagueStreak,
    nextMilestone,
    hasNewChallenge,
    displayName,
    initials,
    greeting,
    completeChallenge,
    uploadProof,
    removeProof,
    resetDemo,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
