'use client'
import styles from './styles.module.css'
import Button from '@/app/components/Button'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { FC, useState } from 'react'
import AsideBar, { AsideBarProps } from '@/builder/components/AsideBar'
import Layers from '@/builder/Layers/Layers'
import Assets from '@/builder/Assets/Assets'

const modes: TabsSelectorItem[] = [
  {
    name: 'layers',
    label: 'Layers'
  },
  {
    name: 'assets',
    label: 'Assets'
  }
]

interface SidebarProps extends AsideBarProps {}

const Sidebar: FC<SidebarProps> = ({ ...asideProps }) => {
  const [mode, setMode] = useState<'layers' | 'assets'>('layers')

  return (
    <AsideBar className={styles.root} {...asideProps}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsSelector}>
          <TabsSelector items={modes} value={mode} onChange={({ name }) => setMode(name)} />
        </div>
      </div>

      <div className={styles.delimiter} />
      {/*{mode === 'layers' && <Layers />}*/}
      {mode === 'assets' && <Assets />}
    </AsideBar>
  )
}

export default Sidebar
