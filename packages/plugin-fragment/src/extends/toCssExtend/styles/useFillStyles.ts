import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { definitions, imagePaintScaleModes, paintMode } from '@fragments/plugin-state'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { objectToColorString } from '@fragments/utils'

export const useFillStyles = (graph: Graph) => {
  const { getColor } = useDisplayColor()

  if (!graph) return {}

  const fillType = graph.resolveField('fillType')
  const solidFill = graph.resolveField('solidFill')
  const imageFill = graph.resolveField('imageFill')
  const imageFillScaleMode = graph.resolveField('imageFillScaleMode')

  return {
    background: to([fillType, getColor(solidFill), imageFill], (fillType, solidFill, imageFill) => {
      if (fillType === paintMode.Solid) {
        return objectToColorString(solidFill)
      } else if (fillType === paintMode.Image) {
        return `url(${imageFill}) no-repeat`
      }

      return ''
    }),
    backgroundSize: to([fillType, imageFillScaleMode], (type, scaleMode) => {
      if (type === paintMode.Image) {
        return imagePaintScaleModes[scaleMode]
      }
      return undefined
    })
  }
}
