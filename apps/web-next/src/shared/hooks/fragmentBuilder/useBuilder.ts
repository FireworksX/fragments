import { useSearchParam } from '@/shared/hooks/useSearchParams'

export const useBuilder = () => {
  const [currentFragmentId, setCurrentFragmentId] = useSearchParam('node')
  const [preview, setPreview] = useSearchParam('preview')
  const isValidId = (id: unknown) => !isNaN(Number(id))

  const openFragment = (fragmentId, preview?: boolean) => {
    if (isValidId(fragmentId)) {
      setCurrentFragmentId(fragmentId)
      setPreview(preview ? '1' : null)
    }
  }

  const openPreview = () => {
    openFragment(currentFragmentId, true)
  }

  return {
    isValidId,
    currentFragmentId: isValidId(currentFragmentId) ? currentFragmentId : null,
    isPreview: preview === '1',
    openFragment,
    openPreview
  }
}
