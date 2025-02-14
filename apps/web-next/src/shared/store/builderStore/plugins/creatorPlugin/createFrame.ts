import { layerMode, nodes, paintMode, positionType } from '@fragments/plugin-fragment'
import { getRandomColor } from '@/shared/utils/random'
import { createLayer } from '@fragments/renderer-editor'
import { generateId } from '@fragments/utils'

const allowTypes = [nodes.Frame]

export const createFrame = (state, parent) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = parentNode.layerMode

  const nextLayer = createLayer({
    _id: generateId(),
    _type: nodes.Frame,
    solidFill: getRandomColor(),
    fillType: paintMode.Solid,
    position: parentLayerMode === layerMode.flex ? positionType.relative : positionType.absolute,
    width: 100,
    height: 100
  })

  documentManager.mutate(documentManager.keyOfEntity(parent), {
    children: [nextLayer]
  })
}
