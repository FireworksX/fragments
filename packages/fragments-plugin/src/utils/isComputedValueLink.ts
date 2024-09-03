import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { builderNodes } from 'src'

export const isComputedValueLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === builderNodes.ComputedValue
  }

  if (isGraph(link)) {
    return link._type === builderNodes.ComputedValue
  }

  return false
}
