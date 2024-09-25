import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'

interface LayerHighlightDraggingProps {
  targetStyle: unknown
  parentStyle: unknown
  className?: string
}

export const LayerHighlightDragging: FC<LayerHighlightDraggingProps> = ({ className, targetStyle, parentStyle }) => {
  return (
    <>
      <animated.div className={cn(styles.root, className)} style={targetStyle} data-testid='LayerHightlightDragging' />
      <animated.div className={cn(styles.root, className)} style={parentStyle} data-testid='LayerHightlightDragging' />
    </>
  )
}
