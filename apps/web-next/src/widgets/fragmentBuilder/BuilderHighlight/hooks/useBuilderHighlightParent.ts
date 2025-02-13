import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { isBrowser } from '@fragments/utils'
import { useSpring } from '@react-spring/web'
import { useEffect } from 'react'

export const useBuilderHighlightParent = parentRect => {
  const [styles, stylesApi] = useSpring(() => ({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 1
  }))

  useEffect(() => {
    if (!parentRect) return

    stylesApi.set({
      width: parentRect.width,
      height: parentRect.height,
      x: parentRect.left,
      y: parentRect.top,
      opacity: parentRect.width === 0 && parentRect.height === 0 ? 0 : 1
    })
  }, [stylesApi, parentRect])

  return styles
}
