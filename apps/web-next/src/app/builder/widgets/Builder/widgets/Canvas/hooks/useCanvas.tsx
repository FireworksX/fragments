import { ElementRef, MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { animated } from '@react-spring/web'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'
// import { debounce } from '@fragments/utils'

const SCALE = {
  min: 0.25,
  max: 3
}

export const useCanvas = (pointerRef: MutableRefObject<ElementRef<'div'>>) => {
  const { graphState, canvas } = useContext(BuilderContext)
  const [center, setCenter] = useGraph(graphState, `${graphState.viewport}.center`)
  const [zoom, setZoom] = useGraph(graphState, `${graphState.viewport}.zoom`)

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

  // const setDebounceValue = debounce(({ scale, x, y }) => {
  //   if (!!x && !!y) {
  //     setCenter({ x, y })
  //   }
  //   if (scale) {
  //     setZoom({ zoom: scale })
  //   }
  // }, 100)
  //
  // const zoomIn = useCallback(() => {
  //   if (!(zoom >= SCALE.max)) {
  //     statex.viewport.setZoom(zoom + 0.1)
  //   }
  // }, [statex.viewport, zoom])
  //
  // const zoomOut = useCallback(() => {
  //   if (!(zoom <= SCALE.min)) {
  //     statex.viewport.setZoom(zoom - 0.1)
  //   }
  // }, [statex.viewport, zoom])
  //
  // // TODO
  useEffect(() => {
    // canvas?.x?.start(center.x)
    // canvas?.y?.start(center.y)
    // canvas?.scale?.start(zoom?.zoom)
  }, [center, zoom])

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

        canvas?.x.start(x)
        canvas?.y.start(y)
        canvas?.scale.start(scale)
        // setDebounceValue({ scale, x, y })

        return memo
      },
      onWheel: ({ event, movement: [mx, my] }) => {
        event.preventDefault()
        const calcX = saveOffset.current[0] + mx * -1
        const calcY = saveOffset.current[1] + my * -1

        canvas?.x.start(calcX)
        canvas?.y.start(calcY)
        // setDebounceValue({ x: calcX, y: calcY })
      },
      onWheelEnd: ({ event, movement: [mx, my] }) => {
        event.preventDefault()
        saveOffset.current[0] = saveOffset.current[0] + mx * -1
        saveOffset.current[1] = saveOffset.current[1] + my * -1
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
    Container: animated.div,
    pointerRef
    // zoomIn,
    // zoomOut
  }
}
