import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { definition } from '@fragmentsx/definition'

export const isComputedValueLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === definition.nodes.ComputedValue
  }

  if (link && isGraph(link)) {
    return link._type === definition.nodes.ComputedValue
  }

  return false
}
