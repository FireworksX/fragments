import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { LinkKey } from '@graph-state/core'
import { omit } from '@fragments/utils'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

const BORDER_SIZE = 1.5
const PARENT_BORDER_SIZE = 3
const initialStyle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  opacity: 0,
  borderWidth: 0
}

export const useLayerHighlightNode = (layerKey: LinkKey) => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { selection } = useBuilderSelection()
  const layerStyles = layerNode?.toCss?.() ?? {}

  console.log(layerNode, layerStyles)

  return {
    isHovered: canvas.hoverLayer === layerKey,
    borderWidth: to(canvas.scale, scale => BORDER_SIZE / scale),
    layerStyles: {
      ...omit(layerStyles, 'backgroundColor', 'borderColor', 'background', 'border')
    },
    children: layerNode?.children ?? []
  }
}
