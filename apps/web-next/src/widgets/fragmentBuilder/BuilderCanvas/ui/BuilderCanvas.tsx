import React, { ElementRef, FC, PropsWithChildren, ReactNode, useContext, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { mergeRefs } from 'react-merge-refs'
import { useCanvas } from '../hooks/useCanvas'
import { useCanvasInsert } from '@/shared/hooks/fragmentBuilder/useCanvasInsert'

interface CanvasProps extends PropsWithChildren {
  className?: string
  extendNodes?: ReactNode | ReactNode[]
}

const BuilderCanvas: FC<CanvasProps> = ({ className, children, extendNodes }) => {
  useCanvasInsert()
  const { Container, viewportRef, pointerRef, containerStyles } = useCanvas()

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

      {extendNodes}
    </div>
  )
}

export default BuilderCanvas
