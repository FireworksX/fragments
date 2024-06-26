import { useStore } from '@nanostores/react'
import { $statex } from 'src/store/builderRouterStore'
import { useLayerInvokerNew } from '../../../../../../../hooks/useLayerInvokerNew'
import { useBuilderSelection } from '../../../../../../../hooks/useBuilderSelection'

export type AlignType = 'left' | 'right' | 'horizontal' | 'top' | 'bottom' | 'vertical'

export const useBuilderAlign = () => {
  const statex = useStore($statex)
  const { selection } = useBuilderSelection()
  const layerInvoker = useLayerInvokerNew(selection)
  const isNonAbsolutePosition = layerInvoker('position.type').value !== 'absolute'

  return {
    disabledMap: {
      left: isNonAbsolutePosition,
      right: isNonAbsolutePosition,
      horizontal: isNonAbsolutePosition,
      top: isNonAbsolutePosition,
      bottom: isNonAbsolutePosition,
      vertical: isNonAbsolutePosition
    },
    onClick: (type: AlignType) => {
      console.log(type)
    }
  }
}
