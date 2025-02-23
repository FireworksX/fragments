import { layerMode, nodes, sizing } from '@fragments/plugin-fragment-spring'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useAllowResize } from '@/shared/hooks/fragmentBuilder/useAllowResize'
import { isValue } from '@fragments/utils'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'

const DISABLE_UTILS: (keyof typeof sizing)[] = [sizing.Fill, sizing.Hug]

export const useBuilderSize = () => {
  const { selection } = useBuilderSelection()
  const { parent, isRootLayer, type, layer, isBreakpoint } = useLayerInfo(selection)
  const [parentLayerMode] = useLayerValue('layerMode', parent)
  const childOfBreakpoint = parent?._type === nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isRootLayer && !isBreakpoint
  const [width, setWidth, widthInfo] = useLayerValue('width')
  const [height, setHeight, heightInfo] = useLayerValue('height')
  const [widthType, setWidthType, widthTypeInfo] = useLayerValue('widthType')
  const [heightType, setHeightType, heightTypeInfo] = useLayerValue('heightType')
  const [aspectRatio, setAspectRatio] = useLayerValue('aspectRatio')
  const { width: isAllowResizeWidth, height: isAllowResizeHeight } = useAllowResize()

  const hugContentEnabled = !!layer?.children?.length || type === nodes.Text || type === nodes.FragmentInstance
  const fillContentEnabled = canRelativeSize && parentLayerMode === layerMode.flex

  return {
    hugContentEnabled,
    fillContentEnabled,
    aspectRatio: {
      disabled: [widthType, heightType].some(v => v === DISABLE_UTILS.includes(v)),
      isActive: isValue(aspectRatio) && aspectRatio !== -1,
      toggle: () => {
        setAspectRatio(isValue(aspectRatio) && aspectRatio !== -1 ? -1 : height / width)
      }
    },
    width: {
      value: width,
      info: widthInfo,
      update: setWidth
    },
    height: {
      value: height,
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
