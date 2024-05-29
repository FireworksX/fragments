import { useContext, useEffect } from 'react'
import { useSpringRef, useSprings } from '@react-spring/web'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useBuilderLayerRefs } from '@/app/builder/widgets/Builder/hooks/useBuilderLayerRefs'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { builderNodes } from '@fragments/fragments-plugin'

export const useHighlights = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const { findRefNode } = useBuilderLayerRefs()
  const toolRef = useSpringRef()
  const [highlights, api] = useSprings(1, () => ({
    ref: toolRef,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 0,
    borderColor: ''
  }))

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      api.start(() => {
        const target = findRefNode(selection)
        const rootNode = target.closest(`[data-root-node]`)

        const { top, left, width, height } = getNodePosition({ node: target, stopNode: rootNode })

        return {
          width,
          height,
          y: top,
          x: left,
          opacity: selection ? (width > 0 && height > 0 ? 1 : 0) : 0
        }
      })
    })

    const node = findRefNode(selection)

    if (node) {
      observer.observe(node)
    } else {
      api.start(() => ({
        opacity: 0
      }))
    }
    // selection
    //   .map(findRefNode)
    //   .filter(Boolean)
    //   .forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [selection])

  return {
    highlights
  }
}
