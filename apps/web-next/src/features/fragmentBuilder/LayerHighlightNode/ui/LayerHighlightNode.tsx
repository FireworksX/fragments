import { FC, ReactNode } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'
import { SpringValue, animated, to } from '@react-spring/web'
import { LinkKey } from '@graph-state/core'
import { useLayerHighlightNode } from '../hooks/useLayerHighlightNode'

interface LayerHighlightDraggingProps {
  resizeNode: ReactNode
  layerKey: LinkKey
  className?: string
}

export const LayerHighlightNode: FC<LayerHighlightDraggingProps> = ({ className, layerKey, resizeNode }) => {
  const { layerStyles, children, isHovered, isSelected, isDragging, borderWidth, isParentSelected } =
    useLayerHighlightNode(layerKey)

  return (
    <animated.div className={cn(styles.root, className)} style={layerStyles}>
      {(isHovered || isSelected || isParentSelected) && (
        <animated.div
          data-testid='highlight'
          className={cn(styles.mask, { [styles.dashed]: isParentSelected && !isDragging })}
          style={{ borderWidth }}
        >
          {isSelected && resizeNode}
        </animated.div>
      )}

      {children.map((child, index) => (
        <LayerHighlightNode key={index} layerKey={child} resizeNode={resizeNode} />
      ))}
    </animated.div>
  )
}
