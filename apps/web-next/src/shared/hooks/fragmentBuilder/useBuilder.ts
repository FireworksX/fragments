import { useSearchParam } from '@/shared/hooks/useSearchParams'

export const useBuilder = () => {
  const [searchParams, updateSearchParams] = useSearchParam(['node', 'preview'])
  const isValidId = (id: unknown) => !isNaN(Number(id))
  const currentFragmentId = searchParams?.node
  const preview = searchParams?.preview

  const openFragment = (fragmentId: number | null, preview?: boolean) => {
    if (fragmentId === null) {
      updateSearchParams({
        node: null,
        preview: null
      })
    } else if (isValidId(fragmentId)) {
      updateSearchParams({
        node: fragmentId,
        preview: preview ? '1' : null
      })
    }
  }

  const openPreview = () => {
    openFragment(currentFragmentId, true)
  }

  return {
    isValidId,
    currentFragmentId: isValidId(currentFragmentId) ? +currentFragmentId : null,
    isPreview: preview === '1',
    openFragment,
    openPreview
  }
}
