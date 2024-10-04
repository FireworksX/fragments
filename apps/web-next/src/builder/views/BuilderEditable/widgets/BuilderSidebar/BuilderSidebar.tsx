import styles from './styles.module.css'
import { FC, ReactNode, useState } from 'react'
import AsideBar, { AsideBarProps } from '@/builder/components/AsideBar'
import BuilderAssets from '@/builder/views/BuilderEditable/widgets/BuilderAssets/BuilderAssets'
import { BuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/BuilderVariables'
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
}

const BuilderSidebar: FC<BuilderSidebarProps> = ({ layersNode, ...asideProps }) => {
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
      {mode === 'assets' && <BuilderAssets />}
      {mode === 'variables' && <BuilderVariables />}
    </AsideBar>
  )
}

export default BuilderSidebar
