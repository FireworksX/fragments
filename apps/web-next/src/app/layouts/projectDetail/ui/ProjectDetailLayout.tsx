'use client'
import { Link } from '@/shared/ui/Link/ui/Link'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'
import styles from './styles.module.css'
import { createGlobalManager } from '@fragmentsx/render-core'
import { createFragmentsClient } from '@fragmentsx/client-core'
import { GlobalManager } from '@fragmentsx/render-suite'
import { getSession, useSession } from 'next-auth/react'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { useProject } from '@/shared/hooks/useProject'
import { useProjectSettingsTokens } from '@/views/ProjectSettingsTokens/hooks/useProjectSettingsTokens'

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
      const globalManager = createFragmentsClient({ apiToken: data.accessToken, isSelf: true })
      setGlobalManager(globalManager)
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

      <DndContext sensors={sensors} collisionDetection={pointerWithin}>
        <GlobalManager value={globalManager}>{children}</GlobalManager>
      </DndContext>
    </main>
  )
}
