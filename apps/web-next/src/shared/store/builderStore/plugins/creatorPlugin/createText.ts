import { animatableValue } from '@/shared/utils/animatableValue'
import { definition } from '@fragmentsx/definition'
import { getRandomColor } from '@/shared/utils/random'

const allowTypes = [definition.nodes.Frame]

export const createText = (state, parent) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = animatableValue(parentNode.layerMode)

  return documentManager.$fragment.createNode(
    {
      _type: definition.nodes.Text,
      positionType: parentLayerMode === definition.layerMode.flex ? definition.positionType.relative : null,
      width: 100,
      height: 100
    },
    parent
  )
}
