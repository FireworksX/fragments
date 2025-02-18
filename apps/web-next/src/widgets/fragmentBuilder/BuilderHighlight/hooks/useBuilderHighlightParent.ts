import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { isBrowser } from '@fragments/utils'
import { useSpring } from '@react-spring/web'
import { useCallback, useEffect } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { nextTick } from '@/shared/utils/nextTick'
import { animatableValue } from '@/shared/utils/animatableValue'

export const useBuilderHighlightParent = () => {
  const { selection } = useBuilderSelection()
  const { canvas } = useBuilderCanvas()
  const rootNode = isBrowser ? document.querySelector(`[data-highlight-root]`) : null
  const domNode = isBrowser ? document.querySelector(`[data-key='${selection}']`)?.parentNode : null

  const [styles, stylesApi] = useSpring(() => ({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 1
  }))

  const getRect = useCallback((node?: Element | null) => node?.getBoundingClientRect?.(), [])

  useEffect(() => {
    if (canvas.isMoving) return

    const selectedRect = getRect(domNode)
    const rootRect = getRect(rootNode)
    const scaleFactor = animatableValue(canvas.scale)

    if (selectedRect) {
      stylesApi.set({
        width: selectedRect.width / scaleFactor,
        height: selectedRect.height / scaleFactor,
        x: (selectedRect.left - rootRect?.left) / scaleFactor,
        y: (selectedRect.top - rootRect?.top) / scaleFactor,
        opacity: selectedRect.width === 0 && selectedRect.height === 0 ? 0 : 1
      })
    }
  }, [stylesApi, domNode, canvas.isMoving, canvas.isDragging, getRect, canvas.scale, rootNode])

  return styles
}
