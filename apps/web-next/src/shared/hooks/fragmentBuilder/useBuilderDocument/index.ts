import { useFragmentManager } from '@fragmentsx/render-suite'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

export const useBuilderDocument = () => {
  const { currentFragmentId } = useBuilder()
  const { manager } = useFragmentManager(currentFragmentId)

  return {
    documentManager: manager
  }
}
