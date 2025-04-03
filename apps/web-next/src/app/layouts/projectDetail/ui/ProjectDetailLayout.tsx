'use client'
import { Link } from '@/shared/ui/Link/ui/Link'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'
import styles from './styles.module.css'
import { createGlobalManager } from '@fragments/render-core'
import { GlobalManager } from '@fragments/render-react'
import isBrowser from '@/shared/utils/isBrowser'
import { getSession, useSession } from 'next-auth/react'

export const ProjectDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession()
  const [globalManager, setGlobalManager] = useState()

  useEffect(() => {
    if (data && !globalManager) {
      setGlobalManager(createGlobalManager({ apiToken: data.accessToken, isSelf: true }))
      window.globalManager = globalManager
    }
  }, [data])

  return (
    <main>
      <Tabs className={styles.tabs}>
        <Link type='project'>
          {({ isActive }) => (
            <TabItem className={styles.tab} isActive={isActive}>
              Overview
            </TabItem>
          )}
        </Link>
        <Link partial type='builder'>
          {({ isActive }) => (
            <TabItem className={styles.tab} isActive={isActive}>
              Builder
            </TabItem>
          )}
        </Link>
        <Link partial type='campaignsList'>
          {({ isActive }) => (
            <TabItem className={styles.tab} isActive={isActive}>
              Campaigns
            </TabItem>
          )}
        </Link>
        <Link partial type='projectSetting'>
          {({ isActive }) => (
            <TabItem className={styles.tab} isActive={isActive}>
              Settings
            </TabItem>
          )}
        </Link>
      </Tabs>

      <GlobalManager value={globalManager}>{children}</GlobalManager>
    </main>
  )
}
