import { ComponentRef, useRef } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useCanvasClick } from './useCanvasClick'
import { useCanvasDrag } from './useCanvasDrag'

export const useCanvas = () => {
  const { canvas, manager: canvasManager } = useBuilderCanvas()
  const pointerRef = useRef<ComponentRef<'div'>>(null)
  const viewportRef = useRef<ComponentRef<'div'>>(null)

  useCanvasClick(pointerRef)
  useCanvasDrag({ pointerRef, viewportRef })

  return {
    viewportRef,
    pointerRef,
    containerStyles: canvas
  }
}
