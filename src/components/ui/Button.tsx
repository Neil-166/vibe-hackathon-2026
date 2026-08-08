import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'success'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonBaseProps {
  variant?: Variant
  size?: Size
  loading?: boolean
  children?: ReactNode
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold select-none ' +
  'transition-[background-color,transform,box-shadow,opacity] duration-200 active:scale-[0.98] ' +
  'disabled:opacity-40 disabled:pointer-events-none cursor-pointer whitespace-nowrap'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-orange text-white shadow-glow-orange-sm hover:bg-orange-soft',
  secondary: 'bg-white/[0.06] text-white border border-line hover:bg-white/[0.11]',
  ghost: 'text-smoke hover:text-white hover:bg-white/[0.06]',
  success: 'bg-emerald-500 text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:bg-emerald-400',
}

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-14 px-6 text-base',
}

function inner(props: { loading?: boolean; children?: ReactNode }) {
  if (props.loading) {
    return (
      <>
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {props.children}
      </>
    )
  }
  return props.children
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {}

export function Button({ variant = 'primary', size = 'md', loading, children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} disabled={rest.disabled || loading} {...rest}>
      {inner({ loading, children })}
    </button>
  )
}

interface ButtonLinkProps {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  'aria-label'?: string
}

export function ButtonLink({ to, variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to} className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {children}
    </Link>
  )
}
