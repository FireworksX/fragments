import { FC, use, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { BuilderLayers } from '@/widgets/fragmentBuilder/BuilderLayers'
import cn from 'classnames'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { ProjectAssets } from '@/widgets/fragmentBuilder/ProjectAssets'
import { ProjectTree } from '@/widgets/ProjectTree'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

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
  const { openFragment } = useBuilder()

  return (
    <Container className={styles.root}>
      <TabsSelector className={styles.selector} items={tabs} value={mode} onChange={({ name }) => setMode(name)} />
      <div className={styles.delimiter} />

      <ProjectTree className={cn({ [styles.hidden]: mode !== 'project' })} onClick={fg => openFragment(fg.id)} />
      {!!documentManager && <BuilderLayers className={cn({ [styles.hidden]: mode !== 'layers' })} />}
      <ProjectAssets className={cn({ [styles.hidden]: mode !== 'assets' })} />
    </Container>
  )
}
