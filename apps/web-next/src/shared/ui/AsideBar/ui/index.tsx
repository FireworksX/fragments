import { FC, PropsWithChildren } from 'react'
import { animated, useSpring } from '@react-spring/web'
import cn from 'classnames'
import styles from './styles.module.css'

export interface AsideBarProps extends PropsWithChildren {
  position?: 'left' | 'right'
  isOpen?: boolean
  className?: string
}

const AsideBar: FC<AsideBarProps> = ({ className, children, position = 'left', isOpen = false }) => {
  const initialOffset = position === 'left' ? '-100%' : '100%'
  const { x } = useSpring({
    x: isOpen ? '0' : initialOffset
  })

  return (
    <animated.div style={{ x }} className={cn(className, styles.root, { [styles.right]: position === 'right' })}>
      {children}
    </animated.div>
  )
}

export default AsideBar
