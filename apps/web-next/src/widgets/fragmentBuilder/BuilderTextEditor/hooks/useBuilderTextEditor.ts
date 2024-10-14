import { ElementRef, useCallback, useContext, useEffect, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { to, useSpring } from '@react-spring/web'
import { usePrevious } from 'react-use'
import { extractAnimatableValues } from '@/shared/utils/extractAnimatableValues'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { nodes } from '@fragments/plugin-state'

export const useBuilderTextEditor = () => {
  const { documentManager } = useContext(BuilderContext)
  const { isTextEditing, updateParams } = useBuilderManager()
  const { selection, selectionGraph } = useBuilderSelection()
  const editorWrapperRef = useRef<ElementRef<'div'>>()
  const selectionRect = selectionGraph?.absoluteRect?.() ?? {}
  const prevSelection = usePrevious(selection)

  const [editorStyles, editorSpringApi] = useSpring(() => ({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 0,
    display: 'none'
  }))

  // const observeEditor = useCallback(
  //   (layerRef: HTMLElement) => {
  //     const observer = new ResizeObserver(([entity]) => {
  //       const target = entity.target
  //       const rootNode = target.closest(`[data-root-node]`)
  //       const { top, left, width, height } = getNodePosition({ node: target, stopNode: rootNode })
  //
  //       editorSpringApi.set({
  //         width: width + 2,
  //         height: height + 2,
  //         y: top,
  //         x: left
  //       })
  //     })
  //     observer.observe(layerRef)
  //     layerRef.style.setProperty('opacity', '0', 'important')
  //
  //     return () => {
  //       observer.disconnect.bind(observer)
  //       layerRef.style.opacity = '0'
  //       layerRef.style.setProperty('opacity', '1', 'important')
  //     }
  //   },
  //   [editorSpringApi]
  // )

  useEffect(() => {
    const disconnectObserver: any = () => undefined

    if (selection && isTextEditing && selectionGraph?._type === nodes.Text) {
      selectionGraph?.setOpacity(0)
    } else {
      const prevSelectionNode = documentManager.resolve(prevSelection)
      if (prevSelectionNode && prevSelectionNode?._type === nodes.Text) {
        prevSelectionNode?.setOpacity?.(1)
      }
    }

    return disconnectObserver
  }, [isTextEditing, selection])

  return {
    editorStyles: extractAnimatableValues(selectionRect),
    isTextEditing,
    editorWrapperRef
  }
}
