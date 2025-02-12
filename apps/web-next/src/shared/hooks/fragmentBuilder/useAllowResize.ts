import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { sizing } from '@fragments/plugin-fragment'

const ALLOW_TYPES = [sizing.Fixed, sizing.Relative]

export const useAllowResize = () => {
  const [widthType] = useLayerValue('widthType')
  const [heightType] = useLayerValue('heightType')

  return {
    width: ALLOW_TYPES.includes(widthType),
    height: ALLOW_TYPES.includes(heightType)
  }
}
