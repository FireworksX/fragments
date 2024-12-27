import { use } from 'react'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { useInstanceProp } from '@/widgets/renderer/hooks/useInstanceProp'
import { getFieldValue } from '@fragments/plugin-fragment'

export const useFieldValue = (layerKey: LinkKey, field: string) => {
  const { documentManager } = use(BuilderContext)
  useGraph(documentManager, layerKey)
  const fieldValue = getFieldValue(layerKey, field, documentManager)
  const instanceProp = useInstanceProp(fieldValue)

  return instanceProp ?? fieldValue //getFieldValue(layerKey, field, documentManager)
}
