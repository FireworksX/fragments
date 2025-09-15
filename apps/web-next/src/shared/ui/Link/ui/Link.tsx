'use client'
import { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import styles from './styles.module.css'
import { linkConfig, LinkType } from '../lib/linkConfig'
import { useLink } from '@/shared/ui/Link/hooks/useLink'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'

interface LinkProps extends ComponentProps<'a'> {
  className?: string
  type?: LinkType
  partial?: boolean
  children: ReactNode | (({ isActive }: { isActive: boolean }) => ReactNode)
  onClick?: TouchableProps['onClick']
}

export const Link: FC<LinkProps> = ({ className, children, onClick, ...inputLinkData }) => {
  const { href, isActive } = useLink(inputLinkData)

  if (isActive || !href) {
    return (
      <Touchable TagName='div' className={cn(styles.root, className)} onClick={onClick}>
        {typeof children === 'function' ? children({ isActive }) : children}
      </Touchable>
    )
  }

  return (
    <NextLink className={cn(styles.root, className)} href={href} onClick={onClick} target={inputLinkData.target}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </NextLink>
  )
}
