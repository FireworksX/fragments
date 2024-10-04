import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { builderSizing } from '@fragments/fragments-plugin'
import { layerMode, nodes } from '@fragments/plugin-state'
import { animatableValue } from '@/shared/utils/animatableValue'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderSize = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ node, key, value }) => {
    switch (key) {
      case 'width':
        node.setWidth(+value)
        break
      case 'height':
        node.setHeight(+value)
        break
      case 'layoutSizingHorizontal':
        node.setSizeMode('horizontal', value)
        break
      case 'layoutSizingVertical':
        node.setSizeMode('vertical', value)
        break
      case 'aspectRatio':
        node.syncSize()
        break
    }
  })
  const [parent] = useGraph(documentManager, selectionGraph?.getParent())

  const hugContentEnabled =
    (!!selectionGraph?.children?.length &&
      animatableValue(selectionGraph.resolveField('layerMode')) === layerMode.flex) ||
    selectionGraph?._type === nodes.Text
  const fillContentEnabled = animatableValue(parent.resolveField('layerMode')) === layerMode.flex

  return {
    selectionGraph,
    hugContentEnabled,
    fillContentEnabled,
    hasSync:
      layerInvoker('layoutSizingHorizontal').value !== builderSizing.Hug &&
      layerInvoker('layoutSizingVertical').value !== builderSizing.Hug,
    sync: layerInvoker('aspectRatio'),
    isSynced: selectionGraph?.isSynced?.(),
    width: layerInvoker('width'),
    height: layerInvoker('height'),
    layoutSizingHorizontal: layerInvoker('layoutSizingHorizontal'),
    layoutSizingVertical: layerInvoker('layoutSizingVertical')
  }
}
