import { to, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'

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
      x: to(layerRect, ({ x }) => x),
      y: to(layerRect, ({ y }) => y),
      width: to(layerRect, ({ width }) => width),
      height: to(layerRect, ({ height }) => height),
      opacity: canvas.isDragging || canvas.isResizing ? 0 : 1 || Object.keys(layerRect).length === 0,
      borderWidth: BORDER_SIZE / canvas.scale.get()
    })
  }, [canvas.hoverLayer, canvas.isDragging, canvas.isResizing])

  return styles
}
