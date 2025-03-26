import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { definition } from '@fragments/definition'

export const isVariableLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === definition.nodes.Variable || type === definition.nodes.ComputedValue
  }

  if (link && isGraph(link)) {
    return link._type === definition.nodes.Variable || link._type === definition.nodes.ComputedValue
  }

  return false
}
