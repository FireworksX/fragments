import { ComponentRef, useRef } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useCanvasClick } from './useCanvasClick'
import { useCanvasDrag } from './useCanvasDrag'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

export const useCanvas = () => {
  const { canvas, manager: canvasManager } = useBuilderCanvas()
  const { canvasMode } = useBuilder()
  const pointerRef = useRef<ComponentRef<'div'>>(null)
  const viewportRef = useRef<ComponentRef<'div'>>(null)

  useCanvasClick(pointerRef)
  useCanvasDrag({ pointerRef, viewportRef })

  return {
    canvasMode,
    viewportRef,
    pointerRef,
    containerStyles: canvas
  }
}
