import { definition, getNormalizeLayer } from '@fragmentsx/definition'
import { generateId, pick } from '@fragmentsx/utils'
import { useModal } from '@/shared/hooks/useModal'
import { useAreaProperties } from '@/shared/hooks/useAreaProperties'

export const useAreaSettingsPage = () => {
  const { open, close } = useModal()
  const { loadingProperties, properties, addProperty, removeProperty } = useAreaProperties()
  const definitionList = [definition.variableType.String, definition.variableType.Color]

  const handleEditProperty = id => {
    const property = properties.find(el => el._id === id)

    if (property) {
      const type = property?.type
      open(`property${type as 'String'}`, {
        isEdit: true,
        initialState: property,
        onSubmit: nextForm => {
          console.log(nextForm)
        }
      })
    }
  }

  const handleAddProperty = (type: keyof typeof definition.variableType) => {
    open(`property${type as 'String'}`, {
      onSubmit: property => {
        addProperty({
          ...property,
          _id: generateId()
        })
        close()
      }
    })
  }

  return {
    loadingProperties,
    properties,
    definitionList,
    handleAddProperty,
    handleEditProperty
  }
}
