import { definition } from '@fragments/definition'
import { getRandomColor } from '@/shared/utils/random'
import { generateId } from '@fragments/utils'
import { appendChildren } from '@fragments/render-core'

const allowTypes = [definition.nodes.Frame]

export const createFrame = (state, parent) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = parentNode.layerMode

  appendChildren(documentManager, documentManager.keyOfEntity(parent), {
    _type: definition.nodes.Frame,
    solidFill: getRandomColor(),
    fillType: definition.paintMode.Solid,
    position:
      parentLayerMode === definition.layerMode.flex
        ? definition.positionType.relative
        : definition.positionType.absolute,
    width: 100,
    height: 100
  })
}
