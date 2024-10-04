import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'
import { useHighlightDragging } from '@/features/fragmentBuilder/LayerHighlightDragging/hooks/useHighlightDragging'

interface LayerHighlightDraggingProps {
  className?: string
}

export const LayerHighlightDragging: FC<LayerHighlightDraggingProps> = ({ className }) => {
  const { draggingParentStyles, draggingTargetStyles } = useHighlightDragging()

  return (
    <>
      <animated.div
        className={cn(styles.root, className)}
        style={draggingTargetStyles}
        data-testid='LayerHightlightDragging'
      />
      <animated.div
        className={cn(styles.root, className)}
        style={draggingParentStyles}
        data-testid='LayerHightlightDragging'
      />
    </>
  )
}
