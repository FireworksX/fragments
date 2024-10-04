import { GraphState, LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'
import { isVariableLink } from '@/shared/utils/isVariableLink'

export const getVariableValue$ = (state: GraphState, value: unknown | LinkKey) => {
  return isVariableLink(value) ? state.resolve(value)?.getValue?.() : value
}
