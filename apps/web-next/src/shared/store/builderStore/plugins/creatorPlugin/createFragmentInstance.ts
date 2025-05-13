import { animatableValue } from '@/shared/utils/animatableValue'
import { definition } from '@fragmentsx/definition'
import { getRandomColor } from '@/shared/utils/random'
import { LinkKey } from '@graph-state/core'

const allowTypes = [definition.nodes.Frame]

export const createFragmentInstance = (state, parent, fragmentKey: LinkKey) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = animatableValue(parentNode.layerMode)

  return documentManager.$fragment.createNode(
    {
      _type: definition.nodes.FragmentInstance,
      positionType: parentLayerMode === definition.layerMode.flex ? definition.positionType.relative : null,
      fragment: fragmentKey
    },
    parent
  )
}
