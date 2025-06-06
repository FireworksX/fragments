import { useContext, useRef } from 'react'
import { Instance } from '@/app/components/Popover/Popover'
import { builderVariableType } from '@fragmentsx/fragments-plugin'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useDropdown } from '@/app/hooks/useDropdown'
import { useBuilderVariables } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariables'
import { useBuilderVariableCreator } from '@/builder/views/BuilderEditable/widgets/BuilderVariables/hooks/useBuilderVariableCreator'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useStackObjectFieldsVariable = (variableLink: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const [variableGraph] = useGraph(documentManager, variableLink)
  const { allowVariables, openVariable } = useBuilderVariableCreator()
  const { ref: dropdownRef, hide } = useDropdown()

  const variables = allowVariables.map(variable => ({
    ...variable,
    createAndAppend: () => {
      const link = variable.createVariable()
      variableGraph.addField(link)
      variable.openVariable(link)
    }
  }))

  return {
    dropdownRef,
    variables,
    openVariable
  }
}
