import { useGraph } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { layerMode, nodes, sizing } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { to } from '@fragments/springs-factory'
import { getFieldValue } from '@fragments/plugin-fragment'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useAllowResize } from '@/shared/hooks/fragmentBuilder/useAllowResize'
import { isValue } from '@fragments/utils'

export const useBuilderSize = () => {
  const { documentManager } = useBuilderDocument()
  const { selection, selectionGraph } = useBuilderSelection()
  const [parent] = useGraph(documentManager, selectionGraph?.getParent?.())
  const parentLayerMode = getFieldValue(parent, 'layerMode', documentManager)
  const isTopLevel = selectionGraph?.isRootLayer?.() ?? false
  const childOfBreakpoint = parent?._type === nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isTopLevel && selectionGraph?._type !== nodes.Breakpoint
  const [width, setWidth] = useLayerValue('width')
  const [height, setHeight] = useLayerValue('height')
  const [widthType, setWidthType] = useLayerValue('widthType')
  const [heightType, setHeightType] = useLayerValue('heightType')
  const [aspectRatio, setAspectRatio] = useLayerValue('aspectRatio')
  const [top, setTop] = useLayerValue('top')
  const [left, setLeft] = useLayerValue('left')
  const { width: isAllowResizeWidth, height: isAllowResizeHeight } = useAllowResize()

  const hugContentEnabled =
    !!selectionGraph?.children?.length ||
    selectionGraph?._type === nodes.Text ||
    selectionGraph?._type === nodes.FragmentInstance
  const fillContentEnabled = useMemo(
    () => to([canRelativeSize, parentLayerMode], (can, mode) => can && mode === layerMode.flex),
    [canRelativeSize, parentLayerMode]
  )

  return {
    selectionGraph,
    hugContentEnabled,
    fillContentEnabled,
    aspectRatio: {
      disabled: [widthType, heightType].some(v => v === sizing.Hug),
      isActive: isValue(aspectRatio),
      toggle: () => {
        setAspectRatio(isValue(aspectRatio) ? null : height / width)
      }
    },
    width: {
      value: width,
      update: setWidth
    },
    height: {
      value: height,
      update: setHeight
    },
    widthType: {
      value: widthType,
      update: setWidthType
    },
    heightType: {
      value: heightType,
      update: setHeightType
    },
    isAllowResizeWidth,
    isAllowResizeHeight,
    left: {
      value: left,
      update: setLeft
    },
    top: {
      value: top,
      update: setTop
    },
    canRelativeSize
  }
}
