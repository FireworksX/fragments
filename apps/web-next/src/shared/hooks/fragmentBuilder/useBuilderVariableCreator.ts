import { LinkKey } from '@graph-state/core'
// import { stackNumberVariableName } from '@/builder/StackCollector/components/variables/StackNumberVariable/StackNumberVariable'
// import { stackBooleanVariableName } from '@/builder/StackCollector/components/variables/StackBooleanVariable/StackBooleanVariable'
// import { stackObjectVariableName } from '@/builder/StackCollector/components/variables/StackObjectVariable/StackObjectVariable'
// import { stackStringVariableName } from '@/builder/StackCollector/components/variables/StackStringVariable/StackStringVariable'
import { popoutsStore } from '@/shared/store/popouts.store'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderVariableCreator = () => {
  const { documentManager } = useBuilderDocument()

  const openVariable = (variableKey: LinkKey, { initial = false, position = 'left' } = {}) => {
    const variableGraph = documentManager.resolve(variableKey)
    const type = variableGraph?.type

    const popoutName = {
      // [builderVariableType.Number]: stackNumberVariableName,
      // [builderVariableType.Boolean]: stackBooleanVariableName,
      // [builderVariableType.Object]: stackObjectVariableName,
      // [builderVariableType.String]: stackStringVariableName
    }[type]

    popoutsStore.open(popoutName, {
      initial,
      position,
      context: {
        variableKey
      }
    })
  }

  const allowVariables = [
    definition.variableType.Number,
    definition.variableType.Boolean,
    definition.variableType.String,
    definition.variableType.Object
  ].map(type => ({
    type,
    createVariable: (variableOptions = {}) => {
      const methodByType = {
        [definition.variableType.Number]: documentManager.createNumberVariable,
        [definition.variableType.Boolean]: documentManager.createBooleanVariable,
        [definition.variableType.String]: documentManager.createStringVariable,
        [definition.variableType.Object]: documentManager.createObjectVariable
      }[type]

      return methodByType(variableOptions)
    },
    openVariable: (vairableLink: LinkKey, openOptions = {}) => {
      openVariable(vairableLink, openOptions)
    }
  }))

  const allowVariablesMap = allowVariables.reduce((acc, el) => {
    acc[el.type] = el
    return acc
  }, {})

  return {
    allowVariables,
    allowVariablesMap,
    openVariable
  }
}
