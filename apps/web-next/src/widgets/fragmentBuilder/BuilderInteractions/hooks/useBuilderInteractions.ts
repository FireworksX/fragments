import { definition } from '@fragmentsx/definition'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerVariables } from '@/shared/hooks/fragmentBuilder/useLayerVariables'
import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { popoutsStore } from '@/shared/store/popouts.store'
import { popoutNames } from '@/shared/data'
import { nextTick } from '@/shared/utils/nextTick'

export const useBuilderInteractions = () => {
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const [interactions, setInteractions, interactionsInfo] = useLayerValue('interactions')
  const { actions, createVariable } = useLayerVariables('event', {
    createName: 'New Event',
    setName: 'Set Event',
    editAfterCreate: false,
    onSetValue: value => {
      addInteraction(value)
    }
  })

  const openInteraction = (index: number) => {
    const currentInteractions = documentManager.resolve(selection)?.interactions
    const currentInteraction = currentInteractions.at(index)

    popoutsStore.open(popoutNames.stackInteraction, {
      initial: true,
      context: {
        on: currentInteraction.on,
        event: currentInteraction.event,
        onChangeOn: nextValue => {
          popoutsStore.updateCurrentContext({ on: nextValue })
          documentManager.mutate(documentManager.keyOfEntity(currentInteraction), { on: nextValue })
        }
      }
    })
  }

  const addInteraction = (eventLinkKey: LinkKey) => {
    setInteractions([
      {
        on: definition.interactions.click,
        event: eventLinkKey
      }
    ])

    const currentInteractions = documentManager.resolve(selection)?.interactions
    const index = currentInteractions?.length - 1
    openInteraction(index)
  }

  const removeInteraction = index => {
    const interaction = interactionsInfo?.rawValue?.at(index)

    documentManager.invalidate(interaction)
    // layer.interactions.splice(index, 1)
    //
    // console.log(layer)
    // documentManager.mutate(selection, layer, { replace: true })
  }

  return {
    manager: documentManager,
    actions: [
      actions,
      [
        {
          name: 'goal',
          label: 'Reach Goal',
          onClick: () => createVariable({ mode: definition.eventMode.goal, name: 'Goal' })
        }
      ]
    ],
    interactions,
    addInteraction,
    removeInteraction,
    openInteraction
  }
}
