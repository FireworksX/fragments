import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { isBrowser } from '@fragments/utils'
import { useSpring } from '@react-spring/web'
import { useCallback, useEffect } from 'react'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { nextTick } from '@/shared/utils/nextTick'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

export const useBuilderHighlightTextarea = () => {
  const { selection } = useBuilderSelection()
  const { canvas } = useBuilderCanvas()
  const { isTextEditing } = useBuilderManager()
  const rootNode = isBrowser ? document.querySelector(`[data-highlight-root]`) : null
  const domNode = isBrowser ? document.querySelector(`[data-key='${selection}']`)?.parentNode : null

  const [styles, stylesApi] = useSpring(() => ({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 1
  }))

  const getRect = useCallback((node?: Element | null) => node?.getBoundingClientRect?.(), [])

  useEffect(() => {
    if (isTextEditing) {
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
    } else {
      stylesApi.set({
        opacity: 0
      })
    }
  }, [isTextEditing])

  return styles
}
