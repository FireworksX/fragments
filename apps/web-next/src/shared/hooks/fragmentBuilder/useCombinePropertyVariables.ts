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

interface UseCombinePropertyVariablesOptions {
  hideIfEmptyOptions?: string[]
}

export const useCombinePropertyVariables = (
  properties: PropertyVariable[],
  activePropertyIndex: number,
  options?: UseCombinePropertyVariablesOptions
) => {
  const hideIfEmptyOptionsNames = options?.hideIfEmptyOptions ?? ['setVariable']
  const activeProperty = properties?.at(activePropertyIndex)

  const combinedActions = useMemo(() => {
    const map = new Map<string, DropdownRenderOption>()

    for (const variable of properties) {
      if (!variable.actions) continue

      for (const action of variable.actions) {
        const key = action.name ?? action.label
        if (!key) continue

        if (
          hideIfEmptyOptionsNames.includes(key) &&
          (!action?.options?.length || (Array.isArray(action?.options) && !action.options?.at(0)?.length))
        ) {
          continue
        }

        // создаём "подменю" для конкретного variable
        const variableOption: DropdownRenderOption = {
          name: `${action.name}_${variable?.fieldEntity?.name}`,
          label: variable?.fieldEntity?.name,
          onClick: action.onClick,
          options: action.options // <-- сохраняем вложенные options!
        }

        if (!map.has(key)) {
          map.set(key, {
            ...action,
            onClick: undefined, // root action сам по себе не кликается
            options: [[variableOption]]
          })
        } else {
          const existing = map.get(key)!
          existing.options[0] = [...(existing.options?.at(0) ?? []), variableOption]
        }
      }
    }

    return Array.from(map.values())
  }, [properties])

  return {
    ...activeProperty,
    actions: combinedActions
  }
}
