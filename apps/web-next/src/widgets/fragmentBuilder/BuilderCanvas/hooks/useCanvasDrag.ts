import { useGesture } from '@use-gesture/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { ComponentRef, RefObject, useEffect, useRef } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { findLayerFromPointerEvent } from '@/shared/utils/findLayerFromPointerEvent'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useDragMove } from './useDragMove'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

interface Options {
  pointerRef: RefObject<ComponentRef<'div'>>
  viewportRef: RefObject<ComponentRef<'div'>>
}

export const SCALE = {
  min: 0.25,
  max: 3
}

export const useCanvasDrag = ({ viewportRef, pointerRef }: Options) => {
  const { canvas, manager: canvasManager } = useBuilderCanvas()
  const { documentManager } = useBuilderDocument()
  const dragMoveHandler = useDragMove()
  const saveOffset = useRef([0, 0])
  const [, setTop, { value$: top$ }] = useLayerValue('top')
  const [, setLeft, { value$: left$ }] = useLayerValue('left')

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
        canvasManager.setHoverLayer(findLayerFromPointerEvent(event) ?? '')
      },
      onDrag: dragEvent => {
        if (animatableValue(canvas?.isResizing)) return

        const {
          pinching,
          dragging,
          cancel,
          movement: [mx, my],
          event,
          first
        } = dragEvent
        event.stopPropagation()
        if (pinching) cancel()

        if (first) {
          const layerKey = findLayerFromPointerEvent(event)
          const layerNode = documentManager.resolve(layerKey)

          dragEvent.memo = {
            targetLayerLink: layerKey,
            targetLayer: layerNode
          }
        }

        if (!dragEvent?.memo?.targetLayer) return dragEvent.memo

        canvasManager.setDragging(dragging, dragEvent.memo?.targetLayerLink)

        const dragPoint = dragMoveHandler(dragEvent, { x: animatableValue(left$), y: animatableValue(top$) })
        // dragPoint = dragCollisionsHandler(dragEvent, dragPoint)

        setTop(dragPoint.y)
        setLeft(dragPoint.x)
        // documentManager.mutate(dragEvent.memo?.targetLayerLink, {
        //   top: dragPoint.y,
        //   left: dragPoint.x
        // })

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
          memo = [canvas.x.get(), canvas.y.get(), tx, ty]
        }

        const x = memo[0] - (ms - 1) * memo[2]
        const y = memo[1] - (ms - 1) * memo[3]

        saveOffset.current = [x, y]

        canvas.x.start(x)
        canvas.y.start(y)
        canvas.scale.start(scale)

        return memo
      },
      onWheel: ({ event, movement: [mx, my], first, last, wheeling }) => {
        event.preventDefault()
        const calcX = saveOffset.current[0] + mx * -1
        const calcY = saveOffset.current[1] + my * -1
        canvas.x.start(calcX)
        canvas.y.start(calcY)

        canvasManager.setMoving(wheeling)
      },
      onWheelEnd: ({ event, movement: [mx, my] }) => {
        event.preventDefault()
        saveOffset.current[0] = saveOffset.current[0] + mx * -1
        saveOffset.current[1] = saveOffset.current[1] + my * -1
      },
      onWheelStart: ({ event }) => {
        event.preventDefault()
        const { x: canvasX, y: canvasY } = canvas
        saveOffset.current = [canvasX.get(), canvasY.get()]
      }
    },
    {
      target: pointerRef.current,
      drag: { from: () => [canvas.x.get(), canvas.y.get()], filterTaps: true },
      pinch: {
        scaleBounds: SCALE,
        rubberband: true
      },
      wheel: {
        from: () => [canvas.x.get(), canvas.y.get()],
        eventOptions: { passive: false }
      }
    }
  )
}
