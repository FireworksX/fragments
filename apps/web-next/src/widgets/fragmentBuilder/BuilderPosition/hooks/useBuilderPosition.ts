import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { layerMode, nodes } from '@fragments/plugin-fragment-spring'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useBuilderPosition = () => {
  const { documentManager } = useBuilderDocument()
  const { selection, selectionGraph } = useBuilderSelection()
  const [selectionNode] = useGraph(documentManager, selection)
  const [parent] = useGraph(documentManager, selectionGraph?.getParent?.())
  const isRootLayer = selectionGraph?.isRootLayer?.() ?? false
  const childOfBreakpoint = parent?._type === nodes.Breakpoint

  const [position, setPosition] = useLayerValue('position')
  const [top, setTop] = useLayerValue('top')
  const [left, setLeft] = useLayerValue('left')

  const disabledFlags = useMemo(() => {
    const parentNode = selectionNode?.getParent?.()
    const hasLayout = parentNode?.layerMode === layerMode.flex

    return {
      absolute: false, //parentNode?._type === {}.Screen,
      relative: false //!hasLayout
    }
  }, [selectionNode])

  return {
    selectionGraph,
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
      value: top,
      update: setTop
    },
    hasPosition: !childOfBreakpoint && !isRootLayer && selectionGraph?._type !== nodes.Breakpoint
    // top: to(selectionRect, ({ y }) => y),
    // left: to(selectionRect, ({ x }) => x),
    // right: to(selectionRect, rect => documentManager.rect.maxX(rect)),
    // bottom: to(selectionRect, rect => documentManager.rect.maxY(rect))
  }
}
