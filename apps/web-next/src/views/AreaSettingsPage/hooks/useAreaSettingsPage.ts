import { definition, getNormalizeLayer } from '@fragmentsx/definition'
import { generateId, pick } from '@fragmentsx/utils'
import { useModal } from '@/shared/hooks/useModal'
import { useAreaProperties } from '@/shared/hooks/useAreaProperties'

export const useAreaSettingsPage = () => {
  const { loadingProperties, properties, updateProperties } = useAreaProperties()

  return {
    loadingProperties,
    properties,
    updateProperties
  }
}
