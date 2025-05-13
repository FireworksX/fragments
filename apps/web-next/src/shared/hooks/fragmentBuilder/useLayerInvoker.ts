import { SceneNode } from '../types'
import { BuilderFieldOverrides, useBuilderFieldOverrides } from './useBuilderFieldOverrides'
import { BuilderFieldVariable, useBuilderFieldVariable } from './useBuilderFieldVariable'
import { isBrowser, omit } from '@fragmentsx/utils'
import { useGraph } from '@graph-state/react'
import { GraphState, SetOptions } from '@graph-state/core'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
// import { builderNodes } from '../data/promos/creators'
// import { ComponentProperty } from '../types/componentProperties'

export type LayerInvokerValue<TValue = unknown> = {
  property?: any //ComponentProperty
  value: TValue
  resolvedValue: TValue
  onChange: (newValue: TValue, options?: SetOptions) => void
  onResetProperty?: () => void
} & BuilderFieldOverrides &
  BuilderFieldVariable

type SetterOptions = {
  node: SceneNode
  key: string
  documentManager: GraphState
  value: unknown
  prevValue: unknown
  options?: SetOptions
}

type Setter = (options: SetterOptions) => void
type Getter = (options: Omit<SetterOptions, 'options'>) => void
export type ResultSetter = (nextValue: unknown, options: Omit<SetterOptions, 'options'>) => void

const getFieldValue = () => null

export const useLayerInvoker = (field: Field, setter?: Setter, getter?: Getter) => {
  const { documentManager } = useBuilderDocument()
  const [entity] = useGraph(documentManager, field ?? '')
  const getOverrides = useBuilderFieldOverrides(field)
  const getVariables = useBuilderFieldVariable(field)

  return (key: string): LayerInvokerValue => {
    const resultValueGetter = () =>
      getter?.({ node: entity, key, value: getFieldValue(field, key, documentManager) }) ??
      getFieldValue(field, key, documentManager)
    const resultValue = resultValueGetter()

    const resultSetter = (newValue: any, options?: SetOptions) =>
      setter?.({
        node: entity,
        key,
        documentManager,
        value: newValue,
        prevValue: resultValue,
        options
      })
    const overrides = getOverrides(key)
    const variables = getVariables(key, resultSetter, resultValue)
    const actions = [overrides.actions, variables.actions]

    return {
      value: resultValue,
      resolvedValue: resultValue,
      onChange: resultSetter,
      actions,
      isHighlight: overrides.isOverride,
      hasConnector: variables.hasConnector,
      onResetVariable: variables.handleReset,
      onClickVariable: variables.handleClickTransform
    }
  }
}
