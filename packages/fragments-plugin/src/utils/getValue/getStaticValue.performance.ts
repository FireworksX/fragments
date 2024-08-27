import { GraphState } from '@graph-state/core'
import { Interpolation, SpringValue } from '@react-spring/web'
import { isVariableLink } from '../isVariableLink'

export const getStaticValue = (state: GraphState, input) => {
  if (input instanceof SpringValue || input instanceof Interpolation) {
    return input.get()
  }

  if (isVariableLink(input)) {
    const variableValue = state.resolve(input).getValue()
    return getStaticValue(state, variableValue)
  }

  return input
}
