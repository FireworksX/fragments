import { useContext, useMemo } from 'react'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderPosition = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const [selectionNode] = useGraph(graphState, selection)
  const layerInvoker = useLayerInvokerNew(selection, () => {})

  const disabledFlags = useMemo(() => {
    const parentNode = selectionNode?.getParent?.()

    return {
      absolute: parentNode?._type === {}.Screen,
      relative: false
    }
  }, [selectionNode])

  return {
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
