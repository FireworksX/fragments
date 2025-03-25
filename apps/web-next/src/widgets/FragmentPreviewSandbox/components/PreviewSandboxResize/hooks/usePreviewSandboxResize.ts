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

  const bindWidth = useDrag(
    ({ movement: [mx], last, args: [handlerDirection] }) => {
      const calcWidth = handlerDirection === 'left' ? saveSize.current[0] + mx * -1 : saveSize.current[0] + mx

      if (containerSize.width - SAFE_GAP > calcWidth) {
        width$.set(calcWidth)
        if (last) {
          saveSize.current[0] = calcWidth
        }
      }
    },
    {
      from: [width$.get(), 200],
      axis: 'x'
    }
  )

  const bindHeight = useDrag(
    ({ movement: [, my], last }) => {
      const calcHeight = saveSize.current[1] + my

      if (containerSize.height - SAFE_GAP > calcHeight) {
        height$.set(calcHeight)

        if (last) {
          saveSize.current[1] = calcHeight
        }
      }
    },
    {
      from: [height$.get(), 200],
      axis: 'y'
    }
  )

  return {
    bindWidth,
    bindHeight,
    height$,
    width$,
    containerRef
  }
}
