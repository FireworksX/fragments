import { useContext, useEffect, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { definition } from '@fragmentsx/definition'

import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerGeometry } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useLayerGeometry'
import { useLayerRect } from '@/shared/hooks/useLayerRect'
import { animatableValue } from '@/shared/utils/animatableValue'
import { isFiniteNumber } from '@fragmentsx/utils'
import { constrain } from '@fragmentsx/definition/dist/constants'

export const useBuilderPosition = () => {
  const { selection } = useBuilderSelection()
  const { type, parent, isRootLayer, isBreakpoint } = useLayerInfo(selection)
  const childOfBreakpoint = parent?._type === definition.nodes.Breakpoint

  const [position, setPosition] = useLayerValue('position')
  const [, , { rawValue: baseTop, setWithAutoPatch: setTop }] = useLayerValue('top')
  const [, , { rawValue: baseRight, setWithAutoPatch: setRight }] = useLayerValue('right')
  const [, , { rawValue: baseBottom, setWithAutoPatch: setBottom }] = useLayerValue('bottom')
  const [, , { rawValue: baseLeft, setWithAutoPatch: setLeft }] = useLayerValue('left')

  const layerRect = useLayerRect(selection)

  const disabledFlags = useMemo(() => {
    const hasLayout = parent?.layerMode === definition.layerMode.flex

    return {
      absolute: parent?._type === {}.Screen,
      relative: !hasLayout
    }
  }, [parent])

  const createConstrain = type => {
    let currentValue = baseTop
    let setter = setTop
    if (type === 'right') {
      currentValue = baseRight
      setter = setRight
    }
    if (type === 'bottom') {
      currentValue = baseBottom
      setter = setBottom
    }
    if (type === 'left') {
      currentValue = baseLeft
      setter = setLeft
    }

    return {
      value: layerRect?.[type],
      disabled: !isFiniteNumber(currentValue),
      onClick: () => (!isFiniteNumber(currentValue) ? setter(animatableValue(layerRect?.[type])) : setter(null)),
      onSetValue: () => setter(animatableValue(layerRect?.[type])),
      onResetValue: () => setter(null),
      onChange: setter
    }
  }

  const constrains = {
    top: createConstrain('top'),
    right: createConstrain('right'),
    bottom: createConstrain('bottom'),
    left: createConstrain('left')
  }

  const handleClickTotal = (isActive: boolean) => {
    Object.values(constrains).forEach(item => {
      if (isActive) {
        item.onSetValue()
      } else {
        item.onResetValue()
      }
    })
  }

  return {
    type: {
      value: position,
      update: setPosition,
      options: [
        {
          label: 'Relative',
          value: 'relative',
          disabled: disabledFlags.relative
        },
        {
          label: 'Absolute',
          value: 'absolute',
          disabled: disabledFlags.absolute
        }
      ]
    },
    ...constrains,
    hasPosition: !childOfBreakpoint && !isRootLayer && !isBreakpoint,
    handleClickTotal
    // top: to(selectionRect, ({ y }) => y),
    // left: to(selectionRect, ({ x }) => x),
    // right: to(selectionRect, rect => documentManager.rect.maxX(rect)),
    // bottom: to(selectionRect, rect => documentManager.rect.maxY(rect))
  }
}
