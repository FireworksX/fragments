'use client'
import { Link } from '@/shared/ui/Link/ui/Link'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'
import styles from './styles.module.css'
import { createFragmentsClient } from '@fragmentsx/client-core'
import { GlobalManager } from '@fragmentsx/render-suite'
import { getSession, useSession } from 'next-auth/react'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { useProject } from '@/shared/hooks/useProject'
import { useProjectSettingsTokens } from '@/views/ProjectSettingsTokens/hooks/useProjectSettingsTokens'
import FragmentsIcon from '@/shared/icons/next/component.svg'
import OverviewIcon from '@/shared/icons/next/house.svg'
import AreasIcon from '@/shared/icons/next/scan.svg'
import GoalsIcon from '@/shared/icons/next/circle-dot.svg'
import UsersIcon from '@/shared/icons/next/users.svg'
import SettingsIcon from '@/shared/icons/next/settings-2.svg'
import { Container } from '@/shared/ui/Container'
import historyPlugin from '../historyPlugin'
// import historyPlugin from '@graph-state/plugin-history'

export const ProjectDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession()
  // const { privateKey } = useProjectSettingsTokens()
  const [globalManager, setGlobalManager] = useState()
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 7
      }
    })
  )

  useEffect(() => {
    if (data && !globalManager) {
      const isDev = process.env.NODE_ENV === 'development'
      const globalManager = createFragmentsClient({
        apiToken: data.accessToken,
        isSelf: true,
        backendEndpoint: isDev ? 'http://localhost/graphql' : '/graphql',
        fragmentPlugins: [historyPlugin()]
      })
      setGlobalManager(globalManager)
      window.globalManager = globalManager
    }
  }, [data])

  return (
    <main>
      <Tabs className={styles.tabs}>
        {/*<Link type='project'>*/}
        {/*  {({ isActive }) => (*/}
        {/*    <TabItem className={styles.tab} icon={<OverviewIcon />} isActive={isActive}>*/}
        {/*      Overview*/}
        {/*    </TabItem>*/}
        {/*  )}*/}
        {/*</Link>*/}
        <Link partial type='areas'>
          {({ isActive }) => (
            <TabItem className={styles.tab} icon={<AreasIcon />} isActive={isActive}>
              Areas
            </TabItem>
          )}
        </Link>

        <Link partial type='builder'>
          {({ isActive }) => (
            <TabItem className={styles.tab} icon={<FragmentsIcon />} isActive={isActive}>
              Fragments
            </TabItem>
          )}
        </Link>

        <Link partial type='goals'>
          {({ isActive }) => (
            <TabItem className={styles.tab} icon={<GoalsIcon />} isActive={isActive}>
              Goals
            </TabItem>
          )}
        </Link>
        <Link partial type='users'>
          {({ isActive }) => (
            <TabItem className={styles.tab} icon={<UsersIcon />} isActive={isActive}>
              Users
            </TabItem>
          )}
        </Link>
        <Link partial type='projectSetting'>
          {({ isActive }) => (
            <TabItem className={styles.tab} icon={<SettingsIcon />} isActive={isActive}>
              Settings
            </TabItem>
          )}
        </Link>
      </Tabs>

      <DndContext sensors={sensors} collisionDetection={pointerWithin}>
        <GlobalManager.Provider value={globalManager}>{children}</GlobalManager.Provider>
      </DndContext>
    </main>
  )
}
