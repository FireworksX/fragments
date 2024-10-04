import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { layerMode } from '@fragments/plugin-state'
import { to } from '@react-spring/web'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

export const useBuilderPosition = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const [selectionNode] = useGraph(documentManager, selection)
  const selectionRect = selectionNode?.rect()

  const layerInvoker = useLayerInvoker(
    selection,
    ({ key, node, value, prevValue }) => {
      switch (key) {
        case 'positionType':
          return node.setPositionType(value)
        case 'x':
          return node.move(value)
        case 'y':
          return node.move(null, value)
      }
    },
    ({ key, node }) => {
      const rect = node?.rect?.() ?? {}
      switch (key) {
        case 'x':
          return to(rect, ({ x }) => x ?? 0)
        case 'y':
          return to(rect, ({ y }) => y ?? 0)
      }
    }
  )

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
    x: layerInvoker('x'),
    y: layerInvoker('y')
    // top: to(selectionRect, ({ y }) => y),
    // left: to(selectionRect, ({ x }) => x),
    // right: to(selectionRect, rect => documentManager.rect.maxX(rect)),
    // bottom: to(selectionRect, rect => documentManager.rect.maxY(rect))
  }
}
