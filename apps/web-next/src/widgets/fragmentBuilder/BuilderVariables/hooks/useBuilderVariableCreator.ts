import { LinkKey } from '@graph-state/core'
// import { stackNumberVariableName } from '@/builder/StackCollector/components/variables/StackNumberVariable/StackNumberVariable'
// import { stackBooleanVariableName } from '@/builder/StackCollector/components/variables/StackBooleanVariable/StackBooleanVariable'
// import { stackObjectVariableName } from '@/builder/StackCollector/components/variables/StackObjectVariable/StackObjectVariable'
// import { stackStringVariableName } from '@/builder/StackCollector/components/variables/StackStringVariable/StackStringVariable'
import { popoutsStore } from '@/app/store/popouts.store'
import { builderVariableTransforms, builderVariableType } from '@fragments/fragments-plugin/performance'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'

const numberVariableConditions = [builderVariableTransforms]

export const useBuilderVariableCreator = () => {
  const { documentManager } = useContext(BuilderContext)

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
    builderVariableType.Number,
    builderVariableType.Boolean,
    builderVariableType.String,
    builderVariableType.Object
  ].map(type => ({
    type,
    createVariable: (variableOptions = {}) => {
      const methodByType = {
        [builderVariableType.Number]: documentManager.createNumberVariable,
        [builderVariableType.Boolean]: documentManager.createBooleanVariable,
        [builderVariableType.String]: documentManager.createStringVariable,
        [builderVariableType.Object]: documentManager.createObjectVariable
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
