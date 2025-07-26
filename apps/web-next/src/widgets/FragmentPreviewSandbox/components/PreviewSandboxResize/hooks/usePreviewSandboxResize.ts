import { useContext, useRef } from 'react'
import { FragmentPreviewContext } from '@/views/FragmentPreview/lib/FragmentPreviewContext'
import { useMeasure } from 'react-use'
import { useDrag } from '@use-gesture/react'
import { useSpringValue } from '@react-spring/web'

const SAFE_GAP = 60

export const usePreviewSandboxResize = () => {
  const width$ = useSpringValue(320)
  const height$ = useSpringValue(500)
  const saveSize = useRef([width$.get(), height$.get()])
  const [containerRef, containerSize] = useMeasure()

  const bind = useDrag(
    ({ movement: [mx, my], last, args: [direction] }) => {
      mx = mx * 2
      my = my * 2

      let width = saveSize.current[0]
      let height = saveSize.current[1]

      if (typeof direction === 'string') {
        if (direction.includes('right')) {
          const calcWidth = width + mx
          if (containerSize.width - SAFE_GAP > calcWidth) {
            width = calcWidth
          }
        }
        if (direction.includes('left')) {
          const calcWidth = width + mx * -1
          if (containerSize.width - SAFE_GAP > calcWidth) {
            width = calcWidth
          }
        }
        if (direction.includes('bottom')) {
          const calcHeight = height + my
          if (containerSize.height - SAFE_GAP > calcHeight) {
            height = calcHeight
          }
        }

        width$.set(width)
        height$.set(height)
        if (last) {
          saveSize.current[0] = width
          saveSize.current[1] = height
        }
      }
    },
    {
      from: [width$.get(), height$.get()]
    }
  )

  // const bindWidth = useDrag(
  //   ({ movement: [mx], last, args: [handlerDirection] }) => {
  //     mx = mx * 2
  //     const calcWidth = handlerDirection === 'left' ? saveSize.current[0] + mx * -1 : saveSize.current[0] + mx
  //
  //     if (containerSize.width - SAFE_GAP > calcWidth) {
  //       width$.set(calcWidth)
  //       if (last) {
  //         saveSize.current[0] = calcWidth
  //       }
  //     }
  //   },
  //   {
  //     from: [width$.get(), 200],
  //     axis: 'x'
  //   }
  // )
  //
  // const bindHeight = useDrag(
  //   ({ movement: [, my], last }) => {
  //     my = my * 2
  //     const calcHeight = saveSize.current[1] + my
  //
  //     if (containerSize.height - SAFE_GAP > calcHeight) {
  //       height$.set(calcHeight)
  //
  //       if (last) {
  //         saveSize.current[1] = calcHeight
  //       }
  //     }
  //   },
  //   {
  //     from: [height$.get(), 200],
  //     axis: 'y'
  //   }
  // )

  return {
    // bindWidth,
    // bindHeight,
    bind,
    height$,
    width$,
    containerRef
  }
}
