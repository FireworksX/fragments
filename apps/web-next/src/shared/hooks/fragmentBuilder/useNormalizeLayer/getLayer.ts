import { Entity, GraphState } from '@graph-state/core'
import { getOverrider } from '@fragments/render-core'
import { getNormalizeLayer } from '@fragments/definition'

export const getLayer = (manager: GraphState, layer: Entity) => {
  if (!manager || !layer) return null

  const layerKey = manager.keyOfEntity(layer)
  const layerData = manager.resolve(layerKey)
  const overrider = getOverrider(manager, layerKey)
  return getNormalizeLayer(layerData, overrider)
}
