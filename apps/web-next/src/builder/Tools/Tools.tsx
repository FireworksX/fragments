import { FC, PropsWithChildren, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { animated, useSpring } from '@react-spring/web'
import { useGraph } from '@graph-state/react'

interface BuilderToolsProps extends PropsWithChildren {
  canvasManager: unknown
  className?: string
}

const Tools: FC<BuilderToolsProps> = ({ className, children, canvasManager }) => {
  const [canvas] = useGraph(canvasManager)

  return (
    <animated.div className={cn(styles.root, className)} style={canvas}>
      {children}
    </animated.div>
  )
}

export default Tools
