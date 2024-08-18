import { useContext, useRef } from 'react'
import { Instance } from '@/app/components/Popover/Popover'
import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/app/store/popouts.store'
import { BuilderContext } from '@/builder/BuilderContext'
import { builderVariableType } from '@fragments/fragments-plugin/performance'
import { stackNumberVariableName } from '@/builder/StackCollector/components/StackNumberVariable/StackNumberVariable'
import { stackBooleanVariableName } from '@/builder/StackCollector/components/StackBooleanVariable/StackBooleanVariable'
import { stackObjectVariableName } from '@/builder/StackCollector/components/StackObjectVariable/StackObjectVariable'
import { stackStringVariableName } from '@/builder/StackCollector/components/StackStringVariable/StackStringVariable'

export const useBuilderVariablesDep = () => {
  const { documentManager } = useContext(BuilderContext)

  const openVariable = (variableKey: LinkKey, isInitial = true) => {
    const variableGraph = documentManager.resolve(variableKey)
    const type = variableGraph?.type

    const popoutName = {
      [builderVariableType.Number]: stackNumberVariableName,
      [builderVariableType.Boolean]: stackBooleanVariableName,
      [builderVariableType.Object]: stackObjectVariableName,
      [builderVariableType.String]: stackStringVariableName
    }[type]

    popoutsStore.open(popoutName, {
      initial: isInitial,
      position: 'left',
      context: {
        variableKey
      }
    })
  }

  return {
    openVariable
  }
}
