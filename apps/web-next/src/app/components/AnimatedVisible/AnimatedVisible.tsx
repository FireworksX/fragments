import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated, Interpolation } from '@react-spring/web'

interface AnimatedVisibleProps extends PropsWithChildren {
  visible?: boolean | Interpolation<boolean>
  className?: string
}

export const AnimatedVisible: FC<AnimatedVisibleProps> = animated(
  ({ className, children, visible }) => visible && children
)
