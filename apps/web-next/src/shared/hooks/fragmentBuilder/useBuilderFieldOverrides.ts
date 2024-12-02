import { LinkKey } from '@graph-state/core'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { isFieldOverridden } from '@fragments/plugin-fragment'
import { isBrowser } from '@fragments/utils'
import { isOverriddenNode, resetFieldOverride } from '@fragments/plugin-fragment-spring'

export type BuilderFieldOverrides = ReturnType<ReturnType<typeof useBuilderFieldOverrides>>

export const useBuilderFieldOverrides = (layerLink: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerLink)

  return (key: string) => {
    const hasOverrideField = !isFieldOverridden(layerLink, key, documentManager)
    const hasOverrideEntity = isOverriddenNode(layerLink, documentManager)
    const hasOverride = !!(hasOverrideField && hasOverrideEntity)

    return {
      isOverride: hasOverride,
      actions: hasOverride
        ? [
            {
              label: 'Reset override',
              onClick: () => resetFieldOverride(layerLink, key, documentManager)
            }
          ]
        : []
    }
  }
}
