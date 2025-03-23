import { Link } from '@/shared/ui/Link/ui/Link'
import { FC, PropsWithChildren } from 'react'
import { Tabs } from '@/shared/ui/Tabs'
import { TabItem } from '@/shared/ui/TabItem'
import styles from './styles.module.css'

export const ProjectDetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Tabs className={styles.tabs}>
        <Link type='project'>{({ isActive }) => <TabItem isActive={isActive}>Overview</TabItem>}</Link>
        <Link type='builder'>{({ isActive }) => <TabItem isActive={isActive}>Builder</TabItem>}</Link>
        <Link type='campaignsList'>{({ isActive }) => <TabItem isActive={isActive}>Campaigns</TabItem>}</Link>
        <Link partial type='projectSetting'>
          {({ isActive }) => <TabItem isActive={isActive}>Settings</TabItem>}
        </Link>
      </Tabs>

      {children}
    </main>
  )
}
