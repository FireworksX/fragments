'use client'
import styles from './styles.module.css'
import Button from '@/app/components/Button'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { FC, useState } from 'react'
import AsideBar, { AsideBarProps } from '@/builder/components/AsideBar'
import BuilderLayers from '@/builder/views/BuilderEditable/widgets/BuilderLayers/BuilderLayers'
import BuilderAssets from '@/builder/views/BuilderEditable/widgets/BuilderAssets/BuilderAssets'
import { BuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/BuilderVariables'

const modes: TabsSelectorItem[] = [
  {
    name: 'layers',
    label: 'Layers'
  },
  {
    name: 'assets',
    label: 'Assets'
  },
  {
    name: 'variables',
    label: 'Variables'
  }
]

interface BuilderSidebarProps extends AsideBarProps {}

const BuilderSidebar: FC<BuilderSidebarProps> = ({ ...asideProps }) => {
  const [mode, setMode] = useState<'layers' | 'assets' | 'variables'>('layers')

  return (
    <AsideBar className={styles.root} {...asideProps}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsSelector}>
          <TabsSelector items={modes} value={mode} onChange={({ name }) => setMode(name)} />
        </div>
      </div>

      <div className={styles.delimiter} />
      {mode === 'layers' && <BuilderLayers />}
      {mode === 'assets' && <BuilderAssets />}
      {mode === 'variables' && <BuilderVariables />}
    </AsideBar>
  )
}

export default BuilderSidebar
