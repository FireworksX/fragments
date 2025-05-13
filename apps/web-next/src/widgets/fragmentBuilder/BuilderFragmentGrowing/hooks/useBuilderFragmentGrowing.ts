import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { definition } from '@fragmentsx/definition'

export const useBuilderFragmentGrowing = () => {
  const [horizontalGrow, setHorizontalGrow] = useLayerValue('horizontalGrow')
  const [verticalGrow, setVerticalGrow] = useLayerValue('verticalGrow')

  return {
    options: [
      {
        label: 'Auto',
        value: definition.fragmentGrowingMode.auto
      },
      {
        label: 'Fill',
        value: definition.fragmentGrowingMode.fill
      }
    ],
    horizontal: {
      value: horizontalGrow,
      update: setHorizontalGrow
    },
    vertical: {
      value: verticalGrow,
      update: setVerticalGrow
    }
  }
}
