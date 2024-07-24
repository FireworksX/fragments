import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'

export const sizeProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const setWidth = () => {}

  return {
    width: clonedField(state, entity, 'width', 100),
    height: clonedField(state, entity, 'height', 100),
    setWidth(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = state.resolveValue(key, 'aspectRatio')
      const height = state.resolveValue(key, 'height')
      const width = state.resolveValue(key, 'width')

      if (aspectRatio === null || !aspectRatio) {
        width.set(value)
        // state.mutate(key, {
        //   width: value
        // })
      } else {
        width.set(value)
        height.set(aspectRatio !== null ? +(value * aspectRatio).toFixed(1) : height.get())
        // state.mutate(key, {
        //   width: value,
        //   height: aspectRatio !== null ? +(value * aspectRatio).toFixed(1) : height
        // })
      }
    }
  }
}
