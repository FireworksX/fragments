import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import {
  getFieldValue,
  getFieldValueMap,
  imagePaintScaleModes,
  layerDirection as defLayerDirection,
  paintMode
} from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useLayerFlexStyles = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const [layerNode] = useGraph(documentManager, layerKey)
  const { layerDirection, layerAlign, layerDistribute, layerWrap, layerGap } = getFieldValueMap(
    layerNode,
    ['layerDirection', 'layerAlign', 'layerDistribute', 'layerWrap', 'layerGap'],
    documentManager
  )

  return useMemo(() => {
    return {
      flexDirection: to(layerDirection, value => (value === defLayerDirection.horizontal ? 'row' : 'column')),
      alignItems: layerAlign,
      justifyContent: layerDistribute,
      flexWrap: to(layerWrap, v => (v ? 'wrap' : 'nowrap')),
      gap: layerGap
    }
  }, [layerAlign, layerDirection, layerDistribute, layerGap, layerWrap])
}
