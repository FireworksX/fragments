import { useContext, useRef } from 'react'
import { Instance } from '@/app/components/Popover/Popover'
import { builderVariableType } from '@fragments/fragments-plugin'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useDropdown } from '@/app/hooks/useDropdown'
import { useBuilderVariablesDep } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariablesDep'

export const useStackObjectFieldsVariable = (variableLink: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [variableGraph] = useGraph(documentManager, variableLink)
  const { openVariable } = useBuilderVariablesDep()
  const { ref: dropdownRef, hide } = useDropdown()

  const createField = (e, type: PropType) => {
    e.preventDefault()
    e.stopPropagation()

    let nextVariableLink
    if (type === builderVariableType.Number) {
      nextVariableLink = documentManager.createNumberVariable()
      variableGraph.addField(nextVariableLink)
    }
    if (type === builderVariableType.Boolean) {
      nextVariableLink = documentManager.createBooleanVariable()
      variableGraph.addField(nextVariableLink)
    }
    if (type === builderVariableType.Object) {
      nextVariableLink = documentManager.createObjectVariable()
      variableGraph.addField(nextVariableLink)
    }
    if (type === builderVariableType.String) {
      nextVariableLink = documentManager.createStringVariable()
      variableGraph.addField(nextVariableLink)
    }

    openVariable(nextVariableLink, false)
    hide()
  }

  return {
    dropdownRef,
    createField,
    openVariable: (variableLink: LinkKey) => openVariable(variableLink, false)
  }
}
