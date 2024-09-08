import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'

interface LayerHighlightParentProps {
  className?: string
}

export const LayerHighlightParent: FC<LayerHighlightParentProps> = ({ className, ...style }) => {
  return (
    <animated.div className={cn(styles.root, className)} style={style} data-testid='LayerHightlightParent'>
      <animated.svg
        viewBox={to([style.width, style.height], (w, h) => `0 0 ${w} ${h}`)}
        overflow='visible'
        style={{ position: 'absolute', inset: 0 }}
      >
        <animated.rect
          width={style.width}
          height={style.height}
          fill='transparent'
          stroke='var(--primary)'
          strokeWidth='2'
          strokeDasharray='3'
        ></animated.rect>
      </animated.svg>
    </animated.div>
  )
}
