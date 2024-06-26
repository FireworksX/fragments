import { SceneNode } from '../types'
import { BuilderFieldOverrides, useBuilderFieldOverrides } from './useBuilderFieldOverrides'
import { BuilderFieldVariable, useBuilderFieldVariable } from './useBuilderFieldVariable'
import { omit } from '@fragments/utils'
import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
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
  value: unknown
  options?: SetOptions
}

type Setter = (options: SetterOptions) => void
type Getter = (options: Omit<SetterOptions, 'options'>) => void

export const useLayerInvokerNew = (field: Field, setter?: Setter, getter?: Getter) => {
  const { graphState } = useContext(BuilderContext)
  const [entity] = useGraph(graphState, field ?? '')
  const getOverrides = useBuilderFieldOverrides(field)
  const getVariables = useBuilderFieldVariable(field)

  return (key: string): LayerInvokerValue => {
    const resultValue =
      getter?.({ node: entity, key, value: graphState.resolveValue(field, key) }) ?? graphState.resolveValue(field, key)
    const resultSetter = (newValue: any, options?: SetOptions) =>
      setter?.({
        node: entity,
        key,
        value: newValue,
        options
      })
    const propertyKey = graphState.entityOfKey(resultValue)?._type === {}.ComponentProperty ? resultValue : undefined
    const overrides = getOverrides(key)
    const variables = getVariables(key, resultValue)
    const actions = [overrides.actions, variables.actions]

    return {
      value: resultValue,
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
