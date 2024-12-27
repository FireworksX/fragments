import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentInstanceContext } from '@/widgets/renderer/FragmentInstance/lib/FragmentInstanceContext'
import { Entity, LinkKey } from '@graph-state/core'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { useGraph } from '@graph-state/react'

export const useInstanceProp = (property: LinkKey) => {
  const { documentManager } = use(BuilderContext)
  const { instanceLink, readProperty } = use(FragmentInstanceContext)
  const [propertyGraph] = useGraph(documentManager, instanceLink ? null : property)

  if (instanceLink) {
    return property && isVariableLink(property) ? readProperty(property) : null
  }

  return property && isVariableLink(property) && propertyGraph ? propertyGraph?.defaultValue : null
}
