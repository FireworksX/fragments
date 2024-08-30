import { Entity, isGraph, isLinkKey, LinkKey } from '@graph-state/core'
import { builderNodes } from 'src'
import { isComputedValueLink } from './isComputedValueLink'

export const isVariableLink = (link: Entity) => {
  if (isLinkKey(link)) {
    const type = link.split(':').at(0)
    return type === builderNodes.Variable || isComputedValueLink(link)
  }

  if (isGraph(link)) {
    return link._type === builderNodes.Variable || isComputedValueLink(link)
  }

  return false
}
