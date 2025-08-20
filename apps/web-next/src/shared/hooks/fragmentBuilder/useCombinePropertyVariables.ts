import { DropdownRenderOption } from '@/shared/ui/RenderDropdown'
import { omit } from '@fragmentsx/utils'
import { useMemo } from 'react'

interface PropertyVariable {
  fieldEntity?: {
    name: string
  }
  fieldValue?: unknown
  actions?: DropdownRenderOption[]
  disabled?: boolean
  createVariable?: () => void
  resetVariable?: () => void
  editVariable?: () => void
  variableData?: unknown | null
}

export const useCombinePropertyVariables = (properties: PropertyVariable[]) => {
  const activeProperty = properties?.find(prop => !!prop.fieldValue) ?? {}

  const combinedActions = useMemo(() => {
    return properties.reduce<Record<string, DropdownRenderOption[]>>((acc, property) => {
      property.actions?.forEach(action => {
        const actionIndex = acc?.findIndex(accAction => accAction.name === action.name)

        if (action.name === 'createVariable') {
          const el = {
            name: `${action.name}_${property?.fieldEntity?.name}`,
            label: property?.fieldEntity?.name,
            onClick: action.onClick
          }

          if (actionIndex !== -1) {
            acc.at(actionIndex)?.options.push(el)
          } else {
            acc.push({
              ...omit(action, 'onClick'),
              options: [el]
            })
          }
        }

        if (action.name === 'setVariable') {
          const el = {
            name: `${action.name}_${property?.fieldEntity?.name}`,
            label: property?.fieldEntity?.name,
            onClick: action.onClick
          }

          if (actionIndex !== -1) {
            acc.at(actionIndex)?.options.push(el)
          } else {
            acc.push({
              ...omit(action, 'onClick'),
              options: [el]
            })
          }
        }
        return acc
      })

      return acc
    }, [])
  }, [])

  console.log(properties, combinedActions)

  return {
    ...activeProperty
  }
}
