import React, { ElementRef, FC, PropsWithChildren, useContext, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { mergeRefs } from 'react-merge-refs'
import { useCanvas } from '../hooks/useCanvas'

interface CanvasGraph {
  x: number
  y: number
  scale?: number
}

interface CanvasProps extends PropsWithChildren {
  className?: string
}

const BuilderCanvas: FC<CanvasProps> = ({ className, children }) => {
  const { Container, viewportRef, pointerRef, measureRef, containerStyles } = useCanvas()

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.cursorPointer} ref={mergeRefs([pointerRef, measureRef])}>
        <Container
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
        </Container>
      </div>
    </div>
  )
}

export default BuilderCanvas
