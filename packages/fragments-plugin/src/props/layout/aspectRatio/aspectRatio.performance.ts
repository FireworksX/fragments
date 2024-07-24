import { SpringValue, to } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { Resolver } from 'src/helpers'

export const aspectRatio: Resolver = (state, graph) => {
  const graphKey = state.keyOfEntity(graph)

  const getWidth = () => {
    return state.resolveValue(graph).width?.get()
  }

  const getHeight = () => {
    return state.resolveValue(graph).height?.get()
  }

  const isSynced = () => {
    const springValue = state.resolve(graph).aspectRatio
    return to(springValue, value => value && value !== -1)
  }

  const syncSize = () => {
    const springValue = state.resolve(graph).aspectRatio
    const nextValue = !isSynced().get() ? getHeight() / getWidth() : -1

    if (springValue) {
      springValue.set(nextValue)
    } else {
      state.mutate(graphKey, {
        aspectRatio: new SpringValue(nextValue)
      })
    }
  }

  return {
    aspectRatio: clonedField(state, graph, 'aspectRatio'),
    isSynced,
    syncSize
  }
}
