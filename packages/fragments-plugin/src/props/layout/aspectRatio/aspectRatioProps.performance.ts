import { SpringValue, to } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { Resolver } from 'src/helpers'

export const aspectRatioProps: Resolver = (state, graph) => {
  const graphKey = state.keyOfEntity(graph)

  const getWidth = () => {
    return state.resolveValue(graph, 'width')?.get()
  }

  const getHeight = () => {
    return state.resolveValue(graph, 'height')?.get()
  }

  const isSynced = () => {
    const value$ = state.resolveValue(graph, 'aspectRatio')
    return to(value$, value => value && value !== -1)
  }

  const syncSize = () => {
    const ratio$ = state.resolveValue(graph, 'aspectRatio')
    const nextValue = !isSynced().get() ? getHeight() / getWidth() : -1

    if (ratio$) {
      ratio$.set(nextValue)
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
