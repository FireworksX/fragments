import { GraphState, isLinkKey, LinkKey } from '@graph-state/core'
import { isVariableLink } from '../isVariableLink'

export const getVariabledValue = (state: GraphState, value: unknown | LinkKey) => {
  return isVariableLink(value) ? state.resolve(value).getValue() : value
}
