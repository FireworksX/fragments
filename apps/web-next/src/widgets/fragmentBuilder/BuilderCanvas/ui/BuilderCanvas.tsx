import React, { ElementRef, FC, memo, PropsWithChildren, ReactNode, useContext, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useCanvas } from '../hooks/useCanvas'
import { useCanvasInsert } from '@/shared/hooks/fragmentBuilder/useCanvasInsert'
import { animated } from '@react-spring/web'
import { useDroppable } from '@dnd-kit/core'
import { droppableAreas } from '@/shared/data'

interface CanvasProps extends PropsWithChildren {
  className?: string
  extendNodes?: ReactNode | ReactNode[]
}

const BuilderCanvas: FC<CanvasProps> = memo(({ className, children, extendNodes }) => {
  useCanvasInsert()
  const { viewportRef, pointerRef, containerStyles } = useCanvas()

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.cursorPointer} ref={pointerRef}>
        <animated.div
          id='viewport'
          style={{
            width: 0,
            height: 0,
            transform: '',
            ...containerStyles
          }}
        >
          <div className={styles.viewport} ref={viewportRef}>
            {children}
          </div>
        </animated.div>
      </div>

      {extendNodes}
    </div>
  )
})

export default BuilderCanvas
