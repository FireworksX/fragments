import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { BuilderContext } from '@/builder/BuilderContext'
import { layerMode } from '@fragments/plugin-state'

export const useBuilderPosition = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const [selectionNode] = useGraph(documentManager, selection)
  const layerInvoker = useLayerInvoker(selection, ({ key, node, value, prevValue }) => {
    switch (key) {
      case 'positionType':
        return node.setPositionType(value)
      case 'x':
        return node.move(value)
      case 'y':
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
    x: layerInvoker('x'),
    y: layerInvoker('y')
    // top: layerInvoker('y'),
    // right: layerInvoker('position.right'),
    // bottom: layerInvoker('position.bottom'),
    // left: layerInvoker('x')
  }
}
