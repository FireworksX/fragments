import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

export type CornerSide = 'top' | 'right' | 'bottom' | 'left'

interface CornerSidesProps {
  side?: CornerSide
  className?: string
}

const CornerSides: FC<CornerSidesProps> = ({ className, side }) => {
  const getOpacity = (inputSide?: CornerSide) => {
    if (!side) {
      return 1
    }

    return side === inputSide ? 1 : 0.2
  }

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>
      <path
        d='M 2.5 0 C 1.119 0 0 1.119 0 2.5 L 0 4 L 1.5 4 L 1.5 2.5 C 1.5 1.948 1.948 1.5 2.5 1.5 L 4 1.5 L 4 0 Z'
        fill='currentcolor'
        opacity={getOpacity('top')}
      ></path>
      <path
        d='M 10 2.5 C 10 1.119 8.881 0 7.5 0 L 6 0 L 6 1.5 L 7.5 1.5 C 8.052 1.5 8.5 1.948 8.5 2.5 L 8.5 4 L 10 4 Z'
        fill='currentcolor'
        opacity={getOpacity('right')}
      ></path>
      <path
        d='M 7.5 10 C 8.881 10 10 8.881 10 7.5 L 10 6 L 8.5 6 L 8.5 7.5 C 8.5 8.052 8.052 8.5 7.5 8.5 L 6 8.5 L 6 10 Z'
        fill='currentcolor'
        opacity={getOpacity('bottom')}
      ></path>
      <path
        d='M 0 7.5 C 0 8.881 1.119 10 2.5 10 L 4 10 L 4 8.5 L 2.5 8.5 C 1.948 8.5 1.5 8.052 1.5 7.5 L 1.5 6 L 0 6 Z'
        fill='currentcolor'
        opacity={getOpacity('left')}
      ></path>
    </svg>
  )
}

export default CornerSides
