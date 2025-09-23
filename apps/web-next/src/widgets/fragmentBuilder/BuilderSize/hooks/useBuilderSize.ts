import { definition } from '@fragmentsx/definition'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useAllowResize } from '@/shared/hooks/fragmentBuilder/useAllowResize'
import { isFiniteNumber, isValue } from '@fragmentsx/utils'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useRootLayerAuto } from '@/shared/hooks/fragmentBuilder/useRootLayerAuto'
import { useLayerRect } from '@/shared/hooks/useLayerRect'
import { useBuilderSizeType } from '@/widgets/fragmentBuilder/BuilderSize/hooks/useBuilderSizeType'
import { animatableValue } from '@/shared/utils/animatableValue'

const DISABLE_UTILS: (keyof typeof definition.sizing)[] = [definition.sizing.Fill, definition.sizing.Hug]

export const useBuilderSize = () => {
  const { selection } = useBuilderSelection()
  const { parent, isRootLayer, type, layer, isBreakpoint } = useLayerInfo(selection)
  const childOfBreakpoint = parent?._type === definition.nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isRootLayer && !isBreakpoint

  const { width: layerWidth$, height: layerHeight$ } = useLayerRect(selection)

  const [right, , { setWithAutoPatch: setRight }] = useLayerValue('right')
  const [bottom, , { setWithAutoPatch: setBottom }] = useLayerValue('bottom')

  const [width, , { setWithAutoPatch: setWidth, ...widthInfo }] = useLayerValue('width')
  const [height, , { setWithAutoPatch: setHeight, ...heightInfo }] = useLayerValue('height')

  const widthType = useBuilderSizeType('width')
  const heightType = useBuilderSizeType('height')

  const [aspectRatio, setAspectRatio] = useLayerValue('aspectRatio')
  const { width: isAllowResizeWidth, height: isAllowResizeHeight } = useAllowResize()

  const widthValue = widthType.value === definition.sizing.Relative ? widthInfo.resultValue : layerWidth$
  const heightValue = heightType.value === definition.sizing.Relative ? heightInfo.resultValue : layerHeight$

  return {
    aspectRatio: {
      disabled: [widthType.value, heightType.value].some(v => v === DISABLE_UTILS.includes(v)),
      isActive: isValue(aspectRatio) && aspectRatio !== -1,
      toggle: () => {
        setAspectRatio(isValue(aspectRatio) && aspectRatio !== -1 ? -1 : height / width)
      }
    },
    width: {
      value: widthValue,
      info: widthInfo,
      update: v => {
        if (isFiniteNumber(right)) {
          setRight(right + (animatableValue(widthValue) - v))
        }
        setWidth(v)
      }
    },
    height: {
      value: layerHeight$,
      info: heightInfo,
      update: v => {
        if (isFiniteNumber(bottom)) {
          setBottom(bottom + (animatableValue(heightValue) - v))
        }
        setHeight(v)
      }
    },
    widthType,
    heightType,
    isAllowResizeWidth,
    isAllowResizeHeight,
    canRelativeSize
  }
}
