import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBoundingClientRect } from '@/shared/hooks/useBoundingClientRect'
import { isBrowser } from '@fragments/utils'
import { useSpring } from '@react-spring/web'
import { useEffect } from 'react'
import { useBuilderHighlightParent } from './useBuilderHighlightParent'

export const useBuilderHighlightSelected = () => {
  const { selection } = useBuilderSelection()
  const selectedNode = isBrowser ? document.querySelector(`[data-key='${selection}']`) : null
  const parentNode = selectedNode?.parentNode
  const [_parent, parentRect] = useBoundingClientRect(parentNode)
  const [_selected, selectedRect] = useBoundingClientRect(selectedNode, [parentRect])
  const parentStyles = useBuilderHighlightParent(parentRect)

  const [selectedStyles, selectStylesApi] = useSpring(() => ({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 1
  }))

  useEffect(() => {
    if (!selectedRect) return

    selectStylesApi.set({
      width: selectedRect.width,
      height: selectedRect.height,
      x: selectedRect.left,
      y: selectedRect.top,
      opacity: selectedRect.width === 0 && selectedRect.height === 0 ? 0 : 1
    })
  }, [selectStylesApi, selectedRect])

  return { selectedStyles, parentStyles }
}
