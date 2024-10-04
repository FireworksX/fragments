import { useDrag } from '@use-gesture/react'
import { useContext, useRef } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderPreviewContainer = () => {
  const { previewManager } = useContext(BuilderContext)
  const [{ width, height }] = useGraph(previewManager)
  const saveSize = useRef([width.get(), height.get()])

  const bindWidth = useDrag(
    ({ movement: [mx], last, args: [handlerDirection] }) => {
      const calcWidth = handlerDirection === 'left' ? saveSize.current[0] + mx * -1 : saveSize.current[0] + mx
      previewManager.setWidth(calcWidth)
      if (last) {
        saveSize.current[0] = calcWidth
      }
    },
    {
      from: [width.get(), 200],
      axis: 'x'
    }
  )

  const bindHeight = useDrag(
    ({ movement: [, my], last }) => {
      const calcHeight = saveSize.current[1] + my
      previewManager.setHeight(calcHeight)

      if (last) {
        saveSize.current[1] = calcHeight
      }
    },
    {
      from: [height.get(), 200],
      axis: 'y'
    }
  )

  return {
    bindWidth,
    bindHeight,
    height,
    width,
    setWidth: previewManager.setWidth,
    setHeight: previewManager.setHeight
  }
}
