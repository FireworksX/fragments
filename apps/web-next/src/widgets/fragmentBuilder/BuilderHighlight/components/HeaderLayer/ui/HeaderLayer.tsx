import { FC, use, useContext, useMemo } from 'react'
import cn from 'classnames'
import { SpringValue, animated } from '@react-spring/web'
import { LinkKey } from '@graph-state/core'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { definition } from '@fragments/definition'
import { HeaderLayerTop } from '@/widgets/fragmentBuilder/BuilderHighlight/components/HeaderLayer/components/HeaderLayerTop'
import { toPx } from '@/shared/utils/toPx'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { SCALE } from '@/widgets/fragmentBuilder/BuilderCanvas/hooks/useCanvasDrag'

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
  const { layer, type, isRootLayer, isBreakpoint } = useLayerInfo(layerKey)
  const isTopNode = !!(isRootLayer || isBreakpoint) && type === definition.nodes.Frame
  const { canvas } = useBuilderCanvas()

  const size = canvas.scale.to([SCALE.min, SCALE.max], [15, 6])

  if (isTopNode) {
    return <HeaderLayerTop layerKey={layerKey} />
  }

  return (
    <animated.div
      className={cn(styles.root, className)}
      style={{ fontSize: size.to(toPx), top: size.to(v => v * -1 - 7) }}
    >
      {layer?.name}
    </animated.div>
  )
}

export default HeaderLayer
