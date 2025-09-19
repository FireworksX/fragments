'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Cell } from '@/shared/ui/Cell'
import SettingsIcon from '@/shared/icons/next/settings-2.svg'
import VariableIcon from '@/shared/icons/next/variable.svg'
import KeyIcon from '@/shared/icons/next/key.svg'
import UsersIcon from '@/shared/icons/next/users.svg'
import { Panel } from '@/shared/ui/Panel'
import { Link } from '@/shared/ui/Link'

interface ProjectSettingsProps extends PropsWithChildren {
  className?: string
}

const pages = [
  {
    label: 'General',
    link: {
      type: 'projectSetting'
    },
    icon: <SettingsIcon />
  },
  {
    label: 'API Keys',
    link: {
      type: 'projectSettingTokens'
    },
    icon: <KeyIcon />
  },
  {
    label: 'Members',
    link: {
      type: 'projectSettingMembers'
    },
    icon: <UsersIcon />
  },
  {
    label: 'Variables',
    link: {
      type: 'projectSettingVariables'
    },
    icon: <VariableIcon />
  }
]

export const ProjectSettingsLayout: FC<ProjectSettingsProps> = ({ className, children }) => {
  return (
    <Container mode='hug' className={cn(styles.root, className)}>
      <div className={styles.aside}>
        <Panel>
          {pages.map(page => (
            <Link {...page.link}>
              {({ isActive }) => (
                <Cell
                  className={cn(styles.cell, { [styles.activeCell]: isActive })}
                  beforeClassName={styles.cellBefore}
                  before={page.icon}
                >
                  {page.label}
                </Cell>
              )}
            </Link>
          ))}
        </Panel>
      </div>
      <div className={styles.content}>{children}</div>
    </Container>
  )
}
