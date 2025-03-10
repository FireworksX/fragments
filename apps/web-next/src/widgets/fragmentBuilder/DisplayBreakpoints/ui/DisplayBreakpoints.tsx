import React, { FC, ReactNode, useContext } from 'react'
// import { Fragment } from '@fragments/render'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { Fragment } from '@fragments/render-react'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { globalManager } = useBuilderDocument()
  const { currentFragmentId } = useBuilder()

  return (
    <div className={cn(styles.root, className)}>
      <Fragment fragmentId={currentFragmentId} context={globalManager} />

      {/*{layers.map((layerKey, index) => (*/}
      {/*  <Frame key={`${layerKey}_${index}`} layerKey={layerKey} />*/}
      {/*))}*/}
    </div>
  )
}

export default DisplayBreakpoints
