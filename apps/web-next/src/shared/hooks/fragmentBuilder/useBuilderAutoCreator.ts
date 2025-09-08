import { useEffect } from 'react'
import { nextTick } from '@/shared/utils/nextTick'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { definition } from '@fragmentsx/definition'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { builderCanvasMode } from '@/shared/constants/builderConstants'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'

export const useBuilderAutoCreator = () => {
  const [canvasMode, setCanvasMode] = useBuilderCanvasField('canvasMode')
  const [canvasModeContext] = useBuilderCanvasField('canvasModeContext')
  const { manager, createText, createCollection, createFrame } = useBuilderCreator()
  const { selection, selectionGraph, select } = useBuilderSelection()

  useEffect(() => {
    if (
      [definition.nodes.Frame, definition.nodes.Collection].includes(selectionGraph?._type) &&
      [definition.nodes.Text, definition.nodes.Frame, definition.nodes.Collection].includes(canvasMode)
    ) {
      let nextLayerKey = null
      const collectionSourceLink = canvasModeContext?.sourceLink

      if (canvasMode === definition.nodes.Text) {
        ;[nextLayerKey] = createText(selection, { content: 'text' })
      } else if (canvasMode === definition.nodes.Frame) {
        ;[nextLayerKey] = createFrame(selection)
      } else if (canvasMode === definition.nodes.Collection && collectionSourceLink) {
        ;[nextLayerKey] = createCollection(selection, { source: collectionSourceLink })
      }

      setCanvasMode(builderCanvasMode.select)

      nextTick(() => {
        select(nextLayerKey)
      })
    }
  }, [selection, canvasMode])
}
