import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { getChallenge } from '../data/mock'

export function ChallengeChecklist({ day }: { day: number }) {
  const challenge = getChallenge(day)
  const [checked, setChecked] = useState<boolean[]>(() => challenge.checklist.map(() => false))
  const done = checked.filter(Boolean).length
  const total = challenge.checklist.length

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <section aria-label="Today's checklist" className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-extrabold tracking-tight text-white">Today’s checklist</h3>
        <span className="text-2xs font-bold uppercase tracking-[0.14em] text-ash">
          {done}/{total} done
        </span>
      </div>

      <div className="space-y-2">
        {challenge.checklist.map((item, i) => {
          const isChecked = checked[i]
          return (
            <motion.button
              key={item}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/[0.03]"
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors duration-150 ${
                  isChecked ? 'border-orange bg-orange text-ink' : 'border-line bg-white/[0.04] text-transparent'
                }`}
                aria-hidden
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className={`text-sm transition-colors ${isChecked ? 'text-ash line-through' : 'text-white'}`}>{item}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className="h-full rounded-full bg-orange"
          animate={{ width: `${(done / total) * 100}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden
        />
      </div>
    </section>
  )
}
