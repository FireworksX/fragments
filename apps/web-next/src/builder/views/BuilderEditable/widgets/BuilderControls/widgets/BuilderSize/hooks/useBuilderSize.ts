import { builderSizing } from '@fragments/fragments-plugin'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { layerMode } from '@fragments/plugin-state'
import { animatableValue } from '@/builder/utils/animatableValue'
import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'

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
    !!selectionGraph?.children?.length && animatableValue(selectionGraph.resolveField('layerMode')) === layerMode.flex
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
