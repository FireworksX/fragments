import { ElementRef, MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react'
import { useSpring } from '@react-spring/web'
import { ReactEditor } from 'slate-react'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useBuilderLayerRefs } from '@/app/builder/widgets/Builder/hooks/useBuilderLayerRefs'
import { getNodePosition } from '@/app/utils/getNodePosition'

export interface BuilderReachTextOptions {
  popoutRef: MutableRefObject<ElementRef<'div'>>
  controlsRef: MutableRefObject<ElementRef<'div'>>
}

export const useBuilderReachText = ({ popoutRef, controlsRef }: BuilderReachTextOptions) => {
  const { graphState } = useContext(BuilderContext)
  const [{ view }] = useGraph(graphState)
  const { selection } = useBuilderSelection()
  const [richEditor] = useGraph(graphState, graphState.richEditor)
  const editorWrapperRef = useRef<ElementRef<'div'>>()
  const { findRefNode } = useBuilderLayerRefs()

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
    graphState.richEditor.setSlateEditor(editor)
  }, [])

  const observeEditor = useCallback(
    (layerRef: any) => {
      const observer = new ResizeObserver(([entity]) => {
        const target = entity.target
        const rootNode = target.closest(`[data-root-node]`)
        const { top, left, width, height } = getNodePosition({ node: target, stopNode: rootNode })

        editorApi.start({
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
    //
    if (selection && view === 'text') {
      const node = findRefNode(selection)
      if (node) {
        reachTextApi.start({
          opacity: 1,
          display: 'block'
        })

        const detachSync = graphState.richEditor.sync(selection, node)

        // document.addEventListener('click', e => hideRichText(e, node))

        const detachObserver = observeEditor(node)

        disconnectObserver = () => {
          detachObserver()
          detachSync()
        }
      }
    } else {
      disconnectObserver()

      reachTextApi.start({
        opacity: 0,
        display: 'none'
      })
    }

    return disconnectObserver
  }, [view, selection])

  return {
    editorStyles,
    editorWrapperRef,
    reachTextStyles,
    handleMountEditor
  }
}
