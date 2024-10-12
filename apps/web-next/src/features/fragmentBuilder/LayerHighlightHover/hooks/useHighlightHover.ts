import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'

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
    const layerNode = documentManager.resolve(canvas.hoverLayer)
    const layerRect = layerNode?.absoluteRect?.() ?? {}

    stylesApi.set({
      ...extractAnimatableValues(layerRect),
      opacity: canvas.isDragging || canvas.isResizing ? 0 : 1 || Object.keys(layerRect).length === 0,
      borderWidth: BORDER_SIZE / canvas.scale.get()
    })
  }, [canvas.hoverLayer, canvas.isDragging, canvas.isResizing])

  return styles
}
