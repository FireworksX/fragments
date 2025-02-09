import { animatableValue } from '@/shared/utils/animatableValue'
import { layerMode, nodes, paintMode, positionType } from '@fragments/plugin-fragment'
import { getRandomColor } from '@/shared/utils/random'
import { LinkKey } from '@graph-state/core'

const allowTypes = [nodes.Frame]

export const createFragmentInstance = (state, parent, fragmentKey: LinkKey) => {
  const documentManager = state.$documents.getCurrentManager()

  if (!allowTypes.includes(documentManager.entityOfKey(parent)?._type)) {
    return
  }

  const parentNode = documentManager.resolve(parent)
  const parentLayerMode = animatableValue(parentNode.layerMode)

  return documentManager.$fragment.createNode(
    {
      _type: nodes.FragmentInstance,
      positionType: parentLayerMode === layerMode.flex ? positionType.relative : null,
      fragment: fragmentKey
    },
    parent
  )
}
