import { Plugin } from '@graph-state/core'
import { definition } from '@fragmentsx/definition'
import { getRandomColor } from '@/shared/utils/random'
import { animatableValue } from '@/shared/utils/animatableValue'
import { createFrame } from './createFrame'
import { createText } from '@/shared/store/builderStore/plugins/creatorPlugin/createText'
import { createImage } from '@/shared/store/builderStore/plugins/creatorPlugin/createImage'
import { createFragmentInstance } from '@/shared/store/builderStore/plugins/creatorPlugin/createFragmentInstance'

/**
 * Плагин обслуживает логику работы с добавлением контента на холст.
 * createType - что будет создано при клике (например frame, image, text)
 */

export const creatorPlugin: Plugin = state => {
  if (!('$canvas' in state)) {
    throw new Error('CanvasManager plugin not found.')
  }

  const creatorGraph = {
    _type: 'Creator',
    _id: 'root',
    createType: null,
    creatorContext: null
  }
  const creatorKey = state.keyOfEntity(creatorGraph)

  state.mutate(state.key, {
    creator: creatorGraph
  })

  const setCreatorType = (type, context) => {
    state.mutate(creatorKey, prev => {
      return {
        createType: prev.createType === type ? null : type,
        creatorContext: prev.createType === type ? null : context
      }
    })
  }

  const createLayer = parent => {
    const type = state.resolve(creatorKey)?.createType

    if (type) {
      let nextLayer
      if (parent) {
        if (type === definition.nodes.Frame) {
          nextLayer = createFrame(state, parent)
        } else if (type === definition.nodes.Text) {
          nextLayer = createText(state, parent)
        } else if (type === definition.nodes.Image) {
          nextLayer = createImage(state, parent)
        }
      }

      setCreatorType(null)

      if (nextLayer) {
        state.$canvas.setFocus(state.keyOfEntity(nextLayer))
      }
    }
  }

  state.$creator = {
    key: creatorKey,
    setCreatorType,
    createLayer,
    createFragmentInstance
  }
}
