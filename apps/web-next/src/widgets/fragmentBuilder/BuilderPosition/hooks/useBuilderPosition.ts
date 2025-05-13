import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { definition } from '@fragments/definition'

import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'

export const useBuilderPosition = () => {
  const { selection } = useBuilderSelection()
  const { type, parent, isRootLayer, isBreakpoint } = useLayerInfo(selection)
  const childOfBreakpoint = parent?._type === definition.nodes.Breakpoint

  const [position, setPosition] = useLayerValue('position')
  const [top, setTop, { value$: top$ }] = useLayerValue('top')
  const [left, setLeft] = useLayerValue('left')

  const disabledFlags = useMemo(() => {
    const hasLayout = parent?.layerMode === definition.layerMode.flex

    return {
      absolute: parent?._type === {}.Screen,
      relative: !hasLayout
    }
  }, [parent])

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
    left: {
      value: left,
      update: setLeft
    },
    top: {
      value: top$,
      update: setTop
    },
    hasPosition: !childOfBreakpoint && !isRootLayer && !isBreakpoint
    // top: to(selectionRect, ({ y }) => y),
    // left: to(selectionRect, ({ x }) => x),
    // right: to(selectionRect, rect => documentManager.rect.maxX(rect)),
    // bottom: to(selectionRect, rect => documentManager.rect.maxY(rect))
  }
}
