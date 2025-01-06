import { FC, useState } from 'react'
import styles from './styles.module.css'
import { ProjectTree } from '@/widgets/fragmentBuilder/ProjectTree'
import { Container } from '@/shared/ui/Container'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { BuilderLayers } from '@/widgets/fragmentBuilder/BuilderLayers'

interface FragmentsBuilderAsideProps {
  className?: string
}

const tabs: TabsSelectorItem = [
  { name: 'project', label: 'Project' },
  { name: 'layers', label: 'Layers' },
  { name: 'assets', label: 'Assets' }
]

export const FragmentsBuilderAside: FC<FragmentsBuilderAsideProps> = ({ className }) => {
  const [mode, setMode] = useState('project')

  return (
    <Container className={styles.root}>
      <TabsSelector className={styles.selector} items={tabs} value={mode} onChange={({ name }) => setMode(name)} />
      <div className={styles.delimiter} />
      {mode === 'project' && <ProjectTree />}
      {mode === 'layers' && <BuilderLayers />}
    </Container>
  )
}
