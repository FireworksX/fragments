import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SpringValue } from '@react-spring/web'

const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 100

export const sizeProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const setWidth = (value: number) => {
    if (typeof value !== 'number') {
      return
    }

    const localWidth$ = state.resolve(key).width
    const localHeight$ = state.resolve(key).height
    const localAspectRatio$ = state.resolve(key).aspectRatio
    const isSynced$ = state.resolve(key)?.isSynced()

    console.log(localWidth$, key)

    if (localWidth$) {
      if (isSynced$.get()) {
        localWidth$.set(value)
        localHeight$.set(+(value * localAspectRatio$.get()).toFixed(1))
      } else {
        localWidth$.set(value)
      }
    } else {
      state.mutate(key, {
        width: new SpringValue(value || DEFAULT_WIDTH)
      })
    }
  }

  const setHeight = (value: number) => {
    if (typeof value !== 'number') {
      return
    }

    const localWidth$ = state.resolve(key).width
    const localHeight$ = state.resolve(key).height
    const localAspectRatio$ = state.resolve(key).aspectRatio
    const isSynced$ = state.resolve(key)?.isSynced()

    if (localHeight$) {
      if (isSynced$.get()) {
        localHeight$.set(value)
        localWidth$.set(+(value / localAspectRatio$.get()).toFixed(2))
      } else {
        localHeight$.set(value)
      }
    } else {
      state.mutate(key, {
        height: new SpringValue(value || DEFAULT_HEIGHT)
      })
    }
  }

  return {
    width: clonedField(state, entity, 'width', DEFAULT_WIDTH),
    height: clonedField(state, entity, 'height', DEFAULT_HEIGHT),
    setWidth,
    setHeight
  }
}
