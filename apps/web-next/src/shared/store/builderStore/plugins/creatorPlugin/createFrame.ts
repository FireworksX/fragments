import { layerMode, nodes, paintMode, positionType } from '@fragments/plugin-fragment'
import { getRandomColor } from '@/shared/utils/random'
import { generateId } from '@fragments/utils'
import { appendChildren } from '@fragments/renderer-editor'

const allowTypes = [nodes.Frame]

export const createFrame = (state, parent) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = parentNode.layerMode

  appendChildren(documentManager, documentManager.keyOfEntity(parent), {
    _type: nodes.Frame,
    solidFill: getRandomColor(),
    fillType: paintMode.Solid,
    position: parentLayerMode === layerMode.flex ? positionType.relative : positionType.absolute,
    width: 100,
    height: 100
  })
}
