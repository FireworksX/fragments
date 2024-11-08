import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { layerMode, nodes, sizing } from '@fragments/plugin-state'
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
      case 'left':
        return node.move(value)
      case 'top':
        return node.move(null, value)
    }
  })
  const [parent] = useGraph(documentManager, selectionGraph?.getParent())
  const isTopLevel = selectionGraph?.isTopLevel() ?? false
  const childOfBreakpoint = parent?._type === nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isTopLevel

  const hugContentEnabled =
    !!selectionGraph?.children?.length ||
    selectionGraph?._type === nodes.Text ||
    selectionGraph?._type === nodes.FragmentInstance
  const fillContentEnabled = canRelativeSize && animatableValue(parent?.resolveField('layerMode')) === layerMode.flex
  const relativeContentEnabled = canRelativeSize

  return {
    selectionGraph,
    hugContentEnabled,
    fillContentEnabled,
    relativeContentEnabled,
    hasSync:
      layerInvoker('layoutSizingHorizontal').value !== sizing.Hug &&
      layerInvoker('layoutSizingVertical').value !== sizing.Hug,
    sync: layerInvoker('aspectRatio'),
    isSynced: selectionGraph?.isSynced?.(),
    width: layerInvoker('width'),
    height: layerInvoker('height'),
    layoutSizingHorizontal: layerInvoker('layoutSizingHorizontal'),
    layoutSizingVertical: layerInvoker('layoutSizingVertical'),
    allowResizeHorizontal: selectionGraph?.getAllowResizeHorizontal?.(),
    allowResizeVertical: selectionGraph?.getAllowResizeVertical?.(),
    left: layerInvoker('left'),
    top: layerInvoker('top'),
    canRelativeSize
  }
}
