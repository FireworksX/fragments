'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Cell } from '@/shared/ui/Cell'
import SegmentIcon from '@/shared/icons/next/fingerprint.svg'
import KeyIcon from '@/shared/icons/next/key.svg'
import UsersIcon from '@/shared/icons/next/users.svg'
import { Panel } from '@/shared/ui/Panel'
import { Link } from '@/shared/ui/Link'
import { CellBadge } from '@/shared/ui/Cell/components/CellBadge'

interface UsersLayoutProps extends PropsWithChildren {
  className?: string
}

export const UsersLayout: FC<UsersLayoutProps> = ({ className, children }) => {
  return (
    <Container mode='hug' className={cn(styles.root, className)}>
      <div className={styles.aside}>
        <Panel>
          <Link type='projectSetting'>
            {({ isActive }) => (
              <Cell
                className={cn(styles.cell, { [styles.activeCell]: isActive })}
                before={<UsersIcon width={14} height={14} />}
              >
                Users <CellBadge>4291</CellBadge>
              </Cell>
            )}
          </Link>
          <Link type='projectSettingTokens'>
            {({ isActive }) => (
              <Cell
                className={cn(styles.cell, { [styles.activeCell]: isActive })}
                before={<SegmentIcon width={14} height={14} />}
              >
                Segments <CellBadge>13</CellBadge>
              </Cell>
            )}
          </Link>
        </Panel>
      </div>
      <div className={styles.content}>{children}</div>
    </Container>
  )
}
