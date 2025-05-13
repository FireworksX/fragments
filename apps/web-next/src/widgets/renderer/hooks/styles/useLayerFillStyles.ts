import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { getFieldValue, getFieldValueMap, imagePaintScaleModes, paintMode } from '@fragmentsx/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useLayerFillStyles = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const [layerNode] = useGraph(documentManager, layerKey)
  const { fillType, solidFill, imageFill, imageFillScaleMode } = getFieldValueMap(
    layerNode,
    ['fillType', 'solidFill', 'imageFill', 'imageFillScaleMode'],
    documentManager
  )

  return useMemo(() => {
    return {
      backgroundColor: to([fillType, solidFill, imageFill], (fillType, solidFill, imageFill) => {
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
