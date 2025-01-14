import { Plugin } from '@graph-state/core'
import { layerMode, nodes, paintMode, positionType } from '@fragments/plugin-fragment'
import { getRandomColor } from '@/shared/utils/random'
import { animatableValue } from '@/shared/utils/animatableValue'
import { createFrame } from './createFrame'
import { createText } from '@/shared/store/builderStore/plugins/creatorPlugin/createText'

/**
 * Плагин обслуживает логику работы с добавлением контента на холст.
 * createType - что будет создано при клике (например frame, image, text)
 */

export const creatorPlugin: Plugin = state => {
  if (!('documentKey' in state)) {
    throw new Error('DocumentManager plugin not found.')
  }
  if (!('$canvas' in state)) {
    throw new Error('CanvasManager plugin not found.')
  }

  const creatorGraph = {
    _type: 'Creator',
    _id: 'root',
    createType: null
  }
  const creatorKey = state.keyOfEntity(creatorGraph)

  state.mutate(state.key, {
    creator: creatorGraph
  })

  state.creatorKey = creatorKey

  const setCreatorType = type => {
    state.mutate(creatorKey, prev => {
      return {
        createType: prev.createType === type ? null : type
      }
    })
  }

  const createLayer = parent => {
    const type = state.resolve(creatorKey)?.createType

    if (type) {
      let nextLayer
      if (parent) {
        if (type === nodes.Frame) {
          nextLayer = createFrame(state, parent)
        } else if (type === nodes.Text) {
          nextLayer = createText(state, parent)
        }
      }

      setCreatorType(null)

      if (nextLayer) {
        state.$canvas.setFocus(state.keyOfEntity(nextLayer))
      }
    }
  }

  state.$creator = {
    setCreatorType,
    createLayer
  }
}
