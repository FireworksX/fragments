import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import TreeViewer from '@/builder/TreeViewer/TreeViewer'

interface BuilderLayersProps {
  className?: string
}

const Layers: FC<BuilderLayersProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { mode, focus } = useBuilderManager()
  // const [{ view, focusComponent }] = useGraph(graphState)
  // const statex = useStore($statex)
  // const { openLayerField } = useStore($layers)
  // const builderView = useStore($builderView)

  return (
    <div className={cn(styles.root, className)}>
      <TreeViewer rootLayerKey={documentManager.root} />
    </div>
  )
}

export default Layers
