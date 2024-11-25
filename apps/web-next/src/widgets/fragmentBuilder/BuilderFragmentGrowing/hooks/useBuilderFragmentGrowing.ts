import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { fragmentGrowingMode, layerMode, nodes } from '@fragments/plugin-state'
import { to } from '@react-spring/web'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

export const useBuilderFragmentGrowing = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()

  const layerInvoker = useLayerInvoker(selection, ({ key, node, value, prevValue }) => {
    switch (key) {
      case 'horizontalGrow':
        return node.setHorizontalGrow(value)
      case 'verticalGrow':
        return node.setVerticalGrow(value)
    }
  })

  return {
    selectionGraph,
    options: [
      {
        label: 'Auto',
        value: fragmentGrowingMode.auto
      },
      {
        label: 'Fill',
        value: fragmentGrowingMode.fill
      }
    ],
    horizontal: layerInvoker('horizontalGrow'),
    vertical: layerInvoker('verticalGrow')
  }
}
