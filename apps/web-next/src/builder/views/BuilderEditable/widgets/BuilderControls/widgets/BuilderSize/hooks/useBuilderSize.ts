import { builderSizing } from '@fragments/fragments-plugin'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'

export const useBuilderSize = () => {
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

  return {
    selectionGraph,
    hasSync:
      layerInvoker('layoutSizingHorizontal').value !== builderSizing.Hug &&
      layerInvoker('layoutSizingVertical').value !== builderSizing.Hug,
    sync: layerInvoker('aspectRatio'),
    isSynced: selectionGraph?.isSynced(),
    width: layerInvoker('width'),
    height: layerInvoker('height'),
    layoutSizingHorizontal: layerInvoker('layoutSizingHorizontal'),
    layoutSizingVertical: layerInvoker('layoutSizingVertical')
  }
}
