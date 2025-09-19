import { generateId } from '@fragmentsx/utils'
import { useModal } from '@/shared/hooks/useModal'
import { definition } from '@fragmentsx/definition'

export interface UseScopeVariablesOptions {
  properties: {
    _id: string
    name: string
    type: keyof typeof definition.variableType
  }[]
  onChange?: (nextProperties: UseScopeVariablesOptions['properties']) => void
}

export const useScopeVariables = ({ properties, onChange }: UseScopeVariablesOptions) => {
  const { open: openModal, close: closeModal } = useModal()

  const handleEditProperty = id => {
    const property = properties.find(el => el._id === id)

    if (property) {
      const type = property?.type
      openModal(`property${type as 'String'}`, {
        isEdit: true,
        initialState: property,
        onSubmit: nextForm => {
          console.log(nextForm)
          closeModal()
        }
      })
    }
  }

  const handleAddProperty = (type: keyof typeof definition.variableType) => {
    openModal(`property${type as 'String'}`, {
      onSubmit: property => {
        onChange?.([
          ...properties,
          {
            ...property,
            _id: generateId()
          }
        ])
        closeModal()
      }
    })
  }

  return {
    handleAddProperty,
    handleEditProperty
  }
}
