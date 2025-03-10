import { useCallback } from 'react'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { GraphState, LinkKey } from '@graph-state/core'
import { useLayerVariableValue as useLayerValueLib, isInheritField, isPartOfPrimary } from '@fragments/renderer-editor'
import { useGraph } from '@graph-state/react'
import { pick } from '@fragments/utils'
import { isVariableLink } from '@/shared/data/schemas/zod'
import { useNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const resultManager = documentManager
  const { selection } = useBuilderSelection()
  const key = layerKey ?? selection
  const [_, updateLayerData] = useGraph(resultManager, key, {
    selector: data => (data ? pick(data, fieldKey) : data)
  })

  const { layer, schema } = useNormalizeLayer(layerKey, resultManager)
  const currentValue = layer?.[fieldKey]

  const isInherit = isInheritField(resultManager, key, fieldKey)
  const isOverride = !isInherit && !isPartOfPrimary(resultManager, key)
  const resetOverride = useCallback(() => updateLayerData(null), [])

  const restore = useCallback(() => {
    const tempValue = resultManager.resolve(resultManager?.$fragment?.temp)?.[layerKey]?.[fieldKey]

    if (tempValue) {
      updateLayerData({ [fieldKey]: tempValue })
    }
  }, [updateLayerData, resultManager])

  const updateValue = useCallback(
    (value: unknown) => {
      const schemaField = schema?.shape?.[fieldKey]
      const { success: isValid } = schemaField?.safeParse(value) ?? {}

      if (isValid) {
        if (isVariableLink(value)) {
          /*
          Если меняем значение на переменную, то сохраняем значение, чтобы
          можно было вызвать restore и восстановить значение, которое
          было до установки переменной
           */
          resultManager.mutate(resultManager?.$fragment?.temp, {
            [layerKey]: {
              [fieldKey]: currentValue
            }
          })

          resultManager.resolve(resultManager?.$fragment?.temp)
        }

        updateLayerData({ [fieldKey]: value })
      }
    },
    [schema?.shape, fieldKey, updateLayerData, resultManager, layerKey, currentValue]
  )

  return [currentValue, updateValue, { isOverride, resetOverride, isVariable: isVariableLink(currentValue), restore }]
}
