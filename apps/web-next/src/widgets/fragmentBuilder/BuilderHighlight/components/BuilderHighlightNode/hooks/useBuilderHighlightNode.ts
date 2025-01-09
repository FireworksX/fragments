import { to } from '@fragments/springs-factory'
import { useContext, useEffect, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { LinkKey } from '@graph-state/core'
import { omit } from '@fragments/utils'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { nodes } from '@fragments/plugin-fragment-spring'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useLayerStyles } from '@/shared/hooks/fragmentBuilder/useLayerStyles'
import { toPx } from '@/shared/utils/toPx'
import { useInstanceProp } from '@/widgets/renderer/hooks/useInstanceProp'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

const BORDER_SIZE = 1.5
const DRAG_PARENT_BORDER_SIZE = 3

export const useBuilderHighlightNode = (layerKey: LinkKey, renderParents: LinkKey[] = []) => {
  const { canvasManager } = useContext(BuilderContext)
  const { documentManager } = useBuilderDocument()
  const { isTextEditing } = useBuilderManager()
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { selection, selectionGraph } = useBuilderSelection()
  const selectionParentKey = documentManager.keyOfEntity(selectionGraph?.getParent?.())
  const isParentSelected = selectionParentKey === layerKey
  const isTextNode = layerNode?._type === nodes.Text

  const borderWidth = useMemo(
    () =>
      to([canvas.scale, canvas.isDragging], (scale, isDragging) => {
        let width = BORDER_SIZE
        if (isDragging && isParentSelected) {
          width = DRAG_PARENT_BORDER_SIZE
        }

        return toPx(width / scale)
      }),
    [canvas.isDragging, canvas.scale, isParentSelected]
  )

  const borderStyle = useMemo(
    () =>
      to([canvas.isDragging, isParentSelected, canvas.hoverLayer], (isDragging, isParent, hoverlayer) => {
        return !isDragging && isParent && hoverlayer !== layerKey ? 'dashed' : 'solid'
      }),
    [canvas.hoverLayer, canvas.isDragging, isParentSelected, layerKey]
  )

  return {
    isTextNode,
    isDragging: canvas.isDragging,
    isHovered: useMemo(() => canvas.hoverLayer.to(v => v === layerKey), [canvas.hoverLayer, layerKey]),
    isSelected: selection === layerKey,
    isRichTextSelected: isTextEditing && selection === layerKey,
    isParentSelected,
    borderWidth,
    borderStyle,
    isInstance: layerNode?._type === nodes.FragmentInstance,
    isTopNode: layerNode?.isRootLayer?.() || layerNode?.isBreakpoint
  }
}
