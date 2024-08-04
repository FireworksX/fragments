import { SceneNode } from '../types'
import { BuilderFieldOverrides, useBuilderFieldOverrides } from './useBuilderFieldOverrides'
import { BuilderFieldVariable, useBuilderFieldVariable } from './useBuilderFieldVariable'
import { omit } from '@fragments/utils'
import { useGraph } from '@graph-state/react'
import { GraphState, SetOptions } from '@graph-state/core'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
// import { builderNodes } from '../data/promos/creators'
// import { ComponentProperty } from '../types/componentProperties'

export type LayerInvokerValue<TValue = unknown> = {
  property?: any //ComponentProperty
  value: TValue
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

export const useLayerInvoker = (field: Field, setter?: Setter, getter?: Getter) => {
  const { documentManager } = useContext(BuilderContext)
  const [entity] = useGraph(documentManager, field ?? '')
  const getOverrides = useBuilderFieldOverrides(field)
  const getVariables = useBuilderFieldVariable(field)

  return (key: string): LayerInvokerValue => {
    const resultValue = () =>
      getter?.({ node: entity, key, value: documentManager.resolveValue(field, key) }) ??
      documentManager.resolveValue(field, key)

    const resultSetter = (newValue: any, options?: SetOptions) =>
      setter?.({
        node: entity,
        key,
        documentManager,
        value: newValue,
        prevValue: resultValue(),
        options
      })
    const propertyKey =
      documentManager.entityOfKey(resultValue)?._type === {}.ComponentProperty ? resultValue() : undefined
    const overrides = getOverrides(key)
    const variables = getVariables(key, resultValue)
    const actions = [overrides.actions, variables.actions]

    return {
      value: resultValue(),
      onChange: resultSetter,
      ...omit(overrides, 'actions'),
      ...omit(variables, 'actions'),
      actions,
      property: propertyKey,
      onResetProperty: propertyKey ? () => resultSetter(null) : undefined
      // onResetProperty: propertyKey ? () => resultSetter(statex.resolve(propertyKey)?.initialValue) : undefined
    }
  }
}
