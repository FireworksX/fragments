import { useGesture } from '@use-gesture/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { ComponentRef, RefObject, useEffect, useRef } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { findLayerFromPointerEvent } from '@/shared/utils/findLayerFromPointerEvent'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useDragMove } from './useDragMove'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { builderCanvasMode } from '@/shared/constants/builderConstants'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'

interface Options {
  pointerRef: RefObject<ComponentRef<'div'>>
  viewportRef: RefObject<ComponentRef<'div'>>
}

export const SCALE = {
  min: 0.25,
  max: 3
}

export const useCanvasDrag = ({ viewportRef, pointerRef }: Options) => {
  const [canvasMode, setCanvasMode] = useBuilderCanvasField('canvasMode')
  const [canvasX, setCanvasX] = useBuilderCanvasField('x')
  const [canvasY, setCanvasY] = useBuilderCanvasField('y')
  const [canvasScale, setCanvasScale] = useBuilderCanvasField('scale')
  const [, setHoverLayer] = useBuilderCanvasField('hoverLayer')
  const [, setIsDraggingLayer] = useBuilderCanvasField('isDraggingLayer')
  const [isResizing] = useBuilderCanvasField('isResizing')

  const { documentManager } = useBuilderDocument()
  const dragMoveHandler = useDragMove()
  const saveOffset = useRef([0, 0])
  const wheelMode = useRef<'pan' | 'zoom' | null>(null)

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  useGesture(
    {
      onMouseMove: ({ event, dragging, moving, wheeling }) => {
        if (dragging || moving || wheeling) return
        setHoverLayer(findLayerFromPointerEvent(event) ?? null)
      },

      onDrag: dragEvent => {
        if (isResizing) return

        const {
          pinching,
          dragging,
          cancel,
          movement: [mx, my],
          event,
          first,
          last
        } = dragEvent
        event.stopPropagation()
        if (pinching) cancel()

        if (canvasMode === builderCanvasMode.pan || canvasMode === builderCanvasMode.panning) {
          setCanvasX(saveOffset.current[0] + mx)
          setCanvasY(saveOffset.current[1] + my)
          if (first) {
            saveOffset.current = [canvasX.get(), canvasY.get()]
            setCanvasMode(builderCanvasMode.panning)
          }

          if (last) {
            setCanvasMode(builderCanvasMode.pan)
          }

          return
        }

        if (first) {
          const layerKey = findLayerFromPointerEvent(event)
          const layerNode = documentManager.resolve(layerKey)

          dragEvent.memo = {
            targetLayerLink: layerKey,
            targetLayer: layerNode
          }
        }

        if (!dragEvent?.memo?.targetLayer) return dragEvent.memo

        setIsDraggingLayer(dragging)
        // canvasManager.setDragging(dragging, dragEvent.memo?.targetLayerLink)

        const dragPoint = dragMoveHandler(dragEvent)
        // dragPoint = dragCollisionsHandler(dragEvent, dragPoint)

        // setTop(dragPoint.y)
        // setLeft(dragPoint.x)
        // documentManager.mutate(dragEvent.memo?.targetLayerLink, {
        //   top: dragPoint.y,
        //   left: dragPoint.x
        // })

        // setCenterAnchorX(dragPoint.x)
        // setCenterAnchorY(dragPoint.y)

        // up(dragPoint.x)

        return dragEvent.memo
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [scale], memo }) => {
        if (first) {
          const pointerRect = pointerRef.current.getBoundingClientRect()
          const viewportRect = viewportRef.current.getBoundingClientRect()
          const { width, height } = viewportRect
          const x = viewportRect.x - pointerRect.x
          const y = viewportRect.y - pointerRect.y

          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [canvasX.get(), canvasY.get(), tx, ty]
        }

        const x = memo[0] - (ms - 1) * memo[2]
        const y = memo[1] - (ms - 1) * memo[3]

        saveOffset.current = [x, y]

        setCanvasX(x)
        setCanvasY(y)
        setCanvasScale(scale)

        return memo
      },

      onWheel: ({ event, movement: [mx, my], first, last, wheeling }) => {
        event.preventDefault()

        if (wheelMode.current === 'zoom') {
          const delta = -event.deltaY * 0.01
          const newScale = Math.min(Math.max(canvasScale.get() * (1 + delta), SCALE.min), SCALE.max)
          setCanvasScale(newScale)
          return
        }

        if (wheelMode.current === 'pan') {
          const calcX = saveOffset.current[0] + mx * -1
          const calcY = saveOffset.current[1] + my * -1
          setCanvasX(calcX)
          setCanvasY(calcY)

          // canvasManager.setMoving(wheeling)
        }
      },
      onWheelEnd: ({ event, movement: [mx, my] }) => {
        event.preventDefault()
        saveOffset.current[0] = saveOffset.current[0] + mx * -1
        saveOffset.current[1] = saveOffset.current[1] + my * -1
        wheelMode.current = null
      },
      onWheelStart: ({ event }) => {
        event.preventDefault()

        if (event.ctrlKey || event.metaKey) {
          wheelMode.current = 'zoom'
        } else {
          wheelMode.current = 'pan'
          saveOffset.current = [canvasX.get(), canvasY.get()]
        }
      }
    },
    {
      target: pointerRef.current,
      drag: { from: () => [canvasX.get(), canvasY.get()], filterTaps: true },
      pinch: {
        scaleBounds: SCALE,
        rubberband: true
      },
      wheel: {
        from: () => [canvasX.get(), canvasY.get()],
        eventOptions: { passive: false }
      }
    }
  )
}
