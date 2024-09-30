import { FC, PropsWithChildren } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import styles from './styles.module.css'
import { linkConfig, LinkType } from '@/app/widgets/Link/linkConfig'

interface LinkProps extends PropsWithChildren {
  className?: string
  type: LinkType
}

export const Link: FC<LinkProps> = ({ className, type, children, ...linkParams }) => {
  const link = linkConfig[type]
  const href = typeof link === 'function' ? link(linkParams) : link

  return (
    <NextLink className={cn(styles.root, className)} href={href}>
      {children}
    </NextLink>
  )
}
