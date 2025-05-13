import { definition } from '@fragments/definition'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerVariables } from '@/shared/hooks/fragmentBuilder/useLayerVariables'
import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderInteractions = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [interactions, setInteractions] = useLayerValue('interactions')
  const { actions } = useLayerVariables('event', {
    onSetValue: value => {
      addInteraction(value)
    }
  })

  const addInteraction = (eventLinkKey: LinkKey) => {
    setInteractions([
      {
        on: interactions.length % 2 ? definition.interactions.click : definition.interactions.mouseover,
        event: eventLinkKey
      }
    ])
  }

  const removeInteraction = index => {
    const layer = documentManager.resolve(selection)
    layer.interactions.splice(index, 1)

    console.log(layer)
    documentManager.mutate(selection, layer, { replace: true })
  }

  return {
    manager: documentManager,
    actions: [actions],
    interactions,
    addInteraction,
    removeInteraction
  }
}
