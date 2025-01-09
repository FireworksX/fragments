import { FC, use, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { ProjectTree } from '@/widgets/fragmentBuilder/ProjectTree'
import { Container } from '@/shared/ui/Container'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { BuilderLayers } from '@/widgets/fragmentBuilder/BuilderLayers'
import cn from 'classnames'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface FragmentsBuilderAsideProps {
  className?: string
}

const tabs: TabsSelectorItem = [
  { name: 'project', label: 'Project' },
  { name: 'layers', label: 'Layers' },
  { name: 'assets', label: 'Assets' }
]

export const FragmentsBuilderAside: FC<FragmentsBuilderAsideProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [mode, setMode] = useState('project')

  useEffect(() => {
    if (documentManager) {
      documentManager?.subscribe('Frame:d12bd11e59ee4', v => {
        console.trace('Frame:d12bd11e59ee4', v)
      })
    }
  }, [documentManager])

  return (
    <Container className={styles.root}>
      <TabsSelector className={styles.selector} items={tabs} value={mode} onChange={({ name }) => setMode(name)} />
      <div className={styles.delimiter} />

      <ProjectTree className={cn({ [styles.hidden]: mode !== 'project' })} />
      {!!documentManager && <BuilderLayers className={cn({ [styles.hidden]: mode !== 'layers' })} />}
    </Container>
  )
}
