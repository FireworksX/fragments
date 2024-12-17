import { useGraph } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { layerMode, nodes, sizing } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { to } from '@fragments/springs-factory'
import { getFieldValue } from '@fragments/plugin-fragment'
import { useInterpolation } from '@/shared/hooks/useInterpolation'

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
        return node.move(null, value)
      case 'top':
        return node.move(value)
    }
  })
  const [parent] = useGraph(documentManager, selectionGraph?.getParent?.())
  const parentLayerMode = getFieldValue(parent, 'layerMode', documentManager)
  const isTopLevel = selectionGraph?.isRootLayer?.() ?? false
  const childOfBreakpoint = parent?._type === nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isTopLevel && selectionGraph?._type !== nodes.Breakpoint

  const hugContentEnabled =
    !!selectionGraph?.children?.length ||
    selectionGraph?._type === nodes.Text ||
    selectionGraph?._type === nodes.FragmentInstance
  const fillContentEnabled = useMemo(
    () => to([canRelativeSize, parentLayerMode], (can, mode) => can && mode === layerMode.flex),
    [canRelativeSize, parentLayerMode]
  )

  const layoutSizingHorizontal = layerInvoker('layoutSizingHorizontal')?.value
  const layoutSizingVertical = layerInvoker('layoutSizingVertical')?.value

  return {
    selectionGraph,
    hugContentEnabled,
    fillContentEnabled,
    hasSync: useInterpolation([layoutSizingHorizontal, layoutSizingVertical], (h, v) =>
      [h, v].every(v => v !== sizing.Hug)
    ),
    sync: layerInvoker('aspectRatio'),
    isSynced: selectionGraph?.isSynced?.(),
    width: layerInvoker('width'),
    height: layerInvoker('height'),
    layoutSizingHorizontal: layerInvoker('layoutSizingHorizontal'),
    layoutSizingVertical: layerInvoker('layoutSizingVertical'),
    allowResizeHorizontal: useInterpolation([selectionGraph?.getAllowResizeHorizontal?.()], v => !v),
    allowResizeVertical: useInterpolation([selectionGraph?.getAllowResizeVertical?.()], v => !v),
    left: layerInvoker('left'),
    top: layerInvoker('top'),
    canRelativeSize
  }
}
