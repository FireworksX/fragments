import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useGlobalManager } from '@/shared/hooks/fragmentBuilder/useBuilderGlobalContext'

export const useBuilderDocument = () => {
  const { currentFragmentId } = useBuilder()
  const { getFragmentManager, globalManager } = useGlobalManager()
  const manager = getFragmentManager(currentFragmentId)

  return {
    documentManager: manager,
    globalManager
  }
}
