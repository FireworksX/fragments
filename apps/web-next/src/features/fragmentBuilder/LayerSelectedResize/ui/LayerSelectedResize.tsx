import cn from 'classnames'
import { animated, to } from '@react-spring/web'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import styles from './styles.module.css'
import { SELECTION_SIDES, useLayerSelectedResize } from '../hooks/useLayerSelectedResize'

export const LayerSelectedResize = () => {
  const { handler, allowResizeVertical, allowResizeHorizontal } = useLayerSelectedResize()

  return (
    <div className={styles.root}>
      <AnimatedVisible visible={allowResizeVertical}>
        {allowResizeVertical && (
          <animated.div {...handler([SELECTION_SIDES.top])} className={cn(styles.sideVertical, styles.top)} />
        )}
      </AnimatedVisible>
      <AnimatedVisible visible={allowResizeHorizontal}>
        <animated.div {...handler([SELECTION_SIDES.right])} className={cn(styles.sideHorizontal, styles.right)} />
      </AnimatedVisible>
      <AnimatedVisible visible={allowResizeVertical}>
        {allowResizeVertical && (
          <animated.div {...handler([SELECTION_SIDES.bottom])} className={cn(styles.sideVertical, styles.bottom)} />
        )}
      </AnimatedVisible>
      <AnimatedVisible visible={allowResizeHorizontal}>
        <animated.div {...handler([SELECTION_SIDES.left])} className={cn(styles.sideHorizontal, styles.left)} />
      </AnimatedVisible>

      <AnimatedVisible visible={to([allowResizeHorizontal, allowResizeVertical], (a, b) => a && b)}>
        <animated.div
          {...handler([SELECTION_SIDES.top, SELECTION_SIDES.right])}
          className={cn(styles.corner, styles.cornerHalfRight, styles.topRight)}
        />

        <animated.div
          {...handler([SELECTION_SIDES.bottom, SELECTION_SIDES.right])}
          className={cn(styles.corner, styles.cornerHalfLeft, styles.bottomRight)}
        />

        <animated.div
          {...handler([SELECTION_SIDES.bottom, SELECTION_SIDES.left])}
          className={cn(styles.corner, styles.cornerHalfRight, styles.bottomLeft)}
        />

        <animated.div
          {...handler([SELECTION_SIDES.top, SELECTION_SIDES.left])}
          className={cn(styles.corner, styles.cornerHalfLeft, styles.topLeft)}
        />
      </AnimatedVisible>

      <AnimatedVisible visible={to([allowResizeHorizontal, allowResizeVertical], (a, b) => a && !b)}>
        <animated.div
          {...handler([SELECTION_SIDES.left])}
          className={cn(styles.corner, styles.cornerHorizontal, styles.left, styles.verticalMiddle)}
        />
        <animated.div
          {...handler([SELECTION_SIDES.right])}
          className={cn(styles.corner, styles.cornerHorizontal, styles.right, styles.verticalMiddle)}
        />
      </AnimatedVisible>

      <AnimatedVisible visible={to([allowResizeHorizontal, allowResizeVertical], (a, b) => !a && b)}>
        <animated.div
          {...handler([SELECTION_SIDES.top])}
          className={cn(styles.corner, styles.cornerVertical, styles.top, styles.horizontalMiddle)}
        />

        <animated.div
          {...handler([SELECTION_SIDES.bottom])}
          className={cn(styles.corner, styles.cornerVertical, styles.bottom, styles.horizontalMiddle)}
        />
      </AnimatedVisible>
    </div>
  )
}
