import { ElementRef, MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react'
import { useSpring } from '@react-spring/web'
import { ReactEditor } from 'slate-react'
import { useGraph } from '@graph-state/react'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { builderModes, useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { findRefNode } from '@/builder/utils/findRefNode'
import { builderNodes } from '@fragments/fragments-plugin/performance'

export interface BuilderReachTextOptions {
  popoutRef: MutableRefObject<ElementRef<'div'>>
  controlsRef: MutableRefObject<ElementRef<'div'>>
}

export const useBuilderReachText = ({ popoutRef, controlsRef }: BuilderReachTextOptions) => {
  const { documentManager } = useContext(BuilderContext)
  const { mode } = useBuilderManager()
  const { selection, selectionGraph } = useBuilderSelection()
  const editorWrapperRef = useRef<ElementRef<'div'>>()
  const [richEditor] = useGraph(documentManager, documentManager.richEditor)
  const isEditable = richEditor.editable ?? false

  const [reachTextStyles, reachTextApi] = useSpring(() => ({
    opacity: 0,
    display: 'none'
  }))

  const [editorStyles, editorApi] = useSpring(() => ({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  }))

  const handleMountEditor = useCallback((editor: ReactEditor) => {
    richEditor.setSlateEditor(editor)
  }, [])

  const observeEditor = useCallback(
    (layerRef: any) => {
      const observer = new ResizeObserver(([entity]) => {
        const target = entity.target
        const rootNode = target.closest(`[data-root-node]`)
        const { top, left, width, height } = getNodePosition({ node: target, stopNode: rootNode })

        editorApi.set({
          width,
          height,
          y: top,
          x: left
        })
      })

      observer.observe(layerRef)

      return observer.disconnect.bind(observer)
    },
    [editorApi]
  )

  useEffect(() => {
    let disconnectObserver: any = () => undefined

    // const [prevBreakpoint, prevLayer] = (savedFullKey.current ?? '').split('/')
    if (selection && isEditable && documentManager?.entityOfKey(selection)?._type === builderNodes.Text) {
      const node = findRefNode(selection)

      if (node) {
        reachTextApi.set({
          opacity: 1,
          display: 'block'
        })

        const detachSync = richEditor?.sync?.(selection, node)
        // document.addEventListener('click', e => hideRichText(e, node))

        const detachObserver = observeEditor(node)

        disconnectObserver = () => {
          detachObserver()
          detachSync()
        }
      }
    } else {
      disconnectObserver()

      reachTextApi.set({
        opacity: 0,
        display: 'none'
      })
    }

    return disconnectObserver
  }, [isEditable, selection])

  return {
    editorStyles,
    editorWrapperRef,
    reachTextStyles,
    handleMountEditor
  }
}
