import React, { FC, ReactNode, useContext } from 'react'
import { Frame as RFrame, Fragment } from '@fragments/renderer-editor'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const { currentFragmentId } = useBuilder()

  return (
    <div className={cn(styles.root, className)}>
      <Fragment fragmentId={currentFragmentId} />

      {/*{layers.map((layerKey, index) => (*/}
      {/*  <Frame key={`${layerKey}_${index}`} layerKey={layerKey} />*/}
      {/*))}*/}
    </div>
  )
}

export default DisplayBreakpoints
