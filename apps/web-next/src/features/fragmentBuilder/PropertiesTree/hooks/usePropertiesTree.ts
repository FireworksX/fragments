import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'

export const usePropertiesTree = () => {
  const { propertyLinks, editProperty } = useFragmentProperties()

  return {
    propertyLinks,
    editProperty
  }
}
