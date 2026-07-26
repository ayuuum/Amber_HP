import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'on-dark'
}

export function PrimaryButton({ href, children, className, variant = 'primary' }: Props) {
  const styles = {
    primary: 'btn-pill-primary-solid',
    secondary: 'btn-pill-secondary',
    outline: 'btn-pill-outline',
    'on-dark': 'btn-pill bg-white text-dark-green hover:bg-white/90',
  } as const

  return (
    <Link href={href} className={cn(styles[variant], 'inline-flex', className)}>
      {children}
    </Link>
  )
}

export function SecondaryButton(props: Omit<Props, 'variant'>) {
  return <PrimaryButton {...props} variant="outline" />
}
