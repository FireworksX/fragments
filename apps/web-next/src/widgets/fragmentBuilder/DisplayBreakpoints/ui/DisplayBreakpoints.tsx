import React, { cloneElement, FC, PropsWithChildren, ReactNode, useContext } from 'react'
// import { Fragment } from '@fragments/render'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { CustomRender, Fragment } from '@fragmentsx/render-suite'
import { useDroppable } from '@dnd-kit/core'
import { droppableAreas } from '@/shared/data'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const WithDroppable: FC<PropsWithChildren> = ({ children, layerKey }) => {
  const { setNodeRef } = useDroppable({
    id: `${droppableAreas.builderCanvas}_${layerKey}`,
    data: { area: droppableAreas.builderCanvasNode, layerKey }
  })

  return cloneElement(children, {
    ...children.props,
    ref: ref => {
      setNodeRef(ref)
    }
  })
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { currentFragmentId } = useBuilder()

  return (
    <div className={cn(styles.root, className)}>
      <CustomRender
        value={(layerKey, Node) => {
          return <WithDroppable layerKey={layerKey}>{Node}</WithDroppable>
        }}
      >
        <Fragment fragmentId={currentFragmentId} />
      </CustomRender>

      {/*{layers.map((layerKey, index) => (*/}
      {/*  <Frame key={`${layerKey}_${index}`} layerKey={layerKey} />*/}
      {/*))}*/}
    </div>
  )
}

export default DisplayBreakpoints
