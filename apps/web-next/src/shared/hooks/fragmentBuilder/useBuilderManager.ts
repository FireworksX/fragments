import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import { createConstants } from '@fragments/utils'
import { LinkKey } from '@graph-state/core'
import { useGraph } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const builderViews = createConstants('preview', 'edit')
export const builderOptions = createConstants('focus')

interface BuilderManagerParameters {
  focus?: LinkKey
  textEditing?: boolean
}

export const useBuilderManager = () => {
  const { builderManager } = useContext(BuilderContext)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { fragment } = useParams()
  const [builderState] = useGraph(builderManager, builderManager.key)
  const [fragmentSlug, view] = fragment || []
  const resolvedMode = Object.keys(builderViews).some(mode => mode === view) ? view : builderViews.preview

  const updateUrl = (searchParams: URLSearchParams) => {
    const search = searchParams.toString()
    const query = search ? `?${search}` : ''

    router.replace(`${pathname}${query}`)
  }

  const updateParams = (params: BuilderManagerParameters) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'focus') {
        if (!value) {
          current.delete(builderOptions.focus)
        } else {
          current.set(builderOptions.focus, value)
        }
      }
    })

    updateUrl(current)
  }

  return {
    mode: resolvedMode,
    isEdit: resolvedMode === builderViews.edit,
    focus: searchParams.get(builderOptions.focus),
    isTextEditing: builderState.showTextEditor,
    mouseOverLayer: builderState.mouseOverLayer,
    updateParams
  }
}
