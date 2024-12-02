import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { layerMode, nodes } from '@fragments/plugin-state'
import { to } from '@react-spring/web'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

export const useBuilderPosition = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const [selectionNode] = useGraph(documentManager, selection)
  const [parent] = useGraph(documentManager, selectionGraph?.getParent())
  const isRootLayer = selectionGraph?.isRootLayer() ?? false
  const childOfBreakpoint = parent?._type === nodes.Breakpoint

  const layerInvoker = useLayerInvoker(selection, ({ key, node, value, prevValue }) => {
    switch (key) {
      case 'positionType':
        return node.setPositionType(value)
      case 'left':
        return node.move(value)
      case 'top':
        return node.move(null, value)
    }
  })

  const disabledFlags = useMemo(() => {
    const parentNode = selectionNode?.getParent?.()
    const hasLayout = parentNode?.layerMode === layerMode.flex

    return {
      absolute: false, //parentNode?._type === {}.Screen,
      relative: false //!hasLayout
    }
  }, [selectionNode])

  return {
    selectionGraph,
    type: {
      options: [
        {
          label: 'Relative',
          value: 'relative',
          disabled: disabledFlags.relative
        },
        {
          label: 'Absolute',
          value: 'absolute',
          disabled: disabledFlags.absolute
        }
      ],
      ...layerInvoker('positionType')
    },
    left: layerInvoker('left'),
    top: layerInvoker('top'),
    hasPosition: !childOfBreakpoint && !isRootLayer && selectionGraph?._type !== nodes.Breakpoint
    // top: to(selectionRect, ({ y }) => y),
    // left: to(selectionRect, ({ x }) => x),
    // right: to(selectionRect, rect => documentManager.rect.maxX(rect)),
    // bottom: to(selectionRect, rect => documentManager.rect.maxY(rect))
  }
}
