import { ElementRef, MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react'
import { useDrag, useGesture } from '@use-gesture/react'
import { animated, SpringValue, useSpring } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useMeasure } from 'react-use'
import { definitions, nodes } from '@fragments/plugin-fragment-spring'
import { useDragMove } from './useDragMove'
import { useDragCollisions } from './useDragCollisions'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { debounce } from '@fragments/utils'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { nextTick } from '@/shared/utils/nextTick'

export const SCALE = {
  min: 0.25,
  max: 3
}

export type DragEvent = Parameters<Parameters<typeof useDrag>[0]>[0]

export const useCanvas = () => {
  const { builderManager } = useContext(BuilderContext)
  const { documentManager } = useBuilderDocument()
  const { canvas, manager: canvasManager } = useBuilderCanvas()
  const { updateParams, isTextEditing } = useBuilderManager()
  const { creator, manager } = useBuilderCreator()
  const createType = creator?.createType
  const pointerRef = useRef<ElementRef<'div'>>(null)
  const dragMoveHandler = useDragMove()
  const dragCollisionsHandler = useDragCollisions()
  const { createText } = useBuilderCreator()

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

  // useEffect(() => {
  //   canvasManager.updateBound(measure.left, measure.top, measure.width, measure.height)
  // }, [canvasManager, measure])

  const findLayerFromPointerEvent = event => {
    if (!event || !isFinite(event.clientX) || !isFinite(event.clientY)) return null

    const elementFromPoint = document.elementFromPoint?.(event.clientX, event.clientY)
    const parentFragment = elementFromPoint?.closest(`[data-type="${nodes.FragmentInstance}"]`)
    const closestLayer = elementFromPoint?.closest('[data-key]')

    return (parentFragment ?? closestLayer)?.getAttribute('data-key')
  }

  useGesture(
    {
      onMouseMove: ({ event, dragging, moving, wheeling }) => {
        if (dragging || moving || wheeling) return
        canvasManager.setHoverLayer(findLayerFromPointerEvent(event) ?? '')
      },
      onClick: ({ event }) => {
        const layerKey = findLayerFromPointerEvent(event)
        if (createType) {
          if (createType === nodes.Text) {
            const [nextLayerKey] = createText(layerKey, { content: 'text' })
            manager.setCreatorType(null)
            canvasManager.setFocus(nextLayerKey)

            nextTick(() => {
              canvasManager.setFocus(nextLayerKey)
            })
          } else {
            manager.createLayer(layerKey)
          }
        } else {
          if (documentManager.entityOfKey(layerKey)?._type === nodes.FragmentInstance) {
            builderManager.toggleTextEditor(false)
            canvasManager.setFocus(layerKey)
            // updateParams({
            //   focus: layerKey
            // })
          } else if (layerKey) {
            if (!isTextEditing) {
              const clickedLayerValue = documentManager.resolve(layerKey)

              if (clickedLayerValue?._type === nodes.Text && event.detail === 2) {
                // updateParams({
                //   focus: layerKey
                // })
                canvasManager.setFocus(layerKey)
                builderManager.toggleTextEditor(true)
                // updateParams({
                //   focus: layerKey
                // })
                return
              }

              builderManager.toggleTextEditor(false)
              canvasManager.setFocus(layerKey)
              // updateParams({
              //   focus: layerKey
              // })
            } else {
              builderManager.toggleTextEditor(false)
              canvasManager.setFocus(layerKey)
              // updateParams({
              //   focus: layerKey
              // })
            }
          } else {
            builderManager.toggleTextEditor(false)
            canvasManager.setFocus(null)
            // updateParams({
            //   focus: null
            // })
          }
        }
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

        const dragPoint = dragMoveHandler(dragEvent)
        // dragPoint = dragCollisionsHandler(dragEvent, dragPoint)

        documentManager.mutate(dragEvent.memo?.targetLayerLink, {
          top: dragPoint.y,
          left: dragPoint.x
        })

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
    Container: animated.div,
    pointerRef,
    containerStyles: canvas
  }
}
