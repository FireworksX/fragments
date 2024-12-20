import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentInstanceContext } from '@/widgets/renderer/FragmentInstance/lib/FragmentInstanceContext'
import { Entity, LinkKey } from '@graph-state/core'
import { isVariableLink } from '@/shared/utils/isVariableLink'

export const useInstanceProp = (property: Entity) => {
  const { readProperty } = use(FragmentInstanceContext)
  return property && isVariableLink(property) ? readProperty(property) : null
}
