import { ElementRef, FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'
import { SELECTION_SIDES } from '@/builder/LayerHighlight/hooks/useLayerHighlightSelect'

interface LayerHighlightSelectProps {
  dragHandler: (target: string) => unknown
  style: {
    x: SpringValue<number>
    y: SpringValue<number>
    width: SpringValue<number>
    height: SpringValue<number>
  }
  className?: string
}

const CORNER_SIZE = 4

export const LayerHighlightSelect: FC<LayerHighlightSelectProps> = ({ className, style, dragHandler }) => {
  const toW = to(style.width, v => v - 4)
  const toH = to(style.height, v => v - 4)

  return (
    <animated.div className={cn(styles.root, className)} style={style} data-testid='LayerHightlightSelect'>
      <animated.div
        {...dragHandler([SELECTION_SIDES.top])}
        style={{ y: -4, width: style.width }}
        className={styles.sideVertical}
      />
      <animated.div
        {...dragHandler([SELECTION_SIDES.right])}
        style={{ x: toW, height: style.height }}
        className={styles.sideHorizontal}
      />
      <animated.div
        {...dragHandler([SELECTION_SIDES.bottom])}
        style={{ y: toH, width: style.width }}
        className={styles.sideVertical}
      />
      <animated.div
        {...dragHandler([SELECTION_SIDES.left])}
        style={{ x: -4, height: style.height }}
        className={styles.sideHorizontal}
      />

      <animated.div
        {...dragHandler([SELECTION_SIDES.top, SELECTION_SIDES.right])}
        style={{ x: to(style.width, v => v - CORNER_SIZE), y: -CORNER_SIZE }}
        className={cn(styles.corner, styles.cornerRight)}
      />

      <animated.div
        {...dragHandler([SELECTION_SIDES.bottom, SELECTION_SIDES.right])}
        style={{ x: to(style.width, v => v - CORNER_SIZE), y: to(style.height, v => v - CORNER_SIZE) }}
        className={cn(styles.corner, styles.cornerLeft)}
      />

      <animated.div
        {...dragHandler([SELECTION_SIDES.bottom, SELECTION_SIDES.left])}
        style={{ x: -CORNER_SIZE, y: to(style.height, v => v - CORNER_SIZE) }}
        className={cn(styles.corner, styles.cornerRight)}
      />

      <animated.div
        {...dragHandler([SELECTION_SIDES.top, SELECTION_SIDES.left])}
        style={{ x: -CORNER_SIZE, y: -CORNER_SIZE }}
        className={cn(styles.corner, styles.cornerLeft)}
      />
    </animated.div>
  )
}
