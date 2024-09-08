import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { findRefNode } from '@/builder/utils/findRefNode'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { SPRING_INDEXES } from '@/builder/LayerHighlight/hooks/useHighlights'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'

const BORDER_SIZE = 1.5
const initialStyle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  opacity: 0,
  borderWidth: 0
}

export const useHighlightFocus = () => {
  const { focus, mouseOverLayer } = useBuilderManager()
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)

  const [focusStyles, focusStylesApi] = useSpring(() => initialStyle)
  const [parentStyles, parentStylesApi] = useSpring(() => initialStyle)

  useEffect(() => {
    if (focus) {
      const target = findRefNode(focus)
      const viewportNode = document.querySelector('#viewport')
      const { top, left, width, height } = getNodePosition(target, viewportNode)

      const parentTarget = findRefNode(documentManager.keyOfEntity(documentManager.resolve(focus)?.getParent()))
      const parentRect = getNodePosition(parentTarget, viewportNode)

      focusStylesApi.set({
        x: left,
        y: top,
        width: width,
        height: height,
        opacity: canvas.isDragging ? 0 : 1,
        borderWidth: BORDER_SIZE / canvas.scale.get()
      })

      parentStylesApi.set({
        x: parentRect.left,
        y: parentRect.top,
        width: parentRect.width,
        height: parentRect.height,
        opacity: canvas.isDragging ? 0 : 1,
        borderWidth: BORDER_SIZE / canvas.scale.get()
      })
    }
  }, [focus, canvas.isDragging])

  return {
    parentStyles,
    focusStyles
  }
}
