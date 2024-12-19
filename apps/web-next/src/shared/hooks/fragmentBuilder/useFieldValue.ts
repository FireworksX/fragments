import { use } from 'react'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { getFieldValue } from '@fragments/plugin-fragment'

/**
 * У field значением может быть переменная, а у неё зависимость от другой переменной
 * Мы собираем цепочку из переменных и подписываемся на все, т.к. в определённый момент
 * значения могут измениться в середине цепочки.
 */

export const useFieldValue = (layerKey: LinkKey, field: string) => {
  const { documentManager } = use(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const fieldValue = layerNode?.[field]

  const variablesStack = []
  if (isVariableLink(fieldValue)) {
    const getVariable = value => {
      if (isVariableLink(value)) {
        variablesStack.push(value)
        const variableNodeValue = documentManager.resolve(value)?.getValue()
        getVariable(variableNodeValue)
      }
    }

    getVariable(fieldValue)
  }

  useGraphStack(documentManager, variablesStack ?? [])

  return getFieldValue(layerKey, field, documentManager)
}
