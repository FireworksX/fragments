import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { nodes } from '@fragments/plugin-fragment-spring'

export const isComputedValueLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === nodes.ComputedValue
  }

  if (link && isGraph(link)) {
    return link._type === nodes.ComputedValue
  }

  return false
}
