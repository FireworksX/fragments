'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Cell } from '@/shared/ui/Cell'
import SettingsIcon from '@/shared/icons/next/settings-2.svg'
import KeyIcon from '@/shared/icons/next/key.svg'
import UsersIcon from '@/shared/icons/next/users.svg'
import { Panel } from '@/shared/ui/Panel'
import { Link } from '@/shared/ui/Link'

interface ProjectSettingsProps extends PropsWithChildren {
  className?: string
}

export const ProjectSettingsLayout: FC<ProjectSettingsProps> = ({ className, children }) => {
  return (
    <Container mode='hug' className={cn(styles.root, className)}>
      <div className={styles.aside}>
        <Panel>
          <Link type='projectSetting'>
            {({ isActive }) => (
              <Cell className={cn(styles.cell, { [styles.activeCell]: isActive })} before={<SettingsIcon />}>
                General
              </Cell>
            )}
          </Link>
          <Link type='projectSettingTokens'>
            {({ isActive }) => (
              <Cell className={cn(styles.cell, { [styles.activeCell]: isActive })} before={<KeyIcon />}>
                API Keys
              </Cell>
            )}
          </Link>
          <Cell className={cn(styles.cell, { [styles.activeCell]: false })} before={<UsersIcon />}>
            Team
          </Cell>
        </Panel>
      </div>
      <div className={styles.content}>{children}</div>
    </Container>
  )
}
