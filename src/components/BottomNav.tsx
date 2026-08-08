import { NavLink } from 'react-router-dom'
import { Home, Trophy } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Challenges', icon: Trophy, end: false },
]

export function BottomNav() {
  const { hasNewChallenge } = useApp()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-content items-stretch px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] pt-2">
        {ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              data-testid={item.to === '/dashboard' ? 'nav-challenges' : 'nav-home'}
              className="group relative flex h-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-ash transition-colors duration-200 hover:text-white"
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon
                      className={`h-[22px] w-[22px] transition-colors duration-200 ${
                        isActive ? 'text-orange' : 'group-hover:text-white'
                      }`}
                      strokeWidth={isActive ? 2.4 : 2}
                      aria-hidden
                    />
                    {item.to === '/dashboard' && hasNewChallenge && (
                      <span
                        data-testid="new-challenge-dot"
                        className="absolute -right-2 -top-1 h-2 w-2 rounded-full bg-orange shadow-[0_0_8px_rgba(255,90,0,0.9)]"
                        aria-hidden
                      />
                    )}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-ash'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -top-2 h-1 w-8 rounded-full bg-orange shadow-[0_0_12px_rgba(255,90,0,0.8)]" aria-hidden />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
