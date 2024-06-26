import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { animated } from '@react-spring/web'

interface BuilderToolsProps extends PropsWithChildren {
  className?: string
}

const Tools: FC<BuilderToolsProps> = ({ className, children }) => {
  const { canvas } = useContext(BuilderContext)

  return (
    <animated.div className={cn(styles.root, className)} style={{ x: canvas?.x, y: canvas?.y, scale: canvas?.scale }}>
      {children}
    </animated.div>
  )
}

export default Tools
