import { FC } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'
import { SpringValue, animated, to } from '@react-spring/web'
import { LinkKey } from '@graph-state/core'
import { useLayerHighlightNode } from '../hooks/useLayerHighlightNode'

interface LayerHighlightDraggingProps {
  layerKey: LinkKey
  className?: string
}

export const LayerHighlightNode: FC<LayerHighlightDraggingProps> = ({ className, layerKey }) => {
  const { layerStyles, children, isHovered, borderWidth } = useLayerHighlightNode(layerKey)

  return (
    <animated.div className={cn(styles.root, className)} style={layerStyles}>
      {isHovered && <animated.div className={styles.mask} style={{ borderWidth }} />}
      {children.map((child, index) => (
        <LayerHighlightNode key={index} layerKey={child} />
      ))}
    </animated.div>
  )
}
