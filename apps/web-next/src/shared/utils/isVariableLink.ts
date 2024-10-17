import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { nodes } from '@fragments/plugin-state'

export const isVariableLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === nodes.Variable || type === nodes.ComputedValue
  }

  if (isGraph(link)) {
    return link._type === nodes.Variable || link._type === nodes.ComputedValue
  }

  return false
}
