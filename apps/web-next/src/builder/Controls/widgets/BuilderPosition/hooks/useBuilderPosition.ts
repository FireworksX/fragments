import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { BuilderContext } from '@/builder/BuilderContext'

export const useBuilderPosition = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const [selectionNode] = useGraph(documentManager, selection)
  const layerInvoker = useLayerInvoker(documentManager, selection, () => {})

  const disabledFlags = useMemo(() => {
    const parentNode = selectionNode?.getParent?.()

    return {
      absolute: parentNode?._type === {}.Screen,
      relative: false
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
      ...layerInvoker('position.type')
    },
    top: layerInvoker('position.top'),
    right: layerInvoker('position.right'),
    bottom: layerInvoker('position.bottom'),
    left: layerInvoker('position.left')
  }
}
