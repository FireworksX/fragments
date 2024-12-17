import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { getFieldValue, getFieldValueMap, imagePaintScaleModes, paintMode } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'

export const useLayerFillStyles = (layerKey: LinkKey) => {
  const { documentManager } = use(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { fillType, solidFill, imageFill, imageFillScaleMode } = getFieldValueMap(
    layerNode,
    ['fillType', 'solidFill', 'imageFill', 'imageFillScaleMode'],
    documentManager
  )

  return useMemo(() => {
    return {
      background: to([fillType, solidFill, imageFill], (fillType, solidFill, imageFill) => {
        if (fillType === paintMode.Solid) {
          return solidFill
        } else if (fillType === paintMode.Image) {
          return `url({imageFill}) no-repeat`
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
  }, [fillType, imageFill, imageFillScaleMode, solidFill])
}
