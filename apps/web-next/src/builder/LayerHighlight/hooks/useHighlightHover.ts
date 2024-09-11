import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { findRefNode } from '@/builder/utils/findRefNode'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { SPRING_INDEXES } from '@/builder/LayerHighlight/hooks/useHighlights'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'

const BORDER_SIZE = 1.5

export const useHighlightHover = () => {
  const { canvasManager, documentManager } = useContext(BuilderContext)
  const [canvas] = useGraph(canvasManager, canvasManager.key)

  const [styles, stylesApi] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 0,
    borderWidth: 0
  }))

  useEffect(() => {
    const target = findRefNode(canvas.hoverLayer)
    const { top, left, width, height } = getNodePosition(target)

    stylesApi.set({
      x: left,
      y: top,
      width: width,
      height: height,
      opacity: canvas.isDragging || canvas.isResizing ? 0 : 1,
      borderWidth: BORDER_SIZE / canvas.scale.get()
    })
  }, [canvas.hoverLayer, canvas.isDragging, canvas.isResizing])

  return styles
}
