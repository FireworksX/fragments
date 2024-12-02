import { FC, useContext } from 'react'
import cn from 'classnames'
import { SpringValue, animated } from '@react-spring/web'
import { LinkKey } from '@graph-state/core'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { nodes } from '@fragments/plugin-state'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { animatableValue } from '@/shared/utils/animatableValue'

interface HeaderLayerProps {
  className?: string
  layerKey: LinkKey
  name?: string
  width?: number | SpringValue<number>
  activeWidths?: number[]
  onClickBreakpoint?: (name: string, width: number) => void | boolean
  onClickCustom?: () => void
}

const HeaderLayer: FC<HeaderLayerProps> = ({ className, layerKey }) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { breakpointKeys, getThresholdLabel } = useBreakpoints()
  const breakpointLabel = getThresholdLabel((animatableValue(layerNode?.threshold) ?? 0) + 1)

  return (
    <div className={cn(styles.root, className)}>
      {layerNode?.name ?? layerNode?._id}{' '}
      {!!breakpointKeys.length && layerNode._type === nodes.Breakpoint && (
        <>
          <div className={styles.dot} /> {breakpointLabel}
        </>
      )}
    </div>
  )
}

export default HeaderLayer
