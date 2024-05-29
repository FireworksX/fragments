import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import TreeViewer from '@/app/builder/widgets/Builder/widgets/TreeViewer/TreeViewer'

interface BuilderLayersProps {
  className?: string
}

const Layers: FC<BuilderLayersProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const [{ view }] = useGraph(graphState, graphState.builderLink)
  // const statex = useStore($statex)
  // const { openLayerField } = useStore($layers)
  // const builderView = useStore($builderView)

  return (
    <div className={cn(styles.root, className)}>
      <TreeViewer rootLayerKey={view === 'default' ? graphState.root : ''} />
    </div>
  )
}

export default Layers
