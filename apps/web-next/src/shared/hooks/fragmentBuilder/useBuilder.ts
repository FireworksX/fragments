import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { useGraph } from '@graph-state/react'
import { use, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { noop, pick } from '@fragmentsx/utils'

export const useBuilder = () => {
  const { builderManager } = use(BuilderContext)
  const [builderGraph] = useGraph(builderManager, builderManager.key, { selector: graph => pick(graph, 'canvasMode') })
  const [searchParams, updateSearchParams] = useSearchParam(['node', 'preview'])
  const isValidId = (id: unknown) => !isNaN(Number(id))
  const currentFragmentId = searchParams?.node
  const preview = searchParams?.preview
  const canvasMode = builderGraph?.canvasMode ?? 'select'
  const setCanvasMode = builderManager?.setCanvasMode ?? noop

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
    openPreview,
    canvasMode,
    canvasModeContext: builderGraph?.canvasModeContext,
    setCanvasMode
  }
}
