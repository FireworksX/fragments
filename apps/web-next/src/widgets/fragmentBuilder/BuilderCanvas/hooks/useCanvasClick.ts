import { definition } from '@fragmentsx/definition'
import { nextTick } from '@/shared/utils/nextTick'
import { findLayerFromPointerEvent } from '@/shared/utils/findLayerFromPointerEvent'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { ComponentRef, RefObject } from 'react'
import { useGesture } from '@use-gesture/react'
import { getAllParents } from '@fragmentsx/render-core'

export const useCanvasClick = (targetRef: RefObject<ComponentRef<'div'>>) => {
  const { documentManager } = useBuilderDocument()
  const { manager: builderManager, isTextEditing } = useBuilderManager()

  const { manager: canvasManager } = useBuilderCanvas()
  const { creator, manager, createText, createBreakpoint, createFrame } = useBuilderCreator()
  const createType = creator?.createType

  useGesture(
    {
      onClick: ({ event }) => {
        const layerKey = findLayerFromPointerEvent(event)
        if (createType) {
          if ([definition.nodes.Text, definition.nodes.Frame].includes(createType)) {
            let nextLayerKey = null

            if (createType === definition.nodes.Text) {
              ;[nextLayerKey] = createText(layerKey, { content: 'text' })
            } else if (createType === definition.nodes.Frame) {
              ;[nextLayerKey] = createFrame(layerKey)
            }
            manager.setCreatorType(null)

            nextTick(() => {
              canvasManager.setFocus(nextLayerKey)
            })
          }
        } else {
          if (documentManager.entityOfKey(layerKey)?._type === definition.nodes.Instance) {
            // const isTopInstance = getAllParents(documentManager, layerKey)?.at(-1)?._type === definition.nodes.Fragment
            // console.log(isTopInstance)
            builderManager.toggleTextEditor(false)

            // if (isTopInstance) {
            canvasManager.setFocus(layerKey)
            // }
          } else if (layerKey) {
            if (!isTextEditing) {
              const clickedLayerValue = documentManager.resolve(layerKey)

              if (clickedLayerValue?._type === definition.nodes.Text && event.detail === 2) {
                canvasManager.setFocus(layerKey)
                builderManager.toggleTextEditor(true)
                return
              }
            }

            builderManager.toggleTextEditor(false)
            canvasManager.setFocus(layerKey)
          } else {
            builderManager.toggleTextEditor(false)
            canvasManager.setFocus(null)
          }
        }
      }
    },
    {
      target: targetRef
    }
  )
}
