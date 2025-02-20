import { fragmentGrowingMode } from '@fragments/plugin-fragment-spring'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useBuilderFragmentGrowing = () => {
  const [horizontalGrow, setHorizontalGrow] = useLayerValue('horizontalGrow')
  const [verticalGrow, setVerticalGrow] = useLayerValue('verticalGrow')

  return {
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
