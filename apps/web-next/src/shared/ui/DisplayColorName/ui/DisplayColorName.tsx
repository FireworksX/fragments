import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SpringValue, animated } from '@react-spring/web'
import { to } from '@fragments/springs-factory'

interface DisplayColorNameProps {
  color?: {
    r: SpringValue<number>
    g: SpringValue<number>
    b: SpringValue<number>
  }
  className?: string
}

export const DisplayColorName: FC<DisplayColorNameProps> = ({ className, color }) => (
  <animated.div className={cn(styles.root, className)} data-testid='DisplayColorName'>
    {to(Object.values(color), (r, g, b) => )}
  </animated.div>
)
