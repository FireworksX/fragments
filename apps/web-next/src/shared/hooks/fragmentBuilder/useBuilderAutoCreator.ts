import { useEffect } from 'react'
import { nextTick } from '@/shared/utils/nextTick'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { definition } from '@fragmentsx/definition'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderAutoCreator = () => {
  const { creator, manager, createText, createCollection, createFrame } = useBuilderCreator()
  const createType = creator?.createType
  const { manager: canvasManager } = useBuilderCanvas()
  const { selection, selectionGraph } = useBuilderSelection()

  useEffect(() => {
    if (
      [definition.nodes.Frame, definition.nodes.Collection].includes(selectionGraph?._type) &&
      [definition.nodes.Text, definition.nodes.Frame, definition.nodes.Collection].includes(createType)
    ) {
      let nextLayerKey = null
      const collectionSourceLink = creator?.creatorContext?.sourceLink

      if (createType === definition.nodes.Text) {
        ;[nextLayerKey] = createText(selection, { content: 'text' })
      } else if (createType === definition.nodes.Frame) {
        ;[nextLayerKey] = createFrame(selection)
      } else if (createType === definition.nodes.Collection && collectionSourceLink) {
        ;[nextLayerKey] = createCollection(selection, { source: collectionSourceLink })
      }

      manager.setCreatorType(null)

      nextTick(() => {
        canvasManager.setFocus(nextLayerKey)
      })
    }
  }, [selection, createType])
}
