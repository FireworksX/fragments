import { GraphState, LinkKey } from '@graph-state/core'
import { isVariableLink } from '@/builder/utils/isVariableLink'
import { to } from '@react-spring/web'

export const getVariableValue$ = (state: GraphState, value: unknown | LinkKey) => {
  return isVariableLink(value) ? state.resolve(value)?.getValue() : value
}
