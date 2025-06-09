import { definition } from '@fragmentsx/definition'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useAllowResize } from '@/shared/hooks/fragmentBuilder/useAllowResize'
import { isValue } from '@fragmentsx/utils'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useRootLayerAuto } from '@/shared/hooks/fragmentBuilder/useRootLayerAuto'

const DISABLE_UTILS: (keyof typeof definition.sizing)[] = [definition.sizing.Fill, definition.sizing.Hug]

export const useBuilderSize = () => {
  const { selection } = useBuilderSelection()
  const { parent, isRootLayer, type, layer, isBreakpoint } = useLayerInfo(selection)
  const [parentLayerMode] = useLayerValue('layerMode', parent)
  const childOfBreakpoint = parent?._type === definition.nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isRootLayer && !isBreakpoint
  const [width, setWidth, widthInfo] = useLayerValue('width')
  const [height, setHeight, heightInfo] = useLayerValue('height')
  const [widthType, setWidthType, widthTypeInfo] = useLayerValue('widthType')
  const [heightType, setHeightType, heightTypeInfo] = useLayerValue('heightType')
  const [aspectRatio, setAspectRatio] = useLayerValue('aspectRatio')
  const { width: isAllowResizeWidth, height: isAllowResizeHeight } = useAllowResize()
  const { canHugContent } = useRootLayerAuto()

  const hugContentEnabled =
    (!!layer?.children?.length || type === definition.nodes.Text || type === definition.nodes.Instance) && canHugContent
  const fillContentEnabled = canRelativeSize && parentLayerMode === definition.layerMode.flex

  console.log(canHugContent, hugContentEnabled)
  return {
    canHugContentWidth: canHugContent && hugContentEnabled,
    canHugContentHeight: hugContentEnabled,
    fillContentEnabled,
    aspectRatio: {
      disabled: [widthType, heightType].some(v => v === DISABLE_UTILS.includes(v)),
      isActive: isValue(aspectRatio) && aspectRatio !== -1,
      toggle: () => {
        setAspectRatio(isValue(aspectRatio) && aspectRatio !== -1 ? -1 : height / width)
      }
    },
    width: {
      value: widthInfo.value$,
      info: widthInfo,
      update: setWidth
    },
    height: {
      value: heightInfo.value$,
      info: heightInfo,
      update: setHeight
    },
    widthType: {
      value: widthType,
      info: widthTypeInfo,
      update: setWidthType
    },
    heightType: {
      value: heightType,
      info: heightTypeInfo,
      update: setHeightType
    },
    isAllowResizeWidth,
    isAllowResizeHeight,
    canRelativeSize
  }
}
