import { FC, PropsWithChildren, ReactNode } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import styles from './styles.module.css'
import { linkConfig, LinkType } from '../lib/linkConfig'
import { usePathname } from 'next/navigation'

interface LinkProps {
  className?: string
  type: LinkType
  children: ReactNode | (({ isActive }: { isActive: boolean }) => ReactNode)
}

export const Link: FC<LinkProps> = ({ className, type, children, ...linkParams }) => {
  const link = linkConfig[type]
  const href = typeof link === 'function' ? link(linkParams) : link
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <NextLink className={cn(styles.root, className)} href={href}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </NextLink>
  )
}
