import { LinkKey } from '@graph-state/core'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export type BuilderFieldOverrides = ReturnType<ReturnType<typeof useBuilderFieldOverrides>>

export const useBuilderFieldOverrides = (layerLink: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerLink)

  return (key: string) => {
    const hasOverrideField = !documentManager.isOverrideFromField(layerLink, key)
    const hasOverrideEntity = documentManager?.hasOverrider(layerLink)
    const hasOverride = !!(hasOverrideField && hasOverrideEntity)

    return {
      isOverride: hasOverride,
      actions: hasOverride
        ? [
            {
              label: 'Reset override',
              onClick: () => documentManager.resetOverride(layerLink, key)
            }
          ]
        : []
    }
  }
}
