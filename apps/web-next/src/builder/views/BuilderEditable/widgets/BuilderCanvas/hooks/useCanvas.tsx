import { ElementRef, MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { animated, useSpring } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { CanvasManager } from '@/builder/managers/canvasManager'
import { BuilderContext } from '@/builder/BuilderContext'
import { useMeasure } from 'react-use'

const SCALE = {
  min: 0.25,
  max: 3
}

export const useCanvas = () => {
  const { canvasManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager)
  const pointerRef = useRef<ElementRef<'div'>>(null)

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
      // onDrag: ({ pinching, cancel, offset: [x, y] }) => {
      //   if (pinching) cancel()
      //   position.ref.start({ x, y })
      // },
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
      onWheel: ({ event, movement: [mx, my] }) => {
        event.preventDefault()
        const calcX = saveOffset.current[0] + mx * -1
        const calcY = saveOffset.current[1] + my * -1
        canvas.x.start(calcX)
        canvas.y.start(calcY)
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
      drag: { from: () => [canvas.x.get(), canvas.y.get()] },
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
