import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { getFieldValueMap, layerMode as defLayerMode } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'

export const useLayerSceneStyles = (layerKey: LinkKey) => {
  const { documentManager } = use(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { layerMode, opacity, overflow, visible } = getFieldValueMap(
    layerNode,
    ['layerMode', 'opacity', 'overflow', 'visible'],
    documentManager
  )

  return useMemo(() => {
    const isFlex = to(layerMode, mode => mode === defLayerMode.flex)

    return {
      opacity,
      overflow,
      display: to([visible, isFlex], (value, isFlex) => (value ? (isFlex ? 'flex' : 'block') : 'none'))
    }
  }, [layerMode, opacity, overflow, visible])
}
