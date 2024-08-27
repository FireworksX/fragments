import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { builderNodes } from '@fragments/fragments-plugin/performance'

export const isVariableLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === builderNodes.Variable || type === builderNodes.ComputedValue
  }

  if (isGraph(link)) {
    return link._type === builderNodes.Variable || link._type === builderNodes.ComputedValue
  }

  return false
}
