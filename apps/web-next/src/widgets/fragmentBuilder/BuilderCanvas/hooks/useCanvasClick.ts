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
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { builderCanvasMode } from '@/shared/constants/builderConstants'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useCanvasClick = (targetRef: RefObject<ComponentRef<'div'>>) => {
  const { documentManager } = useBuilderDocument()
  const { isTextEditing } = useBuilderManager()
  const { openFragment } = useBuilder()
  const [, setCanvasMode] = useBuilderCanvasField('canvasMode')
  const [, setIsTextEditing] = useBuilderCanvasField('isTextEditing')
  const { select } = useBuilderSelection()

  useGesture(
    {
      onClick: ({ event }) => {
        const layerKey = findLayerFromPointerEvent(event)

        if (!layerKey) {
          setCanvasMode(builderCanvasMode.select)
        }

        if (documentManager.entityOfKey(layerKey)?._type === definition.nodes.Instance) {
          if (event.detail >= 2) {
            const instanceFragmentId = documentManager.resolve(layerKey)?.fragment
            openFragment(instanceFragmentId)
          }

          // const isTopInstance = getAllParents(documentManager, layerKey)?.at(-1)?._type === definition.nodes.Fragment
          // console.log(isTopInstance)
          // builderManager.toggleTextEditor(false)
          setIsTextEditing(false)

          // if (isTopInstance) {
          // canvasManager.setFocus(layerKey)
          select(layerKey)
          // }
        } else if (layerKey) {
          if (!isTextEditing) {
            const clickedLayerValue = documentManager.resolve(layerKey)

            if (clickedLayerValue?._type === definition.nodes.Text && event.detail === 2) {
              select(layerKey)
              // canvasManager.setFocus(layerKey)
              setIsTextEditing(true)
              return
            }
          }

          setIsTextEditing(false)
          // canvasManager.setFocus(layerKey)
          select(layerKey)
        } else {
          setIsTextEditing(false)
          // builderManager.toggleTextEditor(false)
          // canvasManager.setFocus(null)
          select(null)
        }
      }
    },
    {
      target: targetRef
    }
  )
}
