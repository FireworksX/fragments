import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { to, useSpring, useSprings } from '@react-spring/web'
import { useCallback, useEffect } from 'react'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { useGraph, useGraphEffect, useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { getLayer } from '@fragments/renderer-editor'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'

export const useBuilderHighlightBreakpoints = () => {
  const { documentManager } = useBuilderDocument()
  const { layers } = useFragmentLayers()

  const getLayerField = useCallback(
    (layerKey: string, field: string) => getLayer(documentManager, layerKey)?.[field],
    [documentManager]
  )

  const [styles, stylesApi] = useSprings(layers.length ?? 0, index => {
    const layerKey = layers.at(index)

    return {
      x: getLayerField(layerKey, 'left'),
      y: getLayerField(layerKey, 'top'),
      width: getLayerField(layerKey, 'width')
    }
  })

  useGraphEffect(documentManager, layers, (_next, _prev, index) => {
    const layerKey = layers.at(index)

    stylesApi.set(styleIndex => {
      if (index === styleIndex) {
        return {
          x: getLayerField(layerKey, 'left'),
          y: getLayerField(layerKey, 'top'),
          width: getLayerField(layerKey, 'width')
        }
      }

      return null
    })
  })

  return layers.map((layerKey, index) => {
    const style = styles.at(index)

    return {
      layerKey,
      styles: {
        width: style.width,
        x: style.x,
        y: style.y.to(v => v - 50)
      }
    }
  })
}
