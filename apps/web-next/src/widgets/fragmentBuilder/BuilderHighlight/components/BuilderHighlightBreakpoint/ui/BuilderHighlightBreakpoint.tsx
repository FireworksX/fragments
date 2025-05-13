import { FC } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { LinkKey } from '@graph-state/core'
import { useLayerGeometry } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useLayerGeometry'
import { HeaderLayer } from '@/widgets/fragmentBuilder/BuilderHighlight/components/HeaderLayer'

interface BuilderHighlightBreakpointProps {
  layerKey: LinkKey
  className?: string
}

export const BuilderHighlightBreakpoint: FC<BuilderHighlightBreakpointProps> = ({ className, layerKey }) => {
  const { top, left, width } = useLayerGeometry(layerKey)

  return (
    <animated.div data-highlight='breakpoint' style={{ position: 'absolute', x: left, y: top.to(v => v - 40), width }}>
      <HeaderLayer layerKey={layerKey} />
    </animated.div>
  )
}
