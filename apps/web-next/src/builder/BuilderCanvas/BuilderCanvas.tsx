import React, { ElementRef, FC, PropsWithChildren, useContext, useRef } from 'react'
import cn from 'classnames'
import { GraphState } from '@graph-state/core'
import styles from './styles.module.css'
import { useSpring } from '@react-spring/web'
import { useCanvas } from '@/builder/BuilderCanvas/hooks/useCanvas'

interface CanvasGraph {
  x: number
  y: number
  scale?: number
}

interface CanvasProps extends PropsWithChildren {
  className?: string
}

const BuilderCanvas: FC<CanvasProps> = ({ className, children }) => {
  const pointerRef = useRef<ElementRef<'div'>>(null)
  const { Container, viewportRef, containerStyles } = useCanvas(pointerRef)

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.cursorPointer} ref={pointerRef}>
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
