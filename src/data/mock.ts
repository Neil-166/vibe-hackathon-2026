import type { Student } from '../lib/streak'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ABTalks mock data
 *  ─────────────────────────────────────────────────────────────────────────
 *  Everything is local and easy to edit. Change a few values below to explore
 *  the edge-case states the app supports:
 *
 *  • First day   → currentDay: 1, completedDays: []
 *  • Missed day  → add the day to missedDays (e.g. [11]) so today becomes
 *                  "DAY 12 · streak froze"
 *  • Empty name  → name: ''  (UI falls back to "Builder")
 * ─────────────────────────────────────────────────────────────────────────
 */

export const DEFAULT_STUDENT: Student = {
  name: 'Umar',
  track: 'Full Stack Development',
  currentDay: 12,
  totalDays: 60,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  missedDays: [],
}

export interface ProofFile {
  fileName: string
  size: number
  uploadedAt: number
}

export type ProofType = 'github' | 'linkedin'

export interface DayProofs {
  github?: ProofFile
  linkedin?: ProofFile
}

export type ProofsByDay = Record<number, DayProofs>

export interface Challenge {
  day: number
  title: string
  tagline: string
  goal: string
  requirements: string[]
  bonus: string[]
  checklist: string[]
}

const buildChallenge = (day: number): Challenge => ({
  day,
  title: 'Build a Smart Expense Tracker',
  tagline: 'Track. Categorize. Understand your money.',
  goal: 'Build a responsive expense tracker that lets users add, categorize and review their daily spending in a clean, mobile-first interface.',
  requirements: [
    'Add an expense with an amount, title and category',
    'Show total spending and a live running balance',
    'Display a scrollable transaction history',
    'Make the whole UI responsive and tappable on mobile',
    'Deploy it so anyone can open the live URL',
  ],
  bonus: [
    'Add a simple category breakdown chart',
    'Filter transactions by category and date',
    'Persist data with localStorage',
  ],
  checklist: [
    'Read today’s challenge and requirements',
    'Build the feature for real',
    'Commit and push your work to GitHub',
    'Publish a LinkedIn post documenting the build',
    'Upload both proofs to complete Day ' + day,
  ],
})

/**
 * Challenge content is keyed by day. A generic generator covers any day
 * (including /day/13 onward) so no route ever 404s.
 */
export function getChallenge(day: number): Challenge {
  const special: Record<number, Challenge> = {
    12: buildChallenge(12),
    13: {
      day: 13,
      title: 'Build a Task Manager CLI',
      tagline: 'Ship a terminal tool that gets things done.',
      goal: 'Build a command-line task manager that can add, list, complete and remove tasks from the terminal — then document it for recruiters.',
      requirements: [
        'Create a CLI that runs from the terminal',
        'Support adding, listing, completing and deleting tasks',
        'Persist tasks to a local JSON file',
        'Write a short README with usage examples',
      ],
      bonus: [
        'Add due dates and priority levels',
        'Print a weekly summary report',
      ],
      checklist: [
        'Read today’s challenge and requirements',
        'Build the feature for real',
        'Commit and push your work to GitHub',
        'Publish a LinkedIn post documenting the build',
        'Upload both proofs to complete Day ' + 13,
      ],
    },
  }
  return special[day] ?? buildChallenge(day)
}

export interface AchievementDef {
  id: string
  title: string
  league: string | null
  streak: number
}

/** Achievements + leagues. 15-day sits between leagues as a milestone. */
export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'bronze', title: '10 Day Streak', league: 'Bronze', streak: 10 },
  { id: 'milestone-15', title: '15 Day Streak', league: null, streak: 15 },
  { id: 'silver', title: '25 Day Streak', league: 'Silver', streak: 25 },
  { id: 'gold', title: '50 Day Streak', league: 'Gold', streak: 50 },
  { id: 'diamond', title: '60 Day Streak', league: 'Diamond', streak: 60 },
]

export interface LeagueDef {
  name: string
  streak: number
  blurb: string
}

export const LEAGUES: LeagueDef[] = [
  { name: 'Bronze', streak: 10, blurb: 'First real proof' },
  { name: 'Silver', streak: 25, blurb: 'Consistency forming' },
  { name: 'Gold', streak: 50, blurb: 'Unstoppable' },
  { name: 'Diamond', streak: 60, blurb: 'Legendary' },
]

export const MILESTONES = [
  { day: 1, label: 'Day 01', note: 'Start' },
  { day: 10, label: 'Day 10', note: 'Bronze' },
  { day: 25, label: 'Day 25', note: 'Silver' },
  { day: 50, label: 'Day 50', note: 'Gold' },
  { day: 60, label: 'Day 60', note: 'Diamond' },
]
