'use client'
import styles from './styles.module.css'
import Button from '@/app/components/Button'
import TabsSelector from '@/app/components/TabsSelector'
import { TabsSelectorItem } from '@adstore/web/src/components/TabsSelector/TabsSelector'
import { useState } from 'react'
import Assets from '@/app/builder/widgets/Builder/widgets/Assets/Assets'
import Layers from '@/app/builder/widgets/Builder/widgets/Layers/Layers'

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

const LeftBar = () => {
  const [mode, setMode] = useState<'layers' | 'assets'>('layers')

  return (
    <div className={styles.root}>
      <div className={styles.tabsWrapper}>
        <Button mode='secondary'>Back</Button>
        <div className={styles.tabsSelector}>
          <TabsSelector items={modes} value={mode} onChange={({ name }) => setMode(name)} />
        </div>
      </div>

      <div className={styles.delimiter} />
      {mode === 'layers' && <Layers />}
      {mode === 'assets' && <Assets />}
    </div>
  )
}

export default LeftBar
