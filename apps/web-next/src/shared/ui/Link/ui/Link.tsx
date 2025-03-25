'use client'
import { FC, PropsWithChildren, ReactNode } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import styles from './styles.module.css'
import { linkConfig, LinkType } from '../lib/linkConfig'
import { useLink } from '@/shared/ui/Link/hooks/useLink'

interface LinkProps {
  className?: string
  type: LinkType
  partial?: boolean
  children: ReactNode | (({ isActive }: { isActive: boolean }) => ReactNode)
}

export const Link: FC<LinkProps> = ({ className, children, ...inputLinkData }) => {
  const { href, isActive } = useLink(inputLinkData)

  if (isActive || !href) {
    return (
      <div className={cn(styles.root, className)}>
        {typeof children === 'function' ? children({ isActive }) : children}
      </div>
    )
  }

  return (
    <NextLink className={cn(styles.root, className)} href={href}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </NextLink>
  )
}
