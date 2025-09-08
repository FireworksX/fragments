import { ComponentRef, useRef } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useCanvasClick } from './useCanvasClick'
import { useCanvasDrag } from './useCanvasDrag'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'
import { useCanvasKeyboard } from '@/widgets/fragmentBuilder/BuilderCanvas/hooks/useCanvasKeyboard'

export const useCanvas = () => {
  const [canvasX] = useBuilderCanvasField('x')
  const [canvasY] = useBuilderCanvasField('y')
  const [canvasScale] = useBuilderCanvasField('scale')
  const [canvasMode] = useBuilderCanvasField('canvasMode')
  const pointerRef = useRef<ComponentRef<'div'>>(null)
  const viewportRef = useRef<ComponentRef<'div'>>(null)

  useCanvasClick(pointerRef)
  useCanvasDrag({ pointerRef, viewportRef })
  useCanvasKeyboard()

  return {
    canvasMode,
    viewportRef,
    pointerRef,
    containerStyles: {
      x: canvasX,
      y: canvasY,
      scale: canvasScale
    }
  }
}
