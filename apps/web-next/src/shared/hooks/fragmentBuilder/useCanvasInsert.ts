import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraphEffect } from '@graph-state/react'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { useBuilderDocumentMethods } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentMethods'

export const useCanvasInsert = () => {
  const { builderManager } = use(BuilderContext)
  const { insertFragment } = useBuilderDocumentMethods()

  useGraphEffect(builderManager, builderManager.canvasDroppableKey, data => {
    const { active, over } = data ?? {}

    if (active && over) {
      insertFragment(active.id, over.id)
    }
  })
}
