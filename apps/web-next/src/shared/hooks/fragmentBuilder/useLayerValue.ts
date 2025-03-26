import { useCallback } from 'react'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { GraphState, LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { pick } from '@fragments/utils'
import { useNormalizeLayer } from '@/shared/hooks/fragmentBuilder/useNormalizeLayer'
import { isValidLayerField } from '@fragments/definition'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { isInheritField, isPartOfPrimary } from '@fragments/render-core'

export const useLayerValue = (fieldKey: string, layerKey?: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const resultManager = documentManager
  const { selection } = useBuilderSelection()
  const key = layerKey ?? selection
  const [_, updateLayerData] = useGraph(resultManager, key, {
    selector: data => (data ? pick(data, fieldKey) : data)
  })

  const { layer, rawLayer } = useNormalizeLayer(key)
  const currentValue = layer?.[fieldKey]
  const rawValue = rawLayer?.[fieldKey]

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
      const isValid = isValidLayerField(layer, fieldKey, value)

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
    [layer, fieldKey, updateLayerData, resultManager, layerKey, currentValue]
  )

  return [
    currentValue,
    updateValue,
    { isOverride, resetOverride, isVariable: isVariableLink(rawValue), rawValue, restore }
  ]
}
