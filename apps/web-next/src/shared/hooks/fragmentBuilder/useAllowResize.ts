import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { definition } from '@fragments/definition'

const ALLOW_TYPES = [definition.sizing.Fixed, definition.sizing.Relative]

export const useAllowResize = () => {
  const [widthType] = useLayerValue('widthType')
  const [heightType] = useLayerValue('heightType')

  return {
    width: ALLOW_TYPES.includes(widthType),
    height: ALLOW_TYPES.includes(heightType)
  }
}
