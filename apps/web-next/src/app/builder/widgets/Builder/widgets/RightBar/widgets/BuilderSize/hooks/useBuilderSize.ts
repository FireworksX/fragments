import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { builderSizing } from '@fragments/fragments-plugin'

export const useBuilderSize = () => {
  const { selection } = useBuilderSelection()
  const layerInvoker = useLayerInvokerNew(selection, ({ node, key, value }) => {
    switch (key) {
      case 'width':
        console.log(node)
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
    hasSync:
      layerInvoker('layoutSizingHorizontal').value !== builderSizing.Hug &&
      layerInvoker('layoutSizingVertical').value !== builderSizing.Hug,
    sync: layerInvoker('aspectRatio'),
    width: layerInvoker('width'),
    height: layerInvoker('height'),
    layoutSizingHorizontal: layerInvoker('layoutSizingHorizontal'),
    layoutSizingVertical: layerInvoker('layoutSizingVertical')
  }
}
