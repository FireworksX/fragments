import { ElementRef, MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react'
import { useDrag, useGesture } from '@use-gesture/react'
import { animated, SpringValue, useSpring } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useMeasure } from 'react-use'
import { definitions, nodes } from '@fragments/plugin-state'
import { useDragMove } from './useDragMove'
import { useDragCollisions } from './useDragCollisions'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

const SCALE = {
  min: 0.25,
  max: 3
}

export type DragEvent = Parameters<Parameters<typeof useDrag>[0]>[0]

export const useCanvas = () => {
  const { documentManager, builderManager, canvasManager } = useContext(BuilderContext)
  const { updateParams, isTextEditing } = useBuilderManager()
  const [canvas] = useGraph(canvasManager)
  const pointerRef = useRef<ElementRef<'div'>>(null)
  const dragMoveHandler = useDragMove()
  const dragCollisionsHandler = useDragCollisions()

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

  const viewportRef = useRef()
  const saveOffset = useRef([0, 0])
  const [measureRef, measure] = useMeasure()

  useEffect(() => {
    canvasManager.updateBound(measure.left, measure.top, measure.width, measure.height)
  }, [canvasManager, measure])

  useGesture(
    {
      onMouseMove: ({ event, dragging, moving, wheeling }) => {
        if (dragging || moving || wheeling) return

        const elementFromPoint = document.elementFromPoint(event.clientX, event.clientY)
        const layerKey = elementFromPoint.getAttribute('data-key')
        canvasManager.setHoverLayer(layerKey)
      },
      onClick: ({ event }) => {
        const elementFromPoint = document.elementFromPoint(event.clientX, event.clientY)
        if (elementFromPoint && elementFromPoint instanceof HTMLElement && elementFromPoint.getAttribute('data-key')) {
          if (!isTextEditing) {
            const layerKey = elementFromPoint.getAttribute('data-key')
            const clickedLayerValue = documentManager.resolve(layerKey)

            if (clickedLayerValue?._type === definitions.nodes.Text && event.detail === 2) {
              updateParams({
                focus: layerKey
              })
              builderManager.toggleTextEditor(true)
            }

            builderManager.toggleTextEditor(false)
            updateParams({
              focus: layerKey
            })
          } else {
            builderManager.toggleTextEditor(false)
            updateParams({
              focus: null
            })
          }
        }
      },
      onDrag: dragEvent => {
        if (canvas?.isResizing) return

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
          const elementFromPoint = document.elementFromPoint(event.clientX, event.clientY)
          const layerKey = elementFromPoint.getAttribute('data-key')
          const layerNode = documentManager.resolve(layerKey)

          if (layerNode?._type !== nodes.Breakpoint) {
            dragEvent.memo = {
              targetLayerLink: layerKey,
              targetLayer: layerNode
            }
          }
        }

        if (!dragEvent?.memo?.targetLayer) return dragEvent.memo

        canvasManager.setDragging(dragging, dragEvent.memo?.targetLayerLink)

        let dragPoint = dragMoveHandler(dragEvent)
        dragPoint = dragCollisionsHandler(dragEvent, dragPoint)

        dragEvent.memo?.targetLayer?.move(dragPoint.x, dragPoint.y)

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
      target: pointerRef,
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

  return {
    viewportRef,
    measureRef,
    Container: animated.div,
    pointerRef,
    containerStyles: canvas
  }
}