import { FC, ReactNode, useState } from 'react'
import styles from './styles.module.css'
import AsideBar, { AsideBarProps } from '@/builder/components/AsideBar'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'

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
      {mode === 'variables' && variablesNode}
    </AsideBar>
  )
}

export default BuilderSidebar
