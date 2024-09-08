import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { definitions } from '@fragments/plugin-state'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'

export const useFillStyles = (graph: Graph) => {
  const { getColor } = useDisplayColor()
  const fillType = graph.resolveField('fillType')
  const solidFill = graph.resolveField('solidFill')
  const imageFill = graph.resolveField('imageFill')
  const imageFillScaleMode = graph.resolveField('imageFillScaleMode')

  return {
    background: to([fillType, getColor(solidFill), imageFill], (fillType, solidFill, imageFill) => {
      if (fillType === definitions.paintMode.Solid) {
        return solidFill
      } else if (fillType === definitions.paintMode.Image) {
        return `url(${imageFill}) no-repeat`
      }

      return ''
    }),
    backgroundSize: to([fillType, imageFillScaleMode], (type, scaleMode) => {
      if (type === definitions.paintMode.Image) {
        return definitions.scaleModeMap[scaleMode]
      }
      return undefined
    })
  }
}
