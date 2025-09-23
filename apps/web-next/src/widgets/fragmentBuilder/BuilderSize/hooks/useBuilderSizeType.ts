import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useRootLayerAuto } from '@/shared/hooks/fragmentBuilder/useRootLayerAuto'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { definition } from '@fragmentsx/definition'
import { getDomRect } from '@/shared/utils/getDomRect'
import { useCallback } from 'react'
import { layerFieldSetter } from '@fragmentsx/render-core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerRect } from '@/shared/hooks/useLayerRect'
import { animatableValue } from '@/shared/utils/animatableValue'
import { keyOfEntity } from '@graph-state/core'

export const useBuilderSizeType = (sizeType: 'width' | 'height') => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const { parent, isRootLayer, isBreakpoint, type, layer } = useLayerInfo(selection)
  const [parentLayerMode, setParentLayerMode] = useLayerValue('layerMode', parent)
  const [position, setPosition] = useLayerValue('position')
  const childOfBreakpoint = parent?._type === definition.nodes.Breakpoint
  const canRelativeSize = !childOfBreakpoint && !isRootLayer && !isBreakpoint
  const { canHugContent } = useRootLayerAuto()
  const { width: layerWidth$, height: layerHeight$ } = useLayerRect(selection)

  const [typeValue, setType, typeInfo] = useLayerValue(sizeType === 'width' ? 'widthType' : 'heightType')
  const [, , { setWithAutoPatch: updateRectValue }] = useLayerValue(sizeType)

  const hugContentEnabled =
    (!!layer?.children?.length || type === definition.nodes.Text || type === definition.nodes.Instance) && canHugContent

  const handleChangeValue = useCallback(
    value => {
      if (value === definition.sizing.Hug) {
        layer?.children?.forEach(child => {
          layerFieldSetter(documentManager, child, 'position')(definition.positionType.relative)
        })
      }

      if (value === definition.sizing.Fill) {
        setParentLayerMode(definition.layerMode.flex)
        setPosition(definition.positionType.relative)
      }

      if (value === definition.sizing.Relative) {
        const rectValue =
          (animatableValue(sizeType === 'width' ? layerWidth$ : layerHeight$) /
            (getDomRect(keyOfEntity(parent))?.width ?? 0)) *
          100
        updateRectValue(rectValue)
      }

      if (value === definition.sizing.Fixed) {
        const rectValue = animatableValue(sizeType === 'width' ? layerWidth$ : layerHeight$)
        updateRectValue(rectValue)
      }

      setType(value)
    },
    [setType]
  )

  return {
    withHug: sizeType === 'width' ? canHugContent && hugContentEnabled : hugContentEnabled,
    withFill: canRelativeSize, // && parentLayerMode === definition.layerMode.flex,
    value: typeValue,
    info: typeInfo,
    onChange: handleChangeValue
  }
}
