import { ElementRef, useCallback, useContext, useEffect, useRef } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useGraph } from '@graph-state/react'
import { useSpring } from '@react-spring/web'
import { ReactEditor } from 'slate-react'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { findRefNode } from '@/builder/utils/findRefNode'
import { builderNodes } from '@fragments/fragments-plugin/performance'

export const useBuilderTextEditor = () => {
  const { documentManager } = useContext(BuilderContext)
  const { isTextEditing, updateParams } = useBuilderManager()
  const { selection, selectionGraph } = useBuilderSelection()
  const editorWrapperRef = useRef<ElementRef<'div'>>()

  const [editorStyles, editorSpringApi] = useSpring(() => ({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    opacity: 0,
    display: 'none'
  }))

  const observeEditor = useCallback(
    (layerRef: any) => {
      const observer = new ResizeObserver(([entity]) => {
        const target = entity.target
        const rootNode = target.closest(`[data-root-node]`)
        const { top, left, width, height } = getNodePosition({ node: target, stopNode: rootNode })

        editorSpringApi.set({
          width,
          height,
          y: top,
          x: left
        })
      })

      observer.observe(layerRef)

      return observer.disconnect.bind(observer)
    },
    [editorSpringApi]
  )

  useEffect(() => {
    let disconnectObserver: any = () => undefined

    // const [prevBreakpoint, prevLayer] = (savedFullKey.current ?? '').split('/')

    if (selection && isTextEditing && documentManager?.entityOfKey(selection)?._type === builderNodes.Text) {
      const node = findRefNode(selection)

      if (node) {
        editorSpringApi.set({
          display: 'block',
          opacity: 1
        })

        const detachObserver = observeEditor(node)

        disconnectObserver = () => {
          detachObserver()
          updateParams({
            textEditing: false
          })
        }
      }
    } else {
      disconnectObserver()

      editorSpringApi.set({
        opacity: 0,
        display: 'none'
      })
    }

    return disconnectObserver
  }, [isTextEditing, selection])

  return {
    editorStyles,
    editorWrapperRef
  }
}
