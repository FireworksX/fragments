'use client'
import { Link } from '@/shared/ui/Link/ui/Link'
import { FC, PropsWithChildren } from 'react'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'
import styles from './styles.module.css'
import { createGlobalManager } from '@fragments/render-core'
import { GlobalManager } from '@fragments/render-react'
import isBrowser from '@/shared/utils/isBrowser'

const globalManager = createGlobalManager()

if (isBrowser) {
  window.globalManager = globalManager
}

export const ProjectDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Tabs className={styles.tabs}>
        <Link type='project'>{({ isActive }) => <TabItem isActive={isActive}>Overview</TabItem>}</Link>
        <Link partial type='builder'>
          {({ isActive }) => <TabItem isActive={isActive}>Builder</TabItem>}
        </Link>
        <Link partial type='campaignsList'>
          {({ isActive }) => <TabItem isActive={isActive}>Campaigns</TabItem>}
        </Link>
        <Link partial type='projectSetting'>
          {({ isActive }) => <TabItem isActive={isActive}>Settings</TabItem>}
        </Link>
      </Tabs>

      <GlobalManager value={globalManager}>{children}</GlobalManager>
    </main>
  )
}
