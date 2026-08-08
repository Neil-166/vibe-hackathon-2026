/**
 * Streak engine — the heart of ABTalks.
 *
 * A streak is the count of consecutive "streak days" ending at the current
 * day. Semantics:
 *
 *  - A completed day counts toward the streak.
 *  - The CURRENT day counts if it is still pending (in progress) AND there is
 *    an established run behind it — this is the "your streak is alive today"
 *    state that makes people want to come back tonight.
 *  - A missed day freezes the streak. When today is pending but yesterday was
 *    missed, we surface the size of the run that froze (not zero) and mark the
 *    streak as frozen so the UI can reassure rather than punish.
 *
 * Guaranteed outputs:
 *  - Day 1, nothing done            -> 0,  not frozen   ("0 DAY STREAK")
 *  - Days 1–11 done, day 12 pending -> 12, not frozen   ("12 DAY STREAK")
 *  - Days 1–12 done                 -> 12, not frozen
 *  - Days 1–11 done, day 12 missed  -> 11, frozen
 *  - Days 1–10 done, 11 missed, 12 pending -> 10, frozen (streak froze)
 *  - Days 1–8, missed 9, done 10–11, 12 pending -> 3, not frozen (resumed)
 */

export interface Student {
  name: string
  track: string
  currentDay: number
  totalDays: number
  completedDays: number[]
  missedDays: number[]
}

export interface StreakInfo {
  /** Displayed streak value */
  value: number
  /** True when the streak is frozen because a day was missed */
  frozen: boolean
  /** True when today is pending and the streak is currently alive */
  todayAlive: boolean
  todayCompleted: boolean
  todayMissed: boolean
  todayPending: boolean
}

export function computeStreak(student: Pick<Student, 'currentDay' | 'completedDays' | 'missedDays'>): StreakInfo {
  const completed = new Set(student.completedDays)
  const missed = new Set(student.missedDays)
  const cur = student.currentDay

  const todayDone = completed.has(cur)
  const todayMissed = missed.has(cur)

  // Banked run: consecutive completed days ending at (cur - 1)
  let value = 0
  let d = cur - 1
  while (d >= 1 && completed.has(d)) {
    value++
    d--
  }
  const stoppedAtMissed = d >= 1 && missed.has(d)

  if (todayDone) {
    value += 1
    return { value, frozen: false, todayAlive: false, todayCompleted: true, todayMissed: false, todayPending: false }
  }

  if (todayMissed) {
    return { value, frozen: true, todayAlive: false, todayCompleted: false, todayMissed: true, todayPending: false }
  }

  // Today is pending.
  if (value > 0) {
    // Established run behind us -> today keeps the streak alive.
    return { value: value + 1, frozen: false, todayAlive: true, todayCompleted: false, todayMissed: false, todayPending: true }
  }

  if (stoppedAtMissed) {
    // The run froze right before today — report the size of the run that froze.
    let v = 0
    let x = cur - 1
    while (x >= 1 && missed.has(x)) x--
    while (x >= 1 && completed.has(x)) {
      v++
      x--
    }
    return { value: v, frozen: true, todayAlive: false, todayCompleted: false, todayMissed: false, todayPending: true }
  }

  // No run yet (Day 1 / fresh start).
  return { value: 0, frozen: false, todayAlive: false, todayCompleted: false, todayMissed: false, todayPending: true }
}

/** Consecutive-day count used for achievements (banked only, no "alive" bonus). */
export function completedConsecutive(student: Pick<Student, 'currentDay' | 'completedDays' | 'missedDays'>): number {
  const completed = new Set(student.completedDays)
  const missed = new Set(student.missedDays)
  let value = 0
  let d = student.currentDay
  while (d >= 1 && completed.has(d)) {
    value++
    d--
  }
  if (d >= 1 && missed.has(d)) {
    // streak broke at d; achievements reflect banked consecutive completions
    return value
  }
  return value
}

export type DayState = 'completed' | 'today' | 'missed' | 'future'

export function dayState(day: number, student: Pick<Student, 'currentDay' | 'completedDays' | 'missedDays'>): DayState {
  if (student.completedDays.includes(day)) return 'completed'
  if (student.missedDays.includes(day)) return 'missed'
  if (day === student.currentDay) return 'today'
  return 'future'
}
