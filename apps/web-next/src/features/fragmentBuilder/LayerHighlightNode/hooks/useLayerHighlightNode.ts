import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { LinkKey } from '@graph-state/core'
import { omit } from '@fragments/utils'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { nodes } from '@fragments/plugin-state'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

const BORDER_SIZE = 1.5
const DRAG_PARENT_BORDER_SIZE = 3

export const useLayerHighlightNode = (layerKey: LinkKey) => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const { isTextEditing } = useBuilderManager()
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(layerKey)
  const layerStyles = layerNode?.toCss?.() ?? {}
  const children = layerNode?._type === nodes.FragmentInstance ? [layerNode.fragment] : layerNode?.children ?? []
  const selectionParentKey = documentManager.keyOfEntity(selectionGraph?.getParent?.())
  const isParentSelected = selectionParentKey === layerKey

  const textContent = layerNode?.getContent?.()

  return {
    documentManager,
    isDragging: canvas.isDragging,
    isHovered: canvas.hoverLayer === layerKey,
    isSelected: selection === layerKey,
    isRichTextSelected: isTextEditing && selection === layerKey,
    isParentSelected,
    borderWidth: to(canvas.scale, scale => {
      let width = BORDER_SIZE
      if (canvas.isDragging && isParentSelected) {
        width = DRAG_PARENT_BORDER_SIZE
      }

      return width / scale
    }),
    layerStyles: {
      ...omit(layerStyles, 'backgroundColor', 'borderColor', 'background'),
      borderColor: 'transparent'
    },
    children,
    layerNode,
    textContent
  }
}
