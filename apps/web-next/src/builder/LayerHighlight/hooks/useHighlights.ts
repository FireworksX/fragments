import { useEffect } from 'react'
import { useSpring, useSpringRef, useSprings } from '@react-spring/web'
import { useBuilderLayerRefs } from '@/app/builder/widgets/Builder/hooks/useBuilderLayerRefs'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { findRefNode } from '@/builder/utils/findRefNode'

export const useHighlights = () => {
  const { focus, mouseOverLayer } = useBuilderManager()
  const [focusHighlight, apiFocusHighlight] = useSpring(() => ({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 0,
    borderColor: ''
  }))

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      apiFocusHighlight.start(() => {
        const target = findRefNode(focus)
        const rootNode = target?.closest(`[data-root-node]`)
        const { top, left, width, height } = getNodePosition({ node: target, stopNode: rootNode })

        return {
          width,
          height,
          y: top,
          x: left,
          opacity: focus ? (width > 0 && height > 0 ? 1 : 0) : 0
        }
      })
    })

    const node = findRefNode(focus)

    if (node) {
      observer.observe(node)
    } else {
      apiFocusHighlight.start(() => ({
        opacity: 0
      }))
    }
    // selection
    //   .map(findRefNode)
    //   .filter(Boolean)
    //   .forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [focus])

  return {
    focusHighlight
  }
}
