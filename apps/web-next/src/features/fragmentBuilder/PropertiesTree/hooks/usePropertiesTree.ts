import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'

export const usePropertiesTree = () => {
  const { properties, editProperty } = useFragmentProperties()

  return {
    properties,
    editProperty
  }
}
