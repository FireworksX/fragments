import React, { FC, ReactNode, useContext } from 'react'
import { Frame as RFrame, Fragment } from '@fragments/renderer-editor'
import cn from 'classnames'
import styles from './styles.module.css'
import { Frame } from '@/widgets/renderer/Frame'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { createState } from '@graph-state/core'
import { isBrowser } from '@fragments/utils'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { layers } = useFragmentLayers()
  const { documentManager } = useBuilderDocument()

  return (
    <div className={cn(styles.root, className)}>
      <Fragment manager={documentManager} layerKey={documentManager.$fragment.root} />
      {/*{layers.map((layerKey, index) => (*/}
      {/*  <Frame key={`${layerKey}_${index}`} layerKey={layerKey} />*/}
      {/*))}*/}
    </div>
  )
}

export default DisplayBreakpoints
