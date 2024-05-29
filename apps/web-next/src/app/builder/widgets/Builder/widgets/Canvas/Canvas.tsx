import React, { ElementRef, FC, PropsWithChildren, useContext, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useCanvas } from '@/app/builder/widgets/Builder/widgets/Canvas/hooks/useCanvas.tsx'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

interface CanvasProps extends PropsWithChildren {
  className?: string
}

const Canvas: FC<CanvasProps> = ({ className, children }) => {
  const pointerRef = useRef<ElementRef<'div'>>(null)
  const { Container, viewportRef } = useCanvas(pointerRef)
  const { canvas } = useContext(BuilderContext)

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.cursorPointer} ref={pointerRef}>
        <Container
          id='viewport'
          style={{
            width: 0,
            height: 0,
            transform: '',
            x: canvas?.x,
            y: canvas?.y,
            scale: canvas?.scale
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

export default Canvas
