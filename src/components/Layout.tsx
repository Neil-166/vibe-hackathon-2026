import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'

interface LayoutProps {
  children: ReactNode
  /** Toggle the bottom navigation (landing page uses it too) */
  nav?: boolean
}

export function Layout({ children, nav = true }: LayoutProps) {
  return (
    <div className="min-h-dvh">
      <div className="relative mx-auto w-full max-w-mobile pb-28 md:max-w-content md:pb-32">{children}</div>
      {nav && <BottomNav />}
    </div>
  )
}
