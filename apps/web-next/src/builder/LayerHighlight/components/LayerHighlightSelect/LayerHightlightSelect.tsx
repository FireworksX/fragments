import { ElementRef, FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'
import { SELECTION_SIDES } from '@/builder/LayerHighlight/hooks/useLayerHighlightSelect'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { animatableValue } from '@/builder/utils/animatableValue'
import { sizing } from '@fragments/plugin-state'

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

const ALLOW_SIZES = [sizing.Fixed, sizing.Relative]

export const LayerHighlightSelect: FC<LayerHighlightSelectProps> = ({ className, style, dragHandler }) => {
  const { selectionGraph } = useBuilderSelection()
  const toW = to(style.width, v => v - 4)
  const toH = to(style.height, v => v - 4)

  const allowResizeHorizontal = selectionGraph?.getAllowResizeHorizontal?.()
  const allowResizeVertical = selectionGraph?.getAllowResizeVertical?.()

  return (
    <animated.div className={cn(styles.root, className)} style={style} data-testid='LayerHightlightSelect'>
      {allowResizeVertical && (
        <animated.div
          {...dragHandler([SELECTION_SIDES.top])}
          style={{ y: -4, width: style.width }}
          className={styles.sideVertical}
        />
      )}
      {allowResizeHorizontal && (
        <animated.div
          {...dragHandler([SELECTION_SIDES.right])}
          style={{ x: toW, height: style.height }}
          className={styles.sideHorizontal}
        />
      )}
      {allowResizeVertical && (
        <animated.div
          {...dragHandler([SELECTION_SIDES.bottom])}
          style={{ y: toH, width: style.width }}
          className={styles.sideVertical}
        />
      )}
      {allowResizeHorizontal && (
        <animated.div
          {...dragHandler([SELECTION_SIDES.left])}
          style={{ x: -4, height: style.height }}
          className={styles.sideHorizontal}
        />
      )}

      {allowResizeHorizontal && allowResizeVertical && (
        <>
          <animated.div
            {...dragHandler([SELECTION_SIDES.top, SELECTION_SIDES.right])}
            style={{ x: to(style.width, v => v - CORNER_SIZE), y: -CORNER_SIZE }}
            className={cn(styles.corner, styles.cornerHalfRight)}
          />

          <animated.div
            {...dragHandler([SELECTION_SIDES.bottom, SELECTION_SIDES.right])}
            style={{ x: to(style.width, v => v - CORNER_SIZE), y: to(style.height, v => v - CORNER_SIZE) }}
            className={cn(styles.corner, styles.cornerHalfLeft)}
          />

          <animated.div
            {...dragHandler([SELECTION_SIDES.bottom, SELECTION_SIDES.left])}
            style={{ x: -CORNER_SIZE, y: to(style.height, v => v - CORNER_SIZE) }}
            className={cn(styles.corner, styles.cornerHalfRight)}
          />

          <animated.div
            {...dragHandler([SELECTION_SIDES.top, SELECTION_SIDES.left])}
            style={{ x: -CORNER_SIZE, y: -CORNER_SIZE }}
            className={cn(styles.corner, styles.cornerHalfLeft)}
          />
        </>
      )}

      {allowResizeHorizontal && !allowResizeVertical && (
        <>
          <animated.div
            {...dragHandler([SELECTION_SIDES.left])}
            style={{ x: -CORNER_SIZE, y: to(style.height, v => v / 2 + CORNER_SIZE / 2) }}
            className={cn(styles.corner, styles.cornerHorizontal)}
          />
          <animated.div
            {...dragHandler([SELECTION_SIDES.right])}
            style={{ x: to(style.width, v => v - CORNER_SIZE), y: to(style.height, v => v / 2 + CORNER_SIZE / 2) }}
            className={cn(styles.corner, styles.cornerHorizontal)}
          />
        </>
      )}

      {!allowResizeHorizontal && allowResizeVertical && (
        <>
          <animated.div
            {...dragHandler([SELECTION_SIDES.top])}
            style={{
              x: to(style.width, v => v / 2 + CORNER_SIZE / 2),
              y: -CORNER_SIZE
            }}
            className={cn(styles.corner, styles.cornerVertical)}
          />

          <animated.div
            {...dragHandler([SELECTION_SIDES.bottom])}
            style={{ x: to(style.width, v => v / 2 + CORNER_SIZE / 2), y: to(style.height, v => v - CORNER_SIZE) }}
            className={cn(styles.corner, styles.cornerVertical)}
          />
        </>
      )}
    </animated.div>
  )
}
