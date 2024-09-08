import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'

interface LayerHighlightSelectProps {
  x: SpringValue<number>
  y: SpringValue<number>
  width: SpringValue<number>
  height: SpringValue<number>
  className?: string
}

export const LayerHighlightSelect: FC<LayerHighlightSelectProps> = ({ className, x, y, width, height }) => {
  const toX = to(x, v => v - 4)
  const toY = to(y, v => v - 4)
  const toW = to(width, v => v - 4)
  const toH = to(width, v => v - 4)

  return (
    <animated.div className={cn(styles.root, className)} style={{ width, height }} data-testid='LayerHightlightSelect'>
      <animated.div style={{ y: -4, width }} className={styles.sideTop} />
      <animated.div style={{ x: toW, height }} className={styles.sideRight} />
      <animated.div style={{ y: toH, width }} className={styles.sideBottom} />
      <animated.div style={{ x: -4, height }} className={styles.sideLeft} />
    </animated.div>
  )
}
