import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { builderVariableType } from '@fragments/fragments-plugin/performance'
import { useBuilderVariablesDep } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariablesDep'
import { useDropdown } from '@/app/hooks/useDropdown'

type PropType = keyof typeof builderVariableType

export const useBuilderVariables = () => {
  const { documentManager } = useContext(BuilderContext)
  const { openVariable } = useBuilderVariablesDep()
  const [documentGraph] = useGraph(documentManager, documentManager.root)
  const propsLinks = documentGraph.props

  const createProp = (type: PropType) => {
    let variableLink = null
    if (type === builderVariableType.Number) {
      variableLink = documentManager.createNumberVariable()
      documentGraph.addProp(variableLink)
    }
    if (type === builderVariableType.Boolean) {
      variableLink = documentManager.createBooleanVariable()
      documentGraph.addProp(variableLink)
    }
    if (type === builderVariableType.Object) {
      variableLink = documentManager.createObjectVariable()
      documentGraph.addProp(variableLink)
    }
    if (type === builderVariableType.String) {
      variableLink = documentManager.createStringVariable()
      documentGraph.addProp(variableLink)
    }

    if (variableLink) {
      openVariable(variableLink)
    }
  }

  return {
    propsLinks,
    createProp,
    openVariable
  }
}
