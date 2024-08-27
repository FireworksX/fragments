import { Resolver } from '../../../helpers'

export const transformValueNegative: Resolver = (state, entity) => {
  return {
    ...entity,
    getUpdateConnectors$: () => [],
    transform: (inputValue: boolean): boolean => {
      return !inputValue
    }
  }
}
