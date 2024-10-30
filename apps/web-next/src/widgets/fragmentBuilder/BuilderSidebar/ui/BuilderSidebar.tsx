import { FC, ReactNode, useState } from 'react'
import styles from './styles.module.css'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { AsideBar, AsideBarProps } from '@/shared/ui/AsideBar'

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

interface BuilderSidebarProps extends AsideBarProps {
  layersNode?: ReactNode
  assetsNode?: ReactNode
  variablesNode?: ReactNode
}

const BuilderSidebar: FC<BuilderSidebarProps> = ({ layersNode, assetsNode, variablesNode, ...asideProps }) => {
  const [mode, setMode] = useState<'layers' | 'assets' | 'variables'>('layers')

  return (
    <AsideBar className={styles.root} {...asideProps}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsSelector}>
          <TabsSelector items={modes} value={mode} onChange={({ name }) => setMode(name)} />
        </div>
      </div>

      <div className={styles.delimiter} />
      {mode === 'layers' && layersNode}
      {mode === 'assets' && assetsNode}
    </AsideBar>
  )
}

export default BuilderSidebar
