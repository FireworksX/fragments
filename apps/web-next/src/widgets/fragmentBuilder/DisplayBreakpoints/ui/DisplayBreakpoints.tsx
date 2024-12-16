import React, { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Frame } from '@/widgets/renderer/Frame/Frame'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'

interface BuilderDisplayBreakpointsProps {
  className?: string
}

const DisplayBreakpoints: FC<BuilderDisplayBreakpointsProps> = ({ className }) => {
  const { layers } = useFragmentLayers()

  return (
    <div className={cn(styles.root, className)}>
      {layers.map((layerKey, index) => (
        <Frame key={`${layerKey}_${index}`} layerKey={layerKey} />
      ))}
    </div>
  )
}

export default DisplayBreakpoints
