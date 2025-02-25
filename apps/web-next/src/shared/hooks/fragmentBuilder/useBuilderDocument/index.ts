import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useFragmentManager } from '@fragments/renderer-editor'

export const useBuilderDocument = () => {
  const { currentFragmentId } = useBuilder()
  const manager = useFragmentManager(currentFragmentId)

  return {
    documentManager: manager
  }
}
