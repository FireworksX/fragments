import { animatableValue } from '@/shared/utils/animatableValue'
import { layerMode, nodes, paintMode, positionType } from '@fragments/plugin-fragment'
import { getRandomColor } from '@/shared/utils/random'

const allowTypes = [nodes.Frame]

export const createText = (state, parent) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = animatableValue(parentNode.layerMode)

  return documentManager.$fragment.createNode(
    {
      _type: nodes.Text,
      positionType: parentLayerMode === layerMode.flex ? positionType.relative : null,
      width: 100,
      height: 100
    },
    parent
  )
}
