import { ResolverNode } from '../../helpers'
import { SpringValue, to } from '@react-spring/web'
import { clonedField } from '../../utils/cloneField/cloneField.performance'
import { getVariabledValue } from '../../utils/getValue/getVariabledValue.performance'

export const computedValueNode: ResolverNode = (state, entity?: unknown): unknown => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    inputValue: clonedField(state, entity, 'inputValue'),
    getValue: () => {
      const node = state.resolve(key)
      const transforms = node?.transforms?.map(state.resolve) ?? []
      const inputValue$ = getVariabledValue(state, node.inputValue)
      /*
      Получаем от каждого трансформа значения на которые
      нужно будет реагировать.
       */
      const transformConnectors$ = transforms
        .map(t => t.getUpdateConnectors$())
        .filter(Boolean)
        .flat()

      const value$ = to([inputValue$, ...transformConnectors$], input => {
        return transforms.reduce((result, transformer) => transformer.transform(result), input)
      })

      return value$
    }
  }
}
